const mysql = require("mysql");
const express = require("express");
var app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const server = app.listen(3005, () => console.log("Serveri valmiina"));

// Luodaan yhteydelle tiedot
const conn = mysql.createConnection({
  host: "localhost",
  user: "hummeli",
  password: "salasana",
  database: "puhelinluettelo",
  multipleStatements: true,
});

// Luodaan yhteys tietokantaan
conn.connect((err) => {
  if (err) {
    console.log("Virhe yhdistettäessä tietokantaan!");
    return;
  }
  console.log("Yhteys muodostettu!");
});

// Näytetään kaikki tietokannan henkilöt
conn.query("SELECT * FROM henkilot", (err, rows) => {
  if (err) throw err;
  console.log("Tietokannasta löytyi seuraavat henkilöt:");
  rows.forEach((row) => {
    console.log(`${row.nimi}, puhelinnumero: ${row.puhelin}`);
  });
});

// Asetetaan headerit
app.use(function (req, res, next) {
  // Verkkosivun connectio jolle halutaan yhdistettävän
  res.setHeader("Access-Control-Allow-Origin", "*");

  // Metodit jotka haluat kutsuttavaksi
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  // Headerit joita haluat käyttää
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, Accept, Content-Type, X-Requested-With, X-CSRF-Token"
  );

  res.setHeader("Access-Control-Allow-Credentials", true);

  res.setHeader("Content-type", "application/json");

  next();
});

// Näytetään kaikki tietokannan henkilöt
app.get("/henkilot", (req, res) => {
  conn.query("SELECT * FROM henkilot", (err, rows) => {
    if (err) throw err;
    return res.status(200).json(rows);
  });
});

// Näytetään tietyn id:n omaavan henkilön tiedot
app.get("/henkilot/:id", (req, res) => {
  const id = Number(req.params.id);
  //const id = req.params.id;
  conn.query("SELECT * FROM henkilot WHERE id=?", id, (err, rows) => {
    if (err) throw err;
    res.end(JSON.stringify(rows[0]));
  });
});

// Päivitetään tietyn id: omaavan henkilön tiedot
app.put("/henkilot/:id", (req, res) => {
  const id = Number(req.params.id);
  const updatedUser = req.body;
  conn.query(
    "UPDATE henkilot SET ? WHERE id = ?;",
    [updatedUser, req.params.id],
    function (error, results) {
      if (error) throw error;
      conn.query("SELECT * FROM henkilot WHERE id=?", id, (err, rows) => {
        if (err) throw err;
        res.end(JSON.stringify(rows[0]));
      });
    }
  );
});

// Poistetaan tietyn id: omaavan henkilön teidot
app.delete("/henkilot/:id", (req, res) => {
  const id = Number(req.params.id);
  console.log("Poistetaan henkilön id: " + id + " tietokannasta");
  conn.query(
    "DELETE FROM henkilot WHERE id=?",
    [req.params.id],
    function (error, results) {
      if (error) throw error;
      return;
    }
  );
});

// Lisätään uusi henkilö tietokantaan
app.post("/lisaa", (req, res) => {
  let henkilo = req.body;
  console.log(henkilo);
  if (!henkilo) {
    return res
      .status(400)
      .send({ error: true, message: "Henkilo -objektia ei mudostunut" });
  }
  conn.query(
    "INSERT INTO henkilot SET ? ",
    henkilo,
    function (error, results, fields) {
      if (error) throw error;
      return res.send(JSON.stringify({ id: results.insertId, ...henkilo }));
    }
  );
});
