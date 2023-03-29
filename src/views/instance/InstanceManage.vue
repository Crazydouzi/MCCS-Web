<template>
  <div>
    <v-row>
      <v-col sm="12" xs="12" md="6" lg="6" xl="6">
        <v-card>
          <v-toolbar density="compact" color="red">
            <v-toolbar-title>基本信息</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
          <v-card-text>
            <v-list>
              <v-list-item>
                <h3>服务器名：QQQ</h3>
              </v-list-item>
              <v-list-item>
                <h3>服务器版本：194</h3>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card></v-col>
      <v-col  sm="12" xs="12" md="6" lg="6" xl="6">
        <v-card>
          <v-toolbar density="compact" color="red">
            <v-toolbar-title>基础参数配置</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
          <v-card-text>
            <v-form>
              <v-list>
                <v-list-item>
                  <v-list-item-title>Java路径</v-list-item-title>
                  <v-text-field :counter="10" label="JavaVersion" required variant="underlined"
                    v-model="MCSetting.javaVersion" :rules="[rules.required]"></v-text-field>
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
                  <v-text-field :counter="10" label="VMOptions" variant="underlined"
                    v-model="MCSetting.VMOptions"></v-text-field>
                </v-list-item>
                <v-list-item>
                  <div class="float-right">
                    <v-btn color="blue" class="mr-5">保存</v-btn>
                    <v-btn color="red">清空</v-btn>
                  </div>

                </v-list-item>
              </v-list>
            </v-form>

          </v-card-text>
        </v-card>
      </v-col>
    </v-row>



    <v-card class="mt-5">
      <v-toolbar density="compact" color="red">
        <v-toolbar-title>特定配置</v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>
      <v-card-text>
        <v-list>
          <v-list-item>
            <v-list-item-title>
              <h3>server.properties</h3>
            </v-list-item-title>
          </v-list-item>
          <v-list-item>
            <v-list-item-title>
              <h3>spigot.yml</h3>
            </v-list-item-title>
          </v-list-item>
          <v-list-item>
            <v-list-item-title>
              <h3>bukkit.yml</h3>
            </v-list-item-title>
          </v-list-item>
          <v-list-item>
            <v-list-item-title>
              <h3>bukkit.yml</h3>
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-card-text>
    </v-card>

  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue';

const rules: any = {
  required: (value: any) => value ? true : '此项不能为空',
}
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
</script>
