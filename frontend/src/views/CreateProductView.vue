<template>
  <div class="create-product">
    <h1>Crear Producto</h1>
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
      <button type="submit">Agregar Producto</button>
    </form>
  </div>
</template>

<script>
import { addProduct } from '@/services/productServices';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

export default {
  setup() {

    const formData = ref({
      nombre: '',
      descripcion: '',
      precio: 0,
      disponible: false
    })

    const router = useRouter()

    const handleSubmit = async () => {
      try {

        await addProduct(formData.value);
        router.push('/')
      } catch (error) {
        console.error('Error al agregar el producto:', error);
      }
    }

    return { formData, handleSubmit}
  }
};


</script>

<style scoped>
/* Estilos específicos para este componente */
</style>
