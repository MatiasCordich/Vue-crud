<template>
  <div class="home">
    <h1>Bienvenido a la página de inicio</h1>
    <div v-if="products.length > 0">
      <router-link to="/create">Agregar producto</router-link>
      <h2>Productos</h2>


      <div class="table-responsive">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Descripción</th>
              <th>Precio</th>
              <th>Stock</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="product in products" :key="product.id_producto">
              <td>{{ product.id_producto }}</td>
              <td>{{ product.nombre }}</td>
              <td>{{ product.descripcion }}</td>
              <td>$ {{ product.precio }}</td>
              <td>
                <span v-if="product.disponible" class="stock-available">Sí</span>
                <span v-else class="stock-unavailable">No</span>
              </td>
              <td>
                <button @click="handleEditProduct(product.id_producto)">Editar</button>
                <button @click="handleDeleteProduct(product.id_producto)" class="delete-button">Eliminar</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div v-else>
      <p>{{ message }}</p>
    </div>
  </div>
</template>

<script>
import { onMounted, ref } from 'vue';
import { deleteProduct, getAllProducts } from '@/services/productServices';
import { useRouter } from 'vue-router';

export default {
  name: 'Home',
  setup() {

    const products = ref([]);
    const message = ref('');
    const router = useRouter()

    const fetchProducts = async () => {
      try {
        const data = await getAllProducts()
        products.value = data
      } catch (error) {
        console.error('Error al obtener los productos:', error);
      }
    };

    // Función para eliminar un producto
    const handleDeleteProduct = async (id) => {
      try {
        await deleteProduct(id)
        await fetchProducts()
      } catch (error) {

      }
    };

    const handleEditProduct = (id) => {
      router.push({ name: 'EditProduct', params: { id: id} });
    }

    // Hace la llamada de getProducts cuando el componente se crea
    onMounted(fetchProducts)


    return { products, message, handleDeleteProduct, handleEditProduct };
  }
};
</script>

<style scoped>
.table-responsive {
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  padding: 8px;
  border: 1px solid #ddd;
  text-align: left;
}

th {
  background-color: #f2f2f2;
}

.stock-available {
  color: green;
}

.stock-unavailable {
  color: red;
}
</style>