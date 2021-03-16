import './styles.css';
// import './fetchCountries';
import fetchCountries from './fetchCountries';
import countriesListTmpl from './templates/countriesList.hbs';
import countryTmpl from './templates/country.hbs';
import debounce from 'lodash.debounce';

import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';
import { alert, error } from '@pnotify/core/dist/PNotify.js';

error({
  text: 'Notice me, senpai!',
});

const refs = {
  input: document.querySelector('#input'),
  countriesList: document.querySelector('.country-list'),
};

refs.input.addEventListener('input', debounce(onInput, 500));

function onInput(e) {
  if (!e.target.value) {
    refs.input.innerHTML = '';
    return;
  }

  fetchCountries(e.target.value)
    .then(countries => countryMarkup(countries))
    .catch(err => error({ text: err.message }));
}

function countryMarkup(countries) {
  console.log(countries);
  if (countries.langth === 1) {
    refs.countriesList.insertAdjacentHTML('beforeend', countriesListTmpl);
    return;
  }
  if (countries.langth >= 2 && countries.langth <= 10) {
    refs.countriesList.insertAdjacentHTML('beforeend', countryTmpl);
    return;
  }
}
