function piano() {
    const pianoKeys = document.querySelectorAll(".piano-keys .key");

    const mapedKeys = [];

    let audio = new Audio("./assets/audios/a.wav");
    
    function playTune(key, type = "wav") {
        audio.src = `./assets/audios/${key}.${type}`;
        audio.play();

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
            playTune(e.key);
        }
    })

    /** volume */
    const volume = document.querySelector("#volume");

    function handleVolume(e) {
        audio.volume = e.target.value;
    }

    volume.addEventListener("input", handleVolume);
}

(function initialize() {
    piano();
})();