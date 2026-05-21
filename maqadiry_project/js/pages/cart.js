function buildCartItem(meal, peopleCount = 1, orderNotes = "") {
  return {
    id: meal.id,
    mealId: meal.id,
    name: meal.name,
    category: meal.category,
    pricePerServing: meal.pricePerServing,
    peopleCount: Math.max(1, Math.min(10, Number(peopleCount) || 1)),
    image: meal.image,
    shortDescription: meal.shortDescription,
    basicIngredients: meal.basicIngredients,
    allergens: meal.allergens,
    nutrition: meal.nutrition,
    prepTime: meal.prepTime,
    orderNotes
  };
}

function addToCart(mealId, peopleCount = 1, options = {}) {
  const meal = getMealById(mealId);
  if (!meal) {
    showToast("تعذر إضافة الوجبة");
    return;
  }

  const safePeopleCount = Math.max(1, Math.min(10, Number(peopleCount) || 1));
  const safeNotes = typeof options.orderNotes === "string" ? options.orderNotes.trim() : "";
  const cart = getCart();
  const existingIndex = cart.findIndex((item) => item.id === mealId);

  if (existingIndex >= 0) {
    const currentItem = cart[existingIndex];
    cart[existingIndex] = {
      ...currentItem,
      peopleCount: Math.max(1, Math.min(10, Number(currentItem.peopleCount || 1) + safePeopleCount)),
      orderNotes: safeNotes || currentItem.orderNotes || ""
    };
  } else {
    cart.push(buildCartItem(meal, safePeopleCount, safeNotes));
  }

  saveCart(cart);

  if (options.redirectToCart) {
    window.location.href = "cart.html";
    return;
  }

  if (options.showCartChoice !== false && typeof openCartChoiceModal === "function") {
    openCartChoiceModal();
    return;
  }

  showToast("تمت إضافة المقادير إلى السلة");
}

function updatePeopleCount(itemId, newCount) {
  const cart = getCart().map((item) => {
    if (item.id !== itemId) return item;
    return { ...item, peopleCount: Math.max(1, Math.min(10, Number(newCount) || 1)) };
  });
  saveCart(cart);
}

function removeFromCart(itemId) {
  saveCart(getCart().filter((item) => item.id !== itemId));
}

function saveItemOrderNotes(itemId, notes) {
  const cart = getCart().map((item) => item.id === itemId ? { ...item, orderNotes: notes } : item);
  saveCart(cart);
}

function cartSummaryTemplate(cart) {
  return `
    <div class="summary-box card">
      <h3>ملخص الطلب</h3>
      <div class="summary-row"><span>الإجمالي الفرعي</span><strong class="summary-value">${formatCurrency(calculateSubtotal(cart))}</strong></div>
      <div class="summary-row"><span>رسوم التوصيل</span><strong class="summary-value">${formatCurrency(DELIVERY_FEE)}</strong></div>
      <div class="total-row"><span>الإجمالي</span><span class="summary-value">${formatCurrency(calculateTotal(cart))}</span></div>
      <div class="helper-box">سيتم إرسال الوصفة والكميات التفصيلية عبر البريد الإلكتروني بعد إتمام الطلب.</div>
      <div class="summary-actions">
        <a class="button-outline" href="meals.html">متابعة التسوق</a>
        <a class="button" href="checkout.html">إتمام الطلب</a>
      </div>
    </div>
  `;
}

function attachCartEvents(root) {
  $$("[data-remove]", root).forEach((button) => {
    button.addEventListener("click", () => {
      removeFromCart(button.dataset.remove);
      renderCart();
      showToast("تم حذف المنتج من السلة");
    });
  });

  $$("[data-qty-control]", root).forEach((button) => {
    button.addEventListener("click", () => {
      const id = button.dataset.itemId;
      const current = Number(button.dataset.current || 1);
      const delta = Number(button.dataset.qtyControl || 0);
      updatePeopleCount(id, current + delta);
      renderCart();
    });
  });

  $$("[data-order-notes]", root).forEach((field) => {
    field.addEventListener("input", () => {
      saveItemOrderNotes(field.dataset.orderNotes, field.value);
    });
  });
}

