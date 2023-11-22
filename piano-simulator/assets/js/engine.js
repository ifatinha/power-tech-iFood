function piano() {
    const pianoKeys = document.querySelectorAll(".piano-keys .key");

    function newAudio(name, type = "wav") {
        return new Audio(`./assets/audios/${name}.${type}`);
    }

    function playTune(key) {
        newAudio(key).play();
    }

    pianoKeys.forEach((key) => {
        key.addEventListener("click", () => {
            playTune(key.dataset.key);
        });
    })
}

(function initialize() {
    piano();
})();