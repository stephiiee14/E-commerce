// AMAH Beauty - Application Logic

// 1. Product Data
const PRODUCTS = [
    {
        id: "milky-cleanser",
        name: "Hydrating Milky Cleanser",
        category: "Cleanser",
        price: 28.00,
        tagline: "Gently purify while preserving the skin barrier.",
        description: "A luxurious, low-foaming cleanser that melts away impurities, makeup, and daily pollution without stripping the skin of its essential moisture. Formulated with soothing rosewater and a lipid-replenishing ceramide complex.",
        ingredients: "Rosa Damascena (Rose) Flower Water, Glycerin, Caprylic/Capric Triglyceride, Ceramide NP, Ceramide AP, Ceramide EOP, Phytosphingosine, Aloe Barbadensis Leaf Juice, Panthenol, Allantoin.",
        usage: "Massage 1-2 pumps onto damp skin in circular motions. Rinse thoroughly with lukewarm water. Use morning and night.",
        image: "images/cleanser.jpg",
        tags: ["dry", "sensitive", "combination", "redness", "dehydration"]
    },
    {
        id: "saffron-toner",
        name: "Balancing Saffron Toner",
        category: "Toner",
        price: 34.00,
        tagline: "Clarify, refine, and harmonize your skin tone.",
        description: "An alcohol-free, antioxidant-rich toning essence infused with precious saffron extract and niacinamide. It balances skin pH, minimizes the appearance of pores, and prepares the skin to absorb subsequent treatments.",
        ingredients: "Water, Niacinamide (Vitamin B3), Crocus Sativus (Saffron) Flower Extract, Witch Hazel Extract, Sodium Hyaluronate, Salix Alba (Willow) Bark Extract, Ethylhexylglycerin.",
        usage: "After cleansing, sweep over face and neck with a cotton pad or pat gently directly into the skin with clean hands. Use daily.",
        image: "images/toner.jpg",
        tags: ["oily", "combination", "pores", "acne", "dehydration"]
    },
    {
        id: "glow-serum",
        name: "Glow Catalyst Serum",
        category: "Serum",
        price: 56.00,
        tagline: "Reveal a radiant, luminous complexion.",
        description: "A potent vitamin C serum enhanced with ferulic acid and multi-weight hyaluronic acid. It shields skin against environmental aggressors, targets dark spots, and imparts an instant, healthy-looking glow.",
        ingredients: "3-O-Ethyl Ascorbic Acid (Vitamin C), Ferulic Acid, Hyaluronic Acid, Tocopherol (Vitamin E), Centella Asiatica Extract, Green Tea Leaf Extract.",
        usage: "Apply 3-4 drops to clean, dry face and neck in the morning. Follow with moisturizer and SPF.",
        image: "images/serum.jpg",
        tags: ["dry", "combination", "oily", "dehydration", "dullness"]
    },
    {
        id: "retinol-treatment",
        name: "Resurfacing Retinol Treatment",
        category: "Serum",
        price: 62.00,
        tagline: "Accelerate renewal for smoother, youthful skin.",
        description: "A high-performance night treatment combining 0.5% pure encapsulated retinol with plant-derived bakuchiol. It minimizes the appearance of fine lines, wrinkles, and uneven texture while supporting cellular turnover.",
        ingredients: "Aqua, Squalane, Retinol (Encapsulated), Bakuchiol, Ceramide NP, Shea Butter, Licorice Root Extract, Sodium Acrylate Copolymer.",
        usage: "Apply a pea-sized amount to clean, dry skin in the evening. Start 2 nights a week and gradually increase frequency. Always apply sunscreen the following morning.",
        image: "images/retinol.jpg",
        tags: ["dry", "combination", "oily", "aging", "pores"]
    },
    {
        id: "cushion-cream",
        name: "Dew Cushion Cream",
        category: "Moisturizer",
        price: 48.00,
        tagline: "Plump, cushion-soft hydration that lasts all day.",
        description: "A decadent whipped moisturizer packed with nourishing squalane, firming peptides, and soothing green tea extract. It locks in moisture, leaving skin with a velvety, dewy finish without feeling heavy.",
        ingredients: "Squalane, Caprylic/Capric Triglyceride, Glycerin, Acetyl Hexapeptide-8, Palmitoyl Tripeptide-1, Camellia Sinensis (Green Tea) Leaf Extract, Jojoba Seed Oil.",
        usage: "Smooth a dime-sized amount over face and neck after serums. Massage upward until fully absorbed. Morning and night.",
        image: "images/cream.jpg",
        tags: ["dry", "combination", "sensitive", "dehydration", "aging", "redness"]
    },
    {
        id: "mineral-veil",
        name: "Mineral Veil SPF 50",
        category: "Sunscreen",
        price: 38.00,
        tagline: "Weightless protection and a flawless skin finish.",
        description: "A 100% mineral sunscreen featuring non-nano zinc oxide and centella asiatica. It offers broad-spectrum UVA/UVB defense, calms redness, and leaves a sheer, satin-matte finish with zero white cast.",
        ingredients: "Zinc Oxide (Non-Nano), Titanium Dioxide, Centella Asiatica Extract, Bisabolol, Aloe Barbadensis Leaf Extract, Sunflower Seed Oil.",
        usage: "Apply generously as the final step of your morning skincare routine, at least 15 minutes before sun exposure. Reapply every 2 hours.",
        image: "images/spf.jpg",
        tags: ["dry", "combination", "oily", "sensitive", "aging", "redness"]
    }
];

