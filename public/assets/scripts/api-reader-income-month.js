var xmlhttp = new XMLHttpRequest();
var url = "http://localhost:3005/admin/api/income_month";
 
xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        var myArr = JSON.parse(xmlhttp.responseText);
        var kwota = myArr[0].kwota;

    console.log(kwota);
    document.getElementById('income').innerHTML += kwota + 'zł';
    }
};

xmlhttp.open("GET", url, true);
xmlhttp.send();
