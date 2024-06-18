<template>
  <div class="card-parent">
    <code v-if="doesContainSpecialChar"
      >The input cannot contain any Special Characters</code
    >
    <div class="card" v-if="!isEditAreaVisible">
      <div>{{ title }} <code class="status-code-tag">{{`(${status})`}}</code></div>

      <div class="edit-option-wrapper">

        <div :class="`status-div ${getBgColor()} ${!isEditOptionVisible ? 'margin-0':''}`"></div>

      <div
        :class="`${isEditOptionVisible ? '' : 'visibility-0'}`"
        class="edit-options"
      >
        <i
          class="fa-solid fa-trash delete-icon"
          @click="$emit('handleDeleting', index)"
        ></i>
        <i class="fa-solid fa-pencil" @click="isEditAreaVisible = true"></i>
      </div>
    </div>
    </div>
    <div v-if="isEditAreaVisible" class="edit-div">
      <input name="" id="" v-model="editText" />
      <div class="option-div">
        <select name="" id="progress-options" v-model="editedStatus">
          <option value="pending">pending</option>
          <option value="in-progress">in-progress</option>
          <option value="completed">completed</option>
        </select>
      </div>
      <div class="btns edit-cards">
        <button
          :class="(doesContainSpecialChar || !editText) && 'low-opacity'"
          :disabled="doesContainSpecialChar || !editText"
          @click="
            editText.length > 0 &&
              $emit('handleEditing', editText, index, editedStatus),
              (editedValue = ''),
              (isEditAreaVisible = false)
          "
        >
          Edit Card
        </button>
        <i
          class="fa-solid fa-xmark"
          @click="(isEditAreaVisible = false), (editText = title)"
        ></i>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import checkCharacters from "../helpers/checkCharacters";

const props = defineProps<{
  title: string;
  index: number;
  isEditOptionVisible: boolean;
  status: string;
}>();

const isEditAreaVisible = ref<boolean>(false);
const editedValue = ref<string>("");
const editText = ref<string>(props.title);
const doesContainSpecialChar = ref<boolean>(false);
const editedStatus = ref<string>(props.status);
//watch
watch(editText, (newValue, oldValue) => {
  if (checkCharacters(newValue)) {
    doesContainSpecialChar.value = true;
  } else doesContainSpecialChar.value = false;
});

//functions
const getBgColor = () => {
  let bgColor = "";
  if (props.status === "pending") {
    bgColor = "bg-grey";
  } else if (props.status === "in-progress") {
    bgColor = "bg-orange";
  } else {
    bgColor = "bg-green";
  }

  return bgColor;
};
</script>

<style scoped>

.status-code-tag {
  color: lightblue;
}

i {
  cursor: pointer;
}

.edit-option-wrapper {
  display: flex;
  align-items: center;
}

.edit-options {
  display: flex;
  align-items: center;
}

.status-div {
  height: 1.5em;
  width: 3em;
  background-color: pink;
  margin-right: 15px;
  border-radius: 8px;
}

code {
  color: red;
}

.card {
  width: 100%;
  height: 3em;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 18px;
  background-color: rgb(34, 33, 33);
  border-radius: 15px;
}

.visibility-0 {
  display: none;
}

.margin-0 {
  margin-right: 0;
}

.card div:nth-child(1) {
  color: white;
}

.card i {
  color: white;
}

input {
  width: 100%;
  display: block;
  border: 0;
  border-radius: 10px;
  outline: none;
  background-color: rgb(34, 33, 33);
  padding: 15px 18px;
  color: white;
}

.edit-cards {
  padding: 0;
}

.delete-icon {
  margin-right: 15px;
}

.bg-grey {
  background-color: grey;
}

.bg-orange {
  background-color: orange;
}

.bg-green {
  background-color: green;
}
</style>
