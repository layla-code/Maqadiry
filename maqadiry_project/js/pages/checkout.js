function getOrderNotesSummary(cart) {
  const notes = cart.map((item) => item.orderNotes?.trim()).filter(Boolean);
  return notes.join(" | ");
}

function renderCheckoutSummary() {
  const cart = getCart();
  return `
    <aside class="checkout-stack">
      <div class="summary-box card">
        <h3>ملخص الطلب</h3>
        <div class="checkout-summary-list">
          ${cart.map((item) => `
            <div class="summary-item">
              <div>
                <strong>${getMealCardTitle(item.name)}</strong>
                <div class="hint-text"><span class="numeric">${item.peopleCount}</span> أشخاص</div>
                ${item.orderNotes ? `<div class="hint-text">ملاحظات الطلب: ${item.orderNotes}</div>` : ""}
              </div>
              <strong class="summary-value">${formatCurrency(item.pricePerServing * item.peopleCount)}</strong>
            </div>
          `).join("")}
        </div>
        <div class="summary-row"><span>الإجمالي الفرعي</span><strong class="summary-value">${formatCurrency(calculateSubtotal(cart))}</strong></div>
        <div class="summary-row"><span>رسوم التوصيل</span><strong class="summary-value">${formatCurrency(DELIVERY_FEE)}</strong></div>
        <div class="total-row"><span>الإجمالي</span><span class="summary-value">${formatCurrency(calculateTotal(cart))}</span></div>
        </div>
    </aside>
  `;
}

function collectDraftFromForm(form) {
  return {
    firstName: form.firstName.value.trim(),
    lastName: form.lastName.value.trim(),
    phone: form.phone.value.trim(),
    email: form.email.value.trim(),
    city: form.city.value.trim(),
    district: form.district.value.trim(),
    address: form.address.value.trim(),
    orderNotes: form.orderNotes.value.trim(),
    deliveryNotes: form.deliveryNotes.value.trim(),
    deliveryTime: form.deliveryTime.value,
    paymentMethod: form.paymentMethod.value
  };
}

function markFieldError(input, hasError) {
  const field = input.closest(".form-field");
  if (field) field.classList.toggle("field-error", hasError);
}

function validateCheckout() {
  const form = $("#checkout-form");
  if (!form) return false;
  const data = collectDraftFromForm(form);
  saveCheckoutDraft(data);

  const checks = [
    ["firstName", data.firstName.length > 0],
    ["lastName", data.lastName.length > 0],
    ["phone", data.phone.length > 0],
    ["email", data.email.length > 0],
    ["city", data.city.length > 0],
    ["district", data.district.length > 0],
    ["address", data.address.length > 0],
    ["paymentMethod", data.paymentMethod.length > 0]
  ];

  let isValid = true;
  checks.forEach(([name, okay]) => {
    const field = form.elements[name];
    if (field) markFieldError(field, !okay);
    if (!okay) isValid = false;
  });

  const errorBox = $("#checkout-error");
  if (errorBox) {
    errorBox.textContent = isValid ? "" : "يرجى استكمال جميع الحقول المطلوبة واختيار طريقة الدفع.";
    errorBox.classList.toggle("visible", !isValid);
  }
  return isValid;
}

function confirmationEmailPreview(order) {
  return `
    <section class="confirmation-card card">
      <h2>تم استلام طلبك بنجاح</h2>
      <p>تم استلام طلبك بنجاح، وسيتم إرسال الوصفة والكميات التفصيلية إلى بريدك الإلكتروني.</p>
      <div class="confirmation-meta">
        <div class="summary-row"><span>الاسم</span><strong>${order.customer.firstName} ${order.customer.lastName}</strong></div>
        <div class="summary-row"><span>البريد الإلكتروني</span><strong>${order.customer.email}</strong></div>
        <div class="summary-row"><span>طريقة الدفع</span><strong>${order.customer.paymentMethod}</strong></div>
      </div>
      <div class="form-section">
        <h3>معاينة تفاصيل ما بعد الطلب</h3>
        <div class="confirmation-list">
          ${order.items.map((item) => `
            <article class="confirmation-item">
              <h4>${getMealCardTitle(item.name)}</h4>
              <p><strong>عدد الأشخاص:</strong> <span class="numeric">${item.peopleCount}</span></p>
              <p><strong>الكميات التفصيلية:</strong> ${(getMealById(item.id)?.hiddenExactQuantities || []).join("، ")}</p>
              <p><strong>خطوات التحضير:</strong> ${(getMealById(item.id)?.hiddenRecipeSteps || []).join(" / ")}</p>
            </article>
          `).join("")}
        </div>
      </div>
    </section>
  `;
}

