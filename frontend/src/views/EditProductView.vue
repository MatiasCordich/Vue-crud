<template>
  <div class="edit-product">
    <h1>Editar Producto</h1>
    <!-- Contenido del formulario para editar un producto -->
    <router-link to="/">Volver a la página de inicio</router-link>
    <form @submit.prevent="handleSubmit">
      <div>
        <label for="nombre">Nombre:</label>
        <input type="text" id="nombre" v-model="formData.nombre" required>
      </div>
      <div>
        <label for="descripcion">Descripción:</label>
        <input type="text" id="descripcion" v-model="formData.descripcion" required>
      </div>
      <div>
        <label for="precio">Precio:</label>
        <input type="number" id="precio" v-model.number="formData.precio" required>
      </div>
      <div>
        <label for="disponible">Disponible:</label>
        <input type="checkbox" id="disponible" v-model="formData.disponible">
      </div>
      <button type="submit">Guardar Cambios</button>
    </form>
  </div>
</template>

<script>
import { editProduct, getProductById } from '@/services/productServices';
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

export default {
  name: 'EditProduct',
  setup() {

    const route = useRoute()
    const router = useRouter()

    const id_product = route.params.id
    const formData = ref({
      nombre: '',
      descripcion: '',
      precio: 0,
      disponible: false
    })

    // Funcion para cargar los datos del producto 
    const loadProductData = async () => {
      try {
        const productData = await getProductById(id_product)
        formData.value = {
          nombre: productData.nombre,
          descripcion: productData.descripcion,
          precio: productData.precio,
          disponible: productData.disponible
        }
      } catch (error) {
        console.error('Error al cargar los datos del producto:', error);
      }
    }

    // Cargar los datos del producto al inicializar el componente
    onMounted(loadProductData);

    // Función para manejar el envío del formulario
    const handleSubmit = async () => {
      try {
        await editProduct(id_product, formData.value);
        // Redirigir al home después de editar el producto
        router.push('/');
      } catch (error) {
        console.error('Error al procesar el formulario:', error);
      }
    };

    return { formData, handleSubmit };


  }
};
</script>

<style scoped>
/* Estilos específicos para este componente */
</style>