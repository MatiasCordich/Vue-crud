<template>
  <div class="wrapper">
    <div v-if="products.length > 0">
      <div class="table-responsive">
        <div class="table_header">
          <h2>Productos</h2>
          <router-link class="link_crete-product" to="/create">Agregar producto</router-link>
        </div>

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
              <td class="btn-actions">
                <button class="edit-button" @click="handleEditProduct(product.id_producto)">Editar</button>
                <button @click="showDeleteConfirmation(product)" class="delete-button">Eliminar</button>
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
import { ElMessageBox, ElMessage } from 'element-plus'

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
        console.error('Error al eliminar el producto:', error);
        ElNotification.error({
          title: 'Error',
          message: 'Hubo un error al eliminar el producto'
        });
      }
    };

    // Funcion para confirmar la accion de eliminar el producto
    const showDeleteConfirmation = (product) => {
      ElMessageBox.confirm('¿Estás seguro de eliminar este producto?', 'Confirmar eliminación', {
        confirmButtonText: 'Sí',
        cancelButtonText: 'Cancelar',
        type: 'warning'
      }).then(() => {
        handleDeleteProduct(product.id_producto);
        ElMessage({
          title: 'Éxito',
          message: 'El producto se eliminó correctamente.',
          type: 'success'
        });
      }).catch(() => {
        ElMessage({
          title: 'Cancelado',
          message: 'La eliminación del producto ha sido cancelada.',
          type: 'info'
        });
      });
    };


    // Funcion que me lleva a la pagina de Editar Producto
    const handleEditProduct = (id) => {
      router.push({ name: 'EditProduct', params: { id: id } });
    }

    // Hace la llamada de getProducts cuando el componente se crea
    onMounted(fetchProducts)


    return { products, message, handleDeleteProduct, handleEditProduct, showDeleteConfirmation };
  }
};
</script>

<style scoped>
.wrapper {
  max-width: 220rem;
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 1rem;
  height: 100svh;
}

.table-responsive {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  max-width: 120rem;
  width: 100%;
  height: 80rem;
  margin: 5rem auto;
  overflow: auto;
}

.table_header {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.link_crete-product {
  width: fit-content;
  padding: 1rem;
  border-radius: .4rem;
  color: #fafafa;
  background-color: var(--blue);
}

table {
  width: 100%;
  overflow: scroll;
  border-collapse: collapse;
}

th,
td {
  padding: 1rem;
  text-align: left;
  border: 1px solid var(--grey);
}


.stock-available {
  color: var(--green);
}

.stock-unavailable {
  color: var(--red);
}

.btn-actions {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
}

.edit-button,
.delete-button {
  padding: 1rem;
  border-radius: .4rem;
  cursor: pointer;

}

.edit-button {
  background-color: var(--yellow);
}

.delete-button {
  background-color: var(--red);
  color: var(--white);
}

@media (min-width: 768px) {
  .table_header {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 95%;
  }

  .btn-actions {
    flex-direction: row;
  }
}
</style>