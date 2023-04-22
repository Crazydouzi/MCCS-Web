<template>
  <v-container :fluid="true">
    <v-card width="100%">
      <v-card-actions>
        <v-list width="100%">
          <v-list-item v-for="var1, k1 in pageData.config" :key="k1">
            <v-row align='center'>
              <v-col justify-start cols="12" xl="4" lg="4" md="4">
                {{ k1 }}
              </v-col>
              <v-col justify-center cols="12" xl="4" lg="4" md="4">{{ pageData.translate[k1] }}</v-col>
              <v-col justify-end cols="12" xl="4" lg="4" md="4">
                <div v-if="(typeof (var1) == 'boolean')">
                  <v-select :items="[{ title: 'true', value: true }, { title: 'false', value: false }]"
                    v-model=pageData.config[k1] variant="underlined"></v-select>
                </div>
                <div v-else>
                  <v-text-field v-model=pageData.config[k1] variant="underlined"></v-text-field>
                </div>
              </v-col>
            </v-row>
            <v-divider class="border-opacity-40"></v-divider>
          </v-list-item>
        </v-list>

      </v-card-actions>
    </v-card>
  </v-container>
</template>
<script setup lang="ts">
import { onBeforeMount, onUnmounted, reactive } from 'vue';
import $API from '@/core/api/fetch';
import { serverAPI } from '@/core/api/API';

let props = defineProps(["config", "serverId"])
let pageData = reactive({
  config: {},
  translate: {}
})
let data = {
  id: props.serverId,
  fileName: props.config
}
function getConfig() {
  // console.log(serverAPI. getCOnfig)
  $API.request(serverAPI.getConfig, data).then(r => {
    pageData.config = flatten(r.data.config)
    pageData.translate = flatten(r.data.translate)
  })
}
function flatten(data: object) {
  const result = {};
  const isEmpty = (x) => Object.keys(x).length === 0;
  const recurse = (cur, prop) => {
    if (Object(cur) !== cur) {
      if (cur == 'true') {
        cur = true
      } else if (cur == 'false') {
        cur = false
      }
      result[prop] = cur;
    } else if (Array.isArray(cur)) {
      result[prop] = cur;
    } else {
      if (!isEmpty(cur)) {
        Object.keys(cur).forEach((key) =>
          recurse(cur[key], prop ? `${prop}.${key}` : key)
        );
      } else {
        result[prop] = "{}";
      }
    }
  };
  recurse(data, "");
  return result;
};
function unflatten(data) {
  if (Object(data) !== data || Array.isArray(data)) {
    return data;
  }
  const regex = /\.?([^.\[\]]+)$|\[(\d+)\]$/;
  const props = Object.keys(data);
  let result, p;
  while ((p = props.shift())) {

    const match = regex.exec(p);
    let target;
    if (match.index) {
      // 得到最底层key名
      const rest = p.slice(0, match.index);
      if (!(rest in data)) {
        data[rest] = match[2] ? [] : {};
        props.push(rest);
      }
      target = data[rest];
    } else {
      if (!result) {
        result = match[2] ? [] : {};
      }
      target = result;
    }
    if (/^{.*}/.test(data[p])) {
      target[match[2] || match[1]] = JSON.parse((data[p]))
    } else {
      target[match[2] || match[1]] = data[p]
    }
  }
  return result
};

onBeforeMount(() => {
  getConfig();
})
onUnmounted(() => {
  console.log(
    unflatten(Object.assign(pageData.config, {}))
  )

})
</script>

