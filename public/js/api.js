// var BASE_URL = "https://readerapi.codepolitan.com/";
var BASE_URL = "https://api.football-data.org/v2/";
var API_KEY = "56e0ea311d714bfa9a6e1b1ce934dd62";
const LEAGUE_ID = 2021;
const ENDPOINT_COMPETITION = `${BASE_URL}competitions/${LEAGUE_ID}/standings`;

// Blok kode yang akan di panggil jika fetch berhasil
function status(response) {
  if (response.status !== 200) {
    console.log("Error : " + response.status);
    // Method reject() akan membuat blok catch terpanggil
    return Promise.reject(new Error(response.statusText));
  } else {
    // Mengubah suatu objek menjadi Promise agar bisa "di-then-kan"
    return Promise.resolve(response);
  }
}

// Blok kode untuk memparsing json menjadi array JavaScript
function json(response) {
  return response.json();
}

// Blok kode untuk meng-handle kesalahan di blok catch
function error(error) {
  // Parameter error berasal dari Promise.reject()
  console.log("Error : " + error);
}

// Blok kode untuk melakukan request data json
const fetchAPI = url => {
  return fetch(url, {
      headers: {
          'X-Auth-Token': API_KEY
      }
  })
      .then(res => {
          if (res.status !== 200) {
              console.log("Error: " + res.status);
              return Promise.reject(new Error(res.statusText))
          } else {
              return Promise.resolve(res)
          }
      })
      .then(res => res.json())
      .catch(err => {
          console.log(err)
      })
};

function getAllStandings() {
  if ("caches" in window) {
      caches.match(ENDPOINT_COMPETITION).then(function (response) {
          if (response) {
              response.json().then(function (data) {
                  console.log("Competition Data: " + data);
                  showStanding(data);
              })
          }
      })
  }

  fetchAPI(ENDPOINT_COMPETITION)
      .then(data => {
          showStanding(data);
      })
      .catch(error => {
          console.log(error)
      })
}

function showStanding(data) {
  let standings = "";
  let standingElement =  document.getElementById("homeStandings");

  data.standings[0].table.forEach(function (standing) {
      standings += `
              <tr>
                  <td><img src="${standing.team.crestUrl.replace(/^http:\/\//i, 'https://')}" width="30px" alt="badge"/></td>
                  <td><a href="./tim.html?id=${standing.team.id}">${standing.team.name}</a></td>
                  <td>${standing.won}</td>
                  <td>${standing.draw}</td>
                  <td>${standing.lost}</td>
                  <td>${standing.points}</td>
                  <td>${standing.goalsFor}</td>
                  <td>${standing.goalsAgainst}</td>
                  <td>${standing.goalDifference}</td>
              </tr>
      `;
  });

   standingElement.innerHTML = `
              <div class="card" style="padding-left: 24px; padding-right: 24px; margin-top: 30px;">

              <table class="striped responsive-table">
                  <thead>
                      <tr>
                          <th></th>
                          <th>Team Name</th>
                          <th>W</th>
                          <th>D</th>
                          <th>L</th>
                          <th>P</th>
                          <th>GF</th>
                          <th>GA</th>
                          <th>GD</th>
                      </tr>
                   </thead>
                  <tbody id="standings">
                      ${standings}
                  </tbody>
              </table>
              
              </div>
  `;
}

