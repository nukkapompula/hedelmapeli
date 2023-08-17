var saldo = 50;
var panos = 1;
var eraKaksi = false;

document.getElementById("lompakko").innerHTML = `Lompakostasi löytyy rahaa ${saldo}€.`;
document.getElementById("panoksesi").value = panos;
document.getElementById("lukitse1").addEventListener("click", lukitse1);

function lukitse1(){
    if(eraKaksi == true){
        document.getElementsByClassName("rullakuvake")[0].src = "tyhjarulla.gif";
    }
}