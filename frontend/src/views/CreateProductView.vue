<template>
  <div class="form_box">
    <router-link class="link_home" to="/">
      <p>
        Inicio
      </p>
    </router-link>
    <Form class="form_container" :class="{ 'dark-mode-form': darkMode }" @submit="handleSubmit">

      <div class="form_field">
        <label for="nombre">Nombre</label>
        <Field name="nombre" type="text" id="nombre" v-model="formData.nombre" rules="required"></Field>
        <ErrorMessage name="nombre" class="error-message" />
      </div>

      <div class="form_field">
        <label for="descripcion">Descripción</label>
        <Field name="descripcion" id="descripcion" as="textarea" type="text" v-model="formData.descripcion"
          rules="required" class="description_field"></Field>
        <ErrorMessage name="descripcion" class="error-message" />
      </div>

      <div class="form_field">
        <label for="precio">Precio</label>
        <Field name="precio" type="number" step="any" id="precio" v-model.number="formData.precio" rules="required"></Field>
        <ErrorMessage name="precio" class="error-message" />
      </div>

      <div class="form_field-check">
        <input type="checkbox" id="disponible" v-model="formData.disponible">
        <label class="label-checkbox" for="disponible">Disponible
          <v-icon class="icon-checked" v-if="formData.disponible" :icon="checkIcon" />
        </label>
      </div>

      <button class="btn_submit" type="submit">Agregar Producto</button>

    </Form>
  </div>
</template>

<script>
import { addProduct } from '@/services/productServices';
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { Icon } from '@iconify/vue';
import { useThemeStore } from '@/store/store';
import { validate } from 'vee-validate';

export default {
  components: {
    'v-icon': Icon
  },
  setup() {

    /* ------------- VARIABLE REACTIVAS ------------- */
    const formData = ref({
      nombre: '',
      descripcion: '',
      precio: 0,
      disponible: false
    })

    /* ------------- UTILILIZO MIS HOOKS PARA RUTAS Y PARA EL ESTAOD DEL TEMA ------------- */
    const themeStore = useThemeStore()
    const router = useRouter()


    /* ------------- OBTENGO EL RESULTADO ACTUAL DEL STORE  ------------- */
    const darkMode = computed(() => themeStore.darkMode)

    /* ------------- CONSTANTE QUE GUARDA EL VALOR DEL ICONO A MOSTAR PARA EL CHECKBOX ------------- */
    const checkIcon = 'material-symbols:check-small-rounded'

    /* ------------- FUNCION POARA AGERGAR EL PRODUCTO ------------- */
    const handleSubmit = async () => {
      try {
        await validate()
        await addProduct(formData.value);
        router.push('/')
      } catch (error) {
        console.error('Error al agregar el producto:', error);
      }
    }

    return { formData, handleSubmit, checkIcon, darkMode }
  }
};


</script>

<style>
/* ------------- LINK HOME ------------- */

.link_home {
  width: 100%;
  text-align: left;
  margin-top: 3rem;
}

.link_home p {
  width: fit-content;
  padding: 1rem;
  color: var(--white);
  border-radius: .5rem;
  background-color: var(--blue);
}

/* ------------- FORM BOX ------------- */
.form_box {
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 100rem;
  gap: 2rem;
  width: 95%;
  margin: 0 auto;
  height: 100svh;
}

/* ------------- FORM ------------- */
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

.dark-mode-form {
  background-color: #1a1a1a;
  box-shadow: none;
  border: 1px solid var(--grey);
  border-radius: .3rem;
}

/* ------------- FORM FIELD ------------- */
.form_field {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 95%;
}

.form_field input,
.form_field textarea {
  outline: none;
  border: 1px solid var(--grey);
  padding: 1rem;
  font-size: 1.8rem;
}

.form_field textarea {
  height: 20rem;
  resize: none;
}

.form_field label,
.label-checkbox {
  font-weight: 500;
  font-size: 2.2rem;
}

/* ------------- CHECKBOX ------------- */

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
  border: 1px solid var(--grey);
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

input[type="checkbox"]:checked+.label-checkbox:before {
  background-color: var(--green);
}

input[type="checkbox"]+.label-checkbox:hover:before {
  border-color: var(--green);
  cursor: pointer;

}

/* ------------- BTN SUBMIT ------------- */
.btn_submit {
  background-color: var(--green);
  width: fit-content;
  margin: 0 auto;
  padding: 1rem;
  color: var(--white);
  border-radius: .4rem;
  cursor: pointer;
}

/* ------------- ERROR MESSAGE ------------- */
.error-message {
  color: var(--red);
  font-weight: 600;
  border: 1px solid var(--red);
  padding: 1rem;
  font-size: 1.3rem;
  background-color: rgba(255, 0, 0, 0.144);
}
</style>
