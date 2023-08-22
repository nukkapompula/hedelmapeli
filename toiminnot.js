var saldo = 100;
var panos = 0;
var lukossa = [false, false, false, false]; // pelin 4 rullan lukitus
var eraKaksi = false;
var otsikko = document.getElementById("otsikko");
var lompakko = document.getElementById("lompakko");
var voitto = false;

lompakko.innerHTML = `Lompakostasi löytyy rahaa ${saldo}€.`;
document.getElementById("lukitse0").addEventListener("click", lukitseTaiAvaa);
document.getElementById("lukitse1").addEventListener("click", lukitseTaiAvaa);
document.getElementById("lukitse2").addEventListener("click", lukitseTaiAvaa);
document.getElementById("lukitse3").addEventListener("click", lukitseTaiAvaa);

document.getElementsByClassName("rullakuvake")[0].addEventListener("animationend", animaatiohi);
document.getElementsByClassName("rullakuvake")[1].addEventListener("animationend", animaatiohi);
document.getElementsByClassName("rullakuvake")[2].addEventListener("animationend", animaatiohi);
document.getElementsByClassName("rullakuvake")[3].addEventListener("animationend", animaatiohi);

function animaatiohi(){
    otsikko.style.visibility = "visible";
    lompakko.style.visibility = "visible";
    for(indeksi=0; indeksi<4; indeksi++){
        document.getElementsByClassName("rullakuvake")[indeksi].style.animation = "none";
    }
}

function pelaa(){
    // ensimmäinen pyöräytys
    if(eraKaksi == false){
        panos = document.getElementById("panoksesi").value;
        if(panos < 1 || panos > saldo){
            otsikko.style.animation = "none";
            otsikko.innerHTML = "Ole hyvä ja aseta kelvollinen panos.";
            document.getElementById("panoksesi").value = 1;
        } else {
            document.getElementById("panoksesi").value = 1;
            otsikko.style.visibility = "hidden";
            otsikko.style.animation = "none";
            lompakko.style.visibility = "hidden";
            for(indeksi=0; indeksi<4; indeksi++){
                let luku = Math.round(Math.random()*4);
                document.getElementsByClassName("rullakuvake")[indeksi].src = `rulla${luku}.gif`;
                document.getElementsByClassName("rullakuvake")[indeksi].style.animation = "arpoo 0.7s ease-in-out 0s 1 normal";
            }
            // seuraava estää voittorivin lukitsemisen
            if(voitonTarkistus() == false){
                for(indeksi=0; indeksi<4; indeksi++){
                    document.getElementById(`lukitse${indeksi}`).style.display = "block";
                }
                eraKaksi = true;
            } else {
                eraKaksi = false;
                voitto = false;
            }
        }
    } else if(eraKaksi == true){
    // toinen pyöräytys
        panos = document.getElementById("panoksesi").value;
        if(panos < 1 || panos > saldo){
            otsikko.style.animation = "none";
            otsikko.innerHTML = "Ole kiltti ja aseta kelvollinen panos.";
            document.getElementById("panoksesi").value = 1;
        } else {
            // katsotaan ettei kaikki rullat ole lukittuna
            if(lukossa[0] == true && lukossa[1] == true && lukossa[2] == true && lukossa[3] == true){
                otsikko.innerHTML = "Pidä vähintään yksi rulla vapaana, kiitos.";
                return;
            }
            document.getElementById("panoksesi").value = 1;
            otsikko.style.visibility = "hidden";
            otsikko.style.animation = "none";
            lompakko.style.visibility = "hidden";
            for(indeksi=0; indeksi<4; indeksi++){
                luku = Math.round(Math.random()*4);
                if(lukossa[indeksi] == false){
                    document.getElementsByClassName("rullakuvake")[indeksi].src = `rulla${luku}.gif`;
                    document.getElementsByClassName("rullakuvake")[indeksi].style.animation = "arpoo 0.7s ease-in-out 0s 1 normal";
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
        document.getElementsByClassName("rullakuvake")[kohde].style.border = "2px dotted black";
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
        otsikko.innerHTML = `Voitit juuri huimat ${3 * panos}€!`;
        otsikko.style.animation = "hytkyy 2s ease-in-out 0s infinite normal";
        voitto = true;
    } else if(siniset == 4){
        saldo += 4 * panos;
        otsikko.innerHTML = `Voitit juuri sievoiset ${4 * panos}€!`;
        otsikko.style.animation = "hytkyy 1.8s ease-in-out 0s infinite normal";
        voitto = true;
    } else if(oranssit == 4){
        saldo += 5 * panos;
        otsikko.innerHTML = `Voitit juuri rapiat ${5 * panos}€!`;
        otsikko.style.animation = "hytkyy 1.6s ease-in-out 0s infinite normal";
        voitto = true;
    } else if(turkoosit == 4){
        saldo += 6 * panos;
        otsikko.innerHTML = `Voitit juuri huikeat ${6 * panos}€!`;
        otsikko.style.animation = "hytkyy 1.4s ease-in-out 0s infinite normal";
        voitto = true;
    } else if(punaiset == 3){
        saldo += 5 * panos;
        otsikko.innerHTML = `Voitit juuri makeat ${5 * panos}€!`;
        otsikko.style.animation = "hytkyy 1.2s ease-in-out 0s infinite normal";
        voitto = true;
    } else if(punaiset == 4){
        saldo += 10 * panos;
        otsikko.innerHTML = `Voitit juuri uskomattomat ${10 * panos}€!`;
        otsikko.style.animation = "hytkyy 1s ease-in-out 0s infinite normal";
        voitto = true;
    } else {
        voitto = false;
        saldo -= panos;
        // pelin päättyminen varojen huvetessa
        if(saldo < 1){
            document.getElementById("pelikkuna").style.display = "none";
            document.getElementById("peliOhikkuna").style.display = "block";
            otsikko.style.visibility = "visible";
            otsikko.style.animation = "hytkyy 3s ease-in-out 0s infinite normal";
            otsikko.innerHTML = "Peijakas!";
        } else if(eraKaksi == true){
            otsikko.innerHTML = "Himskatti, ei voittoa.";
        } else {
            otsikko.innerHTML = "Samperi, ei voittoa. Voit nyt lukita kuvia!";
        }
    }
    lompakko.innerHTML = `Lompakostasi löytyy rahaa ${saldo}€.`;
    return voitto;
}

function lukotAuki(){
    for(indeksi=0; indeksi<4; indeksi++){
        document.getElementsByClassName("rullakuvake")[indeksi].style.border = "2px solid black";
        document.getElementById(`lukitse${indeksi}`).innerHTML = "Lukitse";
        lukossa[indeksi] = false;
    }
    eraKaksi = false;
}