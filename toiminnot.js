var saldo = 50;
var panos = 1;

document.getElementById("lompakko").innerHTML = `Lompakostasi löytyy rahaa ${saldo}€.`;
document.getElementById("panoksesi").value = panos;
document.getElementById("lukitse1").addEventListener("click", testi);

function testi(){
    document.getElementsByClassName("rullakuvake")[0].src = "rulla1.gif";
}