// 2. Shopping Cart State
let cart = [];

// 3. Quiz State
let currentQuizStep = 0;
const quizAnswers = {
    skinType: "",
    concern: ""
};

// DOM Elements
document.addEventListener("DOMContentLoaded", () => {
    // Populate products
    renderProducts();

    // Setup Cart Drawer Events
    const cartToggle = document.getElementById("cart-toggle");
    const closeCart = document.getElementById("close-cart");
    const cartDrawer = document.getElementById("cart-drawer");
    const cartOverlay = document.getElementById("cart-overlay");

    if (cartToggle && cartDrawer && cartOverlay) {
        cartToggle.addEventListener("click", (e) => {
            e.preventDefault();
            cartDrawer.classList.add("active");
            cartOverlay.classList.add("active");
        });
    }

    if (closeCart && cartDrawer && cartOverlay) {
        closeCart.addEventListener("click", () => {
            cartDrawer.classList.remove("active");
            cartOverlay.classList.remove("active");
        });
        cartOverlay.addEventListener("click", () => {
            cartDrawer.classList.remove("active");
            cartOverlay.classList.remove("active");
            closeProductModal();
        });
    }

    // Modal Close
    const closeModalBtn = document.getElementById("close-modal");
    if (closeModalBtn) {
        closeModalBtn.addEventListener("click", closeProductModal);
    }

    // Category Filter Events
    const filterButtons = document.querySelectorAll(".filter-btn");
    filterButtons.forEach(btn => {
        btn.addEventListener("click", (e) => {
            filterButtons.forEach(b => b.classList.remove("active"));
            e.target.classList.add("active");
            const filterValue = e.target.getAttribute("data-filter");
            renderProducts(filterValue);
        });
    });

    // Skin Quiz Setup
    setupQuiz();

    // Newsletter form submit
    const newsletterForm = document.getElementById("newsletter-form");
    if (newsletterForm) {
        newsletterForm.addEventListener("submit", (e) => {
            e.preventDefault();
            showToast("Thank you for subscribing to AMAH Beauty journal!");
            newsletterForm.reset();
        });
    }
});

// Render Products Grid
function renderProducts(filter = "all") {
    const grid = document.getElementById("products-grid");
    if (!grid) return;
    grid.innerHTML = "";

    const filtered = filter === "all" ? PRODUCTS : PRODUCTS.filter(p => p.category.toLowerCase() === filter.toLowerCase());

    filtered.forEach(p => {
        const card = document.createElement("div");
        card.className = "product-card fade-in";
        card.innerHTML = `
            <div class="product-image-container" onclick="openProductModal('${p.id}')">
                <img src="${p.image}" alt="${p.name}" class="product-img" onerror="this.src='data:image/svg+xml;utf8,<svg xmlns=\\'http://www.w3.org/2000/svg\\' width=\\'400\\' height=\\'400\\' viewBox=\\'0 0 400 400\\'><rect width=\\'100%\\' height=\\'100%\\' fill=\\'%23f3f0ec\\'/><text x=\\'50%\\' y=\\'50%\\' dominant-baseline=\\'middle\\' text-anchor=\\'middle\\' font-family=\\'serif\\' font-size=\\'24\\' fill=\\'%238c7f76\\'>AMAH BEAUTY</text></svg>'">
                <div class="view-details">Quick View</div>
            </div>
            <div class="product-info">
                <span class="product-cat">${p.category}</span>
                <h3 class="product-title" onclick="openProductModal('${p.id}')">${p.name}</h3>
                <p class="product-tagline">${p.tagline}</p>
                <div class="product-footer">
                    <span class="product-price">$${p.price.toFixed(2)}</span>
                    <button class="add-to-cart-btn" onclick="addToCart('${p.id}')">Add to Cart</button>
                </div>
            </div>
        `;
        grid.appendChild(card);
    });
}

