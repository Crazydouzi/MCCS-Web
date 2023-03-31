<template>
  <component :is="page"></component>
</template>
<script setup lang="ts">
import { shallowRef } from 'vue';
let page = shallowRef(null)
let props = defineProps(["config"])
switch (props.config) {
  case "bukkit":
    page = () => import('./Bukkit.vue')
    break;
  case "spigot":
    page = () => import('./Spigot.vue')
    break;
  case "properties":
    page = () => import('./Properties.vue')
    break;
  default:
    page = () => import('./Properties.vue')
    break;
}
</script>

