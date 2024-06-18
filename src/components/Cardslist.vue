<template>
  <div class="todo-container">
    <div class="todo-header">
      <div>Blocked</div>
      <div>
        <i
          class="fa-solid fa-ellipsis"
          @click="isOptionsVisible = !isOptionsVisible"
        ></i>
      </div>
      <div :class="`options-div`" v-if="isOptionsVisible">
        <div @click="clearAllCards">
          <span>Clear all...</span>
        </div>
        <div
          @click="
            (isEditOptionVisible = !isEditOptionVisible),
              (isOptionsVisible = false)
          "
        >
          <span>{{ isEditOptionVisible ? "Deny Edit" : "Allow Edit" }}</span>
        </div>
      </div>
    </div>
    <div class="todo-list" v-if="cardsData.length">
      <Card
        v-for="(elem, index) in cardsData"
        :isEditOptionVisible="isEditOptionVisible"
        :title="elem.title"
        :status="elem.status"
        :key="index"
        :index="index"
        @handleEditing="editCard"
        @handleDeleting="deleteCard"
      />
    </div>
    <div
      v-else-if="!cardsData.length && !isAddOptionVisible"
      class="no-cards-div"
    >
      No Cards Are Here
    </div>

    <div v-if="isAddOptionVisible" class="add-input">
      <p v-if="doesContainSpecialChar">
        The input cannot contain any Special Characters
      </p>
      <textarea
        v-model="newTitle"
        name=""
        placeholder="Enter a title for this card...."
        id=""
      ></textarea>
      <div class="option-div">
        <select name="" id="progress-options" v-model="newStatus">
          <option value="pending">pending</option>
          <option value="inprogress">in-progress</option>
          <option value="completed">completed</option>
        </select>
      </div>
      <div class="btns">
        <button
          :disabled="!newTitle.length || doesContainSpecialChar"
          :class="(!newTitle.length || doesContainSpecialChar) && 'low-opacity'"
          @click="addNewCard"
        >
          Add card
        </button>
        <i @click="isAddOptionVisible = false" class="fa-solid fa-xmark"></i>
      </div>
    </div>

    <div class="todo-manager" v-if="!isAddOptionVisible">
      <div>
        <i @click="isAddOptionVisible = true" class="fa fa-plus"></i>
        <button>Add a card</button>
      </div>
      <div>
        <button></button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { CardType } from "../types/cardType";
import Card from "./Card.vue";
import checkCharacters from "../helpers/checkCharacters";

const isAddOptionVisible = ref<boolean>(false);
const cardsData = ref<CardType[]>([{ title: "Hello", status: "pending" }]);
const newTitle = ref<string>("");
const newStatus = ref<string>("pending");
const doesContainSpecialChar = ref<boolean>(false);
const isOptionsVisible = ref<boolean>(false);
const isEditOptionVisible = ref<boolean>(true);
//functions

const addNewCard = () => {
  if (newTitle.value) {
    cardsData.value.push({ title: newTitle.value, status: newStatus.value });
    newTitle.value = "";
    isAddOptionVisible.value = false;

    console.log(cardsData.value);
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

//watch
watch(newTitle, (newValue, oldValue) => {
  if (checkCharacters(newValue)) doesContainSpecialChar.value = true;
  else doesContainSpecialChar.value = false;
});
</script>

<style>
.option-div {
  margin-top: 15px;
}

.low-opacity {
  opacity: 0.6;
}

#progress-options {
  height: 2.5em;
  border: 0;
  width: 10em;
  padding: 0.5em 1em;
  font-size: 14px;
  outline: none;
  background-color: rgb(34, 33, 33);
  color: white;
  border-radius: 10px;
}

span {
  display: block;
}

.options-div {
  width: 8em;
  height: 10em;
  position: absolute;
  right: 0%;
  top: 100%;
  background-color: rgb(54, 52, 52);
  border-radius: 8px;
  transition: display 0.4s ease;
  animation: displayAnimation;
  animation-duration: 0.5ms;
  animation-delay: 1ms;
}

.opacity-1 {
  opacity: 1;
}

.color-grey {
  opacity: 0.2;
}

.options-div div {
  height: 2em;
  display: flex;
  justify-content: center;
  align-items: center;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  font-size: 14px;
}

.options-div div:hover {
  background-color: lightblue;
}

p {
  color: red;
}
i {
  cursor: pointer;
}
input {
  display: block;
}
button {
  background-color: none;
  background: none;
  border: 0;
  font-weight: 500;
  padding: 0;
  margin: 0%;
  cursor: pointer;
  display: block;
}

.todo-container {
  width: 650px;
  padding: 15px;
  border-radius: 40px;
  background-color: black;
}

.todo-header {
  display: flex;
  color: white;
  font-size: 20px;
  padding: 10px 15px;
  justify-content: space-between;
  align-items: center;
  position: relative;
}

.todo-header div:nth-child(1) {
  font-weight: 500;
}

.todo-manager {
  display: flex;
  justify-content: space-between;
  height: 6vh;
  align-items: center;
  color: white;
  font-weight: bolder;
  padding: 0px 18px;
  margin-top: 5px;
}

.todo-manager button {
  color: white;
  font-weight: 100;
  font-size: 18px;
  margin-left: 15px;
}

.todo-manager div {
  display: flex;
  align-items: center;
}

.todo-list {
  padding: 10px 0px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.add-input {
  margin-top: 5px;
  color: white;
}

.add-input textarea {
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

.btns {
  display: flex;
  margin: 15px 0px;
  color: white;
  padding: 0px 15px;
  gap: 15px;
}

.btns button {
  color: white;
  min-height: 1em;
  background-color: rgb(33, 150, 243);
  padding: 12px 20px;
  font-size: 16px;
  font-weight: 900;
  border-radius: 4px;
}

.btns i {
  display: block;
  text-align: center;
  height: fit-content;
  align-self: center;
  scale: 1.4;
}

.no-cards-div {
  color: white;
  padding: 10px 15px;
}

/*animation*/
@keyframes displayAnimation {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
