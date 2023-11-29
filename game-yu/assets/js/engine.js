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

const pathImages = "./assets/icons/"

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
    player: "player-cards",
    computer: "computer-cards",
};

function getRandomCardId(min, max) {
    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    return cardData[randomNumber].id;
}

async function setCardsField(cardId) {
    // await removeAllCards();

    state.fieldCards.player.style.display = "block";
    state.fieldCards.player.src = cardData[cardId].img;

    let computerCardId = await getRandomCardId(0, cardData.length - 1);
    state.fieldCards.computer.style.display = "block";
    state.fieldCards.computer.src = cardData[computerCardId].img;

    let duelResult = await checkDuelResults(cardId, computerCardId);

    await updateScore();
    await drownButton();

}

function drawSelectCard(index) {
    state.cardSprites.avatar.src = cardData[index].img;
    state.cardSprites.avatarName.innerText = cardData[index].name;
    state.cardSprites.avatarType.innerText = `Attribute: ${cardData[index].type}`;
}

async function createCardImage(idCard, fieldSide) {

    const cardImage = document.createElement("img");
    cardImage.setAttribute("src", "./assets/icons/card-back.png");
    cardImage.setAttribute("data-id", idCard);
    cardImage.classList.add("card");

    if (fieldSide === playerSides.player) {

        cardImage.addEventListener("mouseover", () => {
            drawSelectCard(cardImage.getAttribute("data-id"));
        });

        cardImage.addEventListener("click", () => {
            setCardsField(cardImage.getAttribute("data-id"));
        });
    }

    return cardImage;
}

async function drawCards(cardNumbers, fieldSide) {
    for (let i = 0; i < cardNumbers; i++) {
        const randomIdCard = await getRandomCardId(0, cardData.length - 1);
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