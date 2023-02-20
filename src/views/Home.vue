<template>
  <v-container>
    <v-row class="mx-auto">
      <v-col md="12" sm="12" xs="12" lg="6">
        <v-card>
          <v-card-title>处理器</v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <v-progress-circular :rotate="360" :size="200" :width="8" :model-value="cpuInfo.cpuUsage" color="dark"
              class="float-md-left float-lg-left float-xl-left mr-10">
              <div>
                <p> CPU使用率</p>
                <br />
                <p style="font-size:40px">{{ cpuInfo.cpuUsage }}%</p>
                <br />
              </div>
            </v-progress-circular>
            <v-card flat>
              <v-card-title class="headline font-weight-bold">
                核心数： {{ "8核心/16线程" }}
              </v-card-title>
              <v-list flat>
                <v-list-item>
                  <v-list-item-title>CPU等待率：{{ cpuInfo.cpuWaitPer }}</v-list-item-title>
                </v-list-item>
                <v-list-item>
                  <v-list-item-title>CPU系统使用率：{{ cpuInfo.cpuSysUsage }}</v-list-item-title>
                </v-list-item>
                <v-list-item>
                  <v-list-item-title>CPU用户使用率：{{ cpuInfo.cpuUserUsage }}</v-list-item-title>
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
            <v-progress-circular :rotate="360" :size="200" :width="8" :model-value="memInfo.memUsage" color="dark"
              class="float-md-left float-lg-left float-xl-left mr-10">
              <div>
                <p> 内存使用率</p>
                <br />
                <p style="font-size:40px">{{ memInfo.memUsage }}%</p>
                <br />
              </div>
            </v-progress-circular>

            <v-card flat>
              <v-card-title class="headline font-weight-bold">
                内存占比： {{ memInfo.memFree + " / " + memInfo.memTotal }}
              </v-card-title>
              <v-list flat>
                <v-list-item>
                  <v-list-item-title>空闲内存：{{ memInfo.memFree }}</v-list-item-title>
                </v-list-item>
                <v-list-item>
                  <v-list-item-title>内存总量：{{ memInfo.memTotal }}</v-list-item-title>
                </v-list-item>
                <v-list-item>
                  <v-list-item-title>JVM占用量：{{ memInfo.memTotal }}</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-card>
          </v-card-text>
        </v-card>

      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue';

const cpuUsage = ref(22)
const memInfo = reactive({ memUsage: 61, memTotal: "23.1G", memUse: "8G", memFree: "8G" })
const cpuInfo = reactive({ cpuUsage: 2, cpuWaitPer: "0%", cpuSysUsage: "0.35%", cpuUserUsage: "1.29%" })
</script>
<style></style>
