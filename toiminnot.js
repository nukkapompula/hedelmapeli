var saldo = 50;
var panos = 0;
var lukittu1 = false;
var lukittu2 = false;
var lukittu3 = false;
var lukittu4 = false;
var eraKaksi = false;
var otsikko = document.getElementById("otsikko");
var lompakko = document.getElementById("lompakko");

lompakko.innerHTML = `Lompakostasi löytyy rahaa ${saldo}€.`;
document.getElementById("lukitse1").addEventListener("click", lukitse1);

function pelaa(){
    // ensimmäinen pyöräytys
    if(eraKaksi == false){
        panos = document.getElementById("panoksesi").value;
        if(panos < 1 || panos > saldo){
            otsikko.innerHTML = "Ole hyvä ja aseta kelvollinen panos."
            document.getElementById("panoksesi").value = 1;
        } else {
            otsikko.innerHTML = "Oikein hyvä!"
            saldo -= panos;
            lompakko.innerHTML = `Lompakostasi löytyy rahaa ${saldo}€.`;
            for(indeksi=0; indeksi<4; indeksi++){
                let luku = Math.round(Math.random()*4);
                document.getElementsByClassName("rullakuvake")[indeksi].src = `rulla${luku}.gif`;
            }
            eraKaksi = true;
        }
    } else {
    // toinen pyöräytys
        console.log("pelasit jo houkka yhden erän")
    }
}

function lukitse1(){
    if(lukittu1 == true){
        document.getElementsByClassName("rullakuvake")[0].style.border = "2px solid black";
        document.getElementById("lukitse1").innerHTML = "Lukitse";
        lukittu1 = false;
    } else if(eraKaksi == true){
        document.getElementsByClassName("rullakuvake")[0].style.border = "2px dashed black";
        document.getElementById("lukitse1").innerHTML = "Avaa";
        lukittu1 = true;
    }
}