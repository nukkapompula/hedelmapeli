var saldo = 50;
var panos = 0;
var eraKaksi = false;
var lukittu1 = false;
var lukittu2 = false;
var lukittu3 = false;
var lukittu4 = false;
var otsikko = document.getElementById("otsikko");

document.getElementById("lompakko").innerHTML = `Lompakostasi löytyy rahaa ${saldo}€.`;
document.getElementById("lukitse1").addEventListener("click", lukitse1);

function pelaa(){
    panos = document.getElementById("panoksesi").value;
    if(panos < 1 || panos > saldo){
        otsikko.innerHTML = "Ole hyvä ja aseta kelvollinen panos."
        document.getElementById("panoksesi").value = 1;
    } else {
        otsikko.innerHTML = "Oikein hyvä!"
    }
}

function lukitse1(){
    if(lukittu1 == true){
        document.getElementsByClassName("rullakuvake")[0].style.border = "none";
        lukittu1 = false;
    } else if(eraKaksi == true){
        document.getElementsByClassName("rullakuvake")[0].style.border = "2px solid blue";
        lukittu1 = true;
    }
}