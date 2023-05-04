<template>
  <v-form :fast-fail=true v-model="isValid" ref="form">
    {{ isValid }}
    <v-container class="fill-height" fluid>
      <v-list style="width: 100%;">
        <h3 class="my-3">基本配置</h3>
        <v-list-item>
          <v-list-item-title>服务器名</v-list-item-title>
          <v-text-field :counter="10" label="服务器名" required variant="underlined" :rules="[rules.required]" validate-on="blur" :autofocus=true
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
          <v-select :items="['paper', 'forge']"  change="alert" variant="underlined"
            :rules="[rules.required]"></v-select>
          <v-row>
            <v-col>
              <v-file-input label="请选择Core" required variant="underlined" :rules="[rules.required]"
                accept=".jar" v-model="files"></v-file-input>
            </v-col>
            <v-col><v-text-field label="版本" required variant="underlined"
                v-model="MCServer.version"
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
              <v-btn color="blue" class="float-right" @click="save()">保存</v-btn>
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
import { versionAPI } from '@/core/api/API';
import MCServerInterface from '@/core/interface/MCServerInterface';
import MCSettingInterface from '@/core/interface/MCSettingInterface';
let MCSetting = reactive<MCSettingInterface>({
javaVersion: "java",
memMin: "1G",
memMax: "2G",
VMOptions: undefined,
jarName: undefined,
serverId: undefined
})
let MCServer = reactive<MCServerInterface>({
serverName: undefined,
version: undefined,
enable: false,
id: ''
})
let versionInfo = reactive({
  from: "paper",
  version: "",
  buildCode: "",
  coreName: ""
})
let form=ref()
let isValid=ref()
let versionList = ref([])
let selectVersion = ref()
let paperRequestInfo = {
  url: "https://api.papermc.io/v2/projects/paper",
  method: 'GET',
  headers: {
    accept: "application/json"
  },
  credentials:'omit'
}
let files=ref()
const rules: any = {
  required: (value: any) =>{return value ? true : '此项不能为空'},
}
const emit = defineEmits(['close','getServerList'])
function close() {
  emit('close')
}
function getPaperList() {
  const paperRequest = Object.assign({}, paperRequestInfo)
  $API.request(paperRequest).then(r => {
    versionList.value = r.versions
    selectVersion.value = versionList.value.at(-1)
  })
}
async function getDownLoadLink() {
  versionInfo.version = selectVersion.value
  let build = Object.assign({}, paperRequestInfo)
  build.url = build.url + "/versions/" + selectVersion.value
  await $API.request(build).then(r => {
    versionInfo.buildCode = r.builds.pop()
  }).then(async () => {
    build.url = build.url + "/builds/" + versionInfo.buildCode
    await $API.request(build).then(r => {
      versionInfo.coreName = r.downloads.application.name
    })
  })
}
async function save() {
  const { valid }= await form.value.validate()
  isValid.value =valid
  if(isValid.value){
    if (versionInfo.from == "用户上传") {
      let data={
        "file":files.value[0],
        MCServer,
        MCSetting
      }
      // data["file"]=
      console.log(data);
      $API.request(versionAPI.mcServerUpload,data).then(r=>{
        alert(r.data)
      }).catch(r=>{
        alert(r.msg)
      }).finally(()=>{
        emit("getServerList")
      })
    } else {
    getDownLoadLink().then(() => {
      console.log("完成")
      MCServer.version = selectVersion.value
      let data = {
        MCServer,
        MCSetting,
        versionInfo
      }
      $API.request(versionAPI.installRemoteMCServer,data).then(r=>{
        alert(r.data)
      }).finally(()=>{
        emit("getServerList")
      })
      alert("实例部署中。。。。操作将在一段时间后完成。。")
      close()
    })
  }
  }


}
onBeforeMount(() => {
  getPaperList()
})
</script>
