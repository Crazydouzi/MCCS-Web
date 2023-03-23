<template>
  <v-container>
    <v-row>
      <v-col cols="12" xs="12" xl="2" md="3" lg="2"> <v-card >
          <v-card-actions>
            <v-list>
              <v-list-item>
                <v-btn @click="openSock()" :disabled="socketStatus">连接Xterm</v-btn>
              </v-list-item>
              <v-list-item>
                <!-- <v-btn @click="closeSock" :disabled="!socketStatus">断开连接</v-btn> -->
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
          <div ref="terminalContainer"></div>
          <v-text-field variant="plain" prefix=" [CMD>]:" v-model="cmdMsg" @keyup.enter.native="sendMsg" hide-details
            :dirty=true class="cmdInputBox" />
        </v-card></v-col>
    </v-row>
    <v-card>
    </v-card>
  </v-container>
</template>
<script setup lang="ts">
import SockJS from 'sockjs-client/dist/sockjs.min.js'
import Stomp from 'stompjs'
import $API from "@/core/api/fetch";
import { serverAPI } from '@/core/api/API'
import { onBeforeUnmount, ref, nextTick, watch, onBeforeMount, onMounted } from "vue";
import { Terminal } from 'xterm'
import "xterm/css/xterm.css";
import "xterm/lib/xterm.js";
let sock = null;
let cmdValue = ref("")
let cmdMsg = ref('')
let status = ref(false)
let socketStatus = ref(false)
let timer: NodeJS.Timer;
let terminalContainer = ref<any>(null);
let stompClient = null;
let term: Terminal = null;
let socketUrl = "http://localhost:8080/ws/server/cmd/";
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
  if (sock != null) {
    sock.send(cmdMsg.value)
    console.log(cmdValue.value)

  }else{
    cmdValue.value=null
  }
  // if (cmdMsg.value) {
  //   cmdValue.value = cmdValue.value + "\n[CMD>]:" + cmdMsg.value
  //   cmdMsg.value = null;
  // } else {
  //   cmdValue.value = cmdValue.value + "\n[CMD>]:"
  // }
  // autoScroll();
}

function openTerminal() {
  const terminalDom = terminalContainer as any;
  const terminal = new Terminal({
    rows: 40, // 行数
    cursorBlink: true, // 光标闪烁
    cursorStyle: "block", // 光标样式  null | 'block' | 'underline' | 'bar'
    scrollback: 10,//终端中的回滚量
    tabStopWidth: 8, //制表宽度
    disableStdin: false, //是否应禁用输入。
    theme: {
      background: "#060101", //背景色
      cursor: "help",//设置光标
    }
  });
  terminal.open(terminalDom.value);
  term = terminal
  // 建立socket连接
}
function openSock() {
  sock = new SockJS(socketUrl);
  sock.onopen = function () {
    console.log('open');
    // onKeyBoard();
  };
  sock.onmessage = (d: { data: any; }) => {
    term.write(d.data);
  };
  // const onKeyBoard = () => {
  //   let msg=""
  //   // 连接成功后监听terminal输入
  //   term.onData((str: any) => {
  //     msg=str
  //   });
  //   term.onKey(e=>{
  //     if (e.domEvent.key=="Enter"){
  //       sock.send(msg)
  //     }

  //   })
  // };
}
function createSocket(term: { write: (arg0: any) => void; onData: (arg0: (str: any) => void) => void; writeln: (arg0: string) => void; focus: () => void; }) {

  /*** start 发送给服务器的数据格式，可自定义 ***/
  let msgStr = ""
  /*** end 发送给服务器的数据格式，可自定义 ***/
  // 订阅消息
  const onSubscribes = () => {
    stompClient.subscribe(socketUrl, (msg: { body: any; }) => {
      let { body } = msg;
      body = JSON.parse(body);
      const { bizCode, val } = body;
      console.log(bizCode + "_received", val);
      term.write(val);
    },)
  };

  // 监听键盘输入，并发送给服务器
  const onKeyBoard = () => {
    // 连接成功后监听terminal输入
    term.onData((str: any) => {
      console.log(str)
      msgStr = str;
      onSendMsg(msgStr);
    });
  };

  // 连接
  sock = new SockJS(socketUrl, null, {
    "transports": ["websocket"],
    timeout: 15000
  });
  stompClient = Stomp.over(sock);
  stompClient.connect({}, frame => {
    console.log("OK");
  })
  // stompClient.connect(
  //   {}, (frame: any) => {
  //     onKeyBoard();
  //     onSendMsg(msgStr);
  //     // 接收订阅消息
  //     onSubscribes();
  //     term.writeln("Connection Successful!");
  //     term.writeln("Type some keys and commands to play around.");
  //     term.focus();
  //   }, () => {
  //     term.writeln("");
  //     term.writeln("Connection Fail!");
  //     term.writeln("");
  //     console.log("***连接失败***");
  //   }
  // );
}
function onSendMsg(data: any) {
  this.stompClient.send(socketUrl, {}, data);
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
onMounted(() => {
  openTerminal()
})
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
