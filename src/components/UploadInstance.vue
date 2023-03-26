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
        <h3 class="my-3">整合包文件</h3>
        <v-list-item>
          <v-row>
            <v-col>
              <v-file-input label="请选择整合包" required variant="underlined" :rules="[rules.required]"
                accept=".zip"></v-file-input>
            </v-col>
            <v-col><v-text-field label="版本" required variant="underlined"
                :rules="[rules.required]"></v-text-field></v-col>
          </v-row>
        </v-list-item>
        <v-divider color="black"></v-divider>
        <h3 class="my-3">参数配置</h3>
        <v-list-item>
          <v-select :items="[{ title: '自动扫描', value: 'true' }, { title: '手动配置', value: false }]" variant="underlined"
            v-model="autoScan" :hint="autoScan ? '请确保整合包文件包含.sh或.bat启动文件' : ''" persistent-hint class="select-box"></v-select>
        </v-list-item>
        <div v-show="!autoScan">
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
            <v-text-field :counter="10" label="VMOptions" variant="underlined"
              v-model="MCSetting.VMOptions"></v-text-field>
          </v-list-item>
        </div>

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
import { onBeforeMount, reactive, ref } from 'vue'
import $API from '@/core/api/fetch';
// import { title } from 'process';
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
let autoScan = ref({ title: '自动扫描', value: true })
const rules: any = {
  required: (value: any) => value ? true : '此项不能为空',
}
const emit = defineEmits(['close'])
function close() {
  emit('close')
}


function save() {

}
onBeforeMount(() => {
})
</script>
<style>
.select-box .v-messages__message {
  color: red;
  font-weight: bold;
  font-size: small;
}
</style>