// Open Product Details Modal
function openProductModal(id) {
    const product = PRODUCTS.find(p => p.id === id);
    if (!product) return;

    const modal = document.getElementById("product-modal");
    const modalBody = document.getElementById("modal-detail-content");
    const cartOverlay = document.getElementById("cart-overlay");

    if (modal && modalBody && cartOverlay) {
        modalBody.innerHTML = `
            <div class="modal-grid">
                <div class="modal-image-sec">
                    <img src="${product.image}" alt="${product.name}" class="modal-product-img" onerror="this.src='data:image/svg+xml;utf8,<svg xmlns=\\'http://www.w3.org/2000/svg\\' width=\\'400\\' height=\\'400\\' viewBox=\\'0 0 400 400\\'><rect width=\\'100%\\' height=\\'100%\\' fill=\\'%23f3f0ec\\'/><text x=\\'50%\\' y=\\'50%\\' dominant-baseline=\\'middle\\' text-anchor=\\'middle\\' font-family=\\'serif\\' font-size=\\'24\\' fill=\\'%238c7f76\\'>AMAH BEAUTY</text></svg>'">
                </div>
                <div class="modal-info-sec">
                    <span class="modal-cat">${product.category}</span>
                    <h2 class="modal-title">${product.name}</h2>
                    <div class="modal-price">$${product.price.toFixed(2)}</div>
                    <p class="modal-desc">${product.description}</p>
                    
                    <div class="tabs-container">
                        <div class="tab-header">
                            <button class="tab-btn active" onclick="switchModalTab(event, 'ingredients')">Ingredients</button>
                            <button class="tab-btn" onclick="switchModalTab(event, 'usage')">How to Use</button>
                        </div>
                        <div class="tab-content active" id="tab-ingredients">
                            <p>${product.ingredients}</p>
                        </div>
                        <div class="tab-content" id="tab-usage">
                            <p>${product.usage}</p>
                        </div>
                    </div>
                    
                    <button class="modal-add-btn" onclick="addToCart('${product.id}'); closeProductModal();">Add to Shopping Bag</button>
                </div>
            </div>
        `;
        modal.classList.add("active");
        cartOverlay.classList.add("active");
    }
}

// Switch Tabs inside Modal
window.switchModalTab = function(event, tabId) {
    const parent = event.currentTarget.closest(".modal-info-sec");
    const buttons = parent.querySelectorAll(".tab-btn");
    const contents = parent.querySelectorAll(".tab-content");

    buttons.forEach(btn => btn.classList.remove("active"));
    contents.forEach(content => content.classList.remove("active"));

    event.currentTarget.classList.add("active");
    parent.querySelector(`#tab-${tabId}`).classList.add("active");
}

function closeProductModal() {
    const modal = document.getElementById("product-modal");
    const cartOverlay = document.getElementById("cart-overlay");
    if (modal) modal.classList.remove("active");
    if (cartOverlay && !document.getElementById("cart-drawer").classList.contains("active")) {
        cartOverlay.classList.remove("active");
    }
}

// Cart Mechanics
window.addToCart = function(id) {
    const product = PRODUCTS.find(p => p.id === id);
    if (!product) return;

    const existing = cart.find(item => item.id === id);
    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    updateCartUI();
    showToast(`Added ${product.name} to your cart.`);
}

window.updateQuantity = function(id, delta) {
    const item = cart.find(item => item.id === id);
    if (!item) return;

    item.quantity += delta;
    if (item.quantity <= 0) {
        cart = cart.filter(item => item.id !== id);
    }
    updateCartUI();
}

window.removeFromCart = function(id) {
    cart = cart.filter(item => item.id !== id);
    updateCartUI();
}

function updateCartUI() {
    const cartBadge = document.querySelector(".cart-count");
    const cartItemsContainer = document.getElementById("cart-items");
    const cartSubtotal = document.getElementById("cart-subtotal-val");

    // Update count
    const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    if (cartBadge) {
        cartBadge.textContent = totalCount;
        cartBadge.style.display = totalCount > 0 ? "flex" : "none";
    }

    // Render list
    if (cartItemsContainer) {
        cartItemsContainer.innerHTML = "";
        if (cart.length === 0) {
            cartItemsContainer.innerHTML = `
                <div class="empty-cart-msg">
                    <p>Your shopping bag is currently empty.</p>
                    <a href="#catalog" class="shop-now-btn" onclick="document.getElementById('close-cart').click()">Shop Our Products</a>
                </div>
            `;
        } else {
            cart.forEach(item => {
                const row = document.createElement("div");
                row.className = "cart-item";
                row.innerHTML = `
                    <img src="${item.image}" alt="${item.name}" class="cart-item-img" onerror="this.src='data:image/svg+xml;utf8,<svg xmlns=\\'http://www.w3.org/2000/svg\\' width=\\'100\\' height=\\'100\\' viewBox=\\'0 0 100 100\\'><rect width=\\'100%\\' height=\\'100%\\' fill=\\'%23f3f0ec\\'/></svg>'">
                    <div class="cart-item-info">
                        <h4>${item.name}</h4>
                        <div class="cart-item-price">$${(item.price * item.quantity).toFixed(2)}</div>
                        <div class="cart-item-controls">
                            <button onclick="updateQuantity('${item.id}', -1)">-</button>
                            <span>${item.quantity}</span>
                            <button onclick="updateQuantity('${item.id}', 1)">+</button>
                            <button class="remove-btn" onclick="removeFromCart('${item.id}')">Remove</button>
                        </div>
                    </div>
                `;
                cartItemsContainer.appendChild(row);
            });
        }
    }

    // Update subtotal
    const subtotalVal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    if (cartSubtotal) {
        cartSubtotal.textContent = `$${subtotalVal.toFixed(2)}`;
    }
}

