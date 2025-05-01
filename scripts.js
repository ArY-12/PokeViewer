const pokeInput = document.getElementById('pokemon-input')
const getButton = document.getElementById('get-pokemon-btn')
const errorMessage = document.getElementById('error-message')
const pokeInfo = document.getElementById('pokemon-info')
const pokeName = document.getElementById('pokemon-name')
const pokeImg = document.getElementById('pokemon-image')
const pokeType = document.getElementById('pokemon-type')
const pokeHeight = document.getElementById('pokemon-height')
const pokeWeight = document.getElementById('pokemon-weight')

//api
const API_URL = 'https://pokeapi.co/api/v2/pokemon/'

async function SearchPokemon(){
    let pokemon_name_input = pokeInput.value.trim()

    if(pokemon_name_input === ''){
        return
    }
    try {
        const data = await fetchPokemon(pokemon_name_input)
        displayPokemon(data)
    } catch (error) {
        errorM()
    }

    pokemon_name_input.value = ""

}

async function fetchPokemon(pokemon_name_input){
    const response = await fetch(`${API_URL}${pokemon_name_input}`)
    if(!response.ok){
        throw new Error("Error fetching the data!");
    }
    const data = await response.json()
    return data
}


function displayPokemon(data){
    //name(species), image(sprites), type(types), height(height), weight(weight)
    errorMessage.classList.add('hidden')
    pokeInfo.classList.remove('hidden')

    pokeName.textContent = data.name;  // For Pokémon name
    pokeHeight.textContent = ` ${data.height /10}m`;  // Height
    pokeWeight.textContent = ` ${data.weight /10}kg`;  // Weight

    //for the type of pokemon
    const types = data.types.map(typeInfo => typeInfo.type.name).join(', ');
    pokeType.textContent = ` ${types}`;


    pokeImg.src = data.sprites.front_default;
    pokeImg.alt = `${data.name} image`; // Optional: Adding an alt description



}

function errorM(){
    errorMessage.classList.remove('hidden')
    pokeInfo.classList.add('hidden')
}

getButton.addEventListener('click', SearchPokemon)

document.addEventListener('keydown', (event) => {
    if(event.key === 'Enter') SearchPokemon()
})
