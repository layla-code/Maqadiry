function initGlobal() {
  setActiveNav();
  updateCartCount();
  bindLoginTriggers();
  ensureLoginModal();
  if (window.lucide) {
    lucide.createIcons();
  }
}

document.addEventListener("DOMContentLoaded", () => {
  injectSharedLayout();
  initGlobal();
  renderFeaturedMeals();
  renderMealsPage();
  renderMealDetails();
  renderCartPage();
  renderCheckoutPage();
});
