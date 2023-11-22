function piano() {
    const pianoKeys = document.querySelectorAll(".piano-keys .key");

    const mapedKeys = []

    function newAudio(name, type = "wav") {
        return new Audio(`./assets/audios/${name}.${type}`);
    }

    function playTune(key) {
        newAudio(key).play();

        const clickedKey = document.querySelector(`[data-key='${key}']`);
        clickedKey.classList.add("active");

        setTimeout(() => {
            clickedKey.classList.remove("active");
        }, 150);
    }

    pianoKeys.forEach((key) => {
        mapedKeys.push(key.dataset.key);
        key.addEventListener("click", () => {
            playTune(key.dataset.key);
        });
    })

    document.addEventListener("keydown", (e) => {
        if (mapedKeys.includes(e.key)) {
            console.log("Aqui estou!");
            playTune(e.key);
        }
    })
}

(function initialize() {
    piano();
})();