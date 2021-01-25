"use strict"

var jsonFlags;
var flagIndex;
var currLevel;
var maxLevel;
var nbClicks;

var elapsedTime = 0;
var elapsedTimeWhenClicked =0;
var startTime;

$(document).ready(function () {
    // Charger fichier Json
    jsonFlags = loadJson("js/flags.json");
    flagIndex = 0;

    // initialisation
    currLevel = 0;
    maxLevel = Object.keys(jsonFlags.flags).length;
    nbClicks = 0;

    // afficher modal
    $('#introModal').modal('show');

    // lancer premier niveau
    $("#startBtn").click(function () {
        playNextLevel();
    });

    // Modal pour niveau suivant
    $("#nextBtn").click(function () {
        flagIndex++;
        playNextLevel();
    });

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

const playNextLevel = () => {
    // Levels
    currLevel = jsonFlags.flags[flagIndex].level;
    $("#levelText").text(currLevel + "/" + maxLevel); // Write level

    // Start timer
    startTimer();

    // Score

    // Country name
    $(countryName).text(jsonFlags.flags[flagIndex].countryName);

    // Display flag
    $('#flagCol').load('img/' + jsonFlags.flags[flagIndex].file, function () {
        // Randomize colors
        randColors(jsonFlags.flags[flagIndex].colors);

        // ajouter evenement à chaque path du svg
        $("main svg path").each(function () {
            $(this).click(function () {
                // changement couleur
                let currColor = $(this).attr("fill");
                let nextColor = getNextColor(jsonFlags.flags[flagIndex].colors, currColor);
                $(this).attr("fill", nextColor);

                // Update number of clicks
                nbClicks++;
                $("#clickText").text(nbClicks);

                // check if flag found
                let currColors = $('main svg path').map(function () {
                    return $(this).attr("fill");
                });
                console.log(currColors);

                let flagFound = isFlagFound(jsonFlags.flags[flagIndex].colors, currColors);
                console.log(flagFound);

                if (flagFound) {
                    stopTimer();
                    // display modal
                    $('#nextModal').modal('show');
                }
            });
        });
    });
}

// TODO : sélectionner chrono
const startTimer = () => {
    startTime = new Date();
    console.log(startTime);
    timer = setInterval(function () {
        var diff = parseInt((new Date().getTime() - startTime.getTime()) / 1000) + elapsedTimeWhenClicked;

        var hours = parseInt(diff / 3600);
        diff = diff % 3600;

        var minutes = parseInt(diff / 60);
        diff = diff % 60;

        $("#timer").text((minutes < 10 ? '0' : '') + minutes
            + ':' + (diff < 10 ? '0' : '') + diff);

        elapsedTime++;
    }, 1000);
}


const stopTimer = () => {
    clearInterval(timer);
    elapsedTimeWhenClicked = 0;
    elapsedTime = 0;
    $("#timer").text('00:00');
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

const isFlagFound = (rightColors, currColors) => {
    for (let index = 0; index < currColors.length; index++) {
        let rightColor = rightColors[index];
        let currColor = currColors[index];

        if (rightColor !== currColor) {
            return false;
        }
    }
    return true;
}