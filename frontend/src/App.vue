<template>
  <div :class="{ 'dark-mode': darkMode }">
    <Navbar />
    <RouterView />
    <Footer/>
  </div>

</template>

<script>
import { RouterView } from 'vue-router'
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'
import { useThemeStore } from './store/store';
import { computed } from 'vue';

export default {
  components: {
    Navbar,
    Footer
  }, 
  setup(){
    const themeStore = useThemeStore()
    const darkMode = computed(()=> themeStore.darkMode)

    return {darkMode}
  }
};
</script>

<style scoped>

/* Estilos para el modo claro */
.light-mode {
  background-color: var(--white);
  color: var(--black); 
  transition: background-color 0.3s ease, color 0.3s ease;
}

/* Estilos para el modo oscuro */
.dark-mode {
  background-color:var(--black); 
  color: var(--white); 
  transition: background-color 0.3s ease, color 0.3s ease;
}
</style>
