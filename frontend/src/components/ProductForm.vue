<template>
    <form @submit.prevent="handleSubmit">
        <div>
            <label for="nombre">Nombre:</label>
            <input type="text" id="nombre" v-model="formData.nombre" required>
        </div>
        <div>
            <label for="descripcion">Descripción:</label>
            <textarea id="descripcion" v-model="formData.descripcion" required></textarea>
        </div>
        <div>
            <label for="precio">Precio:</label>
            <input type="number" id="precio" v-model="formData.precio" required>
        </div>
        <div>
            <label for="disponible">Disponible:</label>
            <input type="checkbox" id="disponible" v-model="formData.disponible">
        </div>
        <button type="submit">{{ mode === 'edit' ? 'Guardar cambios' : 'Agregar Producto' }}</button>
    </form>
</template>

<script>
import { addProduct, editProduct } from '@/services/productServices';
import { ref, reactive } from 'vue';

export default {
    props: {
        fields
    },
    setup(props, { emit }) {
        const formData = reactive({ ...props.initialData });

        const handleSubmit = async () => {
            try {
              if (props.mode === 'add') {
                await addProduct(formData.value)
              } else if ( props.mode === 'edit'){
                await editProduct(props.initialData.id, formData.value)
              } 
            } catch (error) {
                console.error('Error al enviar formulario:', error);
            }
            // Emite un evento con los datos del formulario al componente padre
            emit('submit', formData);
        };

        return { formData, handleSubmit };
    }
};
</script>

<style>
/* Estilos específicos para este componente */
</style>