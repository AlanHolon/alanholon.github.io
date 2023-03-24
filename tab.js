var xhttp = new XMLHttpRequest();
var isLogged = false;
var isSending = false;
var pin = 0;
var sq = [];
var sqdim = [];
var sqcol = [];
var sqemo = [];
var anlen = 0;
var sqlen = 1;

xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        let r_echo = this.responseText.split(":")[0];
        let r_info = "";
        if (r_echo == "s") {
            filltab(this.responseText.split(":")[1]);
        }
        else if (r_echo == "logout" || r_echo == "login fallito") {
            isLogged = false;
            document.getElementById("labelPIN").innerHTML = "PIN errato! Ritenta.";
            pin = 0;
        }
        else if (r_echo == "login") {
            isLogged = true;
            pin = document.getElementById("loginput").value;
            r_info = JSON.parse(this.responseText.split(":")[1]);
            for (let i in r_info) {
                r_info[i] = r_info[i].split("-");
            }
            setTimeout(() => {document.getElementById("login").style.visibility = "hidden";}, 3000);
            for (let i in r_info) {
                sq.push(r_info[i][0]);
                sqdim.push(r_info[i][1]);
                sqcol.push(r_info[i][2]);
                sqemo.push(r_info[i][3]);
            }
            document.getElementById("labelPIN").innerHTML = "Login effettuato";
            drawtab(r_info);
            document.documentElement.requestFullscreen();
            invia(server_address, "s:" + pin);
            setInterval(() => {
                invia(server_address, "s:" + pin);
            }, 20000);
        }
    }
};

function invia(x,m){
    xhttp.open("POST", x, true);
    xhttp.send(m);
}

function login(x){
    if (!isLogged) {invia(x,"t:"+document.getElementById("loginput").value);}
}

document.addEventListener("keydown", function(event) {
    if (event.key == "Enter" && !isLogged) {event.preventDefault(); login(server_address);}
    else if (event.key == "ArrowUp" || event.key == "ArrowRight") {speed += .01;}
    else if (event.key == "ArrowDown" || event.key == "ArrowLeft") {speed += -.01;}
});

function drawtab(x){
    sqlen = x.length;
    let model = document.getElementById("mid").innerHTML.repeat(x.length + 4);
    document.getElementById("mid").innerHTML = model;
    for (let i in x.concat(["","","",""])) {
        document.getElementsByClassName("nam")[i].innerHTML = sq[i % x.length];
        document.getElementsByClassName("ico")[i].innerHTML = sqemo[i % x.length];
        document.getElementsByClassName("circ")[i].innerHTML += sqdim[i % x.length];
        document.getElementsByClassName("circ")[i].style.borderColor = sqcol[i % x.length];
        document.getElementsByClassName("line")[i].style.backgroundColor = sqcol[i % x.length];
    }
}

function stato(x,y) {
    if (x == 4) {
        if (y < 4) {return "&#10068";}
        else if (y == 4) {return "&#9888";}
        else if (y == 5) {return "&#9940";}
    }
    else if (x == 0) {return "&#11088";}
    else if (x == 3) {return "&#129351";}
    else if (x == 2) {return "&#129352";}
    else if (x == 1) {return "&#129353";}
}

function errcont(x) {
    if (x < 5) {return "&#10060".repeat(x);}
    else {return "";}
}

function filltab(x) {
    let y = x.split(";");
    let z = y[0];
    let s = [y[1].split("-"), y[2].split("-"), y[3].split("-")];
    for (let i = 0; i < z.length + 96; i = i + 2) {
        document.getElementsByClassName("m")[i/2].innerHTML = stato(z[i % z.length],z[(i+1) % z.length]);
        document.getElementsByClassName("d")[i/2].innerHTML = errcont(z[(i+1) % z.length]);
    }
    for (let i = 1; i <= 3; i++) {
        document.getElementById("pn"+i).innerHTML = s[i-1][0];
        document.getElementById("pe"+i).innerHTML = s[i-1][1];
        document.getElementById("pp"+i).innerHTML = s[i-1][2];
    }
}