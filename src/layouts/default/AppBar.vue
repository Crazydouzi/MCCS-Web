<template>
  <v-app-bar flat>
    <v-app-bar-title>
      <v-icon icon="mdi-minecraft" @click="drawer" />
      MCServerControlPanel
    </v-app-bar-title>
  </v-app-bar>
</template>

<script lang="ts" setup>
import { useAppStore } from '@/store/app'
const store = useAppStore();
function drawer() {
  store.changeDrawer();
}
</script>
