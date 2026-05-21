function formatCurrency(value) {
  return `${Number(value || 0)} ريال`;
}

function updateCartCount() {
  const count = getCart().length;
  $$("[data-cart-count]").forEach((node) => {
    node.textContent = String(count);
  });
}

function showToast(message) {
  let stack = $(".toast-stack");
  if (!stack) {
    stack = document.createElement("div");
    stack.className = "toast-stack";
    document.body.appendChild(stack);
  }
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.textContent = message;
  stack.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateY(8px)";
  }, 2200);
  setTimeout(() => toast.remove(), 2600);
}

function getItemPeopleLabel(count) {
  return `${count} ${count === 1 ? "شخص" : "أشخاص"}`;
}

function openMealDetails(id) {
  window.location.href = `meal-details.html?id=${encodeURIComponent(id)}`;
}

function createNutritionPreview(meal) {
  return `
    <div class="nutrition-preview">
      <span>السعرات: <strong class="nutrition-value">${meal.nutrition.calories}</strong></span>
      <span>البروتين: <strong class="nutrition-value">${meal.nutrition.protein}</strong></span>
      <span>الكربوهيدرات: <strong class="nutrition-value">${meal.nutrition.carbs}</strong></span>
    </div>
  `;
}

function getMealCardTitle(name) {
  return String(name || "").replace(/^مقادير\s+/, "").trim();
}
