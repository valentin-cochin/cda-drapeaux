"use strict"


var jsonFlags;
var flagIndex;

var currLevel;
var maxLevel;
var totalClicks;
var score;
var isJokerUsed;

// Time variables
var elapsedTime = 0;
var elapsedTimeWhenClicked = 0;
var startTime;

$(document).ready(function () {
    // Charger fichier Json
    jsonFlags = loadJson("js/flags.json");
    flagIndex = 0;

    // initialisation
    currLevel = 0;
    maxLevel = Object.keys(jsonFlags.flags).length;
    totalClicks = 0;
    score = 0;
    isJokerUsed = true;
    $("#jokerBtn").toggleClass("disabled", true);

    // afficher modal
    $('#introModal').modal('show');

    // Modal premier niveau
    $("#startBtn").click(function () {
        playNextLevel();
    });

    // Modal pour niveau suivant
    $("#nextBtn").click(function () {
        flagIndex++;
        if (flagIndex < maxLevel) {
            playNextLevel();
        } else {
            $('#winModal').modal('show');
        }
    });

    $("#stopBtn").click(function () {
        location.reload();
    });

    // Modal dernier niveau
    $("#againBtn").click(function () {
        location.reload();
    });

    // Evenment joker
    $("#jokerBtn").click(function () {
        if (!isJokerUsed) {
            $(this).toggleClass("disabled", true);
            if (score > 0) {
                score--;
                $(".score").text(score);
            }
        }
        isJokerUsed = true;
    });

    // Evenment give up
    $("#giveUpbtn").click(function () {
        $(".totalClicks").text(totalClicks);
        $(".score").text(score);
        $("#jokerBtn").toggleClass("disabled", false);
        $('#nextModal').modal('show');
    });
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

    // joker
    isJokerUsed = false;

    // nb clicks
    let nbClicks = 0;
    $("#clickText").text(nbClicks);

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

                let flagFound = isFlagFound(jsonFlags.flags[flagIndex].colors, currColors);

                if (flagFound) {
                    stopTimer();

                    // Display right number of clicks
                    totalClicks += nbClicks;
                    $(".totalClicks").text(totalClicks);
                    calScore();

                    // Enable joker
                    $("#jokerBtn").toggleClass("disabled", false);

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
    timer = setInterval(function () {
        var diff = parseInt((new Date().getTime() - startTime.getTime()) / 1000) + elapsedTimeWhenClicked;

        // var hours = parseInt(diff / 3600);
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

const setRightColor = () => {
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

const calScore = () => {
    score++;
    $(".score").text(score);
}