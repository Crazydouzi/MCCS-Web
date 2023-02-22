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
                占比： {{ memInfo.data.memFree }} / {{ memInfo.data.memTotal }}
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
import axios from 'axios';
import { before } from 'node:test';
import { onBeforeRouteLeave } from 'vue-router';
interface MemoryInterface {
  memTotal: string;
  memFree: string;
  memUsage: number;
  memUse: string;
  jvmMemUse: number;
}
interface CPUInfoInterface {
  cpuUsage: number;
  cpuWaitPer: string;
  cpuSysUsage: string;
  cpuUserUsage: string;
}
interface SystemInfoInterface {
  HostName: string
  HostAddress: string
  cpuName: string
  cpuCoreCount: string
  systemName: string
  systemType: string
  totalMemory: string
  javaVersion: string
}
let memInfo = reactive({ data: <MemoryInterface>{} })
let cpuInfo = reactive({ data: <CPUInfoInterface>{} })
let systemInfo = reactive({ data: <SystemInfoInterface>{} })

const headers: object = {
  'Content-Type': 'application/json'
}


function getUsageInfo() {
  axios.post("http://localhost:8080/api/system/getCpuUsage", headers).then(r => {
    cpuInfo.data = r.data.data
  })
  axios.post("http://localhost:8080/api/system/getMemUsage", headers).then(r => {
    let data: MemoryInterface = r.data.data
    memInfo.data = data
  })

}
function getSystemInfo() {
  axios.post("http://localhost:8080/api/system/getInfo", headers).then(r => {
    let data: SystemInfoInterface = r.data.data
    systemInfo.data = data
  })
}
const timer = setInterval(() => {
  setTimeout(() => {
    getUsageInfo();
  }, 1)
}, 7000)
onMounted(() => {
  getUsageInfo();
  getSystemInfo();

})
onBeforeRouteLeave(() => {
  clearInterval(timer)
})
onBeforeUnmount(() => {
  clearInterval(timer)

})

</script>
<style></style>
