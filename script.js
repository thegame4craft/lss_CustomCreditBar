
// ==UserScript==
// @name         ownCreditBar
// @version      ALPHA_1.7
// @description  Deine Eigene Credit-Bar
// @author       GameSuchtFire
// @match        https://www.leitstellenspiel.de/
// @grant        none
// @updateURL    https://raw.githubusercontent.com/thegame4craft/lss_CustomCreditBar/main/script.js
// ==/UserScript==

var Credits = document.getElementById("navigation_top").innerHTML;
var Coins = document.getElementById("coins_top").innerHTML;
var credits = document.getElementById("navigation_top");
var coins = document.getElementById("coins_top");

console.log("hello world");


// remove things, that i don't need. You can disable if you add "//" before the line that you disable.
document.getElementById("news_li").classList.add("hidden");
document.querySelectorAll("a[href='/freunde']")[0].classList.add("hidden");
document.querySelectorAll("a[href='https://forum.leitstellenspiel.de/']")[0].classList.add("hidden");


function getCreditsAsInt(credits){
    var end;
    end = credits.replaceAll('Credits: ', "")
    return end;
}

function getCoinsAsInt(coins){
    var end;
    end = coins.replaceAll('Coins: ', "");
    return end;
}
function getAllianceCredits(){
    var response
    var request = new XMLHttpRequest();

    request.onreadystatechange = function() {
        if (request.readyState == 4 && request.status == 200) {
            response = JSON.parse(request.responseText);
        }
    }

    request.open("GET", "https://www.leitstellenspiel.de/api/allianceinfo", false);

    request.send();
    if(typeof response !== "undefined"){
        var credits = response.credits_current;
        credits = credits.toString();
        credits = credits.split("");
        var ezh_credits = credits[credits.length -3] + credits[credits.length -2] + credits[credits.length -1];
        var TeTzTh_credits = credits[credits.length -6] + credits[credits.length -5] + credits[credits.length -4];
        var MeMzMh_credits = credits = credits[credits.length -9] + credits[credits.length -8] + credits[credits.length -7];
        var end = MeMzMh_credits.toString() + '.' + TeTzTh_credits.toString() + '.' + ezh_credits.toString();
        end = end.replaceAll("undefined", "");
        end = end.replaceAll("NaN", "");
        return end
    } else {
        return "0";
    }
}

function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}

function totalUserCredits(){
    var response;
    var end;
    var request = new XMLHttpRequest();

    request.onreadystatechange = function() {
        if (request.readyState == 4 && request.status == 200) {
            response = JSON.parse(request.responseText);
        }
    }

    request.open("GET", "https://www.leitstellenspiel.de/api/credits", false);
    request.send();
    if(typeof response !== "undefined") {
        var credits = response.credits_user_total
        credits = credits.toString();
        credits = credits.split("");
        var ezh_credits = credits[credits.length -3] + credits[credits.length -2] + credits[credits.length -1];
        var TeTzTh_credits = credits[credits.length -6] + credits[credits.length -5] + credits[credits.length -4];
        var MeMzMh_credits = credits = credits[credits.length -9] + credits[credits.length -8] + credits[credits.length -7];
        end = MeMzMh_credits.toString() + '.' + TeTzTh_credits.toString() + '.' + ezh_credits.toString();
        end = end.replaceAll("undefined", "");
        end = end.replaceAll("NaN", "");
        return end;
    }

    return "Error!";
}

function totalUserCreditsAsInt() {
    var response;
    var end;
    var request = new XMLHttpRequest();

    request.onreadystatechange = function() {
        if (request.readyState == 4 && request.status == 200) {
            response = JSON.parse(request.responseText);
        }
    }

    request.open("GET", "https://www.leitstellenspiel.de/api/credits", false);
    request.send();
    if(typeof response !== "undefined") {
        var credits = response.credits_user_total.toString();
        credits = credits.replaceAll("undefined", "");
        credits = credits.replaceAll("NaN", "");
        return parseInt(credits);
    }

    return 0;
}



function getUserRank() {
    return document.getElementById("current_level").innerHTML;
}

var navElement = document.createElement('li');
var creditsElement = document.createElement('li');
var creditsElementText = document.createElement('a');
var creditsOverviewElement = document.createElement('li');
var creditsOverviewText = document.createElement('a');

var coinsElement = document.createElement('li');
var coinsElementText = document.createElement('a');
var coinsOverviewElement = document.createElement('li');
var coinsOverviewText = document.createElement('a');

var verbandElement = document.createElement('li');
var verbandElementText = document.createElement('a');

var totalCredits = document.createElement('li');
var totalCreditsText = document.createElement('a');

var trennungElement = document.createElement('li');
var trennungElement2 = document.createElement('li');



Credits = document.getElementById("navigation_top").innerHTML;
Coins = document.getElementById("coins_top").innerHTML;
var element = navElement;
element.setAttribute("class", "dropdown");
element.innerHTML = '<a href="#" id="CreditList" role="button" class="dropdown-toggle" data-toggle="dropdown"><img id="ls-credits-money-img" style="height: 19px; width: 19px; cursor: pointer;" src="https://discord.thebluemeistergamer.ga/icons8-money-box-150.png"><b class="caret"></b></a>' +
    '<ul class="dropdown-menu" role="menu" aria-labelledby="menu_profile" id="dropdownMenu">'+
    '</ul>'



