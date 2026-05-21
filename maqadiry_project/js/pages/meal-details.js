function renderMealDetails() {
  const root = $("#meal-details-root");
  if (!root) return;
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
  const meal = getMealById(id);

  if (!meal) {
    root.innerHTML = `
      <div class="empty-state card">
        <h1>الوجبة غير موجودة</h1>
        <p>تعذر العثور على الوجبة المطلوبة.</p>
        <a class="button" href="meals.html">العودة للقائمة</a>
      </div>
    `;
    return;
  }

  const defaultPeople = 2;
  const subtotal = meal.pricePerServing * defaultPeople;

  root.innerHTML = `
    <section class="container section-space">
      <div class="details-layout">
        <article class="card details-card">
          <div class="details-media">
            <img src="${meal.image}" alt="${meal.name}">
          </div>
          <div class="details-content">
            <div class="meal-topline">
              <span class="tag green">${meal.category}</span>
              <span class="tag gold">${meal.badge || "مقادير جاهزة للطبخ"}</span>
            </div>
            <h1 class="details-title">${getMealCardTitle(meal.name)}</h1>
            <p class="meal-description">${meal.shortDescription}</p>

            <div class="details-meta-grid">
              <div class="details-meta-card"><span>السعر لكل حصة</span><strong class="price">${formatCurrency(meal.pricePerServing)}</strong></div>
              <div class="details-meta-card"><span>وقت التحضير</span><strong><span class="numeric">${meal.prepTime}</span> دقيقة</strong></div>
              <div class="details-meta-card"><span>حجم الحصة</span><strong>${meal.servingSize}</strong></div>
            </div>

            <div class="details-counter-row">
              <div>
                <h3>عدد الأشخاص</h3>
                <div class="people-selector" data-details-picker data-value="${defaultPeople}">
                  <button type="button" data-action="decrease">−</button>
                  <span class="counter-value"><span class="numeric">${defaultPeople}</span> أشخاص</span>
                  <button type="button" data-action="increase">+</button>
                </div>
              </div>
              <div class="details-subtotal-box">
                <span>الإجمالي</span>
                <strong class="summary-value" data-details-subtotal>${formatCurrency(subtotal)}</strong>
              </div>
            </div>

            <section class="details-section">
              <h2>المكونات الأساسية</h2>
              <div class="tags-wrap">
                ${meal.basicIngredients.map((ingredient) => `<span class="tag">${ingredient}</span>`).join("")}
              </div>
            </section>

            <section class="details-section">
              <h2>القيم الغذائية التقريبية</h2>
              <div class="details-nutrition-grid">
                <div class="nutrition-item"><span>السعرات</span><div class="nutrition-value">${meal.nutrition.calories}</div></div>
                <div class="nutrition-item"><span>البروتين</span><div class="nutrition-value">${meal.nutrition.protein}</div></div>
                <div class="nutrition-item"><span>الكربوهيدرات</span><div class="nutrition-value">${meal.nutrition.carbs}</div></div>
                <div class="nutrition-item"><span>الدهون</span><div class="nutrition-value">${meal.nutrition.fat}</div></div>
                <div class="nutrition-item"><span>الصوديوم</span><div class="nutrition-value">${meal.nutrition.sodium}</div></div>
                <div class="nutrition-item"><span>الألياف</span><div class="nutrition-value">${meal.nutrition.fiber}</div></div>
              </div>
            </section>

            <section class="details-section">
              <h2>مسببات الحساسية</h2>
              <div class="helper-box">${meal.allergens}</div>
            </section>

            <div class="inline-note">القيم الغذائية تقريبية ومحسوبة لكل حصة، وقد تختلف حسب حجم المكونات وتوفرها.</div>
            <div class="inline-note">سيتم إرسال الوصفة والكميات التفصيلية عبر البريد الإلكتروني بعد إتمام الطلب.</div>

            <div class="details-actions">
              <button class="button" type="button" data-details-add="${meal.id}">أضف للسلة</button>
              <a class="button-outline" href="meals.html">العودة للقائمة</a>
            </div>
          </div>
        </article>
      </div>
    </section>
  `;

  const picker = $("[data-details-picker]", root);
  const subtotalNode = $("[data-details-subtotal]", root);
  let peopleCount = defaultPeople;

  const renderPicker = () => {
    $(".counter-value", picker).innerHTML = `<span class="numeric">${peopleCount}</span> أشخاص`;
    subtotalNode.textContent = formatCurrency(meal.pricePerServing * peopleCount);
  };

  $$("button", picker).forEach((button) => {
    button.addEventListener("click", () => {
      if (button.dataset.action === "increase" && peopleCount < 10) peopleCount += 1;
      if (button.dataset.action === "decrease" && peopleCount > 1) peopleCount -= 1;
      renderPicker();
    });
  });

  $("[data-details-add]", root)?.addEventListener("click", () => {
    addToCart(meal.id, peopleCount);
  });

  renderPicker();
}