function renderCart() {
  const root = $("#cart-root");
  if (!root) return;
  const cart = getCart();

  if (!cart.length) {
    root.innerHTML = `
      <div class="cart-title">
        <h1>السلة</h1>
        <span class="count-pill">0</span>
      </div>
      <div class="empty-state card">
        <h3>السلة فارغة</h3>
        <p>لم تتم إضافة أي مقادير بعد.</p>
        <a class="button" href="meals.html">استعرض القائمة</a>
      </div>
    `;
    return;
  }

  root.innerHTML = `
    <div class="cart-title">
      <h1>السلة</h1>
      <span class="count-pill">${cart.length}</span>
    </div>
    <div class="progress">
      <div class="step active"><span class="step-bullet">1</span><span>السلة</span></div>
      <div class="step-divider"></div>
      <div class="step"><span class="step-bullet">2</span><span>إتمام الطلب</span></div>
      <div class="step-divider"></div>
      <div class="step"><span class="step-bullet">3</span><span>التأكيد</span></div>
    </div>
    <div class="cart-layout">
      <section class="cart-stack">
        ${cart.map((item) => `
          <article class="card cart-item">
            <img src="${item.image}" alt="${item.name}">
            <div class="cart-item-content">
              <div class="meal-topline">
                <div>
                  <span class="tag green">${item.category}</span>
                  <h3 class="meal-title">${getMealCardTitle(item.name)}</h3>
                </div>
                <button class="button-danger" type="button" data-remove="${item.id}">إزالة</button>
              </div>
              <p class="meal-description">${item.shortDescription || getMealById(item.mealId || item.id)?.shortDescription || ""}</p>
              <div class="meal-meta">
                <div class="mini-meta"><strong>سعر الحصة:</strong><span class="summary-value">${formatCurrency(item.pricePerServing)}</span></div>
                <div class="mini-meta"><strong>الإجمالي:</strong><span class="summary-value">${formatCurrency(item.pricePerServing * item.peopleCount)}</span></div>
                <div class="mini-meta"><i data-lucide="clock-3"></i><span class="numeric">${item.prepTime}</span> دقيقة</div>
              </div>
              <div class="cart-inline-tools">
                <div class="people-selector">
                  <button type="button" data-qty-control="-1" data-item-id="${item.id}" data-current="${item.peopleCount}">−</button>
                  <span class="counter-value"><span class="numeric">${item.peopleCount}</span> أشخاص</span>
                  <button type="button" data-qty-control="1" data-item-id="${item.id}" data-current="${item.peopleCount}">+</button>
                </div>
              </div>
              <ul class="inline-list">
                ${(item.basicIngredients || []).slice(0, 5).map((ingredient) => `<li class="tag">${ingredient}</li>`).join("")}
              </ul>
              <div class="nutrition-preview cart-nutrition">
                <span>السعرات: <strong class="nutrition-value">${item.nutrition?.calories || "-"}</strong></span>
                <span>البروتين: <strong class="nutrition-value">${item.nutrition?.protein || "-"}</strong></span>
                <span>الكربوهيدرات: <strong class="nutrition-value">${item.nutrition?.carbs || "-"}</strong></span>
              </div>
              <div class="hint-text">مسببات الحساسية: ${item.allergens || "لا توجد مسببات حساسية شائعة مذكورة"}</div>
            </div>
          </article>
        `).join("")}

        <section class="card notes-card">
          <h2>ملاحظات الطلب</h2>
          <div class="cart-stack">
            ${cart.map((item) => `
              <div class="form-field">
                <label for="notes-${item.id}">${item.name}</label>
                <textarea class="textarea" id="notes-${item.id}" data-order-notes="${item.id}" placeholder="مثال: بدون مكسرات، تقليل البهارات، يرجى فصل المكونات.">${item.orderNotes || ""}</textarea>
              </div>
            `).join("")}
          </div>
        </section>
      </section>
      <aside class="checkout-stack">
        ${cartSummaryTemplate(cart)}
      </aside>
    </div>
  `;
  attachCartEvents(root);
  if (window.lucide) lucide.createIcons();
}

function renderCartPage() {
  renderCart();
}
