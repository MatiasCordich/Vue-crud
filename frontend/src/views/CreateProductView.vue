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
      <button class="btn_submit" type="submit">Agregar Producto</button>
    </form>
  </div>
</template>

<script>
import { addProduct } from '@/services/productServices';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { Icon } from '@iconify/vue';

export default {
  components: {
    'v-icon': Icon
  },
  setup() {

    const formData = ref({
      nombre: '',
      descripcion: '',
      precio: 0,
      disponible: false
    })

    const checkIcon = 'material-symbols:check-small-rounded'

    const router = useRouter()

    const handleSubmit = async () => {
      try {
        await addProduct(formData.value);
        router.push('/')
      } catch (error) {
        console.error('Error al agregar el producto:', error);
      }
    }

    return { formData, handleSubmit, checkIcon }
  }
};


</script>

<style>

.link_home{
  width: 100%;
  text-align: left;
}

.link_home p{
  width: fit-content;
  padding: 1rem;
  color: var(--white);
  border-radius: .5rem;
  background-color: var(--blue);
}
.form_box {
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 100rem;
  gap: 2rem;
  width: 95%;
  margin: 0 auto;
}

.form_container {
  max-width: 50rem;
  width: 100%;
  background-color: var(--white);
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
}


.form_field {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 95%;
}

.form_field input,
.form_field textarea {
  outline: none;
  border: 1px solid #ccc;
  padding: 1rem;
  font-size: 1.8rem;
}

.form_field textarea {
  height: 20rem;
  resize: none;
}

.form_field label,
.label-checkbox{
  font-weight: 500;
  font-size: 2.2rem;
}

.form_field-check {
  display: flex;
  align-items: center;
  gap: 2rem;
  position: relative;
}

.label-checkbox {
  display: inline-block;
  position: relative;
}

input[type="checkbox"] {
  display: none;
}

.label-checkbox:before {
  content: "";
  display: inline-block;
  width: 2rem;
  height: 2rem;
  border: 1px solid #ccc;
  position: absolute;
  left: 12rem;
  top: .3rem;
}

.icon-checked {
  z-index: 1;
  position: absolute;
  left: 12rem;
  bottom: 0.3rem;
  color: var(--white);
}

/* Estilo para el "falso" checkbox cuando está marcado */
input[type="checkbox"]:checked+.label-checkbox:before {
  background-color: var(--green);
  /* Color de fondo cuando está marcado */
}

/* Estilo para el "falso" checkbox cuando se pasa el mouse sobre él */
input[type="checkbox"]+.label-checkbox:hover:before {
  border-color: var(--green);
  cursor: pointer;
  /* Color del borde al pasar el mouse */
}

.btn_submit{
  background-color: var(--green);
  width: fit-content;
  margin: 0 auto;
  padding: 1rem;
  color: var(--white);
  border-radius: .4rem;
}
</style>
