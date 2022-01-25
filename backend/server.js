const express = require("express");
const cors = require("cors");
const nedb = require("nedb");
const crypto = require("crypto");
const fetch = require("node-fetch");

const port = process.env.PORT || 3100;
const secretKey = process.env.SECRET_KEY || "secret";
const hashKey = process.env.HASH_KEY || "hash";

const app = express();
app.use(cors());
app.listen(port, () => console.log("Listening at port " + port));
app.use(express.json({ limit: "200kb" }));

const productDatabase = new nedb({
  filename: "./storage/products.db",
  autoload: true,
});
const customerDatabase = new nedb({
  filename: "./storage/customers.db",
  autoload: true,
});

// if products database is empty, load initaldata.json
productDatabase.count({}, (err, count) => {
  if (count != 0) return;
  loadInitialData(productDatabase, require("./storage/initialdata.json"));
});

function getIpAdress(req) {
  const ips = req.headers["X-Forwarded-For"] || req.connection.remoteAddress;

  // if there are multiple ips, return the last one
  if (ips.includes(",")) {
    return ips.split(",")[ips.split(",").length - 1];
  }

  return ips;
}

//** Removes prefix from ipv4 address */
function removeIpv4Prefix(ip) {
  if (ip.startsWith("::ffff:")) {
    ip = ip.substring(7);
  }
  return ip;
}

/** Loads data from json file */
function loadInitialData(database, file) {
  database.loadDatabase();
  database.insert(file);
}

/** Subtracts a product from storage */
function buyProduct(database, productId) {
  database.loadDatabase();

  // find the product
  database.find({ id: productId }, function (err, docs) {
    if (!docs.length)
      return console.log(
        `buyProduct function could not find product id ${productId}`
      );

    // remove 1 from stock
    database.update({ id: productId }, { $inc: { stock: -1 } });
  });
}

/** Returns a object containing usefull request information */
function createRequestObject(req) {
  return {
    type: req.method,
    path: req.path,
    date: new Date(),
  };
}

/** Creates a new user in database */
async function createNewUser(database, req) {
  database.loadDatabase();
  const ip = getIpAdress(req);

  // make a request to http://ip-api.com/json/ and store response
  const response = await fetch(
    `http://ip-api.com/json/${removeIpv4Prefix(ip)}`
  );
  const data = await response.json();

  if (data.status === "fail") {
    return console.log(`createNewUser function could not query user ip ${ip}`);
  }

  // clean up the data
  delete data.query;
  delete data.status;
  data.ip = ip;
  data.requests = [createRequestObject(req)];

  // insert the data into the database
  database.insert(data);
}

/** Logs request information on to db */
async function handleUser(database, req) {
  database.loadDatabase();
  const ip = getIpAdress(req);

  database.find({ ip: ip }, function (err, docs) {
    // if user does not exist, create a new one
    if (!docs.length) return createNewUser(database, req);

    // if user exists, log the request
    database.update(
      { ip: ip },
      { $push: { requests: createRequestObject(req) } }
    );
  });
}

/** handle get requests to /products */
app.get("/products", (req, res) => {
  handleUser(customerDatabase, req);

  productDatabase.find({}, (err, docs) => {
    res.json(docs);
  });
});

/** handle post requests to /buy */
app.post("/buy", (req, res) => {
  handleUser(customerDatabase, req);

  // if no products are specified, return error
  if (!req.body.bProducts) {
    res.status(400).send("No products specified");
    return;
  }

  console.log(
    `Received request to buy ${
      req.body.bProducts.length
    } products from ${getIpAdress(req)}`
  );
  req.body.bProducts.forEach((product) => buyProduct(productDatabase, product));
  res.sendStatus(200);
});

/** handle get requests to /customers */
app.get("/customers", (req, res) => {
  if (!req.headers.key) return res.status(401).send("Unauthorized");

  // get key from header
  const key = req.headers.key;
  const hash = crypto.createHmac("sha256", hashKey).update(key).digest("hex");

  // Compare hash to secret key
  if (hash !== secretKey) {
    res.status(401).send("Unauthorized");
    console.log("Unauthorized request from " + getIpAdress(req));
    return;
  }

  customerDatabase.find({}, (err, docs) => {
    res.json(docs);
  });
});
