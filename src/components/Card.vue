<template>
  <div class="card__parent">
    <code class="card__parent-error-code" v-if="doesContainSpecialChar"
      >The input cannot contain any Special Characters or unwanted spaces</code
    >
    <div class="card" v-if="!isEditAreaVisible">
      <div class="card__title">
        <span>{{ title }}</span> <code>{{ `(${status})` }}</code>
      </div>

      <div class="card__title-edit-options-wrapper">
        <div
          :class="`card__title-status-div ${getBgColor()} ${
            !isEditOptionVisible && 'margin-change'
          }`"
        ></div>

        <div
          :class="`${!isEditOptionVisible && 'visibility-0'}`"
          class="card__title-edit-options-icons"
        >
          <i
            class="fa-solid fa-trash delete-icon"
            @click="emitDeleteFunction(index)"
          ></i>
          <i class="fa-solid fa-pencil" @click="isEditAreaVisible = true"></i>
        </div>
      </div>
    </div>
    <div v-if="isEditAreaVisible" class="card__parent-edit-div">
      <textarea v-model="changedTitle" />
      <Select :status="props.status" @onStatusChange="getStatus" />
      <div class="todo__button-group">
        <button
          :class="(doesContainSpecialChar || !changedTitle) && 'low-opacity'"
          :disabled="doesContainSpecialChar || !changedTitle"
          @click="changedTitle.length > 0 && emitEditFunction(index)"
        >
          Edit Card
        </button>
        <i
          class="fa-solid fa-xmark"
          @click="(isEditAreaVisible = false), (changedTitle = title)"
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
const changedTitle = ref<string>(props.title);
const doesContainSpecialChar = ref<boolean>(false);
const editedStatus = ref<string>(props.status);
//watch
watch(changedTitle, (newValue) => {
  console.log(changedTitle.value);
  doesContainSpecialChar.value = checkCharacters(newValue);
});

//functions

const getStatus = (status: string) => {
  editedStatus.value = status;
};

const emitEditFunction = (index: number) => {
  emit("onEdit", changedTitle, index, editedStatus);
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
i {
  cursor: pointer;
}

.card__parent {
  .card__parent-error-code {
    color: red;
    display: block;
    margin-bottom: 15px;
  }

  .card__parent-edit-div {
    textarea {
      width: 100%;
      display: block;
      border: 0;
      border-radius: 10px;
      outline: none;
      background-color: rgb(34, 33, 33);
      padding: 15px 18px;
      color: white;
    }
  }
}

.card {
  width: 100%;
  height: fit-content;
  display: flex;
  justify-content: space-between;
  gap: 15px;
  align-items: center;
  padding: 10px 18px;
  background-color: rgb(34, 33, 33);
  border-radius: 15px;
  flex-wrap: wrap;

  .card__title {
    code {
      color: lightblue;
    }
  }

  .card__title-edit-options-wrapper {
    display: flex;
    align-items: center;

    .card__title-status-div {
      height: 1.5em;
      width: 3em;
      margin-right: 15px;
      border-radius: 8px;
    }
  }
}

.visibility-0 {
  display: none;
}

.margin-change {
  margin-right: 0;
}

.card div:nth-child(1) {
  color: white;
}

.card i {
  color: white;
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

//media query
@media screen and (max-width: 600px) {
  .card {
    flex-direction: column;
    gap: 15px;
    height: fit-content;
    padding-top: 15px;
    padding-bottom: 15px;
    min-width: 100%;
  }

  .card__title {
    width: 100%;
    height: fit-content;
    word-wrap: break-word;
    overflow-wrap: break-word;
  }

  .card__title-edit-options-wrapper {
    width: 100%;
  }

  .card__title-edit-options-wrapper {
    justify-content: space-between;
  }

  .card .card__title-edit-options-wrapper .card__title-status-div {
    width: 40%;
  }
}
</style>
