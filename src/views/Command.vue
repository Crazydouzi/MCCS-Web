<template>
  <v-container>
    <v-card>

    </v-card>
    <v-row>
      <v-col cols="12" xs="12" xl="2" md="3" lg="2"> <v-card>
          <v-card-actions>
            <v-list>
              <v-list-item>
                <v-btn @click="openSock">连接</v-btn>
              </v-list-item>
              <v-list-item>
                <v-btn @click="closeSock">关闭</v-btn>
              </v-list-item>
              <v-list-item>
                <v-btn @click="openServer" :disabled="status">开启服务器</v-btn>
              </v-list-item>
              <v-list-item>
                <v-btn @click="closeServer" :disabled="!status">关闭服务器</v-btn>
              </v-list-item>
            </v-list>
          </v-card-actions>
        </v-card></v-col>
      <v-col xs="12"> <v-card theme="dark">
          <v-spacer></v-spacer>
          <v-textarea id="cmdArea" readonly variant="plain" v-model="cmdValue" hide-details class="cmdTextArea"
            rows="20"></v-textarea>
          <v-text-field variant="plain" prefix=" [CMD>]:" v-model="cmdMsg" @keyup.enter.native="sendMsg" hide-details
            :dirty=true class="cmdInputBox">

          </v-text-field>
        </v-card></v-col>
    </v-row>



  </v-container>
</template>
<script setup lang="ts">
// import SockJS from "sockjs-client";
import SockJS from 'sockjs-client/dist/sockjs.min.js'
import $API from "@/core/api/fetch";
import { serverAPI } from '@/core/api/serverAPI'
import { onBeforeUnmount, ref, nextTick, watch, onBeforeMount } from "vue";
let sock = null;
let cmdValue = ref("")
let cmdMsg = ref('')
let status = ref(false)
let timer;
function openSock() {
  sock = new SockJS('http://localhost:8080/ws/server/process/');
  sock.onopen = function () {
    console.log('open');
  };
  sock.onmessage = (d: { data: any; }) => {
    cmdValue.value = cmdValue.value + "\n[Server>]:" + d.data;
  };
}
function closeSock() {
  if (sock != null) {
    sock.close();
    sock.onclose = function () {
      alert("Socket关闭")
      console.log('close');
    };
  }

}
function sendMsg() {
  sock.send(cmdMsg.value)
  if (cmdMsg.value) {
    cmdValue.value = cmdValue.value + "\n[CMD>]:" + cmdMsg.value
    cmdMsg.value = null;
  } else {
    cmdValue.value = cmdValue.value + "\n[CMD>]:"
  }
  console.log(cmdValue.value)
  // autoScroll();
}
function autoScroll() {

  nextTick(() => {
    const textarea = document.getElementById('cmdArea');
    textarea.scrollTop = textarea.scrollHeight;
  })
}
function openServer() {
  $API.request(serverAPI.openServer).then(r => {
    alert(r.msg)
    serverStatus()
  })
}
function closeServer() {
  $API.request(serverAPI.closeServer).then(r => {
    alert(r.msg)
    serverStatus()
  })
}
function serverStatus() {
  $API.request(serverAPI.getStatus).then(r => {
    status.value = r.data
  })
}

watch(
  () => cmdValue.value,
  (v1, v2) => { autoScroll() }
)
onBeforeMount(() => {
  // timer = setInterval(() => {
  //   setTimeout(() => {
  //     serverStatus()
  //   }, 1)
  // }, 10000)
})
onBeforeUnmount(() => {
  if (sock) closeSock();
  if (timer) clearInterval(timer);
})
</script>
<style>
.cmdInputBox .v-text-field__prefix,
.v-field__input {
  padding: 0px !important;
}

.cmdInputBox input {
  min-height: 0px;
}

.cmdInputBox .v-text-field__prefix {
  color: inherit;
}

.cmdTextArea {
  margin-top: 20px;
}
</style>
