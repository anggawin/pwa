// REGISTER SERVICE WORKER
if ("serviceWorker" in navigator) {
  window.addEventListener("load", function () {
    navigator.serviceWorker
      .register("/service-worker.js")
      .then(function () {
        console.log("Pendaftaran ServiceWorker berhasil");
      })
      .catch(function () {
        console.log("Pendaftaran ServiceWorker gagal");
      });
  });
} else {
  console.log("ServiceWorker belum didukung browser ini.");
}

///////////NOTIFICATION

// Periksa service worker
if (!("serviceWorker" in navigator)) {
  console.log("Service worker tidak didukung browser ini.");
} else {
  registerServiceWorker();
}

// Register service worker
function registerServiceWorker() {
  return navigator.serviceWorker
    .register("service-worker.js")
    .then((registration) => {
      console.log("Registrasi service worker berhasil.");
      return registration;
    })
    .catch((err) => {
      console.error("Registrasi service worker gagal.", err);
    });
}

// Periksa fitur Notification API
if ("Notification" in window) {
  requestPermission();
} else {
  console.error("Browser tidak mendukung notifikasi.");
}

// Meminta ijin menggunakan Notification API
function requestPermission() {
  Notification.requestPermission().then((result) => {
    if (result === "denied") {
      console.log("Fitur notifikasi tidak diijinkan.");
      return;
    } else if (result === "default") {
      console.error("Pengguna menutup kotak dialog permintaan ijin.");
      return;
    }

    console.log("Fitur notifikasi diijinkan.");
  });
}
