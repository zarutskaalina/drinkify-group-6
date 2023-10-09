import { getCardInfo } from "./cocktails-modal";
import spriteUrl from '/src/images/sprite.svg';

const cocktailsContainer = document.querySelector('.cocktails-list');
const currentLS = 'favoriteCocktails';
const dataCocktails = JSON.parse(localStorage.getItem(currentLS));
const dataPlaceholder = document.querySelector(".empty-search");
console.log(dataCocktails);

function createCard({_id, drinkThumb, drink, description}) {
  return `<li class="cocktails-item" id="${_id}">
                    <img class="cocktails-image" src="${drinkThumb}" alt="foto ${drink}" />
                    <h3 class="cocktails-name">${drink}</h3>
                    <p class="cocktails-description">${description}</p>
                    <div class="cocktails-buttons">
                    <button class="cocktails-button" data-id="${_id}">learn more</button>
                    <button class="cocktails-button-favorite trash-btn">
                    <svg class="icon-trash" width="18" height="18">
                      <use href="${spriteUrl}#icon-trash-mobile-white"></use>
                    </svg>
                    </button>
                    </div>
          </li>`
};

function renderFavoriteCocktails(arr, container) {
  const markup = arr.map(item => createCard(item)).join('');
  container.innerHTML = markup;
  const learnMoreBtns = document.querySelectorAll('.cocktails-button');
  learnMoreBtns.forEach(button => {
    button.addEventListener('click', getCardInfo);
  });
  
  if (dataCocktails.length > 0) {
    dataPlaceholder.style.display = "none";
  };
  if (dataCocktails.length === 0) {
    cocktailsContainer.style.display = "none";
    dataPlaceholder.style.display = "block";
  };

};

function onDeleteCardBtn(event) {
  const clickedElement = event.target;

  if (clickedElement.classList.contains('trash-btn')) {
    const cocktailId = clickedElement.closest('.cocktails-item').getAttribute('data-id');
    const indexToDelete = dataCocktails.findIndex(cocktail => cocktail._id === cocktailId);
    dataCocktails.splice(indexToDelete, 1);
    localStorage.setItem(currentLS, JSON.stringify(dataCocktails));
    renderFavoriteCocktails(dataCocktails,cocktailsContainer);
  };
};

renderFavoriteCocktails(dataCocktails,cocktailsContainer);
cocktailsContainer.addEventListener('click', onDeleteCardBtn);
