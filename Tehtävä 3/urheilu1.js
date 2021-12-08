
class Henkilo {

   constructor(etuNimi, sukuNimi, kutsumaNimi, syntVuosi){
        this.etuNimi = etuNimi;
        this.sukuNimi = sukuNimi;
        this.kutsumaNimi = kutsumaNimi;
        this.syntVuosi = syntVuosi;
   }
}

class Urheilija extends Henkilo {

    constructor(etuNimi, sukuNimi, kutsumaNimi, syntVuosi, linkkiKuva, paino, laji, saavutukset) {
        super(etuNimi, sukuNimi, kutsumaNimi,syntVuosi);
        this.linkkiKuva = linkkiKuva;
        this.paino = paino;
        this.laji = laji;
        this.saavutukset = saavutukset;
    }

    // GETTERIT
    get getetuNimi(){return this.etuNimi;}

    get getsukuNimi(){return this.sukuNimi;}

    get getkutsumaNimi(){return this.kutsumaNimi;}

    get getsyntVuosi(){return this.syntVuosi;}

    get getlinkkiKuva(){return this.linkkiKuva;}

    get getpaino(){return this.paino;}

    get getlaji(){return this.laji;}

    get getsaavutukset(){return this.saavutukset;}

    // SETTERIT

    set setetuNimi(uusiEtunimi){this.etuNimi = uusiEtunimi;}

    set setsukuNimi(uusiSukunimi){this.sukuNimi = uusiSukunimi;}
    
    set setkutsumaNimi(uusiKutsumanimi){this.kutsumaNimi = uusiKutsumanimi;}

    set setsyntVuosi(uusiSyntvuosi){this.syntVuosi = uusiSyntvuosi;}

    set setlinkkiKuva(uusiLinkki){this.linkkiKuva = uusiLinkki;}

    set setpaino(uusiPaino){this.paino = uusiPaino;}

    set setlaji(uusiLaji){this.laji = uusiLaji;}

    set setsaavutukset(uusiSaavutukset){this.saavutukset = uusiSaavutukset;}
}

// Luodaan uusi urheilija näillä tiedoilla
const ekaUrheilija = new Urheilija("Mikael", "Kosola", "Nipa", 1982, "Linkki tähän", 92, "Keihäänheitto", "Olympiavoittaja 2021");
// Printataan get saavutukset
console.log("Urheilijan saavutusket olivat: " + ekaUrheilija.getsaavutukset);