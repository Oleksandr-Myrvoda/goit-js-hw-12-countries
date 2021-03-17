import './styles.css';
// import './fetchCountries';
import fetchCountries from './fetchCountries';
import countriesListTmpl from './templates/countriesList.hbs';
import countryTmpl from './templates/country.hbs';
import debounce from 'lodash.debounce';

import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';
import { error } from '@pnotify/core/dist/PNotify.js';

const refs = {
  input: document.querySelector('#input'),
  countriesList: document.querySelector('.country-list'),
};

refs.input.addEventListener('input', debounce(onInput, 500));

function onInput(e) {
  if (!e.target.value) {
    refs.countriesList.innerHTML = '';
    return;
  }

  fetchCountries(e.target.value)
    .then(countries => countryMarkup(countries))
    .catch(err => error({ text: err.message }));
}

function countryMarkup(countries) {
  refs.countriesList.innerHTML = '';
  if (countries.length === 1) {
    console.log(countriesListTmpl(countries));
    refs.countriesList.insertAdjacentHTML('beforeend', countryTmpl(countries));
    return;
  }
  if (countries.length >= 2 && countries.length <= 10) {
    refs.countriesList.insertAdjacentHTML(
      'beforeend',
      countriesListTmpl(countries),
    );
    return;
  }
  if (countries.length > 10) {
    error({
      text: 'Много совпадений. Уточните запрос!',
    });
    return;
  }
}
