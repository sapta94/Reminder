var endpoint;
var key;
var authSecret;

// We need to convert the VAPID key to a base64 string when we subscribe
function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, '+')
    .replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

function determineAppServerKey() {
  var vapidPublicKey = 'BKHIFU_YM1ql6Mlb9j83jmR_zKd3JK7QS1UmOo_BMpOP1PSPRLvuLJnbpFEEDDhTWhtXjYbRfIhXrf9B_YdOrjY';
  return urlBase64ToUint8Array(vapidPublicKey);
}

export default function registerServiceWorker() {
  if('serviceWorker' in navigator) {
      navigator.serviceWorker.register(`${process.env.PUBLIC_URL}\sw.js`).then(function(register){
          console.log("worked", register)
      return register.pushManager.getSubscription()
        .then(function(subscription) {

            if (subscription) {
              // We already have a subscription, let's not add them again
              return;
            }

            return register.pushManager.subscribe({
                userVisibleOnly: true,
                applicationServerKey: determineAppServerKey()
              })
              .then(function(subscription) {

                var rawKey = subscription.getKey ? subscription.getKey('p256dh') : '';
                key = rawKey ? btoa(String.fromCharCode.apply(null, new Uint8Array(rawKey))) : '';
                var rawAuthSecret = subscription.getKey ? subscription.getKey('auth') : '';
                authSecret = rawAuthSecret ?
                  btoa(String.fromCharCode.apply(null, new Uint8Array(rawAuthSecret))) : '';

                endpoint = subscription.endpoint;
                alert("came here")
                return fetch('http://localhost:3111/register', {
                  method: 'post',
                  headers: new Headers({
                    'content-type': 'application/json'
                  }),
                  body: JSON.stringify({
                    endpoint: subscription.endpoint,
                    key: key,
                    authSecret: authSecret,
                  }),
                })

              });
          });
      }).catch(function(err){
          console.log("Error",err)
      })
  }
}