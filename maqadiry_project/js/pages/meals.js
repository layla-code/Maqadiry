function createMealCard(meal) {
  return `
    <article class="meal-card" data-open-meal="${meal.id}" tabindex="0" role="button" aria-label="عرض تفاصيل ${meal.name}">
      <div class="meal-image" data-open-meal="${meal.id}">
        <img src="${meal.image}" alt="${meal.name}">
      </div>
      <div class="meal-body" data-open-meal="${meal.id}">
        <div class="meal-topline">
          <span class="tag green">${meal.category}</span>
          <span class="tag gold">${meal.badge || meal.servingSize}</span>
        </div>
        <div class="meal-copy" data-open-meal="${meal.id}">
          <h3 class="meal-title">${getMealCardTitle(meal.name)}</h3>
          <p class="meal-description">${meal.shortDescription}</p>
        </div>
        <div class="meal-meta">
          <div>
            <div class="mini-price">${meal.pricePerServing}</div>
            <div class="per-serving">ريال لكل حصة</div>
          </div>
          <div class="mini-meta"><i data-lucide="clock-3"></i><span class="numeric">${meal.prepTime}</span> دقيقة</div>
        </div>
        <div class="tags-wrap">
          ${meal.basicIngredients.slice(0, 3).map((ingredient) => `<span class="tag">${ingredient}</span>`).join("")}
        </div>
        ${createNutritionPreview(meal)}
        <div class="card-actions">
          <button class="button add-to-cart" type="button" data-add-to-cart="${meal.id}">أضف للسلة</button>
        </div>
      </div>
    </article>
  `;
}

function searchMeals(meals, query) {
  const safeQuery = (query || "").trim().toLowerCase();
  if (!safeQuery) return meals;
  return meals.filter((meal) => {
    const haystack = [
      meal.name,
      meal.category,
      meal.shortDescription,
      meal.allergens,
      ...meal.basicIngredients
    ].join(" ").toLowerCase();
    return haystack.includes(safeQuery);
  });
}

function filterMeals(meals, filters) {
  return meals.filter((meal) => {
    const matchesCategory = !filters.category || filters.category === "الكل" || meal.category === filters.category;
    const matchesPrep = !filters.prep
      || (filters.prep === "lt30" && meal.prepTime < 30)
      || (filters.prep === "30to60" && meal.prepTime >= 30 && meal.prepTime <= 60)
      || (filters.prep === "gt60" && meal.prepTime > 60)
      || filters.prep === "";
    const matchesPrice = !filters.price
      || (filters.price === "10to25" && meal.pricePerServing >= 10 && meal.pricePerServing <= 25)
      || (filters.price === "26to40" && meal.pricePerServing >= 26 && meal.pricePerServing <= 40)
      || (filters.price === "gt40" && meal.pricePerServing > 40)
      || filters.price === "";
    return matchesCategory && matchesPrep && matchesPrice;
  });
}

function sortMeals(meals, sortValue) {
  const sorted = meals.slice();
  if (sortValue === "low") {
    sorted.sort((a, b) => a.pricePerServing - b.pricePerServing);
  } else if (sortValue === "prep") {
    sorted.sort((a, b) => a.prepTime - b.prepTime);
  } else {
    sorted.sort((a, b) => (b.popularity || 0) - (a.popularity || 0));
  }
  return sorted;
}

function renderMeals(items = getMeals()) {
  const grid = $("#meals-grid");
  if (!grid) return;
  const resultsCount = $("#results-count");
  if (resultsCount) {
    resultsCount.textContent = `${items.length} ${items.length === 1 ? "نتيجة" : "نتائج"}`;
  }
  grid.innerHTML = items.length
    ? items.map((meal) => createMealCard(meal)).join("")
    : `<div class="card feedback-card"><h3>لا توجد نتائج مطابقة</h3><p>جرّب تعديل البحث أو الفلاتر للوصول إلى وجبة مناسبة.</p></div>`;
  bindMealCardActions(grid);
  if (window.lucide) lucide.createIcons();
}

function bindMealCardActions(scope = document) {
  $$("[data-open-meal]", scope).forEach((node) => {
    if (node.dataset.boundOpen === "true") return;
    node.dataset.boundOpen = "true";
    node.addEventListener("click", (event) => {
      const trigger = event.target.closest("[data-add-to-cart]");
      if (trigger) return;
      const id = node.dataset.openMeal || node.closest("[data-open-meal]")?.dataset.openMeal;
      if (id) openMealDetails(id);
    });
    node.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        const id = node.dataset.openMeal;
        if (id) openMealDetails(id);
      }
    });
  });

  $$("[data-add-to-cart]", scope).forEach((button) => {
    if (button.dataset.boundCart === "true") return;
    button.dataset.boundCart = "true";
    button.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      addToCart(button.dataset.addToCart, 1);
    });
  });
}

function renderMealsPage() {
  const grid = $("#meals-grid");
  if (!grid) return;
  const searchInput = $("#meal-search");
  const sortSelect = $("#sort-select");
  const prepInputs = $$("input[name='prep']");
  const priceInputs = $$("input[name='price']");
  const chips = $$("[data-category]");
  let activeCategory = "الكل";

  const apply = () => {
    const prep = $("input[name='prep']:checked")?.value || "";
    const price = $("input[name='price']:checked")?.value || "";
    const sortValue = sortSelect?.value || "popular";
    const searched = searchMeals(getMeals(), searchInput?.value || "");
    const filtered = filterMeals(searched, { category: activeCategory, prep, price });
    renderMeals(sortMeals(filtered, sortValue));
  };

  searchInput?.addEventListener("input", apply);
  sortSelect?.addEventListener("change", apply);
  prepInputs.forEach((input) => input.addEventListener("change", apply));
  priceInputs.forEach((input) => input.addEventListener("change", apply));
  chips.forEach((chip) => {
    chip.addEventListener("click", () => {
      activeCategory = chip.dataset.category;
      chips.forEach((item) => item.classList.toggle("active", item === chip));
      apply();
    });
  });
  apply();
}
