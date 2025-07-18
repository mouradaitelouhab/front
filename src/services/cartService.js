// Service du panier connecté au backend pour ALMAS & DIMAS

const API_BASE_URL = import.meta.env.VITE_API_URL;
const CART_KEY = 'almas_dimas_cart';

// === Local Storage ===
const getLocalCart = () => {
  try {
    const stored = localStorage.getItem(CART_KEY);
    return stored ? JSON.parse(stored) : { items: [] };
  } catch (error) {
    console.error('Error reading cart from localStorage:', error);
    return { items: [] };
  }
};

const saveLocalCart = (cart) => {
  try {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  } catch (error) {
    console.error('Error saving cart to localStorage:', error);
  }
};

// === Backend Communication ===
const saveCartToBackend = async (userId, token) => {
  const cart = getLocalCart();

  try {
    const response = await fetch(`${API_BASE_URL}/cart/${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ items: cart.items })
    });

    if (!response.ok) throw new Error(`Failed to save cart. Status: ${response.status}`);
    return true;
  } catch (error) {
    console.error('Error saving cart to backend:', error);
    return false;
  }
};

const loadCartFromBackend = async (userId, token) => {
  try {
    const response = await fetch(`${API_BASE_URL}/cart/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    if (!response.ok) throw new Error(`Failed to load cart. Status: ${response.status}`);
    const data = await response.json();
    saveLocalCart({ items: data.items || [] });
    return data.items || [];
  } catch (error) {
    console.error('Error loading cart from backend:', error);
    return [];
  }
};

// === Core Logic ===
const cartService = {
  getItems: () => getLocalCart().items,

  addItem: (product, quantity = 1) => {
    try {
      const cart = getLocalCart();
      const existing = cart.items.find(item => item.id === product.id);

      if (existing) {
        existing.quantity += quantity;
      } else {
        cart.items.push({ ...product, quantity });
      }

      saveLocalCart(cart);
    } catch (error) {
      console.error('Error adding item to cart:', error);
    }
  },

  removeItem: (productId) => {
    try {
      const cart = getLocalCart();
      cart.items = cart.items.filter(item => item.id !== productId);
      saveLocalCart(cart);
    } catch (error) {
      console.error('Error removing item from cart:', error);
    }
  },

  updateQuantity: (productId, quantity) => {
    try {
      const cart = getLocalCart();
      const item = cart.items.find(item => item.id === productId);
      if (item) {
        item.quantity = quantity;
        saveLocalCart(cart);
      }
    } catch (error) {
      console.error('Error updating quantity:', error);
    }
  },

  clearCart: () => {
    saveLocalCart({ items: [] });
  },

  isInCart: (productId) => {
    try {
      const cart = getLocalCart();
      return cart.items.some(item => item.id === productId);
    } catch (error) {
      console.error('Error checking cart item:', error);
      return false;
    }
  },

  saveCartToBackend,
  loadCartFromBackend
};

export default cartService;
