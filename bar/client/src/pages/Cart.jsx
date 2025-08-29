// Página para mostrar y gestionar el carrito de compras
// Permite actualizar cantidades, eliminar ítems y proceder al checkout
// Usa SweetAlert2 para confirmar acción de vaciar carrito

import { useCart } from '../context/CartContext'; // Funciones del carrito
import { Link } from 'react-router-dom'; // Navegación
import Swal from 'sweetalert2'; // Importa SweetAlert2 para confirmaciones

function Cart() {
  const { cartItems, updateQuantity, removeFromCart, clearCart, getTotal } =
    useCart(); // Acceso a funciones y estado del carrito

  // Actualiza cantidad de un ítem o lo elimina si es 0
  const handleUpdateQuantity = (id, newQuantity) => {
    if (newQuantity > 0) {
      updateQuantity(id, newQuantity);
    } else {
      removeFromCart(id);
    }
  };

  // Elimina un ítem del carrito
  const handleRemoveFromCart = (id) => {
    removeFromCart(id);
  };

  // Maneja confirmación para vaciar el carrito con SweetAlert2
  const handleClearCart = async () => {
    const result = await Swal.fire({
      title: '¿Estás seguro?',
      text: 'Se vaciará todo el carrito. Esta acción no se puede deshacer.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, vaciar',
      cancelButtonText: 'Cancelar',
    });

    if (result.isConfirmed) {
      await clearCart(); // Ejecuta clearCart si el usuario confirma
      Swal.fire(
        'Carrito vaciado',
        'El carrito se ha vaciado correctamente.',
        'success'
      );
    }
  };

  // Muestra mensaje si el carrito está vacío
  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto p-4 text-center">
        <h1 className="text-2xl font-bold mb-4">Carrito Vacío</h1>
        <Link to="/menu" className="text-orange-500 hover:underline">
          Volver al Menú
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Tu Carrito</h1>
      {/* Tabla para mostrar ítems del carrito */}
      <table className="w-full border-collapse mb-4">
        <thead>
          <tr className="bg-gray-800">
            <th className="p-2 text-left">Bebida</th>
            <th className="p-2 text-left">Precio</th>
            <th className="p-2 text-left">Cantidad</th>
            <th className="p-2 text-left">Subtotal</th>
            <th className="p-2 text-left">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map((item) => (
            <tr key={item.id} className="border-b border-gray-700">
              <td className="p-2 flex items-center">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-12 h-12 mr-2 rounded"
                />
                {item.name}
              </td>
              <td className="p-2">${item.price.toFixed(2)}</td>
              <td className="p-2">
                <input
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={(e) =>
                    handleUpdateQuantity(item.id, parseInt(e.target.value))
                  }
                  className="w-16 p-1 bg-gray-900 text-white border border-gray-600 rounded"
                />
              </td>
              <td className="p-2">
                ${(item.price * item.quantity).toFixed(2)}
              </td>
              <td className="p-2">
                <button
                  onClick={() => handleRemoveFromCart(item.id)}
                  className="text-red-500 hover:underline"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={handleClearCart}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Vaciar Carrito
        </button>
        <p className="text-xl font-bold">Total: ${getTotal()}</p>
      </div>
      <Link
        to="/checkout"
        className="px-6 py-3 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition block text-center"
        disabled={cartItems.length === 0}
      >
        Proceder al Pedido
      </Link>
    </div>
  );
}

export default Cart;
