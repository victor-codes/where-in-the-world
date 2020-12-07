const dropDown = document.getElementById('dropdown');
let modeText = document.querySelector('.modeText');
const inputField = document.getElementById('input');
let filterRegion = document.querySelector('.region');
const changeRegionContainer = document.querySelector('.select__region');
const cardContainer = document.querySelector('.card__container');
const errorDiv = document.querySelector('.error-message-container');

let state = false;
let url;

const dropList = document.createElement('ul');
dropList.classList.add('droplist');

const list = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];

for (let i = 0; i < list.length; i++) {
    const dropItem = document.createElement('li');
    dropItem.innerHTML = list[i]

    dropList.appendChild(dropItem);

    dropList.addEventListener('click', (e) => {
        filterRegion.textContent = e.target.textContent;
        dropDown.style.transform = `rotate(0deg)`;
        changeRegionContainer.removeChild(dropList);
        state = false;
        fetchQuery();
    });
}
window.addEventListener('load', () => {
    const darkModeToggle = document.getElementById('theme_toggle');

    const currentTheme = localStorage.getItem('theme') ? localStorage.getItem('theme') : null;

    if (currentTheme) {
        document.documentElement.setAttribute('data-theme', currentTheme);

        if (currentTheme === 'dark') {
            darkModeToggle.checked = true;
            modeText.innerHTML = 'Light Mode';
        }
    }

    const switchTheme = (e) => {
        if (e.target.checked) {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
            modeText.innerHTML = 'Light Mode';
        }
        else {
            document.documentElement.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
            modeText.innerHTML = 'Dark Mode';
        }
    }
    darkModeToggle.addEventListener('change', switchTheme, false);
});

dropDown.addEventListener('click', function () {
    if (!state) {
        dropDown.style.transform = `rotate(-180deg)`;
        document.querySelector('.select__region').appendChild(dropList);
        document.querySelector('.droplist').style.height = `auto`;
        state = true;
    } else {
        dropDown.style.transform = `rotate(0deg)`;
        document.querySelector('.select__region').removeChild(dropList);
        state = false;
    }
});


function fetchQuery() {
    if (filterRegion.textContent.toLowerCase() === 'africa') {

        url = `https://restcountries.eu/rest/v2/region/${filterRegion.textContent.toLowerCase()}`;

    } else if (filterRegion.textContent.toLowerCase() === 'americas') {

        url = `https://restcountries.eu/rest/v2/region/${filterRegion.textContent.toLowerCase()}`;

    } else if (filterRegion.textContent.toLowerCase() === 'asia') {

        url = `https://restcountries.eu/rest/v2/region/${filterRegion.textContent.toLowerCase()}`;

    } else if (filterRegion.textContent.toLowerCase() === 'europe') {

        url = `https://restcountries.eu/rest/v2/region/${filterRegion.textContent.toLowerCase()}`;

    } else if (filterRegion.textContent.toLowerCase() === 'oceania') {

        url = `https://restcountries.eu/rest/v2/region/${filterRegion.textContent.toLowerCase()}`;

    } else {

        url = `https://restcountries.eu/rest/v2/all`
    }

    fetchOpertion();
}

window.onload = fetchQuery;


function content(param) {
    while (cardContainer.firstChild) {
        cardContainer.removeChild(cardContainer.firstChild);
    }
    errorDiv.style.display = 'none';

    param.forEach(element => {
        let countryName = element.name;
        let population = element.population;
        let region = element.region;
        let capital = element.capital;
        let countryFlag = element.flag;

        let cardItem = document.createElement('div');
        let flag = document.createElement('div');
        let countryData = document.createElement('div');
        let name = document.createElement('h2');

        let populationContainer = document.createElement('div');
        let capitalContainer = document.createElement('div');
        let regionContainer = document.createElement('div');

        let populationEl = document.createElement('p');
        let regionEl = document.createElement('p');
        let capitalEl = document.createElement('p');

        name.textContent = countryName;
        populationEl.innerHTML = `Population: <span>${number(population)}</span>`;
        regionEl.innerHTML = `Region: <span>${region}</span>`;
        capitalEl.innerHTML = `Capital: <span>${capital}</span>`;

        flag.style.background = `url('${countryFlag}')`;

        cardItem.classList.add('card__item');
        flag.classList.add('flag');
        countryData.classList.add('country__info');

        populationContainer.classList.add('data')
        regionContainer.classList.add('data')
        capitalContainer.classList.add('data')

        populationContainer.appendChild(populationEl);
        capitalContainer.appendChild(regionEl);
        regionContainer.appendChild(capitalEl);

        countryData.appendChild(name);
        countryData.appendChild(populationContainer);
        countryData.appendChild(regionContainer);
        countryData.appendChild(capitalContainer);

        cardItem.appendChild(flag);
        cardItem.appendChild(countryData);

        cardContainer.appendChild(cardItem);
    });
};

function number(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function filterByCountry() {
    let value = inputField.value.toLowerCase();
    if (value.length > 1) {
        url = `https://restcountries.eu/rest/v2/name/${value}`;
    } else {
        url = `https://restcountries.eu/rest/v2/all`
    }
    fetchOpertion()
}

inputField.addEventListener('input', filterByCountry);

function fetchOpertion() {
    let myFetch = fetch(url).then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error status: ${response.status}`);
        } else {
            return response.json();
        }
    }).then(result => {
        return content(result)
    }).catch(err => {
        errorDisplay();
        console.log(`There has been a error with your fetch operation: ${err.message} ${err.status}`);
    });

    // Promise.all([myFetch]).then(param => {

    //     while (cardContainer.firstChild) {
    //         cardContainer.removeChild(cardContainer.firstChild);
    //     }

    //     param.map(element => {

    //         const countryName = element.name;
    //         const population = element.population;
    //         const region = element.region;
    //         const capital = element.capital;
    //         const countryFlag = element.flag;
    //         const cardItem = document.createElement('div');
    //         const flag = document.createElement('div');
    //         const countryData = document.createElement('div');
    //         const name = document.createElement('h2');

    //         const populationContainer = document.createElement('div');
    //         const capitalContainer = document.createElement('div');
    //         const regionContainer = document.createElement('div');

    //         const populationEl = document.createElement('p');
    //         const regionEl = document.createElement('p');
    //         const capitalEl = document.createElement('p');

    //         name.textContent = countryName;
    //         populationEl.innerHTML = `Population: <span>${population}</span>`;
    //         regionEl.innerHTML = `Region: <span>${region}</span>`;
    //         capitalEl.innerHTML = `Capital: <span>${capital}</span>`;

    //         flag.style.background = `url('${countryFlag}')`;

    //         cardItem.classList.add('card__item');
    //         flag.classList.add('flag');
    //         countryData.classList.add('country__info');

    //         populationContainer.classList.add('data')
    //         regionContainer.classList.add('data')
    //         capitalContainer.classList.add('data')

    //         populationContainer.appendChild(populationEl);
    //         capitalContainer.appendChild(regionEl);
    //         regionContainer.appendChild(capitalEl);

    //         countryData.appendChild(name);
    //         countryData.appendChild(populationContainer);
    //         countryData.appendChild(regionContainer);
    //         countryData.appendChild(capitalContainer);

    //         cardItem.appendChild(flag);
    //         cardItem.appendChild(countryData);

    //         cardContainer.appendChild(cardItem);
    //     });
    // })
}


function errorDisplay() {
    while (cardContainer.firstChild) {
        cardContainer.removeChild(cardContainer.firstChild);
    }
    errorDiv.style.display = 'block';

}