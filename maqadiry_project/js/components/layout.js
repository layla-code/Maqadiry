function getCurrentPageName() {
  const path = window.location.pathname.split("/").pop();
  return path || "index.html";
}

function createSiteHeader() {
  return `
    <header class="site-header">
      <div class="container header-inner">
        <div class="header-actions">
          <a class="cart-pill" href="cart.html" aria-label="السلة">
            <span class="cart-icon"><i data-lucide="shopping-cart"></i></span>
            السلة
            <span data-cart-count>0</span>
          </a>
          <a class="signin-pill" href="#" aria-label="تسجيل الدخول">تسجيل الدخول</a>
        </div>
        <nav class="nav">
          <a data-nav href="index.html">الرئيسية</a>
          <a data-nav href="meals.html">القائمة</a>
          <a data-nav href="about.html">من نحن</a>
        </nav>
        <a class="brand" href="index.html" aria-label="مقاديري">
          <img class="brand-icon" src="assets/logoremove2.png" alt="مقاديري">
        </a>
      </div>
    </header>
  `;
}

function createSiteFooter() {
  return `
    <footer class="page-footer">
      <div class="container footer-grid">
        <div>
          <img class="footer-logo" src="assets/logoremove.png" alt="شعار مقاديري">
          <p>مقادير طازجة ومجهزة للطبخ حسب عدد الأشخاص، مع معلومات غذائية مفصلة ووصفة تُرسل بعد الطلب.</p>
        </div>
        <div>
          <h4>روابط سريعة</h4>
          <ul>
            <li><a href="index.html">الرئيسية</a></li>
            <li><a href="meals.html">القائمة</a></li>
            <li><a href="about.html">من نحن</a></li>
          </ul>
        </div>
        <div>
          <h4>خدمة العملاء</h4>
          <ul>
            <li>support@maqadiry.com</li>
            <li><span class="numeric">920000000</span></li>
            <li>يوميًا من <span class="numeric">12</span> ظهرًا إلى <span class="numeric">10</span> مساءً</li>
          </ul>
        </div>
        <div>
          <h4>طرق الدفع</h4>
          <ul>
            <li>مدى</li>
            <li>Apple Pay</li>
            <li>الدفع عند الاستلام</li>
          </ul>
        </div>
      </div>
    </footer>
  `;
}

function injectSharedLayout() {
  const headerRoot = $("#site-header");
  const footerRoot = $("#site-footer");

  if (headerRoot) {
    headerRoot.innerHTML = createSiteHeader();
  }

  if (footerRoot) {
    footerRoot.innerHTML = createSiteFooter();
  }
}

function setActiveNav() {
  const current = window.location.pathname.split("/").pop() || "index.html";
  $$("[data-nav]").forEach((link) => {
    const href = link.getAttribute("href");
    const isMealsContext = current === "meal-details.html" && href === "meals.html";
    link.classList.toggle("active", href === current || isMealsContext);
  });
  setupNavIndicator();
}

function setupNavIndicator() {
  const nav = $(".nav");
  if (!nav) return;

  let indicator = nav.querySelector(".nav-indicator");
  if (!indicator) {
    indicator = document.createElement("div");
    indicator.className = "nav-indicator";
    nav.appendChild(indicator);
  }

  function moveIndicatorTo(el) {
    const navRect = nav.getBoundingClientRect();
    const elRect = el.getBoundingClientRect();
    indicator.style.left = (elRect.left - navRect.left) + "px";
    indicator.style.width = elRect.width + "px";
    indicator.style.opacity = "1";
  }

  const activeLink = nav.querySelector(".nav a.active");
  if (activeLink) moveIndicatorTo(activeLink);

  $$("[data-nav]").forEach((link) => {
    link.addEventListener("mouseenter", () => moveIndicatorTo(link));
    link.addEventListener("mouseleave", () => {
      const active = nav.querySelector(".nav a.active");
      if (active) moveIndicatorTo(active);
      else indicator.style.opacity = "0";
    });
  });
}
