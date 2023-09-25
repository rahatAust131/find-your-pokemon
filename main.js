

const searchField = document.getElementById("search-field");
const searchBtn = document.getElementById("search-btn");
const resultDiv = document.getElementById("result-container");

searchBtn.addEventListener('click', () => {
  const url = `https://pokeapi.co/api/v2/pokemon/${searchField.value}`;
  fetch(url)
    .then(res => res.json())
    .then(result => displayPokemon(result))
  });

  const displayPokemon = (pokemon) => {
    resultDiv.style.display = "block";
    resultDiv.innerHTML =
      `<h4>A wild ${pokemon.name} appeared!</h4>
    <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png" />
    <button id="details-btn">Details</button>
  `;
    const detailsBtn = document.getElementById("details-btn");
    detailsBtn.addEventListener('click', () => {
      console.log("You entered " + pokemon.name);
      searchField.innerText = "";
      showDetails(pokemon);
    })
  };

  const showDetails = (pokemon) => {
    const itemTitles = document.createElement("h4");
    itemTitles.innerText = "Held Items: ";
    resultDiv.appendChild(itemTitles);

    pokemon.held_items.forEach(item => {
      const itemNames = document.createElement("p");
      itemNames.innerText = `${item.item.name}`;
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
  }