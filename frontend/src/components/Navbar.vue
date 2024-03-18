<template>
    <nav>
        <div class="header_navbar">
            <h1>{{ currentPage }}</h1>
            <button @click="toggleMenu">
                <v-icon class="icon-btn" icon="ci:hamburger-md" :class="{ 'icon-dark': darkMode }" />
            </button>
        </div>

        <div v-if="showMenu || !isMobile" class="menu">
            <ul>
                <li>
                    <a href="https://github.com/MatiasCordich" target="_blank"
                        :class="{ 'icon-dark': darkMode, 'icon-light': !darkMode }">
                        <v-icon class="icon-link" icon="akar-icons:github-outline-fill" />
                        Github
                    </a>

                </li>
                <li>
                    <a href="https://www.linkedin.com/in/matiassiocordich/" target="_blank"
                        :class="{ 'icon-dark': darkMode, 'icon-light': !darkMode }">
                        <v-icon class="icon-link" icon="uil:linkedin" />
                        Matias Cordich
                    </a>

                </li>

                <li>
                    <a href="https://matiassiocordich.vercel.app/" target="_blank"
                        :class="{ 'icon-dark': darkMode, 'icon-light': !darkMode }">
                        <v-icon class="icon-link" icon="bytesize:portfolio" />
                        Portfolio
                    </a>

                </li>
                <li>
                    <button @click="toggleDarkMode" class="theme-toggle">
                        <v-icon class="btn-icon-theme"
                            :icon="darkMode ? 'material-symbols:sunny-rounded' : 'material-symbols:dark-mode'"
                            :class="{ 'icon-dark': darkMode }" />
                    </button>
                </li>
            </ul>

        </div>


    </nav>
</template>

<script>
import { computed, ref } from 'vue';
import { useRoute } from 'vue-router';
import { Icon } from '@iconify/vue';
import { useThemeStore } from '@/store/store';

export default {
    components: {
        'v-icon': Icon
    },
    setup() {
        const route = useRoute()
        const showMenu = ref(window.innerWidth >= 768)
        const themeStore = useThemeStore()

        // Funcion que indica en que ruta estamos en el Navbar
        const currentPage = computed(() => {
            switch (route.name) {
                case 'Home':
                    return "Inicio"
                    break;
                case 'CreateProduct':
                    return "Agregar Producto"
                    break;
                case 'EditProduct':
                    return "Editar producto"
                    break;
                default:
                    return "Pagina desconocida"
                    break;
            }
        })

        // Funcion para desplegar el menu Hamburguesa
        const toggleMenu = () => {
            if (isMobile) {
                showMenu.value = !showMenu.value;
            }
        }

        // Funcion para cambiar el tema
        const toggleDarkMode = () => {
            themeStore.toggleDarkMode();
        };


        // Defino si es mobile o no el tamanio de la aplicacion
        const isMobile = computed(() => {
            return window.innerWidth < 768;
        });

        // Actualiza showMenu cuando el tamaño de la ventana cambia
        window.addEventListener('resize', () => {
            showMenu.value = window.innerWidth >= 768;
        });

        const darkMode = computed(() => themeStore.darkMode)

        return { currentPage, toggleMenu, showMenu, toggleDarkMode, isMobile, darkMode }
    }
}

</script>

<style scoped>
/* ------------- NAVBAR ------------- */
nav {
    padding: 1rem;
    border-radius: .6rem;
    width: 95%;
}

.header_navbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem;
}

.icon-btn {
    color: var(--black);
    font-size: 4rem;
    cursor: pointer;
}

.icon-link,
.btn-icon-theme {
    font-size: 3rem;
}


/* ------------- MENU NAVBAR ------------- */
.menu ul,
.menu li,
.menu a {
    display: flex;
}

.menu li,
.menu a{
    align-items: center;
}

.menu ul{
    flex-direction: column;
}

.menu ul {
    gap: 1.5rem;
}

.menu a {
    gap: .5rem;
}

.icon-dark {
    color: var(--white);
}

.icon-light {
    color: var(--black);
}

.theme-toggle {
    border: none;
    cursor: pointer;
    overflow: hidden;
    width: 6rem;
    height: 3.5rem;
    position: relative; 
    border-radius: 4rem;
    border: 1px solid var(--grey);
}

.theme-toggle .btn-icon-theme {
  position: absolute;
  top: .2rem;
  left: 0;
  padding: .2rem;
  transition: left 0.3s ease; 
}

.theme-toggle .icon-dark {
  left: calc(100% - 3rem); 
}

/* ------------- MEDIA QUERIES ------------- */

@media (min-width: 768px) {
    .icon-btn {
        display: none;
    }

    nav {
        display: flex;
        align-items: center;
        justify-content: space-around;
    }

    .menu {
        display: flex;
    }

    .menu ul {
        flex-direction: row;
    }
}
</style>