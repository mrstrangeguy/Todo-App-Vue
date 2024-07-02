<template>
  <div class="status-selection-section">
    <select
      name=""
      id="status-select"
      v-model="newStatus"
      @click="returnChangedStatus"
    >
      <option :value="Options.Pending">{{ Options.Pending }}</option>
      <option :value="Options.InProgress">
        {{ Options.InProgress }}
      </option>
      <option :value="Options.Completed">
        {{ Options.Completed }}
      </option>
    </select>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

import { Options } from "../helpers/optionsEnum.ts";

const props = defineProps<{
  status: string;
}>();

const newStatus = ref<string>(props.status);
const emit = defineEmits(["onChangeStatus"]);

const returnChangedStatus = () => {
  emit("onChangeStatus", newStatus.value);
};
</script>

<style scoped>
#status-select {
  height: 2.5em;
  border: 0;
  width: 10em;
  padding: 0.5em 1em;
  font-size: 14px;
  outline: none;
  background-color: rgb(34, 33, 33);
  color: white;
  border-radius: 10px;
  margin-top: 15px;
}
</style>
