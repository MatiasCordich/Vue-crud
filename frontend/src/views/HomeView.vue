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
import { ElMessageBox, ElNotification } from 'element-plus'

export default {
  name: 'Home',
  setup() {

    /* ------------- VARIABLES REACTIVAS ------------- */
    const products = ref([]);
    const message = ref('');
    const router = useRouter()

    /* ------------- FUNCION PARA LISTAR LOS PRODUCTOS ------------- */
    const fetchProducts = async () => {
      try {
        const data = await getAllProducts()
        products.value = data
      } catch (error) {
        console.error('Error al obtener los productos:', error);
      }
    };

    /* ------------- FUNCION PARA ELMINAR UN PRODUCTO ------------- */
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

    /* ------------- FUNCION PARA MOSTRAR UN POP UP DE CONFIRMACION PARA ELIMINAR EL PRODUCTO ------------- */
    const showDeleteConfirmation = (product) => {

      // Muestro el pop up de confirmacion
      ElMessageBox.confirm('¿Estás seguro de eliminar este producto?', 'Confirmar eliminación', {
        confirmButtonText: 'Sí',
        cancelButtonText: 'No',
        type: 'warning'
      }).then(() => {

        // Si procedo con eliminar el producto, invoco la funcion para eliminar el producto
        handleDeleteProduct(product.id_producto);

        // Muestro una notificacion que me diga que se elimino correctamente
        ElNotification({
          title: 'Éxito',
          message: 'El producto se eliminó correctamente.',
          type: 'success'
        });
      }).catch(() => {

        // Caso contraio muestro una notificacion que muestre que se cancelo la operacion
        ElNotification({
          title: 'Cancelado',
          message: 'La operación de eliminar producto ha sido cancelada.',
          type: 'info'
        });
      });
    };


    /* ------------- FUNCION QUE ME LLEVA A LA VISTA EDITPRODUCT.VUE ------------- */
    const handleEditProduct = (id) => {
      router.push({ name: 'EditProduct', params: { id: id } });
    }

    /* ------------- HACER LA LLAMADA CUANDO EL COMPONENTE TERMINA DE CARGARSE ------------- */
    onMounted(fetchProducts)

    /* ------------- DEVOLVEMOS LOS VALORES NECESARIOS PARA QUE FUNCIONE LA VISTA ------------- */
    return { products, message, handleDeleteProduct, handleEditProduct, showDeleteConfirmation };
  }
};
</script>

<style scoped>
/* ------------- HOME - WRAPPER ------------- */
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

/* ------------- LINK A LA VISTA CREATEPRODUCT.VUE ------------- */
.link_crete-product {
  width: fit-content;
  padding: 1rem;
  border-radius: .4rem;
  color: #fafafa;
  background-color: var(--blue);
}

/* ------------- TABLA PRODUCTOS ------------- */

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

/* ------------- TABLA INDICADOR DISPONIBILIDAD ------------- */
.stock-available {
  color: var(--green);
}

.stock-unavailable {
  color: var(--red);
}

/* ------------- TABLA BOTONES ------------- */
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

/* ------------- MEDIA QUERIES ------------- */

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