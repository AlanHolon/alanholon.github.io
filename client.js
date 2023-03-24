var xhttp = new XMLHttpRequest();
var isLogged = false;
var isSending = false;
var pin = 0;
var sq = "";
var sqdim = "";
var sqcol = "";
var sqemo = "";
var anlen = 0;
var id = null;

xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        let r_echo = this.responseText.split(":")[0];
        let r_info = this.responseText.split(":")[1].split("-");
        document.getElementById("r_feedback").innerHTML = r_echo;
        if (r_echo == "logout" || r_echo == "login fallito") {
            isLogged = false;
            pin = 0;
            document.getElementById("infos").innerHTML = "Inserisci il PIN";
            document.getElementsByClassName("numbers")[0].style.backgroundColor = "darkblue";
            document.getElementsByClassName("qst")[0].style.backgroundColor = "darkblue";
            document.getElementById("logo").innerHTML = "";
        }
        else if (r_echo == "login") {
            isLogged = true;
            pin = parseInt(r_info[0]);
            sq = r_info[1];
            sqdim = r_info[2];
            sqcol = r_info[3];
            sqemo = r_info[4];
            anlen = parseInt(r_info[5]);
            document.getElementById("infos").innerHTML = sq;
            document.getElementsByClassName("numbers")[0].style.backgroundColor = sqcol;
            document.getElementsByClassName("qst")[0].style.backgroundColor = sqcol;
            document.getElementById("logo").innerHTML = sqemo + " " + sqdim;
        }
    }
};

function invia(x,m){
    xhttp.open("POST", x, true);
    xhttp.send(m);
}

function login(x){
    invia(x,"l:"+document.getElementById("display").innerHTML);
}

function conferma(x){
    document.getElementById("annulla").style.visibility = "hidden";
    invia(x,"r:"+pin+"-"+document.getElementById("qst").innerHTML+"-"+document.getElementById("display").innerHTML);
    delnum();
}

function inviarisp(x){
    document.getElementById("annulla").style.visibility = "visible";
    clearTimeout(id);
    isSending = true;
    id = setTimeout(() => {conferma(x); isSending = false;}, 10000);
}

function annulla(){
    clearTimeout(id);
    isSending = false;
    document.getElementById("annulla").style.visibility = "hidden";
    document.getElementById("r_feedback").innerHTML = "Invio annullato";
}

function vai(x){
    if (isLogged) {
        if (isSending) {annulla();}
        else {inviarisp(x);}
    }
    else {login(x); delnum();}
}

function dispnum(x){
    if (!isSending) {
        if (document.getElementById("display").innerHTML != "0") {
            document.getElementById("display").innerHTML += x;}
        else {
            document.getElementById("display").innerHTML = x;
        }    
    }
}

function delnum(){
    if (!isSending) {document.getElementById("display").innerHTML = "0";}
}

document.addEventListener("keydown", function(event) {
    if (event.code[0] == "D") {dispnum(event.key);}
    else if (event.key == "Backspace") {delnum();}
    else if (event.key == "ArrowUp" || event.key == "ArrowRight") {qstup();}
    else if (event.key == "ArrowDown" || event.key == "ArrowLeft") {qstdn();}
    else if (event.key == "Enter") {event.preventDefault(); vai(server_address);}
});

function qstup(){
    document.getElementById("qst").innerHTML = parseInt(document.getElementById("qst").innerHTML)+1;
}

function qstdn(){
    document.getElementById("qst").innerHTML = parseInt(document.getElementById("qst").innerHTML)-1;
}