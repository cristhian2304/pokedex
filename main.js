// Elementos principales
const pokemonList = document.getElementById("pokemonList");
const pokemonDetail = document.getElementById("pokemonDetail");
const backBTN = document.getElementById("backBTN");
const pokemonInfo = document.getElementById("pokemonInfo");
const entrada = document.getElementById("entrada")
const buscarBTN = document.getElementById("buscarBTN")
let consulta  = " "

// Función para obtener datos de un Pokémon de la API
async function fetchPokemonData(pokemonId) {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
    if (!response.ok) throw new Error("Error al obtener datos del Pokémon.");
    const pokemon = await response.json();
    return pokemon;
  } catch (error) {
    console.error(error);
    return null;
  }
}

// Función para mostrar una tarjeta de Pokémon
function displayPokemon(pokemon) {
  if (!pokemon) return;
  const pokemonCard = document.createElement("div");
  pokemonCard.classList.add("pokemonCard");
  pokemonCard.innerHTML = `
    <h3>${pokemon.name}</h3>
    <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
  `;
  pokemonCard.addEventListener("click", () => showPokemonDetail(pokemon));
  pokemonList.appendChild(pokemonCard);
}

// Función para mostrar los detalles de un Pokémon
entrada.addEventListener("input",(evento)=>{
  consulta = evento.target.value;
  console.log(consulta)
})

async function searchPokemon (){
  try{
   const pokemon = await fetchPokemonData(consulta)
   showPokemonDetail(pokemon)

  }catch (eror) {
   alert ("pokemon no encontrado, intenta con otro ID o nombre")
  }
  }

buscarBTN.addEventListener("clikc",()=>{
  console.log(consulta)
  showPokemonDetail(consulta)
})
function showPokemonDetail(pokemon) {
  if (!pokemon) return;
  pokemonList.style.display = "none";
  pokemonDetail.style.display = "block";

  const abilities = pokemon.abilities.map(ability => ability.ability.name).join(", ");
  console.log(abilities)

  const moves = pokemon.moves.map(move => `<li>${move.move.name}</li>`).join("")
  console.log(moves)

  const stats = pokemon.stats
    .map(stat => `<li>${stat.stat.name}: ${stat.base_stat}</li>`)
    .join("");

 console.log(pokemon)
  pokemonInfo.innerHTML = `
    <h3>${pokemon.name}</h3>
    <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
    <h4>Habilidades: ${abilities}</h4>
    <h4>Estadísticas:</h4>
    <ul>${stats}</ul>
    <h4>movimientos:</h4>
    <ul>${moves}</ul>
  `;
}

// Botón para regresar a la lista
backBTN.addEventListener("click", () => {
  pokemonDetail.style.display = "none";
  pokemonList.style.display = " ";
});

// Cargar el Pokédex
async function loadPokedex() {
  for (let i = 1; i <= 50; i++) {
    const pokemon = await fetchPokemonData(i);
    displayPokemon(pokemon);
  }
}

// Ejecutar la carga al inicio
loadPokedex();
