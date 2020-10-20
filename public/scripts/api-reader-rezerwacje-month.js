var xmlhttp2 = new XMLHttpRequest();
var url2 = "http://localhost:3001/admin/api/rezerwacje_month";
xmlhttp2.onreadystatechange = function() {
    if (xmlhttp2.readyState == 4 && xmlhttp2.status == 200) {
        var myArr2 = JSON.parse(xmlhttp2.responseText);
        var ile = myArr2[0].ile;

    console.log(ile);
    document.getElementById('month_rezerwacje').innerHTML += `${ile}`;
    }
};

xmlhttp2.open("GET", url2, true);
xmlhttp2.send();