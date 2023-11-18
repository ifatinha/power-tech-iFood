const states = {
    view: {
        formTime: document.querySelector("#form-time"),
        hour: document.querySelector("#hour"),
        minute: document.querySelector("#minute"),
        second: document.querySelector("#second"),
        resetBtn: document.querySelector("#resetBtn"),
        pauseBtn: document.querySelector("#pauseBtn"),
    },

    value: {
        images: [
            { url: "./assets/images/bear.png", title: "Bear", id: "bear1" },
            { url: "./assets/images/bear.png", title: "Bear", id: "bear2" },
            { url: "./assets/images/bee.png", title: "Bee", id: "bee1" },
            { url: "./assets/images/bee.png", title: "Bee", id: "bee2" },
            { url: "./assets/images/bird.png", title: "Bird", id: "bird1" },
            { url: "./assets/images/bird.png", title: "Bird", id: "bird2" },
            { url: "./assets/images/cat.png", title: "Cat", id: "cat1" },
            { url: "./assets/images/cat.png", title: "Cat", id: "cat2" },
            { url: "./assets/images/cow.png", title: "Cow", id: "cow1" },
            { url: "./assets/images/cow.png", title: "Cow", id: "cow2" },
            { url: "./assets/images/dog.png", title: "Dog", id: "dog1" },
            { url: "./assets/images/dog.png", title: "Dog", id: "dog2" },
            { url: "./assets/images/duck.png", title: "Duck", id: "duck1" },
            { url: "./assets/images/duck.png", title: "Duck", id: "duck2" },
            { url: "./assets/images/elephant.png", title: "Elephant", id: "elephant1" },
            { url: "./assets/images/elephant.png", title: "Elephant", id: "elephant2" },
            { url: "./assets/images/fish.png", title: "Fish", id: "fish1" },
            { url: "./assets/images/fish.png", title: "Fish", id: "fish2" },
            { url: "./assets/images/frog.png", title: "Frog", id: "frog1" },
            { url: "./assets/images/frog.png", title: "Frog", id: "frog2" },
            { url: "./assets/images/horse.png", title: "Horse", id: "horse1" },
            { url: "./assets/images/horse.png", title: "Horse", id: "horse2" },
            { url: "./assets/images/lion.png", title: "Lion", id: "lion1" },
            { url: "./assets/images/lion.png", title: "Lion", id: "lion2" },
            { url: "./assets/images/monkey.png", title: "Monkey", id: "monkey1" },
            { url: "./assets/images/monkey.png", title: "Monkey", id: "monkey2" },
            { url: "./assets/images/panda.png", title: "Panda", id: "panda1" },
            { url: "./assets/images/panda.png", title: "Panda", id: "panda2" },
            { url: "./assets/images/pig.png", title: "Pig", id: "pig1" },
            { url: "./assets/images/pig.png", title: "Pig", id: "pig2" },
            { url: "./assets/images/sheep.png", title: "Sheep", id: "sheep1" },
            { url: "./assets/images/sheep.png", title: "Sheep", id: "sheep2" },
            { url: "./assets/images/snack.png", title: "Snack", id: "snack1" },
            { url: "./assets/images/snack.png", title: "Snack", id: "snack2" },
            { url: "./assets/images/squirrel.png", title: "Squirrel", id: "squirrel1" },
            { url: "./assets/images/squirrel.png", title: "Squirrel", id: "squirrel2" },
            { url: "./assets/images/tiger.png", title: "Tiger", id: "tiger1" },
            { url: "./assets/images/tiger.png", title: "Tiger", id: "tiger2" },
            { url: "./assets/images/turtle.png", title: "Turtle", id: "turtle1" },
            { url: "./assets/images/turtle.png", title: "Turtle", id: "turtle2" },
            { url: "./assets/images/giraffe.png", title: "Giraffe", id: "giraffe2" },
            { url: "./assets/images/giraffe.png", title: "Giraffe", id: "giraffe2" },
        ],
        openCards: [],
        countClicks: 0,
        stopwatch: null,
        hourTemp: 0,
        minuteTemp: 0,
        secontTemp: 0,
    }
}

function shuffleImages() {
    states.value.images.sort(() => {
        return (Math.random() > 0.5 ? 2 : -1);
    });
}

function checkMath() {
    const img1 = states.value.openCards[0].firstChild;
    const img2 = states.value.openCards[1].firstChild;

    const isEquals = img1.getAttribute("alt").startsWith(img2.getAttribute("alt"));

    if (isEquals) {
        states.value.openCards.forEach((div) => {
            div.classList.add("cardMatch");
        })
    } else {
        states.value.openCards.forEach((div) => {
            div.classList.remove("cardOpen");
        });
    }

    states.value.openCards = [];

    if (document.querySelectorAll(".cardMatch").length ===
        states.value.images.length) {
        alert(`Você precisou de ${states.value.countClicks} clicks para concluir!`);
    }
}

function handleClick() {

    if (!this.classList.contains("cardMatch")) {
        states.value.countClicks++;
        if (states.value.openCards.length < 2) {
            this.classList.add("cardOpen");
            states.value.openCards.push(this);
        }

        if (states.value.openCards.length === 2) {
            setTimeout(checkMath, 500);
        }
    }

    document.querySelector("#clicks").innerText = states.value.countClicks;
}

function createGamer() {
    for (let i = 0; i < states.value.images.length; i++) {

        let card = document.createElement("div");
        card.classList.add("game-card");

        card.onclick = handleClick;

        let img = document.createElement("img");
        img.setAttribute("src", states.value.images[i].url);
        img.setAttribute("alt", states.value.images[i].title);
        img.setAttribute("id", states.value.images[i].id);

        card.appendChild(img);
        document.querySelector(".game").appendChild(card);;
    }
}

function resetGame() {

    states.view.resetBtn.addEventListener("click", () => {
        const resp = confirm(`Deseja reiniciar o jogo? `);

        if (resp) {
            window.location.reload()
        }
    });
}

function returnDate(input) {
    return input > 10 ? input : `0${input}`;
}

function timer() {
    if (states.value.secontTemp === 60) {
        states.value.secontTemp = 0;
        states.value.minuteTemp++;
    }

    if (states.value.minuteTemp === 60) {
        states.value.minuteTemp = 0;
        states.value.hourTemp++;
    }

    // states.view.hour.innerText = returnDate(states.value.hourTemp);
    // states.view.minute.innerText = returnDate(states.value.minuteTemp);
    // states.view.second.innerText = returnDate(states.value.secontTemp);
    // console.log(returnDate(states.view.second.innerText))
}

function startTime() {
    states.value.stopwatch = setInterval(() => { timer(), 1000 });
}

function pauseTime() {
    clearInterval(states.value.stopwatch);
}

((function initialize() {
    shuffleImages();
    createGamer();
    startTime();
    resetGame();
}))();