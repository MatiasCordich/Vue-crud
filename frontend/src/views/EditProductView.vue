<template>
  <div class="form_box">
    <router-link class="link_home" to="/">
      <p>
        Inicio
      </p>
    </router-link>
    <form class="form_container" @submit.prevent="handleSubmit">
      <div class="form_field">
        <label for="nombre">Nombre</label>
        <input type="text" id="nombre" v-model="formData.nombre" required>
      </div>
      <div class="form_field">
        <label for="descripcion">Descripción</label>
        <textarea type="text" id="descripcion" v-model="formData.descripcion" required></textarea>
      </div>
      <div class="form_field">
        <label for="precio">Precio</label>
        <input type="number" id="precio" v-model.number="formData.precio" required>
      </div>
      <div class="form_field-check">
        <input type="checkbox" id="disponible" v-model="formData.disponible">
        <label class="label-checkbox" for="disponible">Disponible
          <v-icon class="icon-checked" v-if="formData.disponible" :icon="checkIcon" />
        </label>

      </div>
      <button class="btn_submit" type="submit">Guardar cambios</button>
    </form>
  </div>
</template>

<script>
import { editProduct, getProductById } from '@/services/productServices';
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { Icon } from '@iconify/vue';

export default {
  name: 'EditProduct',
  components: {
    'v-icon': Icon
  },
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


    const checkIcon = 'material-symbols:check-small-rounded'

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

    return { formData, handleSubmit,checkIcon };


  }
};
</script>

<style scoped>
/* Estilos específicos para este componente */
</style>