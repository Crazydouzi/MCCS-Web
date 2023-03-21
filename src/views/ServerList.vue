<!-- <template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <v-row
          :align="start"
          :justify="start"
          class="grey lighten-5"
          style="height: 300px;"
        >
          <v-card
            v-for="n in 3"
            :key="n"
            class="ma-3 pa-6"
            outlined
            tile
          >
            Column
          </v-card>
        </v-row>
      </v-col>

    </v-row>
  </v-container>
</template>

<script >
  export default {
    data () {
      return {

      }
    },
  }
</script> -->

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
            <v-btn x-large class="mx-5" variant="outlined">添加实例</v-btn>
            <v-btn x-large class="mx-5" variant="outlined">上传实例</v-btn>
            <v-btn x-large class="mx-5" variant="outlined">扫描实例</v-btn>
          </v-col>
        </v-row>




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
                      <v-divider/>
                      <v-list-item>
                      <v-row justify-center>
                        <v-col cols="12">
                          <v-btn>管理</v-btn>
                          <v-btn>终端</v-btn>
                          <v-btn>开启</v-btn>
                          <v-btn>关闭</v-btn></v-col>
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

  </v-container>
</template>
<script setup lang="ts">
import $API from "@/core/api/fetch";
import { serverAPI } from '@/core/api/API'
import { onBeforeMount, onMounted, ref } from "vue";
let serverList = ref();
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
onMounted(() => {
  getServerList()
})
</script>
