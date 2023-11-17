const images = [
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
];

const openCards = [];

let shuffleImages = images.sort(() => {
    return (Math.random() > 0.5 ? 2 : -1);
});

for (let i = 0; i < images.length; i++) {

    let card = document.createElement("div");
    card.classList.add("game-card");

    card.onclick = handleClick;

    let img = document.createElement("img");
    img.setAttribute("src", images[i].url);
    img.setAttribute("alt", images[i].title);
    img.setAttribute("id", images[i].id);

    card.appendChild(img);
    document.querySelector(".game").appendChild(card);;

}

function handleClick() {
    if (openCards.length < 2) {
        this.classList.add("cardOpen");
        openCards.push(this);
    }

    if (openCards.length === 2) {
        setTimeout(checkMath, 1000);
    }
}

function checkMath() {
    const img1 = openCards[0].firstChild;
    const img2 = openCards[1].firstChild;

    const isEquals = img1.getAttribute("alt").startsWith(img2.getAttribute("alt"));
    console.log(isEquals);
}