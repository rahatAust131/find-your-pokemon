

const searchField = document.getElementById("search-field");
const searchBtn = document.getElementById("search-btn");
const resultDiv = document.getElementById("result-container");
const loaderDiv = document.getElementById("loader");



searchBtn.addEventListener('click', () => {
  loaderDiv.style.display = "block";
  const url = `https://pokeapi.co/api/v2/pokemon/${searchField.value}`;

  async function makeRequest() {
    try {
      const response = await fetch(url);
      console.log('status code: ', response.status);
  
      if (!response.ok) {
        console.log(response);
        loaderDiv.style.display = "none";
        alert(`No pokemon named "${searchField.value}" was found in the Pokedex!`);
        searchField.value = "";
        throw new Error(`Error! status: ${response.status}`);
      }
  
      const result = await response.json();
      displayPokemon(result);
      
    } catch (err) {
      console.log(err);
    }
  }
  
  makeRequest();
    
  
});

const displayPokemon = (pokemon) => {
  console.log(pokemon);
  loaderDiv.style.display = "none";
  resultDiv.style.display = "block";

  if (pokemon) {
    resultDiv.innerHTML =
      `<h4>A wild ${pokemon.name} appeared!</h4>
    <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png" />
    <button id="details-btn">Details</button>
    `;

    const detailsBtn = document.getElementById("details-btn");

    detailsBtn.addEventListener('click', () => {
      console.log("You entered " + pokemon.name);
      showDetails(pokemon);
      detailsBtn.style.display = "none";
    })
  } else {
    alert("No Pokemon found with this name in the database!")
  }
};

const showDetails = (pokemon) => {
  const itemTitles = document.createElement("h4");
  itemTitles.innerText = "Held Items: ";
  resultDiv.appendChild(itemTitles);

  pokemon.held_items.forEach(item => {
    const itemNames = document.createElement("p");
    itemNames.innerText = `${item && item.item.name || "No item"}`;
    resultDiv.appendChild(itemNames);
  });

  const typeTitles = document.createElement("h4");
  typeTitles.innerText = "Types: ";
  resultDiv.appendChild(typeTitles);

  pokemon.types.forEach(type => {
    const typeNames = document.createElement("p");
    typeNames.innerText = `${type.type.name}`;
    resultDiv.appendChild(typeNames);
  });
  searchField.value = "";
}