var xmlhttp4 = new XMLHttpRequest();
var url4 = "http://localhost:3005/admin/api/all_rezerwacje";
xmlhttp4.onreadystatechange = function() {
    if (xmlhttp4.readyState == 4 && xmlhttp4.status == 200) {
        var myArr4 = JSON.parse(xmlhttp4.responseText);
        var all_rezerwacje = myArr4[0].all_rezerwacje;

    console.log(free_rooms);
    document.getElementById('all_rezerwacje').innerHTML += `${all_rezerwacje}`;
    }
};

xmlhttp4.open("GET", url4, true);
xmlhttp4.send();