import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { getCartItems, addToCart as addToCartAPI, updateCartItem, deleteCartItem } from '../services/api';
import { useAuth } from './AuthContext';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const { user } = useAuth();

  const fetchCart = useCallback(async () => {
    if (!user) {
      setCartItems([]);
      setCartCount(0);
      return;
    }
    try {
      const res = await getCartItems(user.id);
      if (res.data.success) {
        setCartItems(res.data.cartItems);
        setCartCount(res.data.cartItems.length);
      }
    } catch (err) {
      console.error('Error fetching cart:', err);
    }
  }, [user]);

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  const addToCart = async (item) => {
    try {
      const res = await addToCartAPI({ ...item, userId: user.id });
      if (res.data.success) {
        await fetchCart();
        return true;
      }
    } catch (err) {
      console.error('Error adding to cart:', err);
    }
    return false;
  };

  const updateQuantity = async (id, quantity) => {
    try {
      const res = await updateCartItem(id, { quantity });
      if (res.data.success) {
        await fetchCart();
      }
    } catch (err) {
      console.error('Error updating cart:', err);
    }
  };

  const removeFromCart = async (id) => {
    try {
      const res = await deleteCartItem(id);
      if (res.data.success) {
        await fetchCart();
      }
    } catch (err) {
      console.error('Error removing from cart:', err);
    }
  };

  const clearCart = () => {
    setCartItems([]);
    setCartCount(0);
  };

  return (
    <CartContext.Provider value={{ cartItems, cartCount, addToCart, updateQuantity, removeFromCart, clearCart, fetchCart }}>
      {children}
    </CartContext.Provider>
  );
};
