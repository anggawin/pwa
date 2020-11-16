var dbPromised = idb.open("football", 1, function (upgradeDb) {
  var articlesObjectStore = upgradeDb.createObjectStore("articles", {
    keyPath: "id",
  });
  articlesObjectStore.createIndex("name", "name", {
    unique: false,
  });
});

function saveForLater(detailTeam) {
  dbPromised
    .then((db) => {
      var tx = db.transaction("articles", "readwrite");
      var store = tx.objectStore("articles");
      store.put(detailTeam);
      return tx.complete;
    })
    .then(() => {
      console.log("Artikel berhasil di simpan.");
    });
}

function deleteSaved(id) {
  dbPromised
    .then(function (db) {
      var tx = db.transaction("articles", "readwrite");
      var store = tx.objectStore("articles");
      store.delete(id);
      return tx.complete;
    })
    .then(function () {
      M.toast({ html: "Item Detail ini akan dihapus" });
      console.log("Item deleted");
      location.reload();
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
      .then((teams) => {
        resolve(teams);
      });
  });
}

function getSavedTeams() {
  getAll().then((team) => {
    console.log(team);

    // Menyusun komponen card artikel secara dinamis
    var articlesHTML = "";
    team.forEach((team) => {
      articlesHTML += `
      <div class="col s12 m6" >
        <div class="card">
          <div class="card-image">
            <img src="${team.crestUrl}">
            <a href="#saved" id="deleteSaved" onclick="deleteSaved(${team.id})" class=" btn-floating halfway-fab waves-effect waves-light red"><i class="material-icons">delete</i></a>
            </div>
            <div class="card-content blue lighten-2">
            <span class="card-title black-text">${team.name}</span>
            <p>address : <b>${team.address}</p></b>
            <p>phone : <b>${team.phone}</p></b>
            <p>website : <b>${team.website}</p></b>
            <p>email : <b>${team.email}</p></b>
            <p>clubColors : <b>${team.clubColors}</p></b>
            <p>venue : <b>${team.venue}</p></b>
          </div>
        </div>
      </div>
                `;
    });
    // Sisipkan komponen card ke dalam elemen dengan id #body-content
    document.getElementById("saveTim").innerHTML = articlesHTML;
  });
}
