// Asetetaan lukija
var readLine = require("readline-sync");
// Asetetaan haettavia henkilöitä
let k1 = { nimi: "Esa", puhNro: "1212232345" };
let k2 = { nimi: "Jari", puhNro: "132442134451" };
let k3 = { nimi: "Mari", puhNro: "123314541345" };
let k4 = { nimi: "Kari", puhNro: "123443345" };
// Luodaan ryhmä "luettelo"
const luettelo = [k1, k2, k3, k4];
// Kysytään käyttäjältä haettavaa nimeä
let haku = readLine.question("Anna haettava nimi: ");
// Funktio jossa etsitään käyttäjän antamaa nimeä luettelosta
function haeNumero(luettelo) {
  for (let x in luettelo) {
    if (luettelo[x].nimi == haku) {
      // Jos tieto löytyy palautetaan puhelinnumero
      return luettelo[x].puhNro;
    }
  }
}
// Tulostetaan käyttäjälle numero
console.log("Numero on " + haeNumero(luettelo));
