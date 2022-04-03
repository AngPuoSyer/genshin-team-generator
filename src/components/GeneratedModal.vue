<template>
  <div class="modal-backdrop" @click.stop="emit('modalOff')">
    <div class="modal-card-container" @click.stop>
      <div class="main-modal-container">
        <h1 id="modal-title">Your Team</h1>
        <div class="team-container" v-for="index in numberOfTeams">
          <h2 class="team-text">Team {{ index }}:</h2>
          <transition-group tag="div" class="team-chara-container" name="card-enter">
            <CharacterCard
              v-for="chara in selections.slice(index === 1 ? index - 1 : index * teamSize - teamSize, index * teamSize)"
              :chara-name="chara.name"
              :img-path="chara.imgPath"
              :element="chara.element"
              :rarity="chara.rarity"
              :selectable="false"
              :selected="true"
              :key="`modal-${chara.name}`"
            />
          </transition-group>
        </div>
      </div>
      <div class="modal-button-container">
        <div class="try-button" @click="selectedCharacters.shuffleSelections">Try Again</div>
        <div class="exit-button" @click="emit('modalOff')">Exit</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useSelectedCharactersStore } from '../stores/selectedCharactersStore';
import CharacterCard from './CharacterCard.vue'

const props = defineProps({
  teamSize: {
    type: Number,
    required: true
  },
  numberOfTeams: {
    type: Number,
    required: true
  },
})

const emit = defineEmits(['modalOff'])

const selectedCharacters = useSelectedCharactersStore()

let { selectedCharacters: selections } = storeToRefs(selectedCharacters)
</script>

<style>
.main-modal-container {
  background-color: rgba(252, 239, 220, 0.884);
  border-radius: 1rem;
  width: fit-content;
  max-width: 75vw;
  max-height: 75vh;
  overflow-y: auto;
  padding: 4rem;
  border: solid rgb(197, 135, 41);
  border-width: 3px;
}

.main-modal-container::-webkit-scrollbar-track {
  border-radius: 2rem;
}

.main-modal-container::-webkit-scrollbar-thumb {
  border-radius: 2rem;
}

.team-container {
  display: flex;
  color: black;
  justify-content: center;
  align-items: center;
}

.team-chara-container {
  display: flex;
  flex-wrap: wrap;
  object-fit: cover;
}

.team-text {
  color: rgb(141, 91, 15);
  margin-right: 2rem;
}

.modal-button-container {
  display: flex;
  justify-content: space-evenly;
  margin-top: 1rem;
}

.modal-button-container div {
  min-width: 200px;
  padding: 25px 0;
  font-weight: 550;
  border-radius: 35px;
  cursor: pointer;
}

.try-button {
  background-color: rgb(156, 100, 17);
  border: solid blanchedalmond;
  color: rgba(255, 255, 255, 0.884);
  transition: background-color 0.15s ease-in-out;
}

.try-button:hover {
  background-color: rgb(124, 75, 0);
}

.exit-button {
  background-color: blanchedalmond;
  border: solid rgb(141, 91, 15);
  color: rgb(141, 91, 15);
  transition: background-color 0.15s ease-in-out;
}

.exit-button:hover {
  background-color: rgb(245, 210, 158);
}

.modal-backdrop {
  display: flex;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.747);
  align-items: center;
  justify-content: center;
}

#modal-title {
  color: black;
  margin-top: 0;
}

.card-enter-move,
.card-enter-enter-active,
.card-enter-leave-active {
  transition: all 0.6s ease;
}

.card-enter-enter-from,
.card-enter-leave-to {
  opacity: 0;
  transform: translateX(30px);
  overflow-y: hidden;
}

.card-enter-leave-active {
  position: absolute;
}
</style>