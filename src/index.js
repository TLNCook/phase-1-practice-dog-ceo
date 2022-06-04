// console.log('%c HI', 'color: firebrick')
const imgUrl = "https://dog.ceo/api/breeds/image/random/4"
const breedUrl = 'https://dog.ceo/api/breeds/list/all'
let breedsArray;

document.addEventListener('DOMContentLoaded', () => {
    const dropdown = document.getElementById('breed-dropdown');
    dropdown.prepend(new Option('*', '*')); // Adds a new option tag at the beginning of the select dropdown
    dropdown.selectedIndex = 0; // Sets the starting option as the newly prepended option
    fetchBreedImage(); // Fetches 4 random dog images
    fetchBreed(); // Fetches a list of all dog breeds
    dropdown.addEventListener('change', () => {
        filterByLetter(breedsArray, dropdown); // Passing the breedsArray and the dropdown element to the filterByLetter function
    })
});


function fetchBreedImage() {
    fetch(imgUrl)
    .then((response) => response.json())
    .then((breeds) => {
        // breeds is returned as an object with a message key for an array that contains 4
        // random dog images. We need to get the array so we can itterate over it.
        const dogsArray = breeds.message;
        dogsArray.forEach(showOneBreed)
    });
}

function fetchBreed() {
    fetch(breedUrl)
    .then((response) => response.json())
    .then((breeds) => {
        // breeds is returned as an object with a message key for an array that contains 4
        // random dog images. We need to get the array so we can itterate over it.
        breedsArray = Object.keys(breeds.message);
        breedsArray.forEach(listBreeds)
    });
}

function filterByLetter(breedsArray, dropdown) {
    const filterLetter = dropdown.value;
    let filteredArray;
    document.getElementById('dog-breeds').textContent = '';
    if (dropdown.value === '*') {
        filteredArray = breedsArray;
    } else {
        filteredArray = breedsArray.filter((breed) =>
             breed.startsWith(filterLetter));
    }
    filteredArray.forEach(listBreeds);
}
function listBreeds(breed) {
    const unorderdList = document.getElementById('dog-breeds');
    const li = document.createElement('li');
    li.innerText = breed;
    unorderdList.append(li);
    li.addEventListener('click', (e)=> {
        e.target.style.color = 'red';
    });
}

function showOneBreed(breed) {
    const breedList = document.getElementById('dog-image-container');
    const image = document.createElement('img');
    image.src = breed;
    image.alt = breed.name;
    breedList.append(image);
}


