const state = {
    view: {
        enemy: document.querySelector((".enemy")),
        squares: document.querySelectorAll(".square"),
        score: document.querySelector("#score"),
        time: document.querySelector("#time"),
    },

    values: {
        currentTime: 60,
        gameVelocity: 1000,
        hitPosition: 0,
        points: 0,
    },

    actions: {
        countDownTimeId: setInterval(countDown, 1000),
        timerId: setInterval(randomSquare, 1000),
    }
};

function randomSquare() {

    state.view.squares.forEach((square) => {
        square.classList.remove("enemy");
    })

    let randomNumber = Math.floor((Math.random() * 9) + 0);
    let square = state.view.squares[randomNumber];
    square.classList.add("enemy");
    state.values.hitPosition = square.id;
}

function countDown() {
    let time = state.values.currentTime--;
    state.view.time.innerText = time;

    if (state.values.currentTime <= 0) {
        clearInterval(state.actions.countDownTimeId);
        clearInterval(state.actions.timerId);
        playSound("arcade.mp3");
        alert(`Game Over! Seu Resultado foi ${state.values.points} pontos!`);
    }
}

function playSound(audioName) {
    let audio = new Audio(`./assets/sounds/${audioName}`);
    audio.volume = 0.2;
    audio.play();
}

function addListernerHitBox() {
    state.view.squares.forEach((square) => {
        square.addEventListener("mousedown", () => {
            if (square.id === state.values.hitPosition) {
                state.values.points++;
                state.view.score.innerText = state.values.points;
                state.values.hitPosition = null;
                playSound("hit.m4a");
            }
        })
    })
}

((function initialize() {
    addListernerHitBox();
}))()