creditsElement.setAttribute("role", "presentation");
creditsElementText.setAttribute("href", "/credits");
creditsElementText.setAttribute("class", "lightbox-open");
creditsElementText.setAttribute("id", "creditView");
creditsElementText.innerHTML = 'Credits: '+ getCreditsAsInt(Credits);

creditsOverviewElement.setAttribute("role", "presentation");
creditsOverviewText.setAttribute("href", "/credits/overview");
creditsOverviewText.setAttribute("class", "lightbox-open");
creditsOverviewText.setAttribute("id", "creditOverView");
creditsOverviewText.setAttribute("target", "blank");
creditsOverviewText.innerHTML = 'Credits-Übersicht';

//---------------|
//               |
//-----Coins-----|
//               |
//---------------|

coinsElement.setAttribute("role", "presentation");
coinsElementText.setAttribute("href", "/coins");
coinsElementText.setAttribute("class", "lightbox-open");
coinsElementText.setAttribute("id", "coinsView");
coinsElementText.innerHTML = 'Coins: '+ getCoinsAsInt(Coins);

coinsOverviewElement.setAttribute("role", "presentation");
coinsOverviewText.setAttribute("href", "/coins/list");
coinsOverviewText.setAttribute("class", "lightbox-open");
coinsOverviewText.setAttribute("id", "coinsOverView");
coinsOverviewText.setAttribute("target", "blank");
coinsOverviewText.innerHTML = 'Coins-Übersicht';

verbandElement.setAttribute("role", "presentation");
verbandElementText.setAttribute("href", "/verband/kasse");
verbandElementText.setAttribute("class", "lightbox-open");
verbandElementText.setAttribute("id", "verbandCreditView");
verbandElementText.innerHTML = 'Verband-Kasse: '+ getAllianceCredits();

totalCredits.setAttribute("role", "presentation");
totalCreditsText.setAttribute("href", "#");
totalCreditsText.setAttribute("class", "");
totalCreditsText.setAttribute("id", "totalUserCredits");
totalCreditsText.innerHTML = 'Gesammtcredits: '+ totalUserCredits();


trennungElement.setAttribute("role", "presentation");
trennungElement.setAttribute("class", "divider");
trennungElement2.setAttribute("role", "presentation");
trennungElement2.setAttribute("class", "divider");


// add Elements
creditsElement.appendChild(creditsElementText);
creditsOverviewElement.appendChild(creditsOverviewText);
coinsElement.appendChild(coinsElementText);
coinsOverviewElement.appendChild(coinsOverviewText);
verbandElement.appendChild(verbandElementText);
totalCredits.appendChild(totalCreditsText);


document.querySelector('#navbar-main-collapse .navbar-right').appendChild(element);
document.querySelector('#dropdownMenu').appendChild(creditsElement);
document.querySelector('#dropdownMenu').appendChild(creditsOverviewElement);
document.querySelector('#dropdownMenu').appendChild(coinsElement);
document.querySelector('#dropdownMenu').appendChild(coinsOverviewElement);
document.querySelector('#dropdownMenu').appendChild(trennungElement2);
document.querySelector('#dropdownMenu').appendChild(totalCredits);
document.querySelector('#dropdownMenu').appendChild(trennungElement);
document.querySelector('#dropdownMenu').appendChild(verbandElement);


// sonstige Elemente
function siteBar() {
    var verbandUser = document.createElement("div");
    var verbandUserText = document.createElement("a");
    verbandUser.setAttribute("class", "lssm_menu_btn_wrapper");
    verbandUserText.setAttribute("href", "/verband/mitglieder");
    verbandUserText.setAttribute("class", "lightbox-open");
    verbandUserText.setAttribute("id", "coinsOverView");
    verbandUserText.setAttribute("target", "blank");
    verbandUserText.innerHTML = '<img src="https://img.icons8.com/wired/64/000000/user-group-man-woman.png" width=19 height=16>'

    verbandUser.appendChild(verbandUserText);
    document.querySelector("#lssm_layout01_menu").appendChild(verbandUser);
}

function sitebarSetup(){
    if(document.getElementById("lssm_layout01_menu")) {
        siteBar();
        console.info("2");
        return;
    }
}


sitebarSetup();



function refreshData() {
    var element_credits = document.getElementById("creditView");
    var element_coins = document.getElementById("coinsView");
    var Credits = document.getElementById("navigation_top").innerHTML;
    var Coins = document.getElementById("coins_top").innerHTML;
    var credits = document.getElementById("navigation_top");
    var coins = document.getElementById("coins_top");
    element_credits.innerHTML = 'Credits: '+ getCreditsAsInt(Credits);
    element_coins.innerHTML = 'Coins: '+ getCoinsAsInt(Coins);
}

function fullUpdate() {
    var element_verbandKasse = document.getElementById("verbandCreditView");
    var element_totalUserCredits = document.getElementById("totalUserCredits");
    element_verbandKasse.innerHTML = 'Verband-Kasse: '+ getAllianceCredits();
    element_totalUserCredits.innerHTML = 'GesammtCredits: '+ totalUserCredits();
}

setInterval(refreshData, 1000);
setInterval(fullUpdate, 30000);