// Blok kode untuk melakukan request data json
function getTeam() {
  if ("caches" in window) {
    caches
      .match(BASE_URL + "teams/", {
        headers: {
          "X-Auth-Token": API_KEY,
        },
      })
      .then((response) => {
        if (response) {
          response.json().then((data) => {
            var teamsArticle = "";
            data.teams.forEach((team) => {
              teamsArticle += `
              <div class="col s12 m6" >
              <div>
              <div class="card">
                <div class="card-image">
                  <img src="${team.crestUrl}">
                  <a href="./tim.html?id=${team.id}" class="btn-floating halfway-fab waves-effect waves-light red"><i class="material-icons">directions</i></a>
                  </div>
                  <div class="card-content blue lighten-2">
                  <span class="card-title black-text"><b>${team.name}</b></span>
                  <p>address : <b>${team.address}</p></b>
                  <p>phone : <b>${team.phone}</p></b>
                  <p>website : <b>${team.website}</p></b>
                  <p>email : <b>${team.email}</p></b>
                  <p>clubColors : <b>${team.clubColors}</p></b>
                  <p>venue : <b>${team.venue}</p></b>
                  <span></span>
                </div>
              </div>
                </div>
                </div>
                  `;
            });
            document.getElementById("teamPage").innerHTML = teamsArticle;

            // Sisipkan komponen card ke dalam elemen dengan id #content
          });
        }
      });
  }

  fetch(BASE_URL + "teams/", {
    headers: {
      "X-Auth-Token": API_KEY,
    },
  })
    .then(status)
    .then(json)
    .then((data) => {
      // Objek/array JavaScript dari response.json() masuk lewat data.
      // Menyusun komponen card artikel secara dinamis
      var teamsArticle = "";

      data.teams.forEach((team) => {
        console.log("TEAM", team);
        teamsArticle += `
        <div class="col s12 m6 " >
          <div>
          <div class="card">
            <div class="card-image">
              <img src="${team.crestUrl}">
              <a href="./tim.html?id=${team.id}" class="btn-floating halfway-fab waves-effect waves-light red"><i class="material-icons">directions</i></a>
              </div>
              <div class="card-content blue lighten-2">
              <span class="card-title black-text"><b>${team.name}</b></span>
              <p>address : <b>${team.address}</p></b>
              <p>phone : <b>${team.phone}</p></b>
              <p>website : <b>${team.website}</p></b>
              <p>email : <b>${team.email}</p></b>
              <p>clubColors : <b>${team.clubColors}</p></b>
              <p>venue : <b>${team.venue}</p></b>
            </div>
          </div>
            </div>
        </div>
        
        `;
      });
      document.getElementById("teamPage").innerHTML = teamsArticle;
    })
    .catch((error) => {
      console.log("Error : ", error);
    });
}

function getTeamById() {
  return new Promise(function (resolve, reject) {
    // Ambil nilai query parameter (?id=)
    var urlParams = new URLSearchParams(window.location.search);

    var idParam = urlParams.get("id");

    if ("caches" in window) {
      caches
        .match(BASE_URL + "teams/" + idParam, {
          headers: {
            "X-Auth-Token": API_KEY,
          },
        })
        .then((response) => {
          if (response) {
            response.json().then((team) => {
              let articleHTML = `
              <div class="card">
                  <div class="card-image">
                    <img src="${team.crestUrl}">
                    
                    </div>
                    <div class="card-content blue lighten-2">
                    <span class="card-title black-text center"><b>${team.name}</b></span>
                    <p>address : <b>${team.address}</p></b>
                    <p>phone : <b>${team.phone}</p></b>
                    <p>website : <b>${team.website}</p></b>
                    <p>email : <b>${team.email}</p></b>
                    <p>clubColors : <b>${team.clubColors}</p></b>
                    <p>venue : <b>${team.venue}</p></b>
                  </div>
                </div>
          `;
              // Kirim objek data hasil parsing json agar bisa disimpan ke indexed db
              document.getElementById("body-content").innerHTML = articleHTML;

              resolve(team);
            });
          }
        });
    }

    fetch(BASE_URL + "teams/" + idParam, {
      headers: {
        "X-Auth-Token": API_KEY,
      },
    })
      .then(status)
      .then(json)
      .then((team) => {
        // Objek JavaScript dari response.json() masuk lewat variabel data.
        console.log("Team", team);

        // Menyusun komponen card artikel secara dinamis
        var articleHTML = `
        <div class="card">
          <div class="card-image">
            <img src="${team.crestUrl}">
          </div>
          <div class="card-content blue lighten-2">
          <span class="card-title black-text center"><b>${team.name}</b></span>
            <p>address : <b>${team.address}</p></b>
            <p>phone : <b>${team.phone}</p></b>
            <p>website : <b>${team.website}</p></b>
            <p>email : <b>${team.email}</p></b>
            <p>clubColors : <b>${team.clubColors}</p></b>
            <p>venue : <b>${team.venue}</p></b>
          </div>
        </div>
        `;

        document.getElementById("body-content").innerHTML = articleHTML;

        // Kirim objek data hasil parsing json agar bisa disimpan ke indexed db
        resolve(team);
      });
  });
}

