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
                核心数： {{ "8核心/16线程" }}
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
                占比： {{ memInfo.data.memFree + " / " + memInfo.data.memTotal }}
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
        <v-col md="4" sm="12" xs="12" lg="4">
          <v-list>
            <v-list-item>主机名：
              <p>DESKTOP-66VGV3I</p>
            </v-list-item>
            <v-list-item>主机地址：
              <p>10.20.229.211</p>
            </v-list-item>
          </v-list>
        </v-col>

        <v-col md="4" sm="12" xs="12" lg="4">
          <v-list>
            <v-list-item>CPU型号：<p>AMD Ryzen 9 5900HS with Radeon Graphics</p></v-list-item>
            <v-list-item>CPU核心数：<p>8核心/16线程</p></v-list-item>

            <v-list-item>内存总数：<p>23.4 GiB</p></v-list-item>

          </v-list>
        </v-col>
        <v-col md="4" sm="12" xs="12" lg="4">
          <v-list>
            <v-list-item>系统类型：<p>Windows</p></v-list-item>
            <v-list-item>系统版本：<p>Windows11 build 22623</p></v-list-item>
            <v-list-item>java版本(系统)：<p>1.8.0_201</p></v-list-item>
          </v-list>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue';
import axios from 'axios';
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
let cpuCoreCount = "8核心/16线程";
let memInfo = reactive({ data: <MemoryInterface>{} })
let cpuInfo = reactive({ data: <CPUInfoInterface>{} })
const headers: object = {
  'Content-Type': 'application/json'
}
setInterval(() => {
  getUsageInfo();
}, 7000)

function getUsageInfo() {
  axios.post("http://localhost:8080/api/system/getCpuUsage", headers).then(r => {
    cpuInfo.data = r.data.data
  })
  axios.post("http://localhost:8080/api/system/getMemUsage", headers).then(r => {
    let data: MemoryInterface = r.data.data
    memInfo.data = data
  })
}
function getSystemInfo() { }
</script>
<style></style>
