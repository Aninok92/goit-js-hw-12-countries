import './css/style.css';
import countryCardTpl from './templates/country-card.hbs';
import countryListTpl from './templates/country-list.hbs';
import API from './js/fetchCountries';
import _debounce from 'debounce';
import { error, notice } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';

const refs = {
  cardContainer: document.querySelector('.js-card-container'),
  searchForm: document.querySelector('#country-input'),
};

refs.searchForm.addEventListener('input', _debounce(onSearch, 500));

function onSearch(e) {
  e.preventDefault();
  const searchQuery = refs.searchForm.value;
  console.log(searchQuery);

  API(searchQuery)
    .then(country => {
      const markup = countryCardTpl(country);
      const list = countryListTpl(country);
      if (country.length > 10) {
        clearCardContainer();
        pnotify(error);
      } else if (country.length > 1 && country.length < 10) {
        createCardContainer(list);
      } else if (country.length == 1) {
        createCardContainer(markup);
      } else {
        pnotify(notice);
      }
    })
    .catch(onFetchErr());
}

function createCardContainer(tpl) {
  clearCardContainer();
  refs.cardContainer.insertAdjacentHTML('beforeend', tpl);
}

function pnotify(param) {
  error({
    title: 'Uh Oh!',
    text: 'Too many matches found. Please enter a more specific quare',
    delay: 1500,
    closerHover: true,
  });
  notice({
    title: 'Uh Oh!',
    text: 'нет такой страны',
    delay: 1500,
    closerHover: true,
  });
}

function onFetchErr(error) {
  clearCardContainer();
  console.log(error);
}

function clearCardContainer() {
  refs.cardContainer.innerHTML = ' ';
}