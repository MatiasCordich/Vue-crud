<template>
    <footer class="footer">
        <p>Made by Matias</p>
        <p class="text">Made with Vue, MySQL and lot of love <img width="14" height="14"
                src="https://img.icons8.com/material-rounded/24/dc3545/like--v1.png" alt="like--v1" /></p>
        <p>{{ currentYear }}</p>
    </footer>
</template>



<script>
import { ref } from 'vue';

export default {
    setup() {
        const currentYear = ref(new Date().getFullYear())

        return {
            currentYear
        }
    }
}

</script>

<style scoped>
.footer {
    height: 10rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.footer p {
    font-size: 1.5rem;
    padding: .5rem;
}

.text{
    display: flex;
    align-items: center;
    gap: .2rem;
}
</style>