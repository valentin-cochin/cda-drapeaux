"use strict"

var jsonFlags;

$(document).ready(function () {
    // afficher modal
    $('#introModal').modal('show');

    // Charger fichier Json
    jsonFlags = loadFlags("js/flags.json");
    console.log(jsonFlags)

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

const loadFlags = (url) => {
    let json = $.getJSON({ 'url': url, 'async': false });
    console.log(json.responseText);
    json = JSON.parse(json.responseText);
    return json;
}