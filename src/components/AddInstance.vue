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
          <v-list-item-title>请选择版本</v-list-item-title>
          <v-select :items="versionList" v-model="selectVersion" change="alert" variant="underlined"></v-select>
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
            <v-col><v-text-field label="最大值" required variant="underlined"></v-text-field></v-col>
            <v-col><v-text-field label="最小值" required variant="underlined"></v-text-field></v-col>
          </v-row>
        </v-list-item>
        <v-list-item>
          <v-list-item-title>启动参数设置</v-list-item-title>
          <v-text-field :counter="10" label="VMOptions" required variant="underlined"></v-text-field>
        </v-list-item>
        <v-list-item>
          <v-row>
            <v-col>
              <v-spacer></v-spacer>
              <v-btn color="blue" class="float-right" @click="getDownLoadLink()">保存</v-btn>
            </v-col>
            <v-col>
              <v-btn color="red" @click="close">取消</v-btn>
              <v-spacer></v-spacer>
            </v-col>
          </v-row>
        </v-list-item>
      </v-list>

    </v-container>

  </v-form>
</template>

<script lang="ts" setup>
import { defineEmits, onBeforeMount, ref } from 'vue'
import $API from '@/core/api/fetch';
let versionList = ref([])
let selectVersion = ref()
let request = {
  url: "https://api.papermc.io/v2/projects/paper",
  method: 'GET',
  headers: {
    accept: "application/json"
  }
}
const emit = defineEmits(['close'])
function close() {
  emit('close')
}
function getPaperList() {
  const paperRequest = request
  $API.request(paperRequest).then(r => {
    versionList.value = r.version_groups
    selectVersion.value = versionList.value.pop()
  })
}
function getDownLoadLink() {
  let build = request
  let buildCode = "";
  let coreName = ""
  build.url = build.url + "/versions/" + selectVersion.value
  $API.request(build).then(r => {
    buildCode = r.builds.pop()
  }).then(async () => {
    build.url=build.url+"/builds/"+buildCode
    await $API.request(build).then(r => {
      coreName=r.downloads.application.name
      console.log("url:"+build.url+"/downloads/"+coreName)
    })
  }).then(()=>{
    console.log("完成")
  })

}
onBeforeMount(() => {
  getPaperList()
})
</script>
