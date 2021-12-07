const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "hummeli",
  password: "salasana",
  database: "urheilijatietokanta",
  multipleStatements: true,
});

db.connect((err) => {
  if (err) {
    console.log("Something went wrong connecting to the database.");
    return;
  }
  console.log("Connection to the database ready!");
});

app.post("/uusi", (req, res) => {
  const etunimi = req.body.etunimi;
  const sukunimi = req.body.sukunimi;
  const kutsumanimi = req.body.kutsumanimi;
  const syntymävuosi = req.body.syntymävuosi;
  const paino = req.body.paino;
  const linkki = req.body.linkki;
  const laji = req.body.laji;
  const saavutukset = req.body.saavutukset;

  db.query(
    "INSERT INTO urheilija (etunimi, sukunimi, kutsumanimi, syntymävuosi, paino, linkki, laji, saavutukset) VALUES (?,?,?,?,?,?,?,?)",
    [
      etunimi,
      sukunimi,
      kutsumanimi,
      syntymävuosi,
      paino,
      linkki,
      laji,
      saavutukset,
    ],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Tiedot lisätty tietokantaan!");
      }
    }
  );
});

// Tulostetaan kaikki urheilijat
app.get("/urheilijat", (req, res) => {
  db.query("SELECT * FROM urheilija", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});
// Tulostetaan tietyn id:n omaavan henkilön id
app.get("/henkilot/:id", (req, res) => {
  const id = Number(req.params.id);
  //const id = req.params.id;
  conn.query("SELECT * FROM henkilot WHERE id=?", id, (err, rows) => {
    if (err) throw err;
    res.end(JSON.stringify(rows[0]));
  });
});
// Voidaan päivittää urheilijan saavutuksia
app.put("/update", (req, res) => {
  const id = req.body.id;
  const saavutukset = req.body.saavutukset;
  db.query(
    "UPDATE urheilija SET saavutukset = ? WHERE id = ?",
    [saavutukset, id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.delete("/delete/:id", (req, res) => {
  const id = req.params.id;
  db.query("DELETE FROM urheilija WHERE id = ?", id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
