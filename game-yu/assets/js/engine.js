const state = {
    score: {
        playScore: 0,
        computerScore: 0,
        scoreBox: document.querySelector("#score__points"),
    },

    cardSprites: {
        avatar: document.querySelector("#card-image"),
        avatarName: document.querySelector("#card-name"),
        avatarType: document.querySelector("#card-type"),
    },

    fieldCards: {
        player: document.querySelector("#player-field-card"),
        computer: document.querySelector("#computer-field-card"),
    },

    actions: {
        button: document.querySelector("#next-duel"),
    }
}

function init() {

}

(() => {
    init();
})()