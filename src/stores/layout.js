import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useLayoutStore = defineStore('layout', () => {
  const rightDrawerOpen = ref(true)

  const toggleRightDrawer = () => {
    rightDrawerOpen.value = !rightDrawerOpen.value
  }

  return {
    rightDrawerOpen,
    toggleRightDrawer,
  }
})
