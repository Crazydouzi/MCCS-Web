<template>
  <v-container class="fill-height" fluid>
    <v-layout :fullHeight="true">
      <v-row justify="center">
        <v-col align-self="center" cols="12" sm="8" md="4">
          <v-card class="elevation-12">
            <v-toolbar dark flat>
              <v-toolbar-title>登录</v-toolbar-title>
              <v-spacer></v-spacer>
              <!-- <v-tooltip bottom>
                  <template>
                    <v-btn @click="$router.push({name:'Forget'})" icon large target="_blank" v-on="on">
                      <v-icon>mdi-code-tags</v-icon>
                    </v-btn>
                  </template>
                  <span>找回密码</span>
                </v-tooltip> -->
            </v-toolbar>
            <v-card-text>
              <!-- <v-alert type="error" color="error" outlined dense>{{ errInfo }}</v-alert> -->
              <v-form fast-fail @submit.prevent="doLogin" v-model="isValid">
                <v-text-field label="username" name="username" v-model="pageData.data.username" prepend-icon="mdi-account" type="text"
                  :rules="[rules.required]"></v-text-field>
                <v-text-field id="password" label="Password" name="password" v-model="pageData.data.pwd" prepend-icon="mdi-lock"
                  type="password" :rules="[rules.required, rules.pwdMin]"></v-text-field>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn type="submit" variant="text" :disabled="!isValid">提交</v-btn>
                </v-card-actions>
              </v-form>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-layout>



  </v-container>
</template>
<script setup lang="ts">
import {useRouter} from 'vue-router';
import { ref } from 'vue';
import $API from "@/core/api/fetch"
import {userAPI} from '@/core/api/API'
import { reactive } from 'vue';
const pageData=reactive({data:{username:'',pwd:''}})
const isValid = ref();
const rules: any = {
  required: (value: any) => value ? true : '此项不能为空',
  pwdMin: (v: string) => v.length >= 6 ? true : '这应该是一个至少6位的密码',
  emailReg: (v: string) =>
    /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(
      v
    ) ? true : '这不是一个正确的电子邮箱',
}
const router=useRouter();
function doLogin() {
  if(isValid.value){
    $API.request(userAPI.login,pageData.data).then(r=>{
      if(r.code=='200'&&r.data!=null&&r.data!=''){
        sessionStorage.setItem("user-sessionData",r.data)
        router.push({name:"Home"})
      }else{
        alert(r.msg)
      }
    })
  }
}

</script>
