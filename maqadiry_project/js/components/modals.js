function ensureCartChoiceModal() {
  if ($("#cart-choice-modal")) return;
  const modal = document.createElement("div");
  modal.id = "cart-choice-modal";
  modal.className = "modal-overlay hidden";
  modal.innerHTML = `
    <div class="modal-card" role="dialog" aria-modal="true" aria-labelledby="cart-choice-title">
      <h3 id="cart-choice-title">تمت إضافة المقادير إلى السلة</h3>
      <p>يمكنك عرض السلة أو متابعة التسوق.</p>
      <div class="modal-actions">
        <a class="button" href="cart.html">عرض السلة</a>
        <button class="button-outline" type="button" data-close-cart-choice>متابعة التسوق</button>
      </div>
    </div>
  `;
  document.body.appendChild(modal);
  modal.addEventListener("click", (event) => {
    if (event.target === modal) closeCartChoiceModal();
  });
  $("[data-close-cart-choice]", modal)?.addEventListener("click", closeCartChoiceModal);
}

function openCartChoiceModal() {
  ensureCartChoiceModal();
  $("#cart-choice-modal")?.classList.remove("hidden");
}

function closeCartChoiceModal() {
  $("#cart-choice-modal")?.classList.add("hidden");
}

function ensureLoginModal() {
  if ($("#login-modal")) return;
  const modal = document.createElement("div");
  modal.id = "login-modal";
  modal.className = "modal-overlay hidden";
  modal.innerHTML = `
    <div class="modal-card" role="dialog" aria-modal="true" aria-labelledby="login-modal-title">
      <h3 id="login-modal-title">تسجيل الدخول</h3>
      <p>تسجيل الدخول غير مفعّل في نسخة MVP</p>
      <button class="button" type="button" data-close-login>إغلاق</button>
    </div>
  `;
  document.body.appendChild(modal);
  modal.addEventListener("click", (event) => {
    if (event.target === modal) closeLoginModal();
  });
  $("[data-close-login]", modal)?.addEventListener("click", closeLoginModal);
}

function openLoginModal() {
  ensureLoginModal();
  ensureCartChoiceModal();
  $("#login-modal")?.classList.remove("hidden");
}

function closeLoginModal() {
  $("#login-modal")?.classList.add("hidden");
}

function bindLoginTriggers() {
  $$(".signin-pill").forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      openLoginModal();
    });
  });
}
