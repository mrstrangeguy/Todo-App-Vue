<template>
  <div class="todo">
    <div class="center-elements todo__header">
      Blocked
      <div class="todo__header__icon">
        <i class="fa-solid fa-ellipsis" @click="openAdditionalOptions"></i>
      </div>
      <div class="todo__header__menu-options" v-if="isOptionsVisible">
        <div
          @click="onClearAllCards"
          class="center-elements todo__header__menu-options__text"
        >
          <span>Clear all...</span>
        </div>
        <div
          @click="toggleEditOptionVisibility"
          class="center-elements todo__header__menu-options__text"
        >
          <span>{{ getDenyOrAllowText }}</span>
        </div>
      </div>
    </div>
    <div class="todo__cards-list" v-if="cardsData.length">
      <Card
        v-for="(elem, index) in cardsData"
        :isEditOptionVisible="isEditOptionVisible"
        :title="elem.title"
        :status="elem.status"
        :key="index"
        :index="index"
        @onEdit="editCard"
        @onDelete="deleteCard"
      />
    </div>
    <div
      v-else-if="!cardsData.length && !isAddOptionVisible"
      class="todo__empty-message-div"
    >
      No Cards Are Here
    </div>

    <div v-if="isAddOptionVisible" class="todo__card-input-container">
      <p
        v-if="doesContainSpecialChar"
        class="todo__card-input-container__warning-text"
      >
        The input cannot contain any Special Characters
      </p>
      <textarea
        v-model="titleRef"
        class="input-textarea todo__card-input-container__textinput"
        placeholder="Enter a title for this card...."
      />

      <Select :status="'pending'" @onChangeStatus="getNewStatus" />

      <div class="todo__button-group">
        <button
          :disabled="isAddBtnDisabled"
          :class="(!titleRef.length || doesContainSpecialChar) && 'low-opacity'"
          @click="addNewCard"
          class="todo__button-group__button"
        >
          Add card
        </button>
        <i
          @click="closeAddOption"
          class="fa-solid fa-xmark todo__button-group__icon"
        ></i>
      </div>
    </div>

    <div class="center-elements todo__card-manager" v-if="!isAddOptionVisible">
      <div class="todo__card-manager__icon-section">
        <i
          @click="openAddOption"
          class="fa fa-plus todo__card-manager__icon-section__icon"
        ></i>
        <div class="todo__card-manager__icon-section__text">Add a card</div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.todo {
  width: 650px;
  padding: 15px;
  border-radius: 40px;
  background-color: black;

  &__header {
    color: white;
    font-size: 20px;
    padding: 10px 15px;
    justify-content: space-between;
    position: relative;

    &__menu-options {
      margin-top: 15px;
      width: 8em;
      height: 10em;
      position: absolute;
      right: 0%;
      top: 60%;
      background-color: rgb(54, 52, 52);
      border-radius: 8px;

      &__text {
        text-align: center;
        height: 1.8em;
        cursor: pointer;
      }
    }
  }

  &__cards-list {
    padding: 10px 0px;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  &__empty-message-div {
    color: white;
    padding: 10px 15px;
  }

  &__card-input-container {
    margin-top: 5px;
    color: white;

    &__warning-text {
      color: red;
    }

    &__textinput {
      min-height: 4em;
      border-radius: 20px;
      height: fit-content;
    }
  }

  &__card-manager {
    display: flex;
    justify-content: flex-start;
    height: 6vh;
    color: white;
    font-weight: bolder;
    padding: 0px 18px;
    margin-top: 5px;

    &__icon-section {
      display: flex;
      align-items: center;

      &__icon {
        cursor: pointer;
        color: white;
      }

      &__text {
        color: white;
        font-weight: 100;
        font-size: 18px;
        margin-left: 15px;
      }
    }
  }
}

.todo__button-group {
  display: flex;
  margin: 15px 0px;
  color: white;
  gap: 15px;

  &__button {
    color: white;
    min-height: 1em;
    background-color: rgb(33, 150, 243);
    padding: 12px 20px;
    font-size: 16px;
    font-weight: 900;
    border-radius: 4px;
    border: 0;
    cursor: pointer;
  }

  &__icon {
    display: block;
    text-align: center;
    height: fit-content;
    align-self: center;
    scale: 1.4;
    cursor: pointer;
  }
}

.low-opacity {
  opacity: 0.6;
}

.opacity-1 {
  opacity: 1;
}

.color-grey {
  opacity: 0.2;
}
</style>

<script setup lang="ts">
import { ref, watch, computed } from "vue";

import checkCharacters from "../helpers/checkCharacters";
import { CardType } from "../types/cardType";
import Card from "./Card.vue";
import Select from "./Select.vue";

const isAddOptionVisible = ref<boolean>(false);
const cardsData = ref<CardType[]>([]);
const titleRef = ref<string>("");
const statusRef = ref<string>("pending");
const doesContainSpecialChar = ref<boolean>(false);
const isOptionsVisible = ref<boolean>(false);
const isEditOptionVisible = ref<boolean>(true);

//watch
watch(titleRef, (newValue) => {
  doesContainSpecialChar.value = checkCharacters(newValue);
});

//computed
const isAddBtnDisabled = computed(() => {
  return !titleRef.value.length || doesContainSpecialChar.value;
});

const getDenyOrAllowText = computed(() => {
  return isEditOptionVisible.value ? "Deny Edit" : "Allow Edit";
});

//functions

const addNewCard = () => {
  if (titleRef.value) {
    cardsData.value.push({ title: titleRef.value, status: statusRef.value });
    titleRef.value = "";
    isAddOptionVisible.value = false;
  }
};

const editCard = (value: string, index: number, status: string) => {
  cardsData.value[index] = { title: value, status };
};

const deleteCard = (index: number) => {
  cardsData.value.splice(index, 1);
};

const onClearAllCards = () => {
  isOptionsVisible.value = false;
  cardsData.value = [];
};

const getNewStatus = (changedStatus: string) => {
  statusRef.value = changedStatus;
};

const closeAddOption = () => {
  isAddOptionVisible.value = false;
  titleRef.value = "";
};

const openAddOption = () => {
  isAddOptionVisible.value = true;
  isOptionsVisible.value = false;
};

const openAdditionalOptions = () => {
  isAddOptionVisible.value = false;
  isOptionsVisible.value = !isOptionsVisible.value;
};

const toggleEditOptionVisibility = () => {
  (isEditOptionVisible.value = !isEditOptionVisible.value),
    (isOptionsVisible.value = false);
};
</script>
