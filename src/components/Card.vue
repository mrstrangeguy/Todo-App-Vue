<template>
  <div class="card__wrapper">
    <code class="card__wrapper__error-warning" v-if="doesContainSpecialChar"
      >The input cannot contain any Special Characters or unwanted spaces</code
    >
    <div class="center-elements card" v-if="!isEditAreaVisible">
      <div class="card__title">
        <span>{{ title }}</span>
      </div>

      <div class="card__edit-options-wrapper">
        <div
          :class="`center-elements card__edit-options-wrapper__status-container ${getBgColor()} ${
            !isEditOptionVisible && 'margin-change'
          }`"
        >
          <code class="card__edit-options-wrapper__status-container__status">{{
            `(${status})`
          }}</code>
        </div>

        <div
          :class="`${!isEditOptionVisible && 'visibility-0'}`"
          class="card__edit-options-wrapper__edit-options-icons"
        >
          <i
            class="fa-solid fa-trash card__edit-options-wrapper__edit-options-icons__icon"
            @click="applyDeletion(index)"
          ></i>
          <i
            class="fa-solid fa-pencil card__edit-options-wrapper__edit-options-icons__icon"
            @click="isEditAreaVisible = true"
          ></i>
        </div>
      </div>
    </div>
    <div v-if="isEditAreaVisible" class="card__wrapper__edit-section">
      <textarea
        v-model="titleChange"
        class="input-textarea card__wrapper__edit-section__text-input"
      />
      <Select :status="props.status" @onChangeStatus="getStatus" />
      <div class="todo__button-group">
        <button
          :class="(doesContainSpecialChar || !titleChange) && 'low-opacity'"
          :disabled="doesContainSpecialChar || !titleChange"
          @click="applyChange(index)"
          class="todo__button-group__button"
        >
          Edit Card
        </button>
        <i
          class="fa-solid fa-xmark todo__button-group__icon"
          @click="closeEditSection"
        ></i>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";

import checkCharacters from "../helpers/checkCharacters";
import { Options } from "../helpers/optionsEnum";
import Select from "./Select.vue";

const props = defineProps<{
  title: string;
  index: number;
  isEditOptionVisible: boolean;
  status: string;
}>();

const emit = defineEmits(["onEdit", "onDelete"]);

const isEditAreaVisible = ref<boolean>(false);
let currentTitle: string = props.title;
let currentStatus: string = props.status;
const titleChange = ref<string>(currentTitle);
const doesContainSpecialChar = ref<boolean>(false);
const statusChange = ref<string>(currentStatus);

//watch
watch(titleChange, (newValue) => {
  doesContainSpecialChar.value = checkCharacters(newValue);
});

//functions

const getStatus = (status: string) => {
  statusChange.value = status;
};

const applyChange = (index: number) => {
  if (!titleChange.value.length) return;

  currentTitle = props.title;
  emit("onEdit", titleChange, index, statusChange);
  isEditAreaVisible.value = false;
};

const applyDeletion = (index: number) => {
  emit("onDelete", index);
};

const closeEditSection = () => {
  isEditAreaVisible.value = false;
  titleChange.value = currentTitle;
  statusChange.value = currentStatus;
};

const getBgColor = () => {
  if (props.status === Options.Pending) {
    return "bg-grey";
  } else if (props.status === Options.InProgress) {
    return "bg-orange";
  } else {
    return "bg-green";
  }
};
</script>

<style scoped lang="scss">
.card__wrapper {
  &__error-warning {
    color: red;
    display: block;
    margin-bottom: 15px;
  }

  &__edit-section {
    &__text-input {
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
      }
      &__icon:nth-child(1) {
        margin-right: 15px;
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
