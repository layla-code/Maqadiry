function readStorage(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch (error) {
    return fallback;
  }
}

function writeStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function getCart() {
  const rawCart = readStorage(STORAGE_KEYS.cart, []);
  return Array.isArray(rawCart) ? rawCart : [];
}

function saveCart(cart) {
  writeStorage(STORAGE_KEYS.cart, cart);
  updateCartCount();
}

function getCheckoutDraft() {
  return readStorage(STORAGE_KEYS.checkoutDraft, {
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    city: "",
    district: "",
    address: "",
    orderNotes: "",
    deliveryNotes: "",
    deliveryTime: "",
    paymentMethod: ""
  });
}

function saveCheckoutDraft(draft) {
  writeStorage(STORAGE_KEYS.checkoutDraft, draft);
}

function getLastOrder() {
  return readStorage(STORAGE_KEYS.lastOrder, null);
}

function saveLastOrder(order) {
  writeStorage(STORAGE_KEYS.lastOrder, order);
}

function clearOrderData() {
  localStorage.removeItem(STORAGE_KEYS.cart);
  localStorage.removeItem(STORAGE_KEYS.checkoutDraft);
  updateCartCount();
}

function calculateSubtotal(cart = getCart()) {
  return cart.reduce((sum, item) => sum + ((Number(item.pricePerServing) || 0) * (Number(item.peopleCount) || 1)), 0);
}

function calculateTotal(cart = getCart()) {
  if (!cart.length) return 0;
  return calculateSubtotal(cart) + DELIVERY_FEE;
}

function getSubtotal(cart = getCart()) {
  return calculateSubtotal(cart);
}
