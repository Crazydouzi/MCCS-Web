<template>
  <v-navigation-drawer app v-model="drawer"  mini-variant.sync color="red">
    <v-divider></v-divider>
    <v-list density="compact" nav>
      <v-list-item prepend-icon="mdi-view-dashboard" title="Home" value="home"></v-list-item>
      <v-list-item prepend-icon="mdi-forum" title="About" value="about"></v-list-item>
    </v-list>
</v-navigation-drawer>
</template>

<script lang="ts" setup>
let drawer = true;
</script>
