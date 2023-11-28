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

const pathImages = "./../icons/"

const cardData = [
    {
        id: 0,
        name: "Blue Eyes White Dragon",
        type: "Paper",
        img: `${pathImages}dragon.png`,
        winOf: [1],
        loseOf: [2]
    },

    {
        id: 1,
        name: "Dark Magician",
        type: "Rock",
        img: `${pathImages}magician.png`,
        winOf: [2],
        loseOf: [0]
    },

    {
        id: 2,
        name: "Exodia",
        type: "Scissors",
        img: `${pathImages}exodia.png`,
        winOf: [0],
        loseOf: [1]
    }

]

const playerSides = {
    player: "player-field-card",
    computer: "computer-field-card",
};

function getRandomCardId(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function createCardImage(randomIdCard, fieldSide) { }

async function drawCards(cardNumbers, fieldSide) {
    for (let i = 0; i < cardNumbers; i++) {
        const randomIdCard = await getRandomCardId(0, 2);
        const cardImage = await createCardImage(randomIdCard, fieldSide);
        document.querySelector(`#${fieldSide}`).appendChild(cardImage);
    }
}

function init() {
    drawCards(5, playerSides.player);
    drawCards(5, playerSides.computer);
}

function resetDuel() { }

(() => {
    init();
})()