const title = document.getElementsByClassName('title');
const card = document.getElementsByClassName('card')[0];
const image = document.getElementById('image');
const nextButton = document.getElementById('button');
const backButton = document.getElementById('button2');
const abilities = document.getElementById('abilities');
const h3 = document.querySelector('h3');

let url = 'https://pokeapi.co/api/v2/pokemon/1';
let num = 0;
let clicked = true;

nextButton.addEventListener('click', () => {
    url = 'https://pokeapi.co/api/v2/pokemon/';
    clicked = false;
    getData();
    abilities.innerHTML = 'Abilities: ';
});

backButton.addEventListener('click', () => {
    url = 'https://pokeapi.co/api/v2/pokemon/';
    clicked = true;
    getData();
    abilities.innerHTML = 'Abilities: ';
});

const changeParagraph = (data) => {
    h3.innerHTML = data.name;
    image.src = data.sprites.front_default;
    if (data.abilities[0].ability.name && data.abilities[1]) {
        abilities.innerHTML += 
            `${data.abilities[0].ability.name} and 
            ${data.abilities[1].ability.name}`;
    } else {
        abilities.innerHTML += 
            `${data.abilities[0].ability.name}`;
            console.log(data.abilities[0].ability.name);
    }
};

const nextPokemon = () => {
    num++;
    url += num;
    console.log(url);
    return url;
}

const prevPokemon = () => {
    num--;
    url += num;
    console.log(url);
    return url;
}

async function getData() {
    abilities.style.display = 'block';
    if (clicked) {
        let data = await fetch(prevPokemon())
        .then((response) => response.json())
        .then(data => {
            return data;
        })
        .catch(error => {
            console.error(error);
        }); 
        changeParagraph(data);
        console.log(data);
    } else {
        let data = await fetch(nextPokemon())
            .then((response) => response.json())
            .then(data => {
                return data;
            })
            .catch(error => {
                console.error(error);
            });
            changeParagraph(data);
            console.log(data);
        }
    };