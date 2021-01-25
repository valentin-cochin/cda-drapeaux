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
        // Randomiser couleurs
        randColors(jsonFlags.flags[0].colors);
        console.log(getNextColor(jsonFlags.flags[0].colors,"#f31830"));
    });


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
        $(this).attr("fill", color);
    });
}

const getNextColor = (colors, currColor) => {
    let indexCurrColor = colors.indexOf(currColor);
    let indexNextColor = (indexCurrColor === colors.length - 1) ? 0 : indexCurrColor + 1;
    return colors[indexNextColor];
}