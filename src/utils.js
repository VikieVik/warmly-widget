// Function Definition: Check & return cookie and if unavailable returns null
/**
 * @param  {string} name coookie name
 */

function readCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == " ") c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}

// Function Definition: Create cookie @param1 = cookie name @param2 = cookie vale
/**
 * @param  {string} name coookie name
 * @param  {string} value cookie value
 * @param  {number} days retention period of cookie on days
 */
function createCookie(name, value, days) {
  if (days) {
    var date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    var expires = "; expires=" + date.toGMTString();
  } else var expires = "";
  let domain = window.location.hostname;
  document.cookie = name + "=" + value + expires + "; path=/; domain=" + domain;
}

// Function Definition: Returns cryotographically unique user ids
/** older version
    function generateUserId() {
      const typedArray = new Uint8Array(10);
      const randomValues = window.crypto.getRandomValues(typedArray);
      return randomValues.join("");
    }
     */
// RFC4122 version 4 compliant
function generateUUID() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export { readCookie, createCookie, generateUUID };
