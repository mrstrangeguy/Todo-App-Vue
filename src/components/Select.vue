<template>
    <div class="option-div">
        <select name="" id="status-select" v-model="newStatus" @click="returnChangedStatus">
          <option :value="OptionsEnum.A">{{ OptionsEnum.A }}</option>
          <option :value="OptionsEnum.B">{{ OptionsEnum.B }}</option>
          <option :value="OptionsEnum.C">{{ OptionsEnum.C }}</option>
        </select>
      </div>
</template>

<script setup lang="ts">
  import { OptionsEnum } from '../helpers/optionsEnum.ts';
  import { ref } from "vue";

 const props = defineProps<{
  status:string;
  }>()

const newStatus = ref<string>(props.status);
const emit = defineEmits(['onStatusChange']);

const returnChangedStatus = () => {

   emit('onStatusChange',newStatus.value);
}



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