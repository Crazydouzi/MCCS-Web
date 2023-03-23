<template>
  <v-form>
    <v-container class="fill-height" fluid>
      <v-list style="width: 100%;">
        <h3 class="my-3">基本配置</h3>
        <v-list-item>
          <v-list-item-title>服务器名</v-list-item-title>
          <v-text-field :counter="10" label="服务器名" required variant="underlined"></v-text-field>
        </v-list-item>
        <v-list-item>
          <v-list-item-title>版本</v-list-item-title>
          <v-text-field :counter="10" label="版本" required variant="underlined"></v-text-field>
        </v-list-item>
        <v-list-item>
          <v-list-item-title>请选择core</v-list-item-title>
          <v-select :items="['California', 'Colorado', 'Florida', 'Georgia', 'Texas', 'Wyoming']"
            variant="underlined"></v-select>
        </v-list-item>
        <v-divider color="black"></v-divider>
        <h3 class="my-3">参数配置</h3>
        <v-list-item>
          <v-list-item-title>Java路径</v-list-item-title>
          <v-text-field :counter="10" label="JavaVersion" required variant="underlined"></v-text-field>
        </v-list-item>
        <v-list-item>
          <v-list-item-title>内存分配</v-list-item-title>
          <v-row>
            <v-col><v-text-field  label="最大值" required variant="underlined"></v-text-field></v-col>
            <v-col><v-text-field  label="最小值" required variant="underlined"></v-text-field></v-col>
          </v-row>
        </v-list-item>
        <v-list-item>
          <v-list-item-title>启动参数设置</v-list-item-title>
          <v-text-field :counter="10" label="VMOptions" required variant="underlined"></v-text-field>
        </v-list-item>
      </v-list>

    </v-container>

  </v-form>
</template>

<script lang="ts" setup>

  //
</script>
