// ==UserScript==
// @name         YAPS (Y)ouTube (A)dblock (P)opup (S)topper
// @version      0.3
// @description  Simple script that removes the popup that appears on YouTube about AdBlock
// @author       TheRealGeoDash
// @match        https://www.youtube.com/watch*
// @grant        none
// @run-at       document-start
// ==/UserScript==

(function() {
    'use strict';

    (new MutationObserver(function(ms, os) {
        for (const m of ms) {
            if (m.type === "childList") {
                if (!"parentElement" in m.target) return;
                const aP = m.target?.parentElement?.querySelector("ytd-enforcement-message-view-model");
                if (aP) {
                    console.log("Purging AdBlock Popup");
                    aP.remove();
                    setTimeout(() => {
                        console.log("Purging AdBlock Overlay");
                        document.querySelector(`tp-yt-paper-dialog[prevent-autonav="true"]`).remove();
                        os.disconnect();
                        if (document.querySelector("video").paused) {
                            console.log("Attempting to Resume Playback :)");
                            document.querySelector("video").play();
                        }
                    }, 300);
                };
            }
        }
    }).observe(document.body,{childList:true,subtree:true}));
})();
