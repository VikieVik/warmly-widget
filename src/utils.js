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

export { readCookie, createCookie };
