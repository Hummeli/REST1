// Syote
var input = require("readline-sync");

// Kysytaan testattava sana
var sana = input.question("Anna sana testattava sana: ");
tarkistaPalindromi(sana);

// Tarkistetaan sanan muoto ja korjataan se sopivaksi
function tarkistaPalindromi(sana) {
  var testiSana = sana
    .replace(/[^0-9a-z]/gi, "") // Poistetaan kaikki väärät kirjaimet
    .toLowerCase() // Muutetaan pikkukirjaimiksi
    .split(""); // Jaetaan keskeltä kahtia

  // Tarkistetaan onko sanan molemmat osat samanlaisia
  for (var i = 0; i < testiSana.length / 2; i++) {
    if (testiSana[i] == testiSana[testiSana.length - i - 1]) {
      // Jos sana on palindromi ilmoittaa ohjelma asiasta ja palauttaa arvon true
      console.log("Tarkistettava sana " + sana + " on palindromi");
      return true;
    }
    // Jos sana ei ole palindromi ilmoittaa ohjelma asiasta ja palauttaa arvon false
    else console.log("Tarkistettava sana " + sana + " ei ole palindromi");
    return false;
  }
}
