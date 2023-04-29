<template>
  <v-dialog v-model="status" hide-overlay persistent width="300">
    <v-card dark>
      <v-card-text>
        {{ dialogMsg }}
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
          <v-btn color="green" @click="save()">确认</v-btn>
          <v-btn color="red" @click="cancel()">取消</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script lang="ts" setup>
import { ref, watch } from 'vue';
var props = defineProps(['dialogStatus', 'dialogMsg'])
const emit=defineEmits(['action-save','action-cancel','update:dialogStatus'])
let status = ref(props.dialogStatus)
let dialogMsg = ref<String>(props.dialogMsg == null ? '请确认操作' : props.dialogMsg)
function save(){
  emit('action-save')
}
function cancel(){
  status.value=false
  emit('update:dialogStatus',false)
}
watch(props, (newValue, oldValue) => {
    status.value=newValue.dialogStatus
    dialogMsg.value=(newValue.dialogMsg == null ? '请确认操作' : newValue.dialogMsg)
})
</script>
