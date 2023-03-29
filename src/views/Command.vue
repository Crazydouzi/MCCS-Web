<template>
  <v-container :fluid=true>
  <v-row >
    <v-col cols="12" xs="12" xl="3" md="3" lg="3">
      <v-list style="background-color:#f3f3f3; ">
        <v-list-item>
          <v-card>
            <v-card-title >服务器：{{serverName}}</v-card-title>
            <v-card-actions>
              <v-list>
                <v-list-item>
                  运行状态：
                  <v-chip class="ma-2" :color="statusColor(status)" variant="outlined" label>
                    {{ status ? "开启" : "关闭" }}
                      </v-chip>
                </v-list-item>
                <v-list-item>
                  在线人数：{{ "NaN"}}
                </v-list-item>
                <v-list-item>
                  延迟：{{ "NaN" }} MS
                </v-list-item>
              </v-list>
            </v-card-actions>
          </v-card>
        </v-list-item>
        <v-list-item class="mt-2">
          <v-card>
            <v-card-actions>
              <v-list>
                <v-list-item>
                  <v-btn @click="openSock" :disabled="socketStatus">连接终端</v-btn>
                </v-list-item>
                <v-list-item>
                  <v-btn @click="closeSock" :disabled="!socketStatus">断开连接</v-btn>
                </v-list-item>
                <v-list-item>
                  <v-btn @click="openServer" :disabled="status">开启服务器</v-btn>
                </v-list-item>
                <v-list-item>
                  <v-btn @click="closeServer" :disabled="!status">关闭服务器</v-btn>
                </v-list-item>
              </v-list>
            </v-card-actions>
          </v-card>
        </v-list-item>
      </v-list>
    </v-col>
    <v-col xs="12"> <v-card theme="dark">
        <v-spacer></v-spacer>
        <v-textarea id="cmdArea" readonly variant="plain" v-model="cmdValue" hide-details class="cmdTextArea" rows="30"
          :no-resize=true></v-textarea>
        <v-text-field v-show=socketStatus variant="plain" prefix=" [CMD>]:" v-model="cmdMsg" @keyup.enter.native="sendMsg"
          hide-details :dirty=true class="cmdInputBox">
        </v-text-field>


      </v-card>


    </v-col>
  </v-row>



  </v-container>
</template>
<script setup lang="ts">
import SockJS from 'sockjs-client/dist/sockjs.min.js'
import $API from "@/core/api/fetch";
import { serverAPI,versionAPI } from '@/core/api/API'
import { onBeforeUnmount, ref, nextTick, watch,  onMounted } from "vue";
let sock = null;
let cmdValue = ref("")
let cmdMsg = ref('')
let serverName=ref('')
let status = ref(false)
let socketStatus = ref(false)
let timer: NodeJS.Timer;
function openSock() {
  sock = new SockJS('http://localhost:8080/ws/server/cmd/');
  sock.onopen = function () {
    console.log('open');
    socketStatus.value = true
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
      socketStatus.value = false
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
function getServerInfo() {
  $API.request(versionAPI.enableServerInfo).then(r=>{
    console.log(r)
    serverName.value=r.data.serverName
  })
}
function statusColor(enable: any) {
  return enable ? "success" : "error"

}
watch(
  () => cmdValue.value,
  (v1, v2) => { autoScroll() }
)
onMounted(() => {
  serverStatus()
  getServerInfo()
  timer = setInterval(() => {
    setTimeout(() => {
      serverStatus()
    }, 1)
  }, 10000)
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
