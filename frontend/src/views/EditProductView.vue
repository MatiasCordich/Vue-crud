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
        <Field name="precio" type="number" id="precio" v-model.number="formData.precio" rules="required"></Field>
        <ErrorMessage name="precio" class="error-message" />
      </div>

      <div class="form_field-check">
        <input type="checkbox" id="disponible" v-model="formData.disponible">
        <label class="label-checkbox" for="disponible">Disponible
          <v-icon class="icon-checked" v-if="formData.disponible" :icon="checkIcon" />
        </label>
      </div>

      <button class="btn_submit" type="submit">Guardar cambios</button>
    </Form>
  </div>
</template>

<script>
import { editProduct, getProductById } from '@/services/productServices';
import { computed, onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { Icon } from '@iconify/vue';
import { useThemeStore } from '@/store/store';
import { validate } from 'vee-validate';

export default {
  name: 'EditProduct',
  components: {
    'v-icon': Icon
  },
  setup() {

    /* ------------- UTILILIZO MIS HOOKS PARA RUTAS Y TEMA ------------- */
    const route = useRoute()
    const router = useRouter()
    const themeStore = useThemeStore()

    /* ------------- OBTENGO EL ID DEL PRODUCTO OR EL PARAM DE LA URL  ------------- */
    const id_product = route.params.id

    /* ------------- SETEO MI VARIABLE REACTIVA ------------- */
    const formData = ref({
      nombre: '',
      descripcion: '',
      precio: 0,
      disponible: false
    })

    /* ------------- OBTENGO EL RESULTADO ACTUAL DEL STORE  ------------- */
    const darkMode = computed(() => themeStore.darkMode)

    /* ------------- CONSTANTE QUE GUARDA EL VALOR DEL ICONO A MOSTAR PARA EL CHECKBOX ------------- */
    const checkIcon = 'material-symbols:check-small-rounded'

    /* ------------- FUNCION PARA CARGAR LOS DATOS DEL PRODUCTO ------------- */
    const loadProductData = async () => {
      try {

        // Obtengo los datos del producto por el id_product obtenido del param
        const productData = await getProductById(id_product)

        // Seteo los vlaors del formulario a la informacion obtenida por getProductById()
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

    /* ------------- CARGAR LOS DATOS DEL PRODUCTO CUANDO EL COMPONENTE TERMINA DE CARGARSE ------------- */
    onMounted(loadProductData);

    //* ------------- FUNCIO PARA EDITAR EL PRODUCTO ------------- */
    const handleSubmit = async () => {
      try {
        await validate()
        await editProduct(id_product, formData.value);
        // Redirigir al home después de editar el producto
        router.push('/');
      } catch (error) {
        console.error('Error al procesar el formulario:', error);
      }
    };

    return { formData, handleSubmit, checkIcon, darkMode };


  }
};
</script>

<style scoped>

</style>