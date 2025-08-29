// Proveedor del contexto del carrito
// Gestiona el estado del carrito y persiste datos en LocalStorage
// Proporciona funciones para manipular el carrito
import { useState, useEffect } from 'react';
import CartContext from './CartContext';
import { getOrders, updateOrder, deleteOrder } from '../services/apiBackend';
import { toast } from 'react-toastify';

export function CartProvider({ children }) {
  // Carga ítems desde LocalStorage al inicializar
  const savedCartItems = localStorage.getItem('cartItems');
  const savedOrderId = localStorage.getItem('orderId');
  // Estado para los ítems del carrito
  const [cartItems, setCartItems] = useState(
    savedCartItems ? JSON.parse(savedCartItems) : []
  );
  const [orderId, setOrderId] = useState(savedOrderId || null);
  const [isClearing, setIsClearing] = useState(false); // Nuevo estado para forzar actualización

  // Persiste el carrito en LocalStorage al cambiar
  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    if (orderId && !isClearing) {
      // Evita recargar durante clear
      getOrders()
        .then((orders) => {
          const currentOrder = orders.find((order) => order.id === orderId);
          if (currentOrder) {
            setCartItems(currentOrder.items || []);
          } else {
            setCartItems([]);
            setOrderId(null);
            localStorage.removeItem('orderId');
          }
        })
        .catch((error) => {
          console.error('Error loading orders:', error);
          toast.error('Error al cargar los pedidos');
        });
    }
  }, [cartItems, orderId, isClearing]);

  // Agrega un ítem al carrito
  const addToCart = (item) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((i) => i.id === item.id);
      // Incrementa cantidad si el ítem ya existe
      const newItems = existingItem
        ? prevItems.map((i) =>
            i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
          )
        : // Agrega nuevo ítem con cantidad 1
          [...prevItems, { ...item, quantity: 1 }];
      if (orderId) {
        updateOrder(orderId, { items: newItems }).catch((error) =>
          console.error('Error syncing addToCart:', error)
        );
      }
      return newItems;
    });
  };

  // Actualiza la cantidad de un ítem
  const updateQuantity = (id, newQuantity) => {
    setCartItems((prevItems) =>
      prevItems
        .map((item) =>
          item.id === id ? { ...item, quantity: newQuantity } : item
        )
        .filter((item) => item.quantity > 0)
    );
    if (orderId) {
      updateOrder(orderId, { items: cartItems }).catch((error) =>
        console.error('Error syncing updateQuantity:', error)
      );
    }
  };

  // Elimina un ítem del carrito
  const removeFromCart = (id) => {
    const itemToRemove = cartItems.find((item) => item.id === id);
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
    if (orderId && itemToRemove) {
      updateOrder(orderId, { items: cartItems }).catch((error) =>
        console.error('Error syncing removeFromCart:', error)
      );
    }
  };

  // Vacía el carrito
  const clearCart = () => {
    return new Promise((resolve) => {
      console.log('Clearing cart, current items:', cartItems); // Depuración
      setIsClearing(true); // Evita recarga de useEffect
      setCartItems([]); // Vacía localmente primero
      console.log('After local clear, cartItems:', cartItems); // Depuración
      if (orderId) {
        deleteOrder(orderId)
          .then(() => {
            console.log('Order deleted, resetting orderId:', orderId); // Depuración
            setOrderId(null);
            localStorage.removeItem('orderId');
            resolve();
          })
          .catch((error) => {
            console.error('Error clearing order:', error);
            toast.error('Error al vaciar el carrito, pero se vació localmente');
            setOrderId(null); // Fuerza reset aunque falle
            localStorage.removeItem('orderId');
            resolve();
          });
      } else {
        localStorage.removeItem('orderId');
        resolve();
      }
      setIsClearing(false); // Restaura después de resolver
    });
  };

  // Calcula el total del carrito
  const getTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const getCartCount = () => {
    return cartItems.reduce((count, item) => count + item.quantity, 0);
  };

  // Valor del contexto
  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        getTotal,
        getCartCount,
        setOrderId,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
