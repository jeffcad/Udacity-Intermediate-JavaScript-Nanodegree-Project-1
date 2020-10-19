
const dinos = [
    {
        "species": "Triceratops",
        "weight": 13000,
        "height": 114,
        "diet": "herbivore",
        "where": "North America",
        "when": "Late Cretaceous",
        "fact": "First discovered in 1889 by Othniel Charles Marsh"
    },
    {
        "species": "Tyrannosaurus Rex",
        "weight": 11905,
        "height": 144,
        "diet": "carnivore",
        "where": "North America",
        "when": "Late Cretaceous",
        "fact": "The largest known skull measures in at 5 feet long."
    },
    {
        "species": "Anklyosaurus",
        "weight": 10500,
        "height": 55,
        "diet": "herbivore",
        "where": "North America",
        "when": "Late Cretaceous",
        "fact": "Anklyosaurus survived for approximately 135 million years."
    },
    {
        "species": "Brachiosaurus",
        "weight": 70000,
        "height": "372",
        "diet": "herbivore",
        "where": "North America",
        "when": "Late Jurassic",
        "fact": "An asteroid was named 9954 Brachiosaurus in 1991."
    },
    {
        "species": "Stegosaurus",
        "weight": 11600,
        "height": 79,
        "diet": "herbivore",
        "where": "North America, Europe, Asia",
        "when": "Late Jurassic to Early Cretaceous",
        "fact": "The Stegosaurus had between 17 and 22 seperate plates and flat spines."
    },
    {
        "species": "Elasmosaurus",
        "weight": 16000,
        "height": 59,
        "diet": "carnivore",
        "where": "North America",
        "when": "Late Cretaceous",
        "fact": "Elasmosaurus was a marine reptile first discovered in Kansas."
    },
    {
        "species": "Pteranodon",
        "weight": 44,
        "height": 20,
        "diet": "carnivore",
        "where": "North America",
        "when": "Late Cretaceous",
        "fact": "Actually a flying reptile, the Pteranodon is not a dinosaur."
    },
    {
        "species": "Pigeon",
        "weight": 0.5,
        "height": 9,
        "diet": "herbivore",
        "where": "Worldwide",
        "when": "Holocene",
        "fact": "All birds are living dinosaurs."
    }
]

// Create Dino Constructor
function Dino(dinoData) {
    this.species = dinoData.species
    this.weight = dinoData.weight
    this.height = dinoData.height
    this.diet = dinoData.diet
    this.where = dinoData.where
    this.when = dinoData.when
    this.fact = dinoData.fact
}

// need to handle exact weight/height matches, maybe if ratio would be 1.0
// after rounding
const protoDino = {
    compareWeight: function (humanWeight) {
        if (humanWeight <= this.weight) {
            return `${this.species} weighed ${(this.weight / humanWeight).toFixed(1)} times more than you!`
        } else {
            return `You weigh ${(humanWeight / this.weight).toFixed(1)} times more than ${this.species} weighed!`
        }
    },
    compareHeight: function (humanHeight) {
        if (humanHeight <= this.height) {
            return `${this.species} was ${(this.height / humanHeight).toFixed(1)} times taller than you!`
        } else {
            return `You are ${(humanHeight / this.height).toFixed(1)} times taller than ${this.species} was!`
        }
    },
    compareDiet: function (humanDiet) {
        let article = "a"
        if (humanDiet === "omnivore") {
            article = "an"
        }
        if (humanDiet === this.diet) {
            return `You are ${article} ${humanDiet} and ${this.species} was too!`
        } else {
            return `You are ${article} ${humanDiet}, but ${this.species} was a ${this.diet}.`
        }
    }
}

Dino.prototype = protoDino

const dinoArray = []

for (const dino of dinos) {
    dinoArray.push(new Dino(dino))
}
dinoArray.splice(4, 0, "human placeholder")

// console.log(dinoArray[1].compareWeight(155))
// console.log(dinoArray[1].compareHeight(66))
// console.log(dinoArray[1].compareWeight(14000))
// console.log(dinoArray[1].compareHeight(660))
// console.log(dinoArray[1].compareDiet('herbivore'))
// console.log(dinoArray[1].compareDiet('omnivore'))
// console.log(dinoArray[1].compareDiet('carnivore'))

// Can I use closure here to make a counter that adds the human at middle square
// then uses the for..of structure in updateUI?
// that would also eliminate createHumanElement function
function createDinoElement(dinoData, humanData) {
    let fact
    let randomNumber
    if (dinoData.species === "Pigeon") {
        randomNumber = 2
    } else {
        randomNumber = Math.round(Math.random() * 5)
    }
    switch (randomNumber) {
        case 0:
            fact = `The ${dinoData.species} lived in ${dinoData.where}.`
            break
        case 1:
            fact = `The ${dinoData.species} lived in the ${dinoData.when} period.`
            break
        case 2:
            fact = dinoData.fact
            break
        case 3:
            fact = dinoData.compareWeight(humanData.weight)
            break
        case 4:
            fact = dinoData.compareHeight(humanData.height)
            break
        case 5:
            fact = dinoData.compareDiet(humanData.diet)
            break
        default:
            fact = "Dinosaurs are cool!"
    }
    const newDiv = document.createElement("div")
    newDiv.className = "grid-item"
    newDiv.innerHTML = `<h3>${dinoData.species}</h3><img src="images/${dinoData.species}.png" alt="image of ${dinoData.species}"><p>${fact}</p>`
    return newDiv
}

function createHumanElement(humanData) {
    const newDiv = document.createElement("div")
    newDiv.className = "grid-item"
    newDiv.innerHTML = `<h3>${humanData.name}</h3><img src="images/human.png" alt="image of human">`
    return newDiv
}

function updateUI(dinoArray, humanData) {
    const fragment = document.createDocumentFragment()
    for (let i = 0; i < 9; i++) {
        let gridSquare
        if (i === 4) {
            gridSquare = createHumanElement(humanData)
        } else {
            gridSquare = createDinoElement(dinoArray[i], humanData)
        }
        fragment.appendChild(gridSquare)
    }
    document.getElementById("grid").appendChild(fragment)
}

const humanData = {}

function clicked(e) {
    e.preventDefault()

    humanData.name = document.getElementById("name").value
    humanData.height = (document.getElementById("feet").value * 12) + Number(document.getElementById("inches").value)
    humanData.weight = document.getElementById("weight").value
    humanData.diet = document.getElementById("diet").value

    document.querySelector("form").style.display = "none"

    updateUI(dinoArray, humanData)
}

(function listener() {
    document.getElementById("btn").addEventListener("click", clicked)
})()
