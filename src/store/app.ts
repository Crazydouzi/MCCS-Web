// Utilities
import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
  state: () => ({
    drawer: false
  }),
  getters: {
    isDrawer: (state) => state.drawer
  },
  actions: {
    changeDrawer() {
      if (sessionStorage.getItem('user-sessionData') != null) {
        this.drawer = !this.drawer
      }
    }
  }
})
