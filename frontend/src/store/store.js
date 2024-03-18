import { defineStore } from "pinia";

export const useThemeStore = defineStore('theme', {
    state: () => ({
        darkMode: localStorage.getItem('darkMode') === 'true'
      }),
      actions: {
        setDarkMode(initialDarkMode) {
          this.darkMode = initialDarkMode;
        },
        toggleDarkMode() {
            this.darkMode = !this.darkMode;
            // Guardar el estado actual del modo oscuro en localStorage
            localStorage.setItem('darkMode', this.darkMode);
          },
      }
})