// Página para listar y gestionar órdenes existentes
// Permite actualizar mozo/tiempo y eliminar órdenes
// Usa SweetAlert2 para confirmar eliminación de pedidos

import { useState, useEffect } from 'react'; // Hooks para estado y efectos
import { Link } from 'react-router-dom'; // Navegación
import { getOrders, updateOrder, deleteOrder } from '../services/apiBackend'; // APIs de órdenes
import { toast } from 'react-toastify'; // Notificaciones
import Swal from 'sweetalert2'; // Confirmaciones interactivas

function Orders() {
  // Estados para órdenes y estado de carga
  const [orders, setOrders] = useState([]); // Lista de órdenes
  const [loading, setLoading] = useState(true); // Estado de carga

  // Carga órdenes al montar el componente
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await getOrders();
        setOrders(data);
      } catch (error) {
        console.error('Error fetching orders:', error);
        toast.error('Error al cargar los pedidos');
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  // Actualiza una orden (mozo o tiempo)
  const handleUpdateOrder = async (id, updatedData) => {
    try {
      const response = await updateOrder(id, updatedData);
      setOrders(orders.map((order) => (order.id === id ? response : order)));
      toast.success(`Pedido #${id} actualizado`);
    } catch (error) {
      console.error('Error updating order:', error);
      toast.error('Error al actualizar el pedido');
    }
  };

  // Maneja confirmación para eliminar una orden con SweetAlert2
  const handleDeleteOrder = async (id) => {
    const result = await Swal.fire({
      title: '¿Estás seguro?',
      text: `Se eliminará el pedido #${id}. Esta acción no se puede deshacer.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    });

    if (result.isConfirmed) {
      try {
        await deleteOrder(id);
        setOrders(orders.filter((order) => order.id !== id));
        Swal.fire(
          'Eliminado',
          `El pedido #${id} ha sido eliminado.`,
          'success'
        );
      } catch (error) {
        console.error('Error deleting order:', error);
        Swal.fire('Error', 'No se pudo eliminar el pedido.', 'error');
      }
    }
  };

  // Muestra estado de carga
  if (loading) return <div className="text-center py-10">Cargando...</div>;
  // Muestra mensaje si no hay órdenes
  if (orders.length === 0) {
    return (
      <div className="container mx-auto p-4 text-center">
        <h1 className="text-2xl font-bold mb-4">Pedidos</h1>
        <p className="mb-4">No hay pedidos cargados.</p>
        <Link to="/menu" className="text-orange-500 hover:underline">
          Volver al Menú
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Pedidos</h1>
      {orders.map((order) => (
        <div
          key={order.id}
          className="bg-gray-800 p-4 rounded-lg shadow-lg mb-4"
        >
          <h2 className="text-lg font-semibold mb-2">Pedido #{order.id}</h2>
          <p>Mesa: {order.table}</p>
          <p>Mozo: {order.waiter}</p>
          <p>Tiempo: {order.time} min</p>
          <h3 className="font-medium mt-2">Items:</h3>
          <ul className="list-disc pl-5">
            {order.items.map((item) => (
              <li key={item.id}>
                {item.name} (x{item.quantity}) - ${item.price}
              </li>
            ))}
          </ul>
          <div className="mt-4">
            {/* Select para actualizar mozo */}
            <select
              defaultValue={order.waiter}
              onChange={(e) =>
                handleUpdateOrder(order.id, {
                  ...order,
                  waiter: e.target.value,
                })
              }
              className="p-2 bg-gray-900 text-white border border-gray-600 rounded mr-2"
            >
              <option value="Juan">Juan</option>
              <option value="María">María</option>
              <option value="Pedro">Pedro</option>
            </select>
            {/* Select para actualizar tiempo */}
            <select
              defaultValue={order.time}
              onChange={(e) =>
                handleUpdateOrder(order.id, {
                  ...order,
                  time: parseInt(e.target.value),
                })
              }
              className="p-2 bg-gray-900 text-white border border-gray-600 rounded mr-2"
            >
              <option value="10">10 min</option>
              <option value="20">20 min</option>
              <option value="30">30 min</option>
            </select>
            <button
              onClick={() => handleDeleteOrder(order.id)}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Eliminar
            </button>
          </div>
        </div>
      ))}
      <Link to="/menu" className="text-orange-500 hover:underline mt-4 block">
        Volver al Menú
      </Link>
    </div>
  );
}

export default Orders;
