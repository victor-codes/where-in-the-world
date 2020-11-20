const dropDown = document.getElementById('dropdown');
let modeText = document.querySelector('.modeText');
const inputField = document.getElementById('input');
let state = false;

const dropList = document.createElement('ul');
dropList.classList.add('droplist');

const list = ['Africa', 'Americans', 'Asia', 'Europe', 'Oceania']
for (let i = 0; i < list.length; i++) {
    const dropItem = document.createElement('li');
    dropItem.innerHTML = list[i]

    dropList.appendChild(dropItem);
    dropItem.addEventListener('click', () => {
        document.querySelector('.region').innerHTML = list[i]
        dropDown.style.transform = `rotate(0deg)`;
        document.querySelector('.select__region').removeChild(dropList);
        state = false
    })
}

window.addEventListener('DOMContentLoaded', () => {
    const darkModeToggle = document.getElementById('theme_toggle');

    const currentTheme = localStorage.getItem('theme') ? localStorage.getItem('theme') : null;

    if (currentTheme) {
        document.documentElement.setAttribute('data-theme', currentTheme);

        if (currentTheme === 'dark') {
            darkModeToggle.checked = true;
            modeText.innerHTML = 'Light Mode'
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
        document.querySelector('.droplist').style.padding = `16px;`
        state = true;
    } else {
        dropDown.style.transform = `rotate(0deg)`;
        document.querySelector('.select__region').removeChild(dropList);
        state = false;
    }
})

fetch('https://restcountries.eu/rest/v2/all').then(response => {
    if (!response.ok) { throw new Error(`HTTP error status: ${response.status}`); } else { return response.json() };
}).then(data => { return content(data) }).catch(err => { `There has been a error with your fetch operation: ${err.message}` });

function content(param) {
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
        let populationData = document.createElement('span');
        let regionData = document.createElement('span');
        let capitalData = document.createElement('span');

        populationData.innerHTML = `${number(population)}`;
        regionData.innerHTML = region;
        capitalData.innerHTML = capital;

        name.innerHTML = countryName;
        populationEl.innerHTML = `Population: `;
        regionEl.innerHTML = `Region: `;
        capitalEl.innerHTML = `Capital: `;
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

        populationContainer.appendChild(populationData);
        capitalContainer.appendChild(regionData);
        regionContainer.appendChild(capitalData);

        countryData.appendChild(name);
        countryData.appendChild(populationContainer);
        countryData.appendChild(regionContainer);
        countryData.appendChild(capitalContainer);

        cardItem.appendChild(flag);
        cardItem.appendChild(countryData);

        document.querySelector('.card__container').appendChild(cardItem);
        function filterByCountry() {
            let value = inputField.value.toLowerCase();
            let nameLower = countryName.toLowerCase()
            // console.log(value);
            if (value.length < 1) {
                // cardItem.style.display = 'block'
                document.querySelector('.card__container').appendChild(cardItem)
            }
            else if (value.length > 0) {
                if (!(nameLower.includes(value))) {
                    // cardItem.style.display = 'none'
                    document.querySelector('.card__container').removeChild(cardItem)
                }
                else if (nameLower.includes(value)) {
                    // cardItem.style.display = 'block'
                    document.querySelector('.card__container').appendChild(cardItem)
                }
            }
        }

        inputField.addEventListener('input', filterByCountry);

    });
};
function number(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}