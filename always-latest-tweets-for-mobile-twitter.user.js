// ==UserScript==
// @name         Always Latest Tweets for Mobile Twitter
// @namespace    https://github.com/gslin/always-latest-tweets-for-mobile-twitter
// @version      0.20190419.0
// @description  Auto-switch to latest tweets for mobile version Twitter
// @author       Gea-Suan Lin <darkkiller@gmail.com>
// @match        https://mobile.twitter.com/*
// @grant        none
// @run-at       document-start
// @license      MIT
// ==/UserScript==

(function() {
    'use strict';

    let ob = new window.MutationObserver(ml => {
        if (ml.filter(el => document.evaluate('.//h2/span[text() = "Home"]', el.target, null, XPathResult.ANY_TYPE, null).iterateNext()).length > 0) {
            document.querySelector('div[aria-label="Top Tweets on"]').click();
            return;
        }

        ml.forEach(el => {
            if (document.evaluate('.//span[text() = "See latest Tweets instead"]', el.target, null, XPathResult.ANY_TYPE, null).iterateNext()) {
                for (let span of el.target.getElementsByTagName('span')) {
                    if ('See latest Tweets instead' == span.innerText) {
                        span.click();
                    }
                }
            }
        });

        if (document.querySelector('div[aria-label="Timeline: Your Home Timeline"]')) {
            ob.disconnect();
        }
    });

    ob.observe(document, {
        childList: true,
        subtree: true,
    });
})();
