var encodeURL = function (str) {
    var encoded = encodeURIComponent(str).replace(/[!'()]/g, escape).replace(/\*/g, "%2A");
    if (encoded.length) {
        return encoded;
    } else {
        return false;
    }
},

decodeURL = function (str) {
    var decoded = decodeURIComponent(str.replace(/\+/g, " "));
    if (decoded.length) {
        return decoded;
    } else {
        return false;
    }
},

utf8_to_b64 = function (str) {
    var encoded = window.btoa(unescape(encodeURIComponent(str)));
    if (encoded.length) {
        return encoded;
    } else {
        return false;
    }
},

b64_to_utf8 = function (str) {
    var encoded = decodeURIComponent(escape(window.atob(str)));
    if (encoded.length) {
        return encoded;
    } else {
        return false;
    }
},

asciiashex = function (str) {
  var encoded = "";
  for (i = 0; i < str.length; i = i + 1) {
    encoded = encoded + str.charCodeAt(i).toString(16);
  }
  return encoded;
},

hexasascii = function (str) {
  var encoded = "";
  for (i = 0; i < str.length; i = i + 2) {
      encoded = encoded + String.fromCharCode(parseInt(str.substr(i, 2), 16));
  }
  return encoded;
},

asHref = function (str) {
    var dummylink = document.createElement('a');
    dummylink.href = str;
    return dummylink;
},

framesetter = function () {
    var in_links = $('#in_links'),
        out_links = $('#out_links'),
        imaul = document.createElement('ul'),
        frameset_host = "http://blackboard.qut.edu.au",
        frameset_path = "/webapps/portal/frameset.jsp?url=";

    // clear last run
    out_links.find('ul').remove();
    out_links.append(imaul);

    // iterate each line
    $.each(in_links.val().split('\n'), function (i, str) {
        var href = asHref(str),
            encoded_mess = encodeURL(href.pathname + href.search + href.hash),
            newlink = document.createElement("a"),
            imali = document.createElement("li");

        // write out the a
        newlink.href = frameset_host + frameset_path + encoded_mess;
        newlink.innerHTML = frameset_path + encoded_mess;
        newlink.target = "_blank";

        // dump it in a list and add it to the div
        $(imali).append(newlink);
        $('#out_links > ul').append(imali);
    });
},

URLEncode = function () {
    var result = $('#dumpbox').val(encodeURL($('#dumpbox').val()));
},

URLDecode = function () {
    var result = $('#dumpbox').val(decodeURL($('#dumpbox').val()));
},

Base64Encode = function () {
    var result = $('#dumpbox').val(utf8_to_b64($('#dumpbox').val()));
},

Base64Decode = function () {
    var result = $('#dumpbox').val(b64_to_utf8($('#dumpbox').val()));
},

ascii2hex = function() {
    var result = $('#dumpbox').val(asciiashex($('#dumpbox').val()));
},

hex2ascii = function() {
    var result = $('#dumpbox').val(hexasascii($('#dumpbox').val()));
};

$('#magicbutton').click(framesetter);
$('#URLEncode').click(URLEncode);
$('#URLDecode').click(URLDecode);
$('#Base64Encode').click(Base64Encode);
$('#Base64Decode').click(Base64Decode);
$('#ascii2hex').click(ascii2hex);
$('#hex2ascii').click(hex2ascii);