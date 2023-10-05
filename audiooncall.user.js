// ==UserScript==
// @name         Custom Sound Script
// @namespace    https://na1.nice-incontact.com/
// @version      1.0
// @description  Read data from the DOM and play a sound on https://na1.nice-incontact.com/mydashboard/#/myDashboards
// @match        https://na1.nice-incontact.com/*
// @grant        none
// @run-at       document-idle
// @updateURL    https://raw.githubusercontent.com/jeremiahsnell/ringcentral-userscipts/main/audiooncall.user.js
// @downloadURL  https://raw.githubusercontent.com/jeremiahsnell/ringcentral-userscipts/main/audiooncall.user.js
// ==/UserScript==

(function() {
    var bell = new Audio("https://freesound.org/data/previews/686/686558_321967-lq.mp3");
    var played = false;
    var interval = setInterval(function () {
        var select = $("queue-counter-widget > div > div.indicators-container > div.contacts-indicator-container > acd-text-indicator > div > div > div.value-container > div > span");
        var hiddenSelect = $("queue-counter-widget > div > div.indicators-container.ng-hide > div.contacts-indicator-container > acd-text-indicator > div > div > div.value-container > div > span");
        if (!hiddenSelect.length && select.length && !played) {
            console.log(hiddenSelect.length)
            console.log(select.length + "select")
            var count = Number(select[0].textContent.replace(/\\D/g, ""))
            var rowContainer = $("agent-list-widget > div > div > div > nice-grid > div > div > div > div.ag-root-wrapper-body > div > div.ag-body.ag-row-no-animation > div.ag-body-viewport-wrapper > div > div > div");
    
            // Initialize an array to store the text content
            const textArray = [];
    
            // Loop over each row in the container
            rowContainer.each(function () {
                // Extract the text content from the relative selector
                const text = $(this).find("div:nth-child(2) > span > div > div").text().trim();
                textArray.push(text);
            });
    
            // Output the array of text content
            console.log(textArray);
    
            const countDict = textArray.reduce((acc, item) => {
                acc[item] = (acc[item] || 0) + 1;
                return acc;
            }, {});
    
            var loggedCount = 0;
            loggedCount + countDict.Available + countDict['Unavailable: InboundPending'];
    
            console.log(loggedCount);
            console.log(count+ ': count');
            if (count > loggedCount) {
                played = true;
                bell.play();
    
                console.log("play audio");
            }
        } else if (hiddenSelect.length == 1 && played) {
            console.log(hiddenSelect.length + "cphidden")
            console.log(select.length + "cpselect")
            console.log("cleared Played");
            played = false;
        }
    }, 1000);
    })();
