import "./App.css";
import { useState } from "react";
import Axios from "axios";

function App() {
  const [etunimi, setEtunimi] = useState("");
  const [sukunimi, setSukunimi] = useState("");
  const [kutsumanimi, setKutsumanimi] = useState("");
  const [syntymävuosi, setSyntymävuosi] = useState("");
  const [paino, setPaino] = useState(0);
  const [linkki, setLinkki] = useState("");
  const [laji, setLaji] = useState("");
  const [saavutukset, setSaavutukset] = useState("");

  const [uusiSaavutus, setUusiSaavutus] = useState("");

  const [urheilijaLista, setUrheilijaLista] = useState([]);
  // Lisätään uusi urheilija
  const uusiUrheilija = () => {
    Axios.post("http://localhost:3001/uusi", {
      etunimi: etunimi,
      sukunimi: sukunimi,
      kutsumanimi: kutsumanimi,
      syntymävuosi: syntymävuosi,
      paino: paino,
      linkki: linkki,
      laji: laji,
      saavutukset: saavutukset,
    }).then(() => {
      setUrheilijaLista([
        ...urheilijaLista,
        {
          etunimi: etunimi,
          sukunimi: sukunimi,
          kutsumanimi: kutsumanimi,
          syntymävuosi: syntymävuosi,
          paino: paino,
          linkki: linkki,
          laji: laji,
          saavutukset: saavutukset,
        },
      ]);
    });
  };
  // Näytetään kaikki urheilijat
  const getUrheilijat = () => {
    Axios.get("http://localhost:3001/urheilijat").then((response) => {
      setUrheilijaLista(response.data);
    });
  };
  // Voidaan päivittää urheilijan saavutuksia
  const updateSaavutus = (id) => {
    Axios.put("http://localhost:3001/update", {
      saavutukset: uusiSaavutus,
      id: id,
    }).then((response) => {
      setUrheilijaLista(
        urheilijaLista.map((val) => {
          return val.id === id
            ? {
                id: val.id,
                etunimi: val.etunimi,
                sukunimi: val.sukunimi,
                kutsumanimi: val.kutsumanimi,
                syntymävuosi: val.syntymävuosi,
                paino: val.paino,
                linkki: val.linkki,
                laji: val.laji,
                saavutukset: uusiSaavutus,
              }
            : val;
        })
      );
    });
  };
  // Poistetaan urheilija tietyllä id:llä
  const deleteUrheilija = (id) => {
    Axios.delete(`http://localhost:3001/delete/${id}`).then((response) => {
      setUrheilijaLista(
        urheilijaLista.filter((val) => {
          return val.id !== id;
        })
      );
    });
  };
  // Kaikki tekstikentät tiedon lisäämiseksi
  return (
    <div className="App">
      <div className="information">
        <label>Etunimi:</label>
        <input
          type="text"
          onChange={(event) => {
            setEtunimi(event.target.value);
          }}
        />
        <label>Sukunimi:</label>
        <input
          type="text"
          onChange={(event) => {
            setSukunimi(event.target.value);
          }}
        />
        <label>Kutsumanimi:</label>
        <input
          type="text"
          onChange={(event) => {
            setKutsumanimi(event.target.value);
          }}
        />
        <label>Syntymäaika:</label>
        <input
          type="text"
          onChange={(event) => {
            setSyntymävuosi(event.target.value);
          }}
        />
        <label>Paino:</label>
        <input
          type="number"
          onChange={(event) => {
            setPaino(event.target.value);
          }}
        />
        <label>Linkki profiiliin:</label>
        <input
          type="text"
          onChange={(event) => {
            setLinkki(event.target.value);
          }}
        />
        <label>Laji:</label>
        <input
          type="text"
          onChange={(event) => {
            setLaji(event.target.value);
          }}
        />
        <label>Saavutukset: </label>
        <input
          type="text"
          onChange={(event) => {
            setSaavutukset(event.target.value);
          }}
        />
        <button onClick={uusiUrheilija}>Lisää uusi urheilija</button>
      </div>
      <div className="urheilijat">
        <button onClick={getUrheilijat}>Näytä urheilijat</button>

        {urheilijaLista.map((val, key) => {
          return (
            <div className="urheilija">
              <div>
                <h3>Etunimi: {val.etunimi}</h3>
                <h3>Sukunimi: {val.sukunimi}</h3>
                <h3>Kutsumanimi: {val.kutsumanimi}</h3>
                <h3>Syntymäaika: {val.syntymävuosi}</h3>
                <h3>Paino: {val.paino}</h3>
                <h3>Linkki: {val.linkki}</h3>
                <h3>Laji: {val.laji}</h3>
                <h3>Saavutukset: {val.saavutukset}</h3>
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Muokkaa saavutuksia"
                  onChange={(event) => {
                    setUusiSaavutus(event.target.value);
                  }}
                />
                <button
                  onClick={() => {
                    updateSaavutus(val.id);
                  }}
                >
                  {" "}
                  Päivitä saavutukset
                </button>

                <button
                  onClick={() => {
                    deleteUrheilija(val.id);
                  }}
                >
                  Poista urheilija
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
