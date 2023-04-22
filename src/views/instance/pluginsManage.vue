<template>
  <div>
    <v-card color="lighten-5" flat tile>
      <v-toolbar density="compact" color="red">
        <v-toolbar-title>插件管理</v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>
      <v-card-text>

        <v-row>
          <v-col cols="12">
            <p style="font-size:larger ;">
              <span style="color: red;">【请注意!】</span>当服务器处于开启状态时，将无法停止正在运行时的插件，为了确保服务器的运行安全，我们强烈建议您在修改插件启用状态时确保服务器已经关闭。
            </p>
            <p style="font-size:larger ;" class="mt-3">
              <span style="color: red;">【请注意!】</span>当服务器处于开启状态时，若重载插件会导致服务器可能出现异常，故不推荐有玩家在服务器时执行重载插件操作(或执行相关命令)。
            </p>
          </v-col>
          <v-col cols="12">
            <v-btn x-large class="mx-5" variant="outlined" color="green">上传插件</v-btn>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
    <v-table width="100%" class="mt-5">
      <thead>
        <tr>
          <th class="text-left">
            插件名
          </th>
          <th class="text-right">
            操作
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in pluginsList">
          <td><span v-if="/disable/.test(item)" style="color: red;">[禁用]</span>{{ item.replace(".disabled", "") }}</td>
          <td class="text-right">
            <v-btn color="red" variant="outlined" v-if="!/disable/.test(item)" @click="disablePlugin(item)">禁用</v-btn>
            <v-btn v-else color="green" variant="outlined" @click="enablePlugin(item)">启用</v-btn>
            <v-btn class="ml-4" @click="deletePlugin(item)">删除</v-btn>
          </td>
        </tr>
      </tbody>
    </v-table>
  </div>
</template>
<script setup lang="ts">
import { useRouter } from 'vue-router';
import $API from '@/core/api/fetch'
import { serverAPI } from '@/core/api/API';
import { onMounted, ref } from 'vue';
const router = useRouter()
let data = {
  id: router.currentRoute.value.params.id[0]
}
let pluginInfo = {
  "MCServer": { id: data.id },
  "plugin": ""
}
let pluginsList = ref()
function getPluginsList() {
  $API.request(serverAPI.getPluginList, data).then(r => {
    pluginsList.value = r.data
  })
}
function enablePlugin(plugin: string) {
  pluginInfo.plugin = plugin
  $API.request(serverAPI.setEnablePlugin, pluginInfo).then(r => {
    console.log(r)
  }).finally(() => {
    getPluginsList()
    pluginInfo.plugin = ""
  })
}
function disablePlugin(plugin: string) {
  pluginInfo.plugin = plugin
  $API.request(serverAPI.setDisablePlugin, pluginInfo).then(r => {
    console.log(r);
  }).finally(() => {
    getPluginsList()
    pluginInfo.plugin = ""
  })
}
function  deletePlugin(plugin: string){
  let deleteData={
    id:data.id,
    plugin
  }
  $API.request(serverAPI.deletePlugin,deleteData).then(r => {
    console.log(r);
  }).finally(() => {
    getPluginsList()
    pluginInfo.plugin = ""
  })
}
onMounted(() => {
  getPluginsList()
})
</script>
