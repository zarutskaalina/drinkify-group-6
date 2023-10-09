import { getIngredients } from './services';
import spriteUrl from '/src/images/sprite.svg';
import refs from './refs';
import {
  setFavoriteButtonContent,
  modalContent as modalIngredientContent,
  handleAddToFavorite,
} from './ingredient-modal';

const cocktailsContainer = document.querySelector(".ingredients-cards");
const dataPlaceholder = document.querySelector(".ingredients-placeholder");

const currentLS = 'ingredients';
const dataCocktails = JSON.parse(localStorage.getItem(currentLS));

let displayedCards = 6;

function renderIngredients() {
  if (!dataCocktails) return;
  const ingredientsCards = dataCocktails
    .slice(0, displayedCards)
    .map(({_id, title, alcohol, description}) => `
    <li class="ingredient-card" data-id="${_id}">
      <h2 class="ingredient-title">${title}</h2>
      <p class="alcohol-level">${alcohol === "Yes" ? "Alcoholic" : "Non-Alcoholic"}</p>
      <p class="ingredient-description">${description}</p>
      <div class="ingredients-buttons">
        <button type="button" class="learn-more-button button" data-id="${_id}">learn more</button>
        <button type="button" class="ingredients-button-remove button">
          <svg class="icon-trash" width="18" height="18">
            <use href="${spriteUrl}#icon-trash-mobile-white"></use>
          </svg>
        </button>
      </div>
    </li>
  `).join("");
  cocktailsContainer.innerHTML = ingredientsCards;

  if (dataCocktails.length > 0) {
    dataPlaceholder.style.display = "none";
  };
  if (dataCocktails.length === 0) {
    cocktailsContainer.style.display = "none";
    dataPlaceholder.style.display = "block";
  };
};

renderIngredients();

function onDeleteCardBtn(event) {
  const clickedElement = event.target;

  if (clickedElement.classList.contains('ingredients-button-remove')) {
    const cocktailId = clickedElement.closest('.ingredient-card').getAttribute('data-id');
    const indexToDelete = dataCocktails.findIndex(cocktail => cocktail._id === cocktailId);
    dataCocktails.splice(indexToDelete, 1);
    localStorage.setItem(currentLS, JSON.stringify(dataCocktails));
    renderIngredients();
  }
}

cocktailsContainer.addEventListener('click', onDeleteCardBtn);

document.querySelectorAll('.ingredients-cards').forEach(item => {
    item.addEventListener('click', e => {
      if (e.target.nodeName === 'BUTTON') {
        const ingredientId = e.target.dataset.id;
        console.log(ingredientId);

        getIngredients(ingredientId).then(res => {
          const currentIngredient = res[0];
          const modalContentMarkup = modalIngredientContent(res[0]);
          refs.ingredientModalContent.insertAdjacentHTML(
            'beforeend',
            modalContentMarkup
          );
          localStorage.setItem(
            'currentIngredient',
            JSON.stringify(currentIngredient)
          );
          refs.backdrop.classList.add('isShow');
          refs.ingredientModal.classList.add('isShow');
          setFavoriteButtonContent(ingredientId);
          refs.ingredientModalFavoriteButton.addEventListener(
            'click',
            handleAddToFavorite
          );
        });
      }
    });
  });