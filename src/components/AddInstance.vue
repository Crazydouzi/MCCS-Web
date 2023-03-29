<template>
  <v-form @submit.prevent="save()" fast-fail>
    <v-container class="fill-height" fluid>
      <v-list style="width: 100%;">
        <h3 class="my-3">基本配置</h3>
        <v-list-item>
          <v-list-item-title>服务器名</v-list-item-title>
          <v-text-field :counter="10" label="服务器名" required variant="underlined" :rules="[rules.required]"
            v-model="MCServer.serverName"></v-text-field>
        </v-list-item>
        <h3 class="my-3">版本配置</h3>
        <v-list-item>
          <v-list-item-title>请选择CORE包来源</v-list-item-title>
          <v-select :items="['paper', '用户上传']" v-model="versionInfo.from" change="alert" variant="underlined"
            :rules="[rules.required]"></v-select>
        </v-list-item>
        <v-list-item v-if="versionInfo.from == 'paper'">
          <v-list-item-title>请选择版本</v-list-item-title>
          <v-select :items="versionList" v-model="selectVersion" change="alert" variant="underlined"
            :rules="[rules.required]"></v-select>
        </v-list-item>
        <v-list-item v-else-if="versionInfo.from === '用户上传'">
          <v-list-item-title>请选择服务器类型</v-list-item-title>
          <v-select :items="['paper', 'forge']" value="paper" change="alert" variant="underlined"
            :rules="[rules.required]"></v-select>
          <v-row>
            <v-col>
              <v-file-input label="请选择Core" required variant="underlined" :rules="[rules.required]"
                accept=".jar"></v-file-input>
            </v-col>
            <v-col><v-text-field label="版本" required variant="underlined"
                :rules="[rules.required]"></v-text-field></v-col>
          </v-row>
        </v-list-item>
        <v-divider color="black"></v-divider>
        <h3 class="my-3">参数配置</h3>
        <v-list-item>
          <v-list-item-title>Java路径</v-list-item-title>
          <v-text-field :counter="10" label="JavaVersion" required variant="underlined" v-model="MCSetting.javaVersion"
            :rules="[rules.required]"></v-text-field>
        </v-list-item>
        <v-list-item>
          <v-list-item-title>内存分配</v-list-item-title>
          <v-row>
            <v-col><v-text-field label="最小值" required variant="underlined" v-model="MCSetting.memMin"
                :rules="[rules.required]"></v-text-field></v-col>
            <v-col><v-text-field label="最大值" required variant="underlined" v-model="MCSetting.memMax"
                :rules="[rules.required]"></v-text-field></v-col>
          </v-row>
        </v-list-item>
        <v-list-item>
          <v-list-item-title>启动参数设置</v-list-item-title>
          <v-text-field :counter="10" label="VMOptions" variant="underlined" v-model="MCSetting.VMOptions"></v-text-field>
        </v-list-item>
        <v-list-item>
          <v-row>
            <v-col>
              <v-spacer></v-spacer>
              <v-btn color="blue" class="float-right" type="submit">保存</v-btn>
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
import {  onBeforeMount, reactive, ref } from 'vue'
import $API from '@/core/api/fetch';
interface MCSetting {
  javaVersion: String,
  memMin: String,
  memMax: String,
  VMOptions: String,
  jarName: String

}
interface MCServer {
  serverName: String,
  version: String,

}
let MCSetting = reactive<MCSetting>({
  javaVersion: "java",
  memMin: "1G",
  memMax: "2G",
  VMOptions: undefined,
  jarName: undefined
})
let MCServer = reactive<MCServer>({
  serverName: undefined,
  version: undefined
})
let versionInfo = reactive({
  from: "paper",
  version: "",
  buildCode: "",
  coreName: ""
})
let versionList = ref([])
let selectVersion = ref()
let request = {
  url: "https://api.papermc.io/v2/projects/paper",
  method: 'GET',
  headers: {
    accept: "application/json"
  }
}
const rules: any = {
  required: (value: any) => value ? true : '此项不能为空',
}
const emit = defineEmits(['close'])
function close() {
  emit('close')
}
function getPaperList() {
  const paperRequest = Object.assign({}, request)
  $API.request(paperRequest).then(r => {
    versionList.value = r.versions
    console.log(versionList.value)
    selectVersion.value = versionList.value.at(-1)
  })
}
async function getDownLoadLink() {
  versionInfo.version = selectVersion.value
  let build = Object.assign({}, request)
  build.url = build.url + "/versions/" + selectVersion.value
  $API.request(build).then(r => {
    versionInfo.buildCode = r.builds.pop()
  }).then(async () => {
    build.url = build.url + "/builds/" + versionInfo.buildCode
    console.log(build.url)
    await $API.request(build).then(r => {
      versionInfo.coreName = r.downloads.application.name
    })
  })
}
function save() {
  if (versionInfo.from != "用户上传") { } else {
    getDownLoadLink().then(() => {
      console.log("完成")
      MCServer.version = selectVersion.value
      let data = {
        MCServer,
        MCSetting,
        versionInfo
      }
      console.log(data)
    })
  }

}
onBeforeMount(() => {
  getPaperList()
})
</script>
