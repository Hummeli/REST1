let sanakirja = [];
const express = require("express");
const fs = require("fs");

let data = fs.readFileSync("./sanakirja.txt", {
  encoding: "utf8",
  flag: "r",
});

const splitLines = data.split(/\r?\n/);
splitLines.forEach((line) => {
  const sanat = line.split(" ");
  console.log(sanat);
  const sana = {
    fin: sanat[0],
    eng: sanat[1],
  };
  sanakirja.push(sana);
  console.log(sanakirja);
});

var app = express();
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true }));

/*CORS isn’t enabled on the server, this is due to security reasons by default,
so no one else but the webserver itself can make requests to the server.*/
// Add headers
app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", "*");

  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, Accept, Content-Type, X-Requested-With, X-CSRF-Token"
  );

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", true);

  res.setHeader("Content-type", "application/json");

  // Pass to next layer of middleware
  next();
});

// GET KAIKKI KÄYTTÄJÄT
app.get("/sanat", (req, res) => {
  //data:ssa on nyt koko tiedoston sisältö
  /*tiedoston sisältö pitää pätkiä ja tehdä taulukko*/

  res.json(sanakirja);
});
// GET SANA
app.get("/sanat/:sana", (req, res) => {
  const haettavaSana = req.params.sana;
  const sana = sanakirja.find((haettava) => haettava.fin === haettavaSana);
  res.json(sana ? sana.eng : { message: "Not found" });
});

// LISÄTÄÄN SANOJA
app.post("/sanat", (req, res) => {
  const sana = req.body;
  sanakirja.push(sana);
  try {
    // TALLENNETAAN SANOJA
    data += `${sana.fin} ${sana.eng}\n`;
    fs.writeFileSync("./sanakirja.txt", data);
    return res.status(201).json(sana);
  } catch (err) {
    console.error(err);
    return res.status(500).json(err);
  }

  res.json(sana);
});

// PÄIVITETÄÄN SANAA
app.put("/sanat/:id", (req, res) => {
  const id = Number(req.params.id);
  const updatedUser = req.body;
  data = data.map((user) => (user.id === id ? updatedUser : user));
  res.json(data);
});

app.listen(3000, () => {
  console.log("Server listening at port 3000");
});
