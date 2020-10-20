var xmlhttp3 = new XMLHttpRequest();
var url3 = "http://localhost:3001/admin/api/free_rooms";
xmlhttp3.onreadystatechange = function() {
    if (xmlhttp3.readyState == 4 && xmlhttp3.status == 200) {
        var myArr3 = JSON.parse(xmlhttp3.responseText);
        var free_rooms = myArr3[0].free_rooms;

    console.log(free_rooms);
    document.getElementById('free_rooms').innerHTML += `${free_rooms}`;
    }
};

xmlhttp3.open("GET", url3, true);
xmlhttp3.send();