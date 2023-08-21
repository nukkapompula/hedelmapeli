var saldo = 100;
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
document.getElementById("arvotaan").addEventListener("animationend", testi);

function testi(){
    document.getElementById("arvotaan").style.animation = "none";
    console.log("guu");
}

function pelaa(){
    // ensimmäinen pyöräytys
    if(eraKaksi == false){
        panos = document.getElementById("panoksesi").value;
        if(panos < 1 || panos > saldo){
            otsikko.innerHTML = "Ole hyvä ja aseta kelvollinen panos.";
            document.getElementById("panoksesi").value = 1;
        } else {
            document.getElementById("arvotaan").style.animation = "arpoo 0.8s linear 0s 1 normal";
            for(indeksi=0; indeksi<4; indeksi++){
                let luku = Math.round(Math.random()*4);
                document.getElementsByClassName("rullakuvake")[indeksi].src = `rulla${luku}.gif`;
            }
            voitonTarkistus();
            for(indeksi=0; indeksi<4; indeksi++){
                document.getElementById(`lukitse${indeksi}`).style.display = "block";
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
            document.getElementById("arvotaan").style.animation = "arpoo 0.8s linear 0s 1 normal";
            for(indeksi=0; indeksi<4; indeksi++){
                luku = Math.round(Math.random()*4);
                if(lukossa[indeksi] == false){
                    document.getElementsByClassName("rullakuvake")[indeksi].src = `rulla${luku}.gif`;
                }
            }
            voitonTarkistus();
            for(indeksi=0; indeksi<4; indeksi++){
                document.getElementById(`lukitse${indeksi}`).style.display = "none";
            }
            lukotAuki();
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
    let vihreat = 0;
    let siniset = 0;
    let oranssit = 0;
    let turkoosit = 0;
    let punaiset = 0;

    // lasketaan kunkin värin osumien määrä
    for(indeksi=0; indeksi<4; indeksi++){
        let pysahtynytRulla = document.getElementsByClassName("rullakuvake")[indeksi].src.toString();
        if(pysahtynytRulla.substring(22, 32) == "rulla0.gif"){
            vihreat += 1;
        }
        if(pysahtynytRulla.substring(22, 32) == "rulla1.gif"){
            siniset += 1;
        }
        if(pysahtynytRulla.substring(22, 32) == "rulla2.gif"){
            oranssit += 1;
        }
        if(pysahtynytRulla.substring(22, 32) == "rulla3.gif"){
            turkoosit += 1;
        }
        if(pysahtynytRulla.substring(22, 32) == "rulla4.gif"){
            punaiset += 1;
        }
    }

    // tarkistetaan osumien perusteella voitot
    if(vihreat == 4){
        saldo += 3 * panos;
        otsikko.innerHTML = `Voitit juuri ${3 * panos}€!`;
    } else if(siniset == 4){
        saldo += 4 * panos;
        otsikko.innerHTML = `Voitit juuri ${4 * panos}€!`;
    } else if(oranssit == 4){
        saldo += 5 * panos;
        otsikko.innerHTML = `Voitit juuri ${5 * panos}€!`;
    } else if(turkoosit == 4){
        saldo += 6 * panos;
        otsikko.innerHTML = `Voitit juuri ${6 * panos}€!`;
    } else if(punaiset == 3){
        saldo += 5 * panos;
        otsikko.innerHTML = `Voitit juuri ${5 * panos}€!`;
    } else if(punaiset == 4){
        saldo += 10 * panos;
        otsikko.innerHTML = `Voitit juuri ${10 * panos}€!`;
    } else {
        saldo -= panos;
        otsikko.innerHTML = "Himskatti, ei voittoa.";
    }
    lompakko.innerHTML = `Lompakostasi löytyy rahaa ${saldo}€.`;
}

function lukotAuki(){
    for(indeksi=0; indeksi<4; indeksi++){
        document.getElementsByClassName("rullakuvake")[indeksi].style.border = "2px solid black";
        document.getElementById(`lukitse${indeksi}`).innerHTML = "Lukitse";
        lukossa[indeksi] = false;
    }
    eraKaksi = false;
}