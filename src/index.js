import './styles.css';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/Material.css';
import '@pnotify/core/dist/BrightTheme.css';
import debounce from 'lodash.debounce';
import { error } from '@pnotify/core';
import countryTemplate from './templates/country-template.hbs';
import fetchCountries from "./fetchCountries";

const countryInputRef = document.querySelector('.js-country-input');
const countryListRef = document.querySelector('.js-country-list');
const countryInfoRef = document.querySelector('.js-country-info');


const renderingCountryItem = data => {
  const markup = countryTemplate(data);
  countryInfoRef.insertAdjacentHTML('beforeend' ,markup);
};
const renderingCountryList = list => {
  const listItems = list.map(name => {
    const listItem = document.createElement('li');
    listItem.classList.add('country__item');
    listItem.textContent = name;
    return listItem;
  });
  countryListRef.append(...listItems)
};
const renderingError = () => {
  error('Your search returned no results, enter a different value');
};
const clearOldResult = () => {
  countryListRef.innerHTML = '';
  countryInfoRef.innerHTML = '';
};

const dataProcessing = data => {
  clearOldResult();
  if (data.length > 10) {
    error('Too many matches found. Please enter a more specific query');
    return;
  }
  if (data.length > 1) {
    renderingCountryList(data.map(country => country.name));
    return;
  }
  if (data.length === 1) {
    renderingCountryItem(data);
    return;
  }
  renderingError()
};

const sendRequest = () => {
  const inputValue = countryInputRef.value;
  if (inputValue.length) {
    fetchCountries(inputValue)
      .then(response => response.json())
      .then(data => dataProcessing(data))
      .catch(error => {
        console.error(error);
        error('Something went wrong, try again please');
      })
  }
};

countryInputRef.addEventListener('input', debounce(sendRequest, 500));
