<template>
  <v-container :fluid=true>

    <v-card color="lighten-5" flat tile>
      <v-toolbar density="compact" color="red">
        <v-toolbar-title>实例管理</v-toolbar-title>
        <v-spacer></v-spacer>

      </v-toolbar>
      <v-card-text>
        <v-row>
          <v-col cols="12">
            <v-btn x-large class="mx-5" variant="outlined" @click="instanceWindow('AddInstance')">添加实例</v-btn>
            <v-btn x-large class="mx-5" variant="outlined" @click="instanceWindow('UploadInstance')">上传实例</v-btn>
            <v-btn x-large class="mx-5" variant="outlined" @click="instanceWindow('ScanInstance')">扫描实例</v-btn>
          </v-col>
        </v-row>
        <v-expand-transition>
          <div v-if="window">
            <v-scroll-x-transition>
              <component :is="window" />

            </v-scroll-x-transition>
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
                    <v-list-item>启用状态： <v-chip class="ma-2" :color="statusColor(server.enable)" variant="outlined" label>
                        {{ server.enable ? "启用" : "停用" }}
                      </v-chip></v-list-item>
                    <v-divider />
                    <v-list-item>
                      <v-row justify-center>
                        <v-col cols="12">
                          <v-btn>管理</v-btn>
                          <v-btn :disabled="!server.enable">终端</v-btn>
                          <v-btn :disabled="!server.enable">开启</v-btn>
                          <v-btn :disabled="!server.enable">关闭</v-btn></v-col>
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

    <!-- <v-dialog v-model="dialog" hide-overlay transition="scale-transition">
      <v-card class="dialogCard  mx-auto" id="QAQ">
        <v-toolbar dark color="red">
          <v-btn icon dark @click="dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>Settings</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn dark text @click="dialog = false">Save</v-btn>
          </v-toolbar-items>
        </v-toolbar>
      </v-card>
    </v-dialog> -->

  </v-container>
</template>
<script setup lang="ts">
import $API from "@/core/api/fetch";
import { serverAPI } from '@/core/api/API'
import { onBeforeMount, ref, shallowRef } from "vue";
import AddInstance from '@/components/AddInstance.vue'
import UploadInstance from '@/components/UploadInstance.vue'
let serverList = ref();
let window = shallowRef(null)

function instanceWindow(component: String) {
  switch (component) {
    case "AddInstance":
      window.value = AddInstance;
      break;
    case "UploadInstance":
      window.value = UploadInstance;
      break;
    default:
      window.value = null;
  }
}
function getServerList() {
  $API.request(serverAPI.getServerList).then(r => {
    console.log(r)
    serverList.value = r.data
  })
}
function toolbarColor(enable: any) {
  return enable ? "red" : "grey"
}
function statusColor(enable: any) {
  return enable ? "success" : "error"

}
onBeforeMount(() => {
  getServerList()
})
</script>
<style>
.dialogCard {
  width: calc(100%);
  height: 100vh;
  transition: width .3s ease;

}

.component-fade-enter-active,
.component-fade-leave-active {
  transition: opacity .3s ease;
}

.component-fade-enter,
.component-fade-leave-to

/* .component-fade-leave-active for below version 2.1.8 */
  {
  opacity: 0;
}
</style>
