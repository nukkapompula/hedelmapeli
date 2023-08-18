var saldo = 50;
var panos = 0;
var lukossa = [false, false, false, false]; // pelin 4 rullan lukitus
var eraKaksi = false;
var otsikko = document.getElementById("otsikko");
var lompakko = document.getElementById("lompakko");

lompakko.innerHTML = `Lompakostasi löytyy rahaa ${saldo}€.`;
document.getElementById("lukitse0").addEventListener("click", lukitseTaiAvaa);
document.getElementById("lukitse1").addEventListener("click", lukitseTaiAvaa);
document.getElementById("lukitse2").addEventListener("click", lukitseTaiAvaa);
document.getElementById("lukitse3").addEventListener("click", lukitseTaiAvaa);

function pelaa(){
    // ensimmäinen pyöräytys
    if(eraKaksi == false){
        panos = document.getElementById("panoksesi").value;
        if(panos < 1 || panos > saldo){
            otsikko.innerHTML = "Ole hyvä ja aseta kelvollinen panos.";
            document.getElementById("panoksesi").value = 1;
        } else {
            lompakko.innerHTML = `Lompakostasi löytyy rahaa ${saldo}€.`;
            for(indeksi=0; indeksi<4; indeksi++){
                let luku = Math.round(Math.random()*4);
                document.getElementsByClassName("rullakuvake")[indeksi].src = `rulla${luku}.gif`;
            }
            voitonTarkistus();
            eraKaksi = true;
        }
    } else {
    // toinen pyöräytys
        panos = document.getElementById("panoksesi").value;
        if(panos < 1 || panos > saldo){
            otsikko.innerHTML = "Ole hyvä ja aseta kelvollinen panos.";
            document.getElementById("panoksesi").value = 1;
        } else {
            lompakko.innerHTML = `Lompakostasi löytyy rahaa ${saldo}€.`;
            for(indeksi=0; indeksi<4; indeksi++){
                luku = Math.round(Math.random()*4);
                if(lukossa[indeksi] == 0){
                    document.getElementsByClassName("rullakuvake")[indeksi].src = `rulla${luku}.gif`;
                }
            }
            voitonTarkistus();
        }
    }
}

function lukitseTaiAvaa(event){
    // kohteen id:stä saadaan käsiteltävän lukon numero
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

function voitonTarkistus(){
    saldo -= panos;
    lompakko.innerHTML = `Lompakostasi löytyy rahaa ${saldo}€.`;

    let vihreat = 0;
    let siniset = 0;
    let oranssit = 0;
    let turkoosit = 0;
    let punaiset = 0;

    // lasketaan kunkin värin osumien määrä
    for(indeksi=0; indeksi<4; indeksi++){
        let verrokki = document.getElementsByClassName("rullakuvake")[indeksi].src.toString();
        if(verrokki.substring(22, 32) == "rulla0.gif"){
            vihreat += 1;
        }
        if(verrokki.substring(22, 32) == "rulla1.gif"){
            siniset += 1;
        }
        if(verrokki.substring(22, 32) == "rulla2.gif"){
            oranssit += 1;
        }
        if(verrokki.substring(22, 32) == "rulla3.gif"){
            turkoosit += 1;
        }
        if(verrokki.substring(22, 32) == "rulla4.gif"){
            punaiset += 1;
        }
    }
    console.log(vihreat, siniset, oranssit, turkoosit, punaiset);
}