function confirmOrder() {
  const form = $("#checkout-form");
  if (!form || !validateCheckout()) return;
  const cart = getCart();
  const customer = collectDraftFromForm(form);
  const mergedOrderNotes = customer.orderNotes || getOrderNotesSummary(cart);

  const order = {
    id: `ORD-${Date.now()}`,
    createdAt: new Date().toISOString(),
    customer: { ...customer, orderNotes: mergedOrderNotes },
    items: cart,
    subtotal: calculateSubtotal(cart),
    deliveryFee: DELIVERY_FEE,
    total: calculateTotal(cart)
  };

  saveLastOrder(order);
  clearOrderData();
  showToast("تم استلام طلبك بنجاح");
  renderCheckoutPage(true);
}

function renderCheckoutPage(forceConfirmation = false) {
  const root = $("#checkout-root");
  if (!root) return;
  const cart = getCart();
  const lastOrder = getLastOrder();
  const draft = getCheckoutDraft();

  if ((forceConfirmation || window.location.hash === "#confirmation") && lastOrder) {
    root.innerHTML = `
      <div class="checkout-title"><h1>تأكيد الطلب</h1></div>
      <div class="progress">
        <div class="step done"><span class="step-bullet">1</span><span>السلة</span></div>
        <div class="step-divider"></div>
        <div class="step done"><span class="step-bullet">2</span><span>إتمام الطلب</span></div>
        <div class="step-divider"></div>
        <div class="step active"><span class="step-bullet">3</span><span>التأكيد</span></div>
      </div>
      ${confirmationEmailPreview(lastOrder)}
      <div style="display:flex;gap:10px;flex-wrap:wrap;margin-top:16px">
        <a class="button" href="meals.html">استعرض القائمة</a>
        <a class="button-outline" href="index.html">العودة للرئيسية</a>
      </div>
    `;
    return;
  }

  if (!cart.length) {
    root.innerHTML = `
      <div class="checkout-title"><h1>إتمام الطلب</h1></div>
      <div class="empty-state card">
        <h3>السلة فارغة</h3>
        <p>أضف مقادير الوجبات أولًا قبل إتمام الطلب.</p>
        <a class="button" href="meals.html">استعرض القائمة</a>
      </div>
    `;
    return;
  }

  root.innerHTML = `
    <div class="checkout-title"><h1>إتمام الطلب</h1></div>
    <div class="progress">
      <div class="step done"><span class="step-bullet">1</span><span>السلة</span></div>
      <div class="step-divider"></div>
      <div class="step active"><span class="step-bullet">2</span><span>إتمام الطلب</span></div>
      <div class="step-divider"></div>
      <div class="step"><span class="step-bullet">3</span><span>التأكيد</span></div>
    </div>
    <div class="checkout-layout">
      <form class="card checkout-form" id="checkout-form" novalidate>
        <section class="form-section">
          <h2>بيانات العميل</h2>
          <div class="form-grid">
            <div class="form-field">
              <label for="firstName">الاسم الأول</label>
              <input class="input" id="firstName" name="firstName" value="${draft.firstName || ""}" placeholder="أدخل الاسم الأول">
              <div class="error-text">يرجى إدخال الاسم الأول.</div>
            </div>
            <div class="form-field">
              <label for="lastName">اسم العائلة</label>
              <input class="input" id="lastName" name="lastName" value="${draft.lastName || ""}" placeholder="أدخل اسم العائلة">
              <div class="error-text">يرجى إدخال اسم العائلة.</div>
            </div>
            <div class="form-field">
              <label for="phone">رقم الجوال</label>
              <input class="input" id="phone" name="phone" value="${draft.phone || ""}" inputmode="tel" placeholder="05xxxxxxxx">
              <div class="error-text">يرجى إدخال رقم الجوال.</div>
            </div>
            <div class="form-field">
              <label for="email">البريد الإلكتروني</label>
              <input class="input" id="email" name="email" value="${draft.email || ""}" inputmode="email" placeholder="name@example.com">
              <div class="error-text">يرجى إدخال البريد الإلكتروني.</div>
            </div>
            <div class="form-field">
              <label for="city">المدينة</label>
              <input class="input" id="city" name="city" value="${draft.city || ""}" placeholder="مثال: الرياض">
              <div class="error-text">يرجى إدخال المدينة.</div>
            </div>
            <div class="form-field">
              <label for="district">الحي</label>
              <input class="input" id="district" name="district" value="${draft.district || ""}" placeholder="مثال: النرجس">
              <div class="error-text">يرجى إدخال الحي.</div>
            </div>
            <div class="form-field full">
              <label for="address">العنوان التفصيلي</label>
              <input class="input" id="address" name="address" value="${draft.address || ""}" placeholder="الشارع، رقم المبنى، الشقة أو العلامة المميزة">
              <div class="error-text">يرجى إدخال العنوان التفصيلي.</div>
            </div>
          </div>
        </section>

        <section class="form-section">
          <h2>ملاحظات الطلب والتوصيل</h2>
          <div class="form-grid">
            <div class="form-field full">
              <label for="orderNotes">ملاحظات الطلب</label>
              <textarea class="textarea" id="orderNotes" name="orderNotes" placeholder="مثال: بدون مكسرات، تقليل البهارات، يرجى فصل المكونات.">${draft.orderNotes || getOrderNotesSummary(cart) || ""}</textarea>
            </div>
            <div class="form-field full">
              <label for="deliveryNotes">ملاحظات التوصيل</label>
              <textarea class="textarea" id="deliveryNotes" name="deliveryNotes" placeholder="مثال: الرجاء الاتصال عند الوصول، المدخل الخلفي، التوصيل بعد الساعة 6.">${draft.deliveryNotes || ""}</textarea>
            </div>
            <div class="form-field full">
              <label for="deliveryTime">وقت التوصيل</label>
              <select class="sort-select" id="deliveryTime" name="deliveryTime">
                <option value="">اختر وقت التوصيل</option>
                <option value="12 ظهرًا – 3 عصرًا" ${draft.deliveryTime === "12 ظهرًا – 3 عصرًا" ? "selected" : ""}>12 ظهرًا – 3 عصرًا</option>
                <option value="3 عصرًا – 6 مساءً" ${draft.deliveryTime === "3 عصرًا – 6 مساءً" ? "selected" : ""}>3 عصرًا – 6 مساءً</option>
                <option value="6 مساءً – 10 مساءً" ${draft.deliveryTime === "6 مساءً – 10 مساءً" ? "selected" : ""}>6 مساءً – 10 مساءً</option>
              </select>
            </div>
          </div>
        </section>

        <section class="form-section">
          <h2>طرق الدفع</h2>
          <div class="payment-options">
            <label class="payment-option"><input type="radio" name="paymentMethod" value="مدى" ${draft.paymentMethod === "مدى" ? "checked" : ""}><span>مدى</span></label>
            <label class="payment-option"><input type="radio" name="paymentMethod" value="Apple Pay" ${draft.paymentMethod === "Apple Pay" ? "checked" : ""}><span>Apple Pay</span></label>
            <label class="payment-option"><input type="radio" name="paymentMethod" value="الدفع عند الاستلام" ${draft.paymentMethod === "الدفع عند الاستلام" ? "checked" : ""}><span>الدفع عند الاستلام</span></label>
          </div>
          <div class="helper-box">الدفع في هذه النسخة تجريبي فقط، ولا تتم معالجة أي دفعات فعلية.</div>
          <div id="checkout-error" class="checkout-error" aria-live="polite"></div>
        </section>

        <button class="button full-width" type="submit">تأكيد الطلب</button>
      </form>
      ${renderCheckoutSummary()}
    </div>
  `;

  const form = $("#checkout-form");
  form?.addEventListener("input", () => saveCheckoutDraft(collectDraftFromForm(form)));
  form?.addEventListener("change", () => saveCheckoutDraft(collectDraftFromForm(form)));
  form?.addEventListener("submit", (event) => {
    event.preventDefault();
    confirmOrder();
  });
}
