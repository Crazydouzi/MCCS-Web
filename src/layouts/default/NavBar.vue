<template>
  <v-navigation-drawer app :model-value="store.isDrawer"  color="red">
    <v-list density="compact" >
      <v-list-item class="mt-2" prepend-icon="mdi-view-dashboard" title="系统面板" value="home" @click="router.push({name:'Home'})"></v-list-item>
      <v-list-item class="mt-2" prepend-icon="mdi-forum" title="实例管理" value="实例"  @click="router.push({name:'Server'})"></v-list-item>
      <v-list-item class="mt-2" prepend-icon="mdi-forum" title="CMD" value="CMD"  @click="router.push({name:'Command'})"></v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>
<script lang="ts" setup>
import { useAppStore } from '@/store/app'
import {useRouter} from 'vue-router'
const store = useAppStore();
const router=useRouter();
</script>
