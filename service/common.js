/*
* @Author: derek
* @Date:   2017-02-28 17:44:01
* @Last Modified by:   Derek
* @Last Modified time: 2017-03-22 16:13:59
*/

export default{
  base64 (input) {
    let $this=this;
    let output = "";
    let chr1, chr2, chr3, enc1, enc2, enc3, enc4;
    let i = 0;
    input = $this._utf8_encode(input);
    while (i < input.length) {
        chr1 = input.charCodeAt(i++);
        chr2 = input.charCodeAt(i++);
        chr3 = input.charCodeAt(i++);
        enc1 = chr1 >> 2;
        enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
        enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
        enc4 = chr3 & 63;
        if (isNaN(chr2)) {
            enc3 = enc4 = 64;
        } else if (isNaN(chr3)) {
            enc4 = 64;
        }
        let keystr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="
        output = output +
            keystr.charAt(enc1) + keystr.charAt(enc2) +
            keystr.charAt(enc3) + keystr.charAt(enc4);
    }
    return output;
  },
  _utf8_encode (string) {
      let $this=this;
      string = string.replace(/\r\n/g,"\n");
      let utftext = "";
      for (let n = 0; n < string.length; n++) {
          let c = string.charCodeAt(n);
          if (c < 128) {
              utftext += String.fromCharCode(c);
          } else if((c > 127) && (c < 2048)) {
              utftext += String.fromCharCode((c >> 6) | 192);
              utftext += String.fromCharCode((c & 63) | 128);
          } else {
              utftext += String.fromCharCode((c >> 12) | 224);
              utftext += String.fromCharCode(((c >> 6) & 63) | 128);
              utftext += String.fromCharCode((c & 63) | 128);
          }

      }
      return utftext;
  }
}
