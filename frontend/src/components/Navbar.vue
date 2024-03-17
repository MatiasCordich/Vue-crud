<template>
    <nav>
        <div class="header_navbar">
            <h1>{{ currentPage }}</h1>
            <button @click="toggleMenu">
                <v-icon class="icon-btn" icon="ci:hamburger-md" />
            </button>
        </div>

        <div v-if="showMenu || !isMobile" class="menu">
            <ul>
                <li>
                    <v-icon class="icon-link" icon="uil:linkedin" />
                    Matias Cordich
                </li>
                <li>
                    <v-icon class="icon-link" icon="akar-icons:github-outline-fill" />
                    Github
                </li>
                <li>
                    <v-icon class="icon-link" icon="bytesize:portfolio" />
                    Portfolio
                </li>
                <li>
                    <button @click="toggleTheme" class="theme-toggle">
                        <v-icon class="icon-link" :icon="themeIcon" />
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

export default {
    components: {
        'v-icon': Icon
    },
    setup() {
        const route = useRoute()
        const showMenu = ref(window.innerWidth >= 768)
        const darkMode = ref(false);


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
        const toggleTheme = () => {
            darkMode.value = !darkMode.value;
        };

        // Defino la propiedad que va a llevar :icon en base al modo del tema
        const themeIcon = computed(() => {
            return darkMode.value ? "material-symbols:sunny-rounded" : "material-symbols:dark-mode";
        });

        // Defino si es mobile o no el tamanio de la aplicacion
        const isMobile = computed(() => {
            return window.innerWidth < 768;
        });

        // Actualiza showMenu cuando el tamaño de la ventana cambia
        window.addEventListener('resize', () => {
            showMenu.value = window.innerWidth >= 768;
        });



        return { currentPage, toggleMenu, showMenu, toggleTheme, themeIcon, isMobile }
    }
}

</script>

<style scoped>
nav {
    height: 100%;
    margin: 2rem auto;
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

.icon-link {
    font-size: 3rem;
}

.menu ul {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
}

.menu li {
    display: flex;
    align-items: center;
    gap: 1rem;
}

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