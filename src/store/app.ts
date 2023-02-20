// Utilities
import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
  state: () => ({
    drawer:true
  }),
  getters:{
    isDrawer:(state)=>state.drawer
  },
  actions:{
    changeDrawer(){
      this.drawer=!this.drawer
    }
  }
})
