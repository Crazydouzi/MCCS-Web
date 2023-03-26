<template>
  <div>
    <v-card color="lighten-5" flat tile>
      <v-toolbar density="compact" color="red">
        <v-toolbar-title>配置管理</v-toolbar-title>
        <v-spacer></v-spacer>

      </v-toolbar>
      <v-card-text>
        <v-row>
          <v-col cols="12">
            <v-btn x-large class="mx-5" variant="outlined" @click="">添加实例</v-btn>
            <v-btn x-large class="mx-5" variant="outlined" @click="">上传整合包</v-btn>
            <v-btn x-large class="mx-5" variant="outlined" @click="">扫描实例</v-btn>
          </v-col>
        </v-row>

      </v-card-text>

    </v-card>
    <v-card>
      {{ $route.params.id }}
    </v-card>
  </div>
</template>

<script setup lang="ts">

</script>
