"use strict"

var jsonFlags;
var currLevel;
var maxLevel;

$(document).ready(function () {
    // Charger fichier Json
    jsonFlags = loadJson("js/flags.json");

    // initialisation
    currLevel = 1;
    maxLevel = Object.keys(jsonFlags).length;

    // afficher modal
    $('#introModal').modal('show');

    // charger svg
    $('#flagCol').load('img/fr.svg', function() {
        randColors(jsonFlags.flags[0].colors);
    });

    console.log("chips");
    // Randomiser couleurs

    //

    // Afficher drapeau selon niveau

    // Lancer timer quand cliqué

    // arrêter timer

    // ajouter score

    // afficher modal

    // passer au niveau suivant

    // transition vers drrapeau

    // timer à zéro

    // Si dernier drapeau

    // Affichage du score
});

const loadJson = (url) => {
    let json = $.getJSON({ 'url': url, 'async': false });
    json = JSON.parse(json.responseText);
    return json;
}

const loadFlag = () => {
    $("main svg path").each(function () { $(this).attr("fill", "#000") });
}


const randColors = (colors) => {
    $("main svg path").each(function () {
        let color = colors[Math.floor(colors.length * Math.random())];
        console.log(color);
        $(this).attr("fill", color);
    });
}