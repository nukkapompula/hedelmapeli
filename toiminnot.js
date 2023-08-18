var saldo = 50;
var panos = 0;
var lukossa = [false, false, false, false]; // pelin 4 rullan lukitus
var eraKaksi = false;
var otsikko = document.getElementById("otsikko");
var lompakko = document.getElementById("lompakko");

lompakko.innerHTML = `Lompakostasi löytyy rahaa ${saldo}€.`;
document.getElementById("lukitse0").addEventListener("click", lukitse);
document.getElementById("lukitse1").addEventListener("click", lukitse);
document.getElementById("lukitse2").addEventListener("click", lukitse);
document.getElementById("lukitse3").addEventListener("click", lukitse);

function pelaa(){
    // ensimmäinen pyöräytys
    if(eraKaksi == false){
        panos = document.getElementById("panoksesi").value;
        if(panos < 1 || panos > saldo){
            otsikko.innerHTML = "Ole hyvä ja aseta kelvollinen panos.";
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
        panos = document.getElementById("panoksesi").value;
        if(panos < 1 || panos > saldo){
            otsikko.innerHTML = "Ole hyvä ja aseta kelvollinen panos.";
            document.getElementById("panoksesi").value = 1;
        } else {
            saldo -= panos;
            lompakko.innerHTML = `Lompakostasi löytyy rahaa ${saldo}€.`;
            for(indeksi=0; indeksi<4; indeksi++){
                luku = Math.round(Math.random()*4);
                if(lukossa[indeksi] == 0){
                    document.getElementsByClassName("rullakuvake")[indeksi].src = `rulla${luku}.gif`;
                }
            }
        }
    }
}

function lukitse(event){
    let kohde = Number(event.target.id[7]);
    if(lukossa[kohde] == true){
        document.getElementsByClassName("rullakuvake")[kohde].style.border = "2px solid black";
        document.getElementById(`lukitse${kohde}`).innerHTML = "Lukitse";
        lukossa[kohde] = false;
    } else if(eraKaksi == true){
        document.getElementsByClassName("rullakuvake")[kohde].style.border = "2px dashed black";
        document.getElementById(`lukitse${kohde}`).innerHTML = "Avaa";
        lukossa[kohde] = true;
    }
}
