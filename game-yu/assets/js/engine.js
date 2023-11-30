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

    playerSides: {
        player: "player-cards",
        playerBox: document.querySelector("#player-cards"),
        computer: "computer-cards",
        computerBox: document.querySelector("#computer-cards"),
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

function getRandomCardId(min, max) {
    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    return cardData[randomNumber].id;
}

async function removeAllCards() {
    let { computerBox, playerBox } = state.playerSides;

    let imagesElements = computerBox.querySelectorAll("img");
    imagesElements.forEach((img) => img.remove());

    imagesElements = playerBox.querySelectorAll("img");
    imagesElements.forEach((img) => img.remove());
}

async function checkDuelResults(playerCardId, computerCardId) {
    let duelResult = "DRAW";

    const playerCard = cardData[playerCardId];

    if (playerCard.winOf.includes(computerCardId)) {
        duelResult = "WIN";
        state.score.playScore++;
    }

    if (playerCard.loseOf.includes(computerCardId)) {
        duelResult = "LOSE";
        state.score.computerScore++;
    }

    await playAudio(duelResult.toLowerCase());
    return duelResult;
}

async function drownButton(duelResult) {
    state.actions.button.style.display = "block";
    state.actions.button.innerText = duelResult.toUpperCase();
}

async function updateScore() {
    state.score.scoreBox.innerText = `Win: ${state.score.playScore} | Lose: ${state.score.computerScore}`;
}

function showHiddenCardFieldImages(value) {
    if (value) {
        state.fieldCards.player.style.display = "block";
        state.fieldCards.computer.style.display = "block";
    } else {
        state.fieldCards.player.style.display = "none";
        state.fieldCards.computer.style.display = "none";
    }
}

function drawCardsInfield(cardId, computerCardId) {
    state.fieldCards.player.src = cardData[cardId].img;
    state.fieldCards.computer.src = cardData[computerCardId].img;
}

async function setCardsField(cardId) {
    await removeAllCards();
    let computerCardId = await getRandomCardId(0, cardData.length - 1);

    showHiddenCardFieldImages(true);
    drawCardsInfield(cardId, computerCardId);

    let duelResult = await checkDuelResults(cardId, computerCardId);

    await updateScore();
    await drownButton(duelResult);

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

    if (fieldSide === state.playerSides.player) {

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

async function resetDuel() {
    state.actions.button.addEventListener("click", () => {
        state.cardSprites.avatar.src = "";
        state.actions.button.style.display = "none";

        showHiddenCardFieldImages(false);

        state.cardSprites.avatarName.innerText = "Selecione";
        state.cardSprites.avatarType.innerText = "uma carta";

        init();
    });
}

async function playAudio(status) {
    const audio = new Audio(`./assets/audios/${status}.wav`);

    try {
        audio.play();
    } catch (error) { }
}

function init() {
    drawCards(5, state.playerSides.player);
    drawCards(5, state.playerSides.computer);
}

(() => {
    init();
    resetDuel();
})()