function getAll() {
  return new Promise(function (resolve, reject) {
    dbPromised
      .then((db) => {
        var tx = db.transaction("articles", "readonly");
        var store = tx.objectStore("articles");
        return store.getAll();
      })
      .then((articles) => {
        resolve(articles);
      });
  });
}

function getSavedTeams() {
  getAll().then((articles) => {
    console.log(articles);
    // Menyusun komponen card artikel secara dinamis
    var articlesHTML = "";
    articles.forEach((team) => {
      articlesHTML += `
      <div class="card">
      <div class="card-image">
        <img src="${team.crestUrl}">
      </div>
      <div class="card-content blue lighten-2">
      <a href="#" id="deleteSaved" onclick="deleteSaved(${team.id})" class="btn-floating halfway-fab waves-effect waves-light red"><i class="material-icons">delete</i></a>
      <span class="card-title black-text center"><b>${team.name}</b></span>
        <p>address : <b>${team.address}</p></b>
        <p>phone : <b>${team.phone}</p></b>
        <p>website : <b>${team.website}</p></b>
        <p>email : <b>${team.email}</p></b>
        <p>clubColors : <b>${team.clubColors}</p></b>
        <p>venue : <b>${team.venue}</p></b>
      </div>
    </div>
                `;
    });
    // Sisipkan komponen card ke dalam elemen dengan id #body-content
    document.getElementById("body-content").innerHTML = articlesHTML;
  });
}

function loadPage(page) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4) {
      var content = document.querySelector("#body-content");

      // tambahkan blok if berikut
      if (page === "home") {
        getCompetition();
      } else if (page === "saved") {
        getSavedTeams();
      } else if (page === "team") {
        getTeam();
      }
      // ---
      if (this.status == 200) {
        content.innerHTML = xhttp.responseText;
      } else if (this.status == 404) {
        content.innerHTML = "<p>Halaman tidak ditemukan.</p>";
      } else {
        content.innerHTML = "<p>Ups.. halaman tidak dapat diakses.</p>";
      }
    }
  };
  xhttp.open("GET", "pages/" + page + ".html", true);
  xhttp.send();
}

function getById(id) {
  return new Promise(function (resolve, reject) {
    dbPromised
      .then((db) => {
        var tx = db.transaction("articles", "readonly");
        var store = tx.objectStore("articles");
        return store.get(id);
      })
      .then((team) => {
        resolve(team);
      });
  });
}

function getSavedTeamById() {
  var urlParams = new URLSearchParams(window.location.search);
  var idParam = urlParams.get("id");

  getById(idParam).then((team) => {
    articleHTML = "";
    var articleHTML = `
    <div class="card">
      <div class="card-image">
        <img src="${team.crestUrl}">
      </div>
      <div class="card-content blue lighten-2">
      <span class="card-title black-text center"><b>${team.name}</b></span>
      <a href="#" id="deleteSaved" onclick="deleteSaved(${team.id})" class="btn-floating halfway-fab waves-effect waves-light red"><i class="material-icons">delete</i></a>
        <p>address : <b>${team.address}</p></b>
        <p>phone : <b>${team.phone}</p></b>
        <p>website : <b>${team.website}</p></b>
        <p>email : <b>${team.email}</p></b>
        <p>clubColors : <b>${team.clubColors}</p></b>
        <p>venue : <b>${team.venue}</p></b>
      </div>
    </div>
  `;
    // Sisipkan komponen card ke dalam elemen dengan id #content
    document.getElementById("body-content").innerHTML = articleHTML;
  });
}
