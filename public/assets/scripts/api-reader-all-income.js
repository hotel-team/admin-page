var xmlhttp5 = new XMLHttpRequest();
var url5 = "http://localhost:3005/admin/api/dochod_all";
xmlhttp5.onreadystatechange = function() {
    if (xmlhttp5.readyState == 4 && xmlhttp5.status == 200) {
        var myArr5 = JSON.parse(xmlhttp5.responseText);
        var dochod_all = myArr5[0].dochod_all;

    console.log(dochod_all);
    document.getElementById('dochod_all').innerHTML += dochod_all + 'zł';
    }
};

xmlhttp5.open("GET", url5, true);
xmlhttp5.send();