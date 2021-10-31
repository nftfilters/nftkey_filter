// ==UserScript==
// @name         NFTKEY filter
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  NFTKEY filter
// @author       You
// @match        https://nftkey.app/collections/*
// @require      http://code.jquery.com/jquery-3.4.1.min.js
// @icon         https://www.google.com/s2/favicons?domain=nftkey.app
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    var timeout = null;

    $("body").on('DOMSubtreeModified', ".css-yezj2x", function() {
        if(timeout != null) {
            clearTimeout(timeout);
        }
        timeout = setTimeout(function() {
            var params = new window.URLSearchParams(window.location.search);
            var minRank = parseFloatParam(params, "minRank");
            var maxRank = parseFloatParam(params, "maxRank");
            var minPrice = parseFloatParam(params, "minPrice");
            var maxPrice = parseFloatParam(params, "maxPrice");
            var opacity = parseFloatParam(params, "opacity");
            if(opacity == null) opacity = 0.15;

            var items = $(".css-1l1yvyp").filter(function () {
                try {
                    var rank = null;
                    try {
                        if(minRank != null || maxRank != null) {
                            if(!this.textContent.includes("Rarity rank pending")) {
                                rank = parseFloat(this.textContent.match("Rarity\\srank\\s\\d{1,4}\\D")[0].match("\\d{1,4}")[0]);
                            }
                        }
                    } catch (e) {
                        console.log("Failed to parse item rank, please create an issue in github: https://github.com/nftfilters/nftkey_rarity_filter");
                    }

                    var price = null;
                    try {
                        if(minPrice != null || maxPrice != null) {
                            if(!this.textContent.includes("Not for sale")) {
                                var priceString = this.textContent.match("(Price|Highest bid|Last sell)\\S+ BNB")[0];
                                if(priceString.includes("k")) {
                                    var digits = 0;
                                    if(priceString.includes(".")) {
                                        digits = priceString.indexOf("k") - priceString.indexOf(".") - 1;
                                    }
                                    var replacement;
                                    switch(digits) {
                                        case 0: replacement = "000"; break;
                                        case 1: replacement = "00"; break;
                                        case 2: replacement = "0"; break;
                                    }
                                    priceString = priceString.replace("k", replacement).replace(".", "");
                                }
                                price = parseFloat(priceString.match("\\d+\\.*\\d*")[0]);
                            } else {
                                return false;
                            }
                        }
                    } catch (e) {
                        console.log("Failed to parse item price, please create an issue in github: https://github.com/nftfilters/nftkey_rarity_filter");
                    }

                    return (rank != null && (rank > minRank || rank < maxRank)) || (price != null && (price > maxPrice || price < minPrice));
                } catch (e) {
                    return false;
                }
            });

            if(opacity == 0) {
                items.width(0).height(0).css('padding', 0).css('margin', 0);
                $(".css-v92fmm").css('min-height', 0);
            } else {
                items.css('opacity', opacity);
            }

            timeout = null;
        }, 0);
    });
})();

function parseFloatParam(params, param) {
    if(params.has(param)) {
        var floatParam = parseFloat(params.get(param));
        if(isNaN(floatParam)) alert("Failed to parse " + param);
        else return floatParam;
    }
    return null;
}
