<template>
  <v-container :fluid=true>
    <router-view style="background-color:#f3f3f3;" v-slot="{ Component,route }">
      <v-scale-transition origin="top left" :leave-absolute=true>
          <component :is="Component" ><div></div></component>
      </v-scale-transition>
    </router-view>

  </v-container>
</template>
<script lang="ts" setup></script>
