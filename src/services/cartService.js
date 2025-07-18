// Service du panier d'achat pour ALMAS & DIMAS
// Gère le panier local pour les invités et les appels API pour les utilisateurs connectés

const API_BASE_URL = 'https://5000-iu5cikd8m359izkdqq3cv-8eb1bbb7.manusvm.computer/api';

// Clé pour le stockage local du panier
const CART_STORAGE_KEY = 'almas_dimas_cart';

// Utilitaires pour le stockage local
const getLocalCart = () => {
  try {
    const cart = localStorage.getItem(CART_STORAGE_KEY);
    return cart ? JSON.parse(cart) : { items: [], total: 0, subtotal: 0, tax: 0, shipping: 0 };
  } catch (error) {
    console.error('Error reading cart from localStorage:', error);
    return { items: [], total: 0, subtotal: 0, tax: 0, shipping: 0 };
  }
};

const saveLocalCart = (cart) => {
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  } catch (error) {
    console.error('Error saving cart to localStorage:', error);
  }
};

const calculateCartTotals = (items) => {
  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = subtotal * 0.2; // 20% TVA
  const shipping = subtotal > 50000 ? 0 : 500; // Livraison gratuite au-dessus de 500 MAD
  const total = subtotal + tax + shipping;
  
  return { subtotal, tax, shipping, total };
};

export const cartService = {
  // Obtenir le panier (local pour les invités)
  getCart: async () => {
    try {
      // Pour l'instant, utiliser le stockage local pour tous les utilisateurs
      const cart = getLocalCart();
      const totals = calculateCartTotals(cart.items);
      
      return {
        success: true,
        cart: {
          ...cart,
          ...totals
        }
      };
    } catch (error) {
      console.error('Error getting cart:', error);
      return {
        success: false,
        cart: { items: [], total: 0, subtotal: 0, tax: 0, shipping: 0 },
        error: error.message
      };
    }
  },

  // Ajouter un article au panier
  addItem: async (product, quantity = 1, options = {}) => {
    try {
      const cart = getLocalCart();
      
      // Vérifier si l'article existe déjà
      const existingItemIndex = cart.items.findIndex(item => 
        item.id === product.id && JSON.stringify(item.options) === JSON.stringify(options)
      );
      
      if (existingItemIndex > -1) {
        // Mettre à jour la quantité
        cart.items[existingItemIndex].quantity += quantity;
      } else {
        // Ajouter un nouvel article
        cart.items.push({
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.images?.[0] || '/images/placeholder.jpg',
          quantity,
          options,
          stockQuantity: product.stockQuantity
        });
      }
      
      const totals = calculateCartTotals(cart.items);
      const updatedCart = { ...cart, ...totals };
      
      saveLocalCart(updatedCart);
      
      return {
        success: true,
        cart: updatedCart,
        message: 'Article ajouté au panier'
      };
    } catch (error) {
      console.error('Error adding item to cart:', error);
      return {
        success: false,
        error: error.message
      };
    }
  },

  // Mettre à jour la quantité d'un article
  updateQuantity: async (itemId, quantity) => {
    try {
      const cart = getLocalCart();
      const itemIndex = cart.items.findIndex(item => item.id === itemId);
      
      if (itemIndex === -1) {
        throw new Error('Article non trouvé dans le panier');
      }
      
      if (quantity <= 0) {
        // Supprimer l'article si la quantité est 0 ou négative
        cart.items.splice(itemIndex, 1);
      } else {
        cart.items[itemIndex].quantity = quantity;
      }
      
      const totals = calculateCartTotals(cart.items);
      const updatedCart = { ...cart, ...totals };
      
      saveLocalCart(updatedCart);
      
      return {
        success: true,
        cart: updatedCart
      };
    } catch (error) {
      console.error('Error updating cart quantity:', error);
      return {
        success: false,
        error: error.message
      };
    }
  },

  // Supprimer un article du panier
  removeItem: async (itemId) => {
    try {
      const cart = getLocalCart();
      cart.items = cart.items.filter(item => item.id !== itemId);
      
      const totals = calculateCartTotals(cart.items);
      const updatedCart = { ...cart, ...totals };
      
      saveLocalCart(updatedCart);
      
      return {
        success: true,
        cart: updatedCart,
        message: 'Article supprimé du panier'
      };
    } catch (error) {
      console.error('Error removing item from cart:', error);
      return {
        success: false,
        error: error.message
      };
    }
  },

  // Vider le panier
  clearCart: async () => {
    try {
      const emptyCart = { items: [], total: 0, subtotal: 0, tax: 0, shipping: 0 };
      saveLocalCart(emptyCart);
      
      return {
        success: true,
        cart: emptyCart,
        message: 'Panier vidé'
      };
    } catch (error) {
      console.error('Error clearing cart:', error);
      return {
        success: false,
        error: error.message
      };
    }
  },

  // Obtenir le nombre d'articles dans le panier
  getCartItemCount: () => {
    try {
      const cart = getLocalCart();
      return cart.items.reduce((count, item) => count + item.quantity, 0);
    } catch (error) {
      console.error('Error getting cart item count:', error);
      return 0;
    }
  },

  // Vérifier si un produit est dans le panier
  isInCart: (productId) => {
    try {
      const cart = getLocalCart();
      return cart.items.some(item => item.id === productId);
    } catch (error) {
      console.error('Error checking if item is in cart:', error);
      return false;
    }
  }
};

export default cartService;

