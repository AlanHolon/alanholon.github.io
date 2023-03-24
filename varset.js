var server_address = "http://localhost:8080/";
const df = new Date(2022, 11, 15, 11, 43, 0, 0);

function msg(x) {
    document.getElementById("r_feedback").innerHTML = x;
}

function disp(x) {
    document.getElementById("display").innerHTML = x;
}

function qst(x) {
    document.getElementById("qst").innerHTML = x;
}