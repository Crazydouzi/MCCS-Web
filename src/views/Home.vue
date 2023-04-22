<template>
  <v-container>
    <v-row>
      <v-col md="12" sm="12" xs="12" lg="6">
        <v-card>
          <v-card-title>处理器</v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <!-- 图表 -->
            <v-progress-circular :rotate="360" :size="200" :width="8" :model-value="cpuInfo.data.cpuUsage" color="dark"
              class="float-md-left float-lg-left float-xl-left mr-10">
              <div>
                <br />
                <p style="font-size:40px;text-align:center">{{ cpuInfo.data.cpuUsage }}%</p>
                <br />
                <p> CPU平均使用率</p>
              </div>
            </v-progress-circular>
            <!-- 信息 -->
            <v-card flat>
              <v-card-title class="headline font-weight-bold">
                核心数： {{ systemInfo.data.cpuCoreCount }}
              </v-card-title>
              <v-list flat>
                <v-list-item>
                  <v-list-item-title>CPU等待率：{{ cpuInfo.data.cpuWaitPer }}</v-list-item-title>
                </v-list-item>
                <v-list-item>
                  <v-list-item-title>CPU系统使用率：{{ cpuInfo.data.cpuSysUsage }}</v-list-item-title>
                </v-list-item>
                <v-list-item>
                  <v-list-item-title>CPU用户使用率：{{ cpuInfo.data.cpuUserUsage }}</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-card>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col md="12" sm="12" xs="12" lg="6">
        <v-card>
          <v-card-title>内存信息</v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <!-- 图表 -->
            <v-progress-circular :rotate="360" :size="200" :width="8" :model-value="memInfo.data.memUsage" color="dark"
              class="float-md-left float-lg-left float-xl-left mr-10">
              <div>
                <br />
                <p style="font-size:40px" align="center">{{ memInfo.data.memUsage }}%</p>
                <br />
                <p> 内存使用率</p>

              </div>
            </v-progress-circular>
            <!-- 信息 -->
            <v-card flat>
              <v-card-title class="headline font-weight-bold">
                占比： {{ memInfo.data.memUse }} / {{ memInfo.data.memTotal }}
              </v-card-title>
              <v-list flat>
                <v-list-item>
                  <v-list-item-title>空闲内存：{{ memInfo.data.memFree }}</v-list-item-title>
                </v-list-item>
                <v-list-item>
                  <v-list-item-title>内存总量：{{ memInfo.data.memTotal }}</v-list-item-title>
                </v-list-item>
                <v-list-item>
                  <v-list-item-title>JVM占用量：{{ memInfo.data.jvmMemUse }}MB</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-card>
          </v-card-text>
        </v-card>

      </v-col>
    </v-row>
    <v-spacer></v-spacer>
    <v-card class="mt-5">
      <v-card-title>系统信息</v-card-title>
      <v-divider></v-divider>
      <v-row>

        <v-col cols="12" md="4" lg="4" xl="4">
          <v-list>
            <v-list-item>主机名：
              <p>{{ systemInfo.data.HostName }}</p>
            </v-list-item>
            <v-list-item>主机地址：
              <p>{{ systemInfo.data.HostAddress }}</p>
            </v-list-item>
          </v-list>
        </v-col>

        <v-col cols="12" md="4" lg="4" xl="4">
          <v-list>
            <v-list-item>CPU型号：<p>{{ systemInfo.data.cpuName }}</p></v-list-item>
            <v-list-item>CPU核心数：<p>{{ systemInfo.data.cpuCoreCount }}</p></v-list-item>
            <v-list-item>内存总数：<p>{{ systemInfo.data.totalMemory }}</p></v-list-item>
          </v-list>
        </v-col>
        <v-col cols="12" md="4" lg="4" xl="4">
          <v-list>
            <v-list-item>系统类型：<p>{{ systemInfo.data.systemType }}</p></v-list-item>
            <v-list-item>系统版本：<p>{{ systemInfo.data.systemName }}</p></v-list-item>
            <v-list-item>java版本(系统)：<p>{{ systemInfo.data.javaVersion }}</p></v-list-item>
          </v-list>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script lang="ts" setup>
import { reactive, onMounted, onBeforeUnmount } from 'vue';
import $API from "@/core/api/fetch"
import { systemAPI } from "@/core/api/API"
import SockJS from 'sockjs-client/dist/sockjs.min.js'
import {MemoryInterface} from '@/core/interface/SystemDataInterface'
import {CPUInfoInterface} from '@/core/interface/SystemDataInterface'
import {SystemInfoInterface} from '@/core/interface/SystemDataInterface'
let memInfo = reactive({ data: <MemoryInterface>{} })
let cpuInfo = reactive({ data: <CPUInfoInterface>{} })
let systemInfo = reactive({ data: <SystemInfoInterface>{} })
let socket:SockJS = null;
let socketStatus = false;
let usageTimer = null;
function usageInfoSocket() {
  socket = new SockJS(systemAPI.usageInfoWS.url)
  socket.onopen = function () {
    console.log('open');
    socketStatus = true
    socket.send("systemUsage")
    usageTimer = setInterval(() => {
      setTimeout(() => {
        socket.send("systemUsage")
      }, 1)
    },7000)

    socket.onmessage = (r: { data: any; }) => {
      let data=JSON.parse(r.data)
      cpuInfo.data = <CPUInfoInterface>data.cpuUsage
      memInfo.data = <MemoryInterface>data.memUsage
    };
  };

}
function getSystemInfo() {
  $API.request(systemAPI.getSystemInfo).then(r => {
    systemInfo.data = <SystemInfoInterface>r.data
  })
}
onMounted(() => {
  usageInfoSocket()
  getSystemInfo();

})
onBeforeUnmount(() => {
  if (usageTimer != null&&socketStatus) {
    clearInterval(usageTimer);
    socket.close();
  }
})

</script>
<style></style>
