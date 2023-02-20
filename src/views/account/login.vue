<template>
  <v-container class="fill-height" fluid>
    <v-layout :fullHeight="true">
      <v-row justify="center">
        <v-col  align-self="center" cols="12" sm="8" md="4">
          <v-card class="elevation-12">
            <v-toolbar dark flat>
              <v-toolbar-title>登录</v-toolbar-title>
              <v-spacer></v-spacer>
              <!-- <v-tooltip bottom>
                  <template v-slot:activator="{ on }">
                    <v-btn :href="source" icon large target="_blank" v-on="on">
                      <v-icon>mdi-code-tags</v-icon>
                    </v-btn>
                  </template>
                  <span>找回密码(想淦蛤呢)</span>
                </v-tooltip> -->
            </v-toolbar>
            <v-card-text>
              <v-alert v-if="isInvalid" type="error" color="error" outlined dense>{{ errInfo }}</v-alert>
              <v-form>
                <v-text-field label="username" name="username" v-model="username" prepend-icon="mdi-account" type="text"
                  :rules="[rules.required]" @change="isInvalid = false"></v-text-field>

                <v-text-field id="password" label="Password" name="password" v-model="password" prepend-icon="mdi-lock"
                  type="password" :rules="[rules.required, rules.pwdMin]"></v-text-field>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" @click="doLogin">登录</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-layout>



  </v-container>
</template>
<script setup lang="ts">
const password: string = '';
const username: string = '';
const isInvalid: boolean = false;
const errInfo: string = '';
const rules: any = {
  required: (value: any) => !!value || '此项不能为空',
  pwdMin: (v: string) => v.length >= 6 || '这应该是一个至少6位的密码',
  emailReg: (v: string) =>
    /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(
      v
    ) || '这不是一个正确的电子邮箱',
}
function doLogin() {
  console.log('aa')
}

</script>
