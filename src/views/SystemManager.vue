<template>
  <v-container>
    <v-card class="mt-5">
      <v-toolbar density="compact" color="red">
        <v-toolbar-title>操作</v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>
      <v-divider></v-divider>
      <v-card-actions>
        <v-btn variant="outlined" color="green">保存配置</v-btn>
        <v-btn variant="outlined" @click="getSystemConfig()">刷新</v-btn>
      </v-card-actions>
    </v-card>
    <v-card class="mt-5">
      <v-toolbar density="compact" color="red">
        <v-toolbar-title>基本设置</v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>
      <v-divider></v-divider>
      <v-card-text>
        <v-row>
          <v-col cols="12" lg="6" xl="6" md="6">
            <v-list density="compact">
              <v-list-item>
                <v-list-item-title>
                  <h4>面板端口</h4>
                </v-list-item-title>
                <v-list-item-subtitle>修改面板端口需要重启服务。</v-list-item-subtitle>
                <v-text-field label="端口号" variant="outlined" class="mt-2" density="compact"
                  v-model="pageData.data.port"></v-text-field>
              </v-list-item>
              <v-list-item>
                <v-list-item-title>
                  <h4>字符编码</h4>
                </v-list-item-title>
                <v-list-item-subtitle>此项将应用于终端的IO字符编码，修改后需重启MC服务器</v-list-item-subtitle>
                <v-text-field label="编码" variant="outlined" class="mt-2" density="compact"
                  v-model="pageData.data.charset"></v-text-field>
              </v-list-item>
              <v-list-item>
                <v-list-item-title>
                  <h4>远程库配置</h4>
                </v-list-item-title>
                <v-list-item-subtitle>此项将应用于从Web中获取MCServer</v-list-item-subtitle>
                <v-text-field variant="outlined" class="mt-2" density="compact" :readonly=true
                  value="https://api.papermc.io/v2/projects/paper"></v-text-field>
              </v-list-item>
            </v-list>
          </v-col>
          <v-col>
            <v-list>
              <v-list-item>
                <v-list-item-title>
                  <h4>文件缓存目录</h4>
                </v-list-item-title>
                <p style="font-size:medium;">默认缓存上传位置</p>
                <v-text-field label="上传位置" variant="outlined" class="mt-2" density="compact"
                  v-model="pageData.data.fileOptions.dir"></v-text-field>

              </v-list-item>
              <v-list-item>
                <v-list-item-title>
                  <h4>请求完成时释放空间</h4>
                </v-list-item-title>
                <p>当操作完成时是否自动清理本次文件上传所产生的缓存文件</p>
                <v-select :items="[{ title: '是', value: true }, { title: '否', value: false }]" variant="outlined"
                  v-model="pageData.data.fileOptions.deleteUploadedFilesOnEnd" class="mt-2" density="compact"></v-select>
              </v-list-item>
            </v-list>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
    <v-card class="mt-5">
      <v-toolbar density="compact" color="red">
        <v-toolbar-title>修改密码</v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>
      <v-divider></v-divider>
      <v-card-item>
        <v-form fast-fail @submit.prevent="doChangePwd" v-model="isValid">
          <v-text-field id="password" label="Password" name="password" v-model:model-value="userData.data.user.pwd"
          prepend-icon="mdi-lock" type="password" :rules="[rules.required, rules.pwdMin]"
          variant="underlined"></v-text-field>

        <v-text-field id="checkPassword" label="确认密码" name="checkPassword" v-model="checkPassword" prepend-icon="mdi-lock"
          type="password" :rules="[rules.required, rules.pwdMin, rules.pwdRequired]" variant="underlined"></v-text-field>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn type="submit" variant="text" :disabled="!isValid">提交</v-btn>
        </v-card-actions>
      </v-form>
      </v-card-item>

    </v-card>
  </v-container>
</template>
<script setup lang="ts">
import $API from '@/core/api/fetch';
import { systemAPI,userAPI } from '@/core/api/API';
import { reactive, ref, } from 'vue';
import { onBeforeMount } from 'vue';
let pageData = reactive({
  data: {
    port: null, charset: null, fileOptions: { dir: null, deleteUploadedFilesOnEnd: false },
  }
})
const userData=reactive({data:{
  user: {
      id: null,
      pwd: ""
    }
}})
const rules: any = {
  required: (value: any) => value ? true : '此项不能为空',
  pwdMin: (v: string) => v.length >= 6 ? true : '这应该是一个至少6位的密码',
  pwdRequired: (v: string) => v === userData.data.user.pwd ? true : '两次密码输入不一致',
}
let isValid = ref()
let checkPassword = ref()
function getSystemConfig() {
  $API.request(systemAPI.systemConfig).then(r => {
    if (r.code == '200') {
      pageData.data = r.data
    }
  })
}
function doChangePwd() {
  let sessionData=JSON.parse(sessionStorage.getItem("user-sessionData"))
  userData.data.user.id=sessionData['id']
  $API.request(userAPI.changePwd,userData.data.user).then(r=>{
    alert(r.msg);
    if(r.code=='200'){
      sessionStorage.clear();
      location.reload();
    }
  })
}
onBeforeMount(() => {
  getSystemConfig()
})
</script>
