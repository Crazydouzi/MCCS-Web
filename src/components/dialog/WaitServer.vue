<template>
      <v-dialog
      v-model="dialogStatus"
      hide-overlay
      persistent
      width="300"
    >
      <v-card
        color="primary"
        dark
      >
        <v-card-text>
          {{dialogMsg}}
          <v-progress-linear
            indeterminate
            color="white"
            class="mb-0"
          ></v-progress-linear>
        </v-card-text>
      </v-card>
    </v-dialog>
</template>
<script lang="ts" setup>import { ref } from 'vue';
  let props=defineProps(['dialogStatus','dialogMsg'])
  let dialogStatus=ref(props.dialogStatus)
  let dialogMsg=ref<String>(props.dialogMsg==null?'部署中....':props.dialogMsg)
</script>
