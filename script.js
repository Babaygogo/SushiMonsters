// Дані про сети суші
const sushiSets = [
  {
    id: 1,
    name: "Філадельфія",
    description: "Ніжний сет з лососем, вершковим сиром та огірком",
    price: 420,
    image:
      "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
  },
  {
    id: 2,
    name: "Каліфорнія",
    description: "Класичний сет з крабом, авокадо та огірком",
    price: 380,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdI8IYDmTkfBSXSrumO4El_YKVzHvzTt_5Cw&s",
  },
  {
    id: 3,
    name: "Дракон",
    description: "Сет з вугром, авокадо та унагі соусом",
    price: 460,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6mpHeS3s1PX2ZcI-Z7JGZ9TX8J_3eJS0hxQ&s",
  },
  {
    id: 4,
    name: "Гейша",
    description: "Сет з тунцем, лососем та спайсі соусом",
    price: 440,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRLJNtGOlniq9qN-uVdB20yNmkk5ZjlMB3EQ&s",
  },
  {
    id: 5,
    name: "Самурай",
    description: "Сет з куркою темпура та соусом теріякі",
    price: 400,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHA4Gi03EdW3CJXmyvjkyEeVwXjkhH_BR3CA&s",
  },
  {
    id: 6,
    name: "Токіо",
    description: "Сет з лососем, тунцем та авокадо",
    price: 480,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLuL9pGCaPhiQwm1jyL74HMjWUopQ7lGPlnA&s",
  },
  {
    id: 7,
    name: "Осака",
    description: "Сет з креветкою, лососем та ікрою масаго",
    price: 450,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhGQlC_l9MwsjjnS2yKfDNK3jBn06oGPev4Q&s",
  },
  {
    id: 8,
    name: "Кіото",
    description: "Сет з вугром, крабом та вершковим сиром",
    price: 490,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJmqmzVvMd1SZ_An3q2iPG2js_mA1R-qz85Q&s",
  },
  {
    id: 9,
    name: "Йокогама",
    description: "Сет з тунцем, лососем та огірком",
    price: 430,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOifw8AHmfc1banCDRCrhxMA3_F7iYz1oidA&s",
  },
  {
    id: 10,
    name: "Монстр",
    description: "Наш фірмовий сет з різноманітними морепродуктами",
    price: 520,
    image:
      "https://i.evrasia.in.ua/data/1400_0/products/9tIQQrAHQaZDWSAIiKvjM1WzTMQJR11tiWdKE7ll.webp",
  },
];

// Змінні для роботи з кошиком
let cart = [];
let user = null;

// DOM елементи
const sushiSetsContainer = document.getElementById("sushi-sets-container");
const cartItemsContainer = document.getElementById("cart-items");
const cartTotalElement = document.getElementById("cart-total");
const checkoutBtn = document.getElementById("checkout-btn");
const registerBtn = document.getElementById("register-btn");
const loginBtn = document.getElementById("login-btn");
const registerModal = document.getElementById("register-modal");
const loginModal = document.getElementById("login-modal");
const closeRegister = document.getElementById("close-register");
const closeLogin = document.getElementById("close-login");
const registerForm = document.getElementById("register-form");
const loginForm = document.getElementById("login-form");

// Функція для відображення сетів суші
function renderSushiSets() {
  sushiSetsContainer.innerHTML = "";

  sushiSets.forEach((set) => {
    const setElement = document.createElement("div");
    setElement.className = "sushi-card";
    setElement.innerHTML = `
            <div class="sushi-image">
                <img src="${set.image}" alt="${set.name}">
            </div>
            <div class="sushi-info">
                <h3>${set.name}</h3>
                <p>${set.description}</p>
                <span class="sushi-price">${set.price} грн</span>
                <button class="add-to-cart" data-id="${set.id}">Додати до кошика</button>
            </div>
        `;

    sushiSetsContainer.appendChild(setElement);
  });

  // Додаємо обробники подій для кнопок додавання в кошик
  document.querySelectorAll(".add-to-cart").forEach((button) => {
    button.addEventListener("click", (e) => {
      const setId = parseInt(e.target.getAttribute("data-id"));
      addToCart(setId);
    });
  });
}

// Функція додавання товару в кошик
function addToCart(setId) {
  const set = sushiSets.find((item) => item.id === setId);
  if (!set) return;

  const existingItem = cart.find((item) => item.id === setId);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      id: set.id,
      name: set.name,
      price: set.price,
      image: set.image,
      quantity: 1,
    });
  }

  updateCart();

  // Показуємо сповіщення про додавання
  showNotification(`"${set.name}" додано до кошика!`);
}

