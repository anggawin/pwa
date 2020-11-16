var webPush = require('web-push');
     
const vapidKeys = {
   "publicKey": "BJNOBi3PoeS83lsN_B1vHrZ_Z_WX7Jmj6-OJK9ysc5ViImCbzAIeMhKgx_rN-EvN43cm1hzOyCG6Qdoy1SUPR5w",
   "privateKey": "J0_ZKtYr9q9tpiZBjOONixAgmXg2qXMmliAhlBQAqfk"
};
 
 
webPush.setVapidDetails(
   'mailto:anggawinz55@gmail.com',
   vapidKeys.publicKey,
   vapidKeys.privateKey
)
var pushSubscription = {
   "endpoint": "https://fcm.googleapis.com/fcm/send/fS6gq7HHkzU:APA91bHZHwM9WYrOUmqJ9KGs95phfcRMMCcOpBXe3F6jn4hUFiiKp1AEN8I7-P5WfqZxNLVnFcBmK5Kh7CY9WL2Fk3QjmZkHYlJDpdINAUAc9GcI7F-mXFbSrZYQY4tfUBfK7lsHhFzS",
   "keys": {
       "p256dh": "BM04bj+CQZ9cHk1D3Z1N1xlR6SH4jJgL7+1PVlMaVv3CDE8iPf2ODyjVr+2pEB7uX8Kh6CkPWvHyp8X8lhicx2I=",
       "auth": "INwhhRDn7ClGuB/IaZSecQ=="
   }
};
var payload = 'Selamat! Aplikasi Anda sudah dapat menerima push notifikasi!';
 
var options = {
   gcmAPIKey: '948598636201',
   TTL: 60
};
webPush.sendNotification(
   pushSubscription,
   payload,
   options
);