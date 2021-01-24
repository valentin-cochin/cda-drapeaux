"use strict"

var jsonFlags;

$(document).ready(function () {
    // afficher modal
    $('#introModal').modal('show');

    // Charger fichier Json
    jsonFlags = loadJson("js/flags.json");

    // charger svg
    $('#flagCol').load('img/fr.svg');
    // $($.parseXML(htmlText)).children('html');
    // console.log(jQuery.parseHTML($.get("img/fr.svg").responseText));
    // console.log(jQuery.parseHTML($.get("img/fr.svg").responseText));
    
    // Randomiser couleurs

    // Afficher drapeau selon niveau

    // Lancer timer quand cliqué

    // arrêter timer

    // ajouter score

    // afficher modal

    // passer au niveau suivant

    // transitionvers drrapeau

    // timer à zéro

    // Si dernier drapeau

    // Affichage du score
});

const loadJson = (url) => {
    let json = $.getJSON({ 'url': url, 'async': false });
    console.log(json.responseText);
    json = JSON.parse(json.responseText);
    return json;
}