// Toast Notifications
function showToast(message) {
    const container = document.getElementById("toast-container");
    if (!container) return;

    const toast = document.createElement("div");
    toast.className = "toast";
    toast.textContent = message;

    container.appendChild(toast);

    setTimeout(() => {
        toast.classList.add("show");
    }, 100);

    setTimeout(() => {
        toast.classList.remove("show");
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// Skin Routine Quiz Engine
function setupQuiz() {
    const quizStartBtn = document.getElementById("start-quiz-btn");
    const quizContainer = document.getElementById("quiz-inner-container");

    if (!quizStartBtn || !quizContainer) return;

    quizStartBtn.addEventListener("click", () => {
        currentQuizStep = 1;
        renderQuizStep();
    });
}

function renderQuizStep() {
    const quizContainer = document.getElementById("quiz-inner-container");
    if (!quizContainer) return;

    quizContainer.classList.add("fade-out");

    setTimeout(() => {
        quizContainer.classList.remove("fade-out");
        
        if (currentQuizStep === 1) {
            quizContainer.innerHTML = `
                <div class="quiz-step">
                    <span class="quiz-progress">Step 1 of 2</span>
                    <h3 class="quiz-question">Describe your skin's temperament:</h3>
                    <div class="quiz-options">
                        <button class="quiz-opt-btn" onclick="selectQuizAnswer('skinType', 'dry')">
                            <strong>Dry / Dehydrated</strong>
                            <span>Feels tight, flakey, or parched</span>
                        </button>
                        <button class="quiz-opt-btn" onclick="selectQuizAnswer('skinType', 'oily')">
                            <strong>Oily / Acne-Prone</strong>
                            <span>Visibly shiny, prone to breakout or large pores</span>
                        </button>
                        <button class="quiz-opt-btn" onclick="selectQuizAnswer('skinType', 'combination')">
                            <strong>Combination</strong>
                            <span>Oily in the T-zone, dry on the cheeks</span>
                        </button>
                        <button class="quiz-opt-btn" onclick="selectQuizAnswer('skinType', 'sensitive')">
                            <strong>Sensitive / Reactive</strong>
                            <span>Prone to redness, burning, or itchiness</span>
                        </button>
                    </div>
                </div>
            `;
        } else if (currentQuizStep === 2) {
            quizContainer.innerHTML = `
                <div class="quiz-step">
                    <span class="quiz-progress">Step 2 of 2</span>
                    <h3 class="quiz-question">What is your main skincare objective?</h3>
                    <div class="quiz-options">
                        <button class="quiz-opt-btn" onclick="selectQuizAnswer('concern', 'dehydration')">
                            <strong>Deep Moisture & Plumping</strong>
                            <span>Relieve tightness and dry patches</span>
                        </button>
                        <button class="quiz-opt-btn" onclick="selectQuizAnswer('concern', 'dullness')">
                            <strong>Brighter Glow & Radiant Tone</strong>
                            <span>Exterminate dullness and dark spots</span>
                        </button>
                        <button class="quiz-opt-btn" onclick="selectQuizAnswer('concern', 'aging')">
                            <strong>Fine Lines & Cellular Longevity</strong>
                            <span>Target wrinkles and support skin elasticity</span>
                        </button>
                        <button class="quiz-opt-btn" onclick="selectQuizAnswer('concern', 'redness')">
                            <strong>Calming & Barrier Strengthening</strong>
                            <span>Reduce irritation and soothe sensitivity</span>
                        </button>
                    </div>
                </div>
            `;
        } else if (currentQuizStep === 3) {
            showQuizResults();
        }
    }, 300);
}

window.selectQuizAnswer = function(key, value) {
    quizAnswers[key] = value;
    currentQuizStep++;
    renderQuizStep();
}

function showQuizResults() {
    const quizContainer = document.getElementById("quiz-inner-container");
    if (!quizContainer) return;

    // Filter recommended products based on answers
    const recommended = PRODUCTS.filter(p => {
        return p.tags.includes(quizAnswers.skinType) || p.tags.includes(quizAnswers.concern);
    }).slice(0, 3); // Recommend top 3 matches

    let itemsHtml = recommended.map(p => `
        <div class="rec-item">
            <img src="${p.image}" alt="${p.name}" class="rec-item-img" onerror="this.src='data:image/svg+xml;utf8,<svg xmlns=\\'http://www.w3.org/2000/svg\\' width=\\'150\\' height=\\'150\\' viewBox=\\'0 0 150 150\\'><rect width=\\'100%\\' height=\\'100%\\' fill=\\'%23f3f0ec\\'/></svg>'">
            <div class="rec-item-details">
                <h4>${p.name}</h4>
                <p class="rec-cat">${p.category} | $${p.price.toFixed(2)}</p>
                <p class="rec-desc">${p.tagline}</p>
                <button class="add-to-cart-btn small" onclick="addToCart('${p.id}')">Add to Routine</button>
            </div>
        </div>
    `).join("");

    quizContainer.innerHTML = `
        <div class="quiz-results fade-in">
            <h3 class="quiz-result-title">Your Custom AMAH Routine</h3>
            <p class="quiz-result-subtitle">Based on your <strong>${quizAnswers.skinType}</strong> skin type and focus on <strong>${quizAnswers.concern}</strong>, here is our recommended regimen:</p>
            <div class="rec-grid">
                ${itemsHtml}
            </div>
            <div class="quiz-actions">
                <button class="quiz-opt-btn start-over-btn" onclick="restartQuiz()">Retake Skin Quiz</button>
            </div>
        </div>
    `;
}

window.restartQuiz = function() {
    currentQuizStep = 0;
    quizAnswers.skinType = "";
    quizAnswers.concern = "";
    const quizContainer = document.getElementById("quiz-inner-container");
    if (quizContainer) {
        quizContainer.innerHTML = `
            <div class="quiz-start-view text-center">
                <h2>Discover Your Clean Routine</h2>
                <p>Answer a few questions about your skin temperament and concerns to reveal a customized daily ritual designed just for you.</p>
                <button class="primary-btn" id="start-quiz-btn">Start Skin Quiz</button>
            </div>
        `;
        setupQuiz();
    }
}
