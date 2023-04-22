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
        <v-btn variant="outlined">刷新</v-btn>
        <v-btn variant="outlined" color="red">重设配置</v-btn>
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
                <v-list-item-title >
                  <h4>面板端口</h4>
                </v-list-item-title>
                <v-list-item-subtitle>修改面板端口需要重启服务。</v-list-item-subtitle>
                <v-text-field label="端口号" variant="outlined" class="mt-2" density="compact"></v-text-field>
              </v-list-item>
              <v-list-item>
                <v-list-item-title >
                  <h4>字符编码</h4>
                </v-list-item-title>
                <v-list-item-subtitle>此项将应用于终端的IO字符编码，修改后徐重启MC服务器</v-list-item-subtitle>
                <v-text-field label="编码" variant="outlined" class="mt-2" density="compact"></v-text-field>
              </v-list-item>
              <v-list-item>
                <v-list-item-title >
                  <h4>远程库配置</h4>
                </v-list-item-title>
                <v-list-item-subtitle>此项将应用于从Web中获取MCServer</v-list-item-subtitle>
                <v-text-field  variant="outlined" class="mt-2" density="compact" :readonly=true value="https://api.papermc.io/v2/projects/paper"></v-text-field>
              </v-list-item>
            </v-list>
          </v-col>
          <v-col>
            <v-list>
              <v-list-item>
                <v-list-item-title >
                  <h4>文件缓存目录</h4>
                </v-list-item-title>
                <p style="font-size:medium;">默认缓存上传位置</p>
                <v-text-field label="上传位置" variant="outlined" class="mt-2" density="compact"></v-text-field>

              </v-list-item>
              <v-list-item>
                <v-list-item-title >
                  <h4>请求完成时释放空间</h4>
                </v-list-item-title>
                <p>当操作完成时是否自动清理本次文件上传所产生的缓存文件</p>
                <v-select :items="[{ title: '是', value: true }, { title: '否', value: false }]" variant="outlined"
                  :value="true" class="mt-2" density="compact"></v-select>
              </v-list-item>
            </v-list>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-container>
</template>
<script setup lang="ts">
</script>
