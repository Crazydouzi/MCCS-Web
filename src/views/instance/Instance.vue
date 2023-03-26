<template>
  <div> <v-card color="lighten-5" flat tile>
      <v-toolbar density="compact" color="red">
        <v-toolbar-title>实例管理</v-toolbar-title>
        <v-spacer></v-spacer>

      </v-toolbar>
      <v-card-text>
        <v-row>
          <v-col cols="12">
            <v-btn x-large class="mx-5" variant="outlined" @click="instanceWindow('AddInstance')">添加实例</v-btn>
            <v-btn x-large class="mx-5" variant="outlined" @click="instanceWindow('UploadInstance')">上传整合包</v-btn>
            <v-btn x-large class="mx-5" variant="outlined" @click="instanceWindow('ScanInstance')">扫描实例</v-btn>
          </v-col>
        </v-row>
        <v-expand-transition>
          <div v-if="windowStatus">
            <!-- 这个横向转动的动画有问题 -->
            <!-- <v-scroll-x-transition> -->
            <component :is="window" @close="closeWindow()" />

            <!-- </v-scroll-x-transition> -->
          </div>
        </v-expand-transition>
      </v-card-text>

    </v-card>
    <v-card class="mt-5" color="#f3f3f3" flat>
      <v-row class="mx-auto">
        <v-col cols="12">
          <v-row justify="start">
            <div v-for="server in serverList">
              <v-card height="250px" width="350px" class="mr-3 mt-3">
                <v-toolbar density="comfortable" :color="toolbarColor(server.enable)">
                  <v-toolbar-title>{{ server.serverName }}</v-toolbar-title>
                  <v-spacer></v-spacer>
                </v-toolbar>
                <v-card-actions>
                  <v-list class="mx-auto">
                    <v-list-item>版本：{{ server.version }}</v-list-item>
                    <v-list-item>服务器状态： <v-chip class="ma-2" :color="statusColor(server.enable)" variant="outlined" label>
                        {{ server.enable ? "启用" : "停用" }}
                      </v-chip>
                      <v-chip class="ma-2" :color="statusColor(status && server.enable)" variant="outlined" label>
                        {{ status && server.enable ? "运行中" : "已关闭" }}
                      </v-chip>
                    </v-list-item>
                    <!-- <v-list-item>运行状态：
                        <v-chip class="ma-2" :color="statusColor(server.enable)" variant="outlined" label>
                        {{ server.enable ? "启用" : "停用" }}
                      </v-chip>
                    </v-list-item> -->
                    <v-divider />
                    <v-list-item>
                      <v-row justify-center>
                        <v-col cols="12">
                          <v-btn @click="$router.push({ name: 'InstanceManage', params: { id: server.id } })">管理</v-btn>
                          <v-btn :disabled="!server.enable" @click="$router.push({ name: 'Command' })">终端</v-btn>
                          <v-btn :disabled="!(server.enable && !status)" @click="openServer()">开启</v-btn>
                          <v-btn :disabled="!(server.enable && status)" @click="closeServer()">关闭</v-btn></v-col>
                      </v-row>
                    </v-list-item>
                  </v-list>
                </v-card-actions>
              </v-card>
            </div>
          </v-row>
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>
<script setup lang="ts">
import $API from "@/core/api/fetch";
import { serverAPI } from '@/core/api/API'
import { onBeforeMount, onBeforeUnmount, onMounted, ref, shallowRef } from "vue";
import AddInstance from '@/components/AddInstance.vue'
import UploadInstance from '@/components/UploadInstance.vue'
let serverList = ref();
let window = shallowRef(null)
let windowStatus = ref(false)
let status = ref(false)
let timer: NodeJS.Timer;

function getServerList() {
  $API.request(serverAPI.getServerList).then(r => {
    console.log(r)
    serverList.value = r.data
  })
}
function serverStatus() {
  $API.request(serverAPI.getStatus).then(r => {
    status.value = r.data
  })
}
function closeServer() {
  $API.request(serverAPI.closeServer).then(r => {
    alert(r.msg)
    serverStatus()
  })
}
function openServer() {
  $API.request(serverAPI.openServer).then(r => {
    alert(r.msg)
    serverStatus()
  })
}
function toolbarColor(enable: Boolean | Number) {
  return enable ? "red" : "grey"
}
function statusColor(enable: Boolean | Number) {
  return enable ? "success" : "error"

}
function instanceWindow(component: String) {
  switch (component) {
    case "AddInstance":
      switchComponent(AddInstance)
      break;
    case "UploadInstance":
      switchComponent(UploadInstance)
      break;
    default:
      windowStatus.value = false
      window.value = null;
  }
}
function closeWindow() {
  windowStatus.value = !windowStatus.value
  window.value = null
}
function switchComponent(component: any) {
  if (window.value == component) {
    windowStatus.value = false
    window.value = null
  }
  else if (window.value != component && windowStatus.value) {
    window.value = component;

  }
  else {
    window.value = component;
    windowStatus.value = !windowStatus.value
  }
}
onBeforeMount(() => {
  getServerList()
  serverStatus()

})
onMounted(() => {
  timer = setInterval(() => {
    setTimeout(() => {
      serverStatus()
    }, 1)
  }, 10000)
})
onBeforeUnmount(() => {
  if (timer != null) clearInterval(timer)
})
</script>
