<template>
  <div class="card__parent">
    <code class="card__parent__error-warning" v-if="doesContainSpecialChar"
      >The input cannot contain any Special Characters or unwanted spaces</code
    >
    <div class="items-center card" v-if="!isEditAreaVisible">
      <div class="card__title">
        <span>{{ title }}</span>
      </div>

      <div class="card__edit-options-wrapper">
        <div
          :class="`items-center card__edit-options-wrapper__status-container ${getBgColor()} ${
            !isEditOptionVisible && 'margin-change'
          }`"
        >
          <code class="card__edit-options-wrapper__status-div__status">{{ `(${status})` }}</code>
        </div>

        <div
          :class="`${!isEditOptionVisible && 'visibility-0'}`"
          class="card__edit-options-wrapper__edit-options-icons"
        >
          <i
            class="fa-solid fa-trash card__edit-options-wrapper__edit-options-icons__icon card__edit-options-wrapper__edit-options-icons__icon--delete-icon"
            @click="emitDeleteFunction(index)"
          ></i>
          <i class="fa-solid fa-pencil card__edit-options-wrapper__edit-options-icons__icon card__edit-options-wrapper__edit-options-icons__icon--edit-icon" @click="isEditAreaVisible = true"></i>
        </div>
      </div>
    </div>
    <div v-if="isEditAreaVisible" class="card__parent__edit-div">
      <textarea v-model="titleChange" class="input-textarea card__parent__edit-div__textarea" />
      <Select :status="props.status" @onChangeStatus="getStatus" />
      <div class="todo__button-group">
        <button
          :class="(doesContainSpecialChar || !titleChange) && 'low-opacity'"
          :disabled="doesContainSpecialChar || !titleChange"
          @click="titleChange.length > 0 && emitEditFunction(index)"
          class="todo__button-group__button"
        >
          Edit Card
        </button>
        <i
          class="fa-solid fa-xmark todo__button-group__icon"
          @click="(isEditAreaVisible = false), (titleChange = title)"
        ></i>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

import { ref, watch } from "vue";

import checkCharacters from "../helpers/checkCharacters";
import Select from "./Select.vue";

const props = defineProps<{
  title: string;
  index: number;
  isEditOptionVisible: boolean;
  status: string;
}>();

const emit = defineEmits(["onEdit", "onDelete"]);

const isEditAreaVisible = ref<boolean>(false);
const titleChange = ref<string>(props.title);
const doesContainSpecialChar = ref<boolean>(false);
const statusChange = ref<string>(props.status);
//watch
watch(titleChange, (newValue) => {
  doesContainSpecialChar.value = checkCharacters(newValue);
});

//functions

const getStatus = (status: string) => {
  statusChange.value = status;
};

const emitEditFunction = (index: number) => {
  emit("onEdit", titleChange, index, statusChange);
  isEditAreaVisible.value = false;
};

const emitDeleteFunction = (index: number) => {
  emit("onDelete", index);
};

const getBgColor = () => {
  if (props.status === "pending") {
    return "bg-grey";
  } else if (props.status === "in-progress") {
    return "bg-orange";
  } else {
    return "bg-green";
  }
};

</script>

<style scoped lang="scss">

.card__parent {
  
  &__error-warning {
   color: red;
    display: block;
    margin-bottom: 15px;
  }

  &__edit-div {
    &__textarea {
      border-radius: 20px;
    }
  }
}

.card {
  width: 100%;
  height: fit-content;
  justify-content: space-between;
  gap: 15px;
  padding: 10px 18px;
  background-color: rgb(34, 33, 33);
  border-radius: 15px;
  flex-wrap: wrap;

  &__title {
    color: white;
  }

  &__edit-options-wrapper {
    display: flex;
    align-items: center;

    &__status-container {
      height: 1.5em;
      width: fit-content;
      margin-right: 15px;
      border-radius: 8px;
      color: white;
      min-width: 102px;

        &__status {
          color: white;
        }
    }

    &__edit-options-icons {

         &__icon {
          cursor: pointer;
          color: white;

            &--delete-icon {
              margin-right: 15px;
            }
         }
    }
  }
}

.visibility-0 {
  display: none;
}

.margin-change {
  margin-right: 0;
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

//media query
@media screen and (max-width: 600px) {
  .card {
    flex-direction: column;
    gap: 15px;
    height: fit-content;
    padding-top: 15px;
    padding-bottom: 15px;
    min-width: 100%;

      &__title {
        width: 100%;
        height: fit-content;
        word-wrap: break-word;
        overflow-wrap: break-word;
      }

        &__edit-options-wrapper {
          width: 100%;
          justify-content: space-between;

            &__status-div {
              width: 40%;
            }
        }
  }

  
}
</style>
