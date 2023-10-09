export function favoriteHandler(event, cocktails) {
  // console.log(cocktails);
  const id = event.currentTarget.getAttribute('data-id');
  const favoriteCocktails =
    JSON.parse(localStorage.getItem('favoriteCocktails')) || [];
  const index = favoriteCocktails.findIndex(item => item._id === id);
  if (index === -1) {
    const chosenCocktail = cocktails.find(item => item._id === id);
    favoriteCocktails.push(chosenCocktail);
    markAsFavorite(event.currentTarget);
  } else {
    favoriteCocktails.splice(index, 1);
    markAsFavorite(event.currentTarget);
  }
  localStorage.setItem('favoriteCocktails', JSON.stringify(favoriteCocktails));
}

export function markAsFavorite(event) {
  const svg = event.firstElementChild;
  if (!svg.classList.contains('isFavorite')) {
    svg.classList.add('isFavorite');
  } else {
    svg.classList.remove('isFavorite');
  }
}
