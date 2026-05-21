function renderFeaturedMeals() {
  const root = $("#featured-meals");
  if (!root) return;
  root.innerHTML = getMeals().slice(0, 3).map((meal) => createMealCard(meal)).join("");
  bindMealCardActions(root);
  if (window.lucide) lucide.createIcons();
}
