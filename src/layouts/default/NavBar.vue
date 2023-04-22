<template>
  <v-navigation-drawer app :model-value="store.isDrawer"  color="red">
    <v-list density="compact" >
      <v-list-item class="mt-2" prepend-icon="mdi-view-dashboard" title="系统面板" value="Home" @click="router.push({name:'Home'})"></v-list-item>
      <v-list-item class="mt-2" prepend-icon="mdi-forum" title="实例管理" value="Server"  @click="router.push({name:'Server'})"></v-list-item>
      <v-list-item class="mt-2" prepend-icon="mdi-forum" title="CMD" value="Command"  @click="router.push({name:'Command'})"></v-list-item>
      <v-list-item class="mt-2" prepend-icon="mdi-forum" title="系统管理" value="System"  @click="router.push({name:'System'})"></v-list-item>
      <v-list-item class="mt-2" prepend-icon="mdi-forum" title="登出" @click=""></v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>
<script lang="ts" setup>
import { useAppStore } from '@/store/app'
import {useRouter} from 'vue-router'
const store = useAppStore();
const router=useRouter();
</script>