// Функція для показу сповіщень
function showNotification(message) {
  const notification = document.createElement("div");
  notification.textContent = message;
  notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background-color: #ff6b6b;
        color: white;
        padding: 1rem;
        border-radius: 4px;
        z-index: 1001;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
        animation: slideIn 0.3s ease-out;
    `;

  const style = document.createElement("style");
  style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
    `;
  document.head.appendChild(style);

  document.body.appendChild(notification);

  setTimeout(() => {
    notification.remove();
    style.remove();
  }, 3000);
}

// Функція оновлення відображення кошика
function updateCart() {
  const emptyMessage = cartItemsContainer.querySelector(".empty-cart-message");
  if (cart.length === 0) {
    if (!emptyMessage) {
      const message = document.createElement("p");
      message.className = "empty-cart-message";
      message.textContent = "Ваш кошик порожній";
      cartItemsContainer.appendChild(message);
    }
    checkoutBtn.disabled = true;
  } else {
    if (emptyMessage) {
      emptyMessage.remove();
    }

    cartItemsContainer.innerHTML = "";

    cart.forEach((item) => {
      const cartItem = document.createElement("div");
      cartItem.className = "cart-item";
      cartItem.innerHTML = `
                <div class="cart-item-info">
                    <div class="cart-item-image">
                        <img src="${item.image}" alt="${item.name}">
                    </div>
                    <div>
                        <h3>${item.name}</h3>
                        <p>${item.price} грн x ${item.quantity}</p>
                    </div>
                </div>
                <div>
                    <button class="btn remove-from-cart" data-id="${item.id}">Видалити</button>
                </div>
            `;

      cartItemsContainer.appendChild(cartItem);
    });

    document.querySelectorAll(".remove-from-cart").forEach((button) => {
      button.addEventListener("click", (e) => {
        const setId = parseInt(e.target.getAttribute("data-id"));
        removeFromCart(setId);
      });
    });

    checkoutBtn.disabled = false;
  }

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  cartTotalElement.textContent = `Загальна сума: ${total} грн`;
}

// Функція видалення товару з кошика
function removeFromCart(setId) {
  cart = cart.filter((item) => item.id !== setId);
  updateCart();
  showNotification("Товар видалено з кошика");
}

// Обробник події для кнопки оформлення замовлення
checkoutBtn.addEventListener("click", () => {
  if (cart.length === 0) {
    alert("Кошик порожній! Додайте товари перед оформленням замовлення.");
    return;
  }

  if (!user) {
    alert("Будь ласка, увійдіть або зареєструйтесь для оформлення замовлення.");
    registerModal.style.display = "flex";
    return;
  }

  const orderDetails = cart
    .map((item) => `${item.name} x${item.quantity}`)
    .join("\n");
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (
    confirm(
      `Підтвердіть замовлення:\n\n${orderDetails}\n\nЗагальна сума: ${total} грн`
    )
  ) {
    alert(
      "Замовлення оформлено! Дякуємо за покупку! Очікуйте дзвінка для підтвердження."
    );
    cart = [];
    updateCart();
  }
});

// Відкриття модальних вікон
registerBtn.addEventListener("click", () => {
  registerModal.style.display = "flex";
});

loginBtn.addEventListener("click", () => {
  loginModal.style.display = "flex";
});

// Закриття модальних вікон
closeRegister.addEventListener("click", () => {
  registerModal.style.display = "none";
});

closeLogin.addEventListener("click", () => {
  loginModal.style.display = "none";
});

// Закриття модальних вікон при кліку поза контентом
window.addEventListener("click", (e) => {
  if (e.target === registerModal) {
    registerModal.style.display = "none";
  }
  if (e.target === loginModal) {
    loginModal.style.display = "none";
  }
});

// Обробка форми реєстрації
registerForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("reg-name").value;
  const email = document.getElementById("reg-email").value;
  const password = document.getElementById("reg-password").value;

  user = { name, email };
  showNotification(`Реєстрація успішна! Вітаємо, ${name}!`);
  registerModal.style.display = "none";

  registerForm.reset();
});

// Обробка форми входу
loginForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;

  user = { email };
  showNotification(`Вітаємо з поверненням!`);
  loginModal.style.display = "none";

  loginForm.reset();
});

// Ініціалізація сторінки
document.addEventListener("DOMContentLoaded", () => {
  renderSushiSets();
  updateCart();
});
