<template>
  <v-container class="fill-height" fluid>
    <v-layout :fullHeight="true">
      <v-row justify="center">
        <v-col align-self="center" cols="12" sm="8" md="4">
          <v-card class="elevation-12">
            <v-toolbar dark flat>
              <v-toolbar-title>忘记密码</v-toolbar-title>
              <v-spacer></v-spacer>
              <v-tooltip location="top">
                <template v-slot:activator="{ props }">
                  <v-btn icon v-bind="props" @click="router.push({ name: 'Login' })">
                    <v-icon>
                      mdi-login-variant
                    </v-icon>
                  </v-btn>
                </template>
                <span>登录</span>
              </v-tooltip>
            </v-toolbar>
            <v-card-text>
              <v-form fast-fail @submit.prevent="doChangePwd" v-model="isValid">
                <v-text-field label="username" name="username" v-model="pageData.data.user.username"
                  prepend-icon="mdi-account" type="text" :rules="[rules.required]" variant="underlined"></v-text-field>
                <v-text-field id="password" label="Password" name="password" v-model="pageData.data.user.pwd"
                  prepend-icon="mdi-lock" type="password" :rules="[rules.required, rules.pwdMin]"
                  variant="underlined"></v-text-field>

                <v-text-field id="checkPassword" label="确认密码" name="checkPassword" v-model="checkPassword"
                  prepend-icon="mdi-lock" type="password" :rules="[rules.required, rules.pwdMin, rules.pwdRequired]"
                  variant="underlined"></v-text-field>
                <v-row>
                  <v-col lg="9">
                    <v-text-field label="code" name="code" v-model="pageData.data.code" prepend-icon="mdi-key" type="text"
                      :rules="[rules.required]" variant="underlined"></v-text-field>
                  </v-col>
                  <v-col><v-btn color="red" @click="getCode()">申请code</v-btn></v-col>
                </v-row>

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
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import $API from '@/core/api/fetch';
import { userAPI } from '@/core/api/API';
const router = useRouter();
const pageData = reactive({
  data: {
    "user": {
      "username": null,
      "pwd": null
    },
    "code": null
  }
})

const checkPassword = ref();

const isValid = ref();
const rules: any = {
  required: (value: any) => value ? true : '此项不能为空',
  pwdMin: (v: string) => v.length >= 6 ? true : '这应该是一个至少6位的密码',
  pwdRequired: (v: string) => v === pageData.data.user.pwd ? true : '两次密码输入不一致',
  emailReg: (v: string) =>
    /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(
      v
    ) ? true : '这不是一个正确的电子邮箱',
}
function getCode() {
  let data = {
    "username": pageData.data.user.username
  }
  $API.request(userAPI.getCode, data).then(r => {
    alert(r.msg)
  })
}
function doChangePwd() {
  if (isValid.value) {
    $API.request(userAPI.forget, pageData.data).then(r => {
      alert(r.msg)
      router.push({ name: "Login" })
    })
  }
}

</script>
