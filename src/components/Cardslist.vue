<template>
  <div class="todo">
    <div class="todo__header">
     Blocked
      <div class="todo__header__icon">
        <i
          class="fa-solid fa-ellipsis"
          @click="isOptionsVisible = !isOptionsVisible"
        ></i>
      </div>
      <div class="todo__header__menu-options" v-if="isOptionsVisible">
        <div @click="clearAllCards">
          <span>Clear all...</span>
        </div>
        <div
          @click="
            (isEditOptionVisible = !isEditOptionVisible),
              (isOptionsVisible = false)
          "
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

    <div v-if="isAddOptionVisible" class="todo__card-input-div">
      <p v-if="doesContainSpecialChar">
        The input cannot contain any Special Characters
      </p>
      <textarea
        v-model="titleRef"
        placeholder="Enter a title for this card...."
      />
     
      <Select :status="'pending'" @onStatusChange = "getNewStatus"/>
    
      <div class="todo__button-group">
        <button
          :disabled="isDisabled"
          :class="(!titleRef.length || doesContainSpecialChar) && 'low-opacity'"
          @click="addNewCard"
        >
          Add card
        </button>
        <i @click="isAddOptionVisible = false" class="fa-solid fa-xmark"></i>
      </div>
    </div>

    <div class="todo__card-todo-manager" v-if="!isAddOptionVisible">
      <div>
        <i @click="isAddOptionVisible = true" class="fa fa-plus"></i>
        <div class="add-card-text">Add a card</div>
      </div>
    
    </div>
  </div>
</template>

<style lang="scss">

.low-opacity {
  opacity: 0.6;
}

.opacity-1 {
  opacity: 1;
}

.color-grey {
  opacity: 0.2;
}

i {
  cursor: pointer;
}

.todo {
  width: 650px;
  padding: 15px;
  border-radius: 40px;
  background-color: black;

    .todo__header {

    display: flex;
    color: white;
    font-size: 20px;
    padding: 10px 15px;
    justify-content: space-between;
    align-items: center;
    position: relative;

      div:nth-child(1) {
        font-weight: 500;
      }

      .todo__header__menu-options {

          margin-top: 15px;
          width: 8em;
          height: 10em;
          position: absolute;
          right: 0%;
          top: 60%;
          background-color: rgb(54, 52, 52);
          border-radius: 8px;
          transition: display 0.4s ease;
          animation: displayAnimation;
          animation-duration: 0.5ms;
          animation-delay: 1ms;

            div {
              text-align: center;
              height: 1.8em;
              display: flex;
              align-items: center;
              justify-content: center;
              cursor: pointer;
            }
        }

    }

    .todo__cards-list {
    padding: 10px 0px;
    display: flex;
    flex-direction: column;
    gap: 10px;
   }

    .todo__empty-message-div {
      color: white;
      padding: 10px 15px;
    }

    .todo__card-input-div {

      margin-top: 5px;
      color: white;

      p {
       color: red;
      }

      textarea {
          border: 0;
          background-color: rgb(34, 33, 33);
          display: block;
          width: 100%;
          min-height: 4em;
          border-radius: 20px;
          outline: blue;
          color: white;
          padding: 15px 18px;
          height: fit-content;
     }

    }
      .todo__card-todo-manager {

        display: flex;
        justify-content: flex-start;
        height: 6vh;
        align-items: center;
        color: white;
        font-weight: bolder;
        padding: 0px 18px;
        margin-top: 5px;
        
        div{
          display: flex;
          align-items: center;
        }

        button {
          color: white;
          font-weight: 100;
          font-size: 18px;
          margin-left: 15px;
        }

        .add-card-text {
          font-size: 18px;
          font-family:Arial, Helvetica, sans-serif;
          margin-left: 10px;
          font-weight: 100;
        }
      }
}

.todo__button-group {
  display: flex;
  margin: 15px 0px;
  color: white;
  gap: 15px;
}

.todo__button-group button {
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

.todo__button-group i {
  display: block;
  text-align: center;
  height: fit-content;
  align-self: center;
  scale: 1.4;
}

//response 

</style>

<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { CardType } from "../types/cardType";
import Card from "./Card.vue";
import checkCharacters from "../helpers/checkCharacters";
import Select from "./Select.vue";
 
const isAddOptionVisible = ref<boolean>(false);
const cardsData = ref<CardType[]>([{ title: "Task1", status: "pending" }]);
const titleRef = ref<string>("");
const statusRef = ref<string>("pending");
const doesContainSpecialChar = ref<boolean>(false);
const isOptionsVisible = ref<boolean>(false);
const isEditOptionVisible = ref<boolean>(true);
//functions

const addNewCard = () => {
  if (titleRef.value) {
    cardsData.value.push({ title: titleRef.value, status: statusRef.value });
    titleRef.value = "";
    isAddOptionVisible.value = false;
  }
};

const editCard = (value: string, index: number, status: string) => {
  cardsData.value[index].title = value;
  cardsData.value[index].status = status;
};

const deleteCard = (index: number) => {
  cardsData.value.splice(index, 1);
};

const clearAllCards = () => {
  isOptionsVisible.value = false;
  cardsData.value = [];
};

const getNewStatus = (changedStatus:string) => {
 
  statusRef.value = changedStatus;
} 

//watch
watch(titleRef, (newValue) => {

  doesContainSpecialChar.value = checkCharacters(newValue);
});

//computed
const isDisabled = computed(() => {
   return (!titleRef.value.length || doesContainSpecialChar.value);
})

const getDenyOrAllowText = computed(() => {
  return isEditOptionVisible.value ? "Deny Edit" : "Allow Edit" 
})

</script>


