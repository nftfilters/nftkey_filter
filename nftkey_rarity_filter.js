// ==UserScript==
// @name         NFTKEY rarity filter
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  NFTKEY rarity filter
// @author       You
// @match        https://nftkey.app/collections/*
// @require      http://code.jquery.com/jquery-3.4.1.min.js
// @icon         https://www.google.com/s2/favicons?domain=nftkey.app
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    var params = new window.URLSearchParams(window.location.search);
    var minRank = params.get("minRank") != null ? parseInt(params.get("minRank")): 9999999;
    var maxRank = params.get("maxRank") != null ? parseInt(params.get("maxRank")) : 0;
    var opacity = params.get("opacity") != null ? params.get("opacity") : '0.15';

    var timeout = null;
    $("body").on('DOMSubtreeModified', ".css-yezj2x", function() {
        if(timeout != null) {
            clearTimeout(timeout);
        }
        timeout = setTimeout(function() {
            $(".css-1l1yvyp").filter(function () {
                try {
                    var rank = this.textContent.match("Rarity\\srank\\s\\d{1,4}\\D")[0].match("\\d{1,4}")[0];
                    console.log(minRank + " " + rank + " " + maxRank);
                    return rank > minRank || rank < maxRank;
                } catch (e) {
                    return false;
                }
            }).css('opacity', opacity);
        }, 500);
    });
})();
