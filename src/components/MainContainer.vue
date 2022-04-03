<template>
  <div class="bg-container">
    <transition name="fade">
      <GeneratedModal
        class="modal"
        @modal-off="generated = !generated"
        v-if="generated"
        :team-size="teamSize"
        :number-of-teams="numberOfTeams"
      />
    </transition>
    <div class="header-row">
      <div class="social-media">
        <p class="head-text">Dev</p>
        <Popper content="Ricey#2457" hover arrow>
          <i class="fab fa-discord social-icon fa-2x"></i>
        </Popper>
        <a href="https://twitter.com/RiceyMix">
          <i class="fab fa-twitter social-icon fa-2x"></i>
        </a>
        <a href="https://github.com/AngPuoSyer">
          <i class="fab fa-github social-icon fa-2x"></i>
        </a>
      </div>
      <div class="header">Genshin Team Generator</div>
      <div class="social-media">
        <p class="head-text">Genshin Impact</p>
        <a href="https://discord.com/invite/genshinimpact">
          <i class="fab fa-discord social-icon fa-2x"></i>
        </a>
        <a href="https://twitter.com/GenshinImpact">
          <i class="fab fa-twitter social-icon fa-2x"></i>
        </a>
        <a href="https://www.youtube.com/channel/UCiS882YPwZt1NfaM0gR0D9Q">
          <i class="fab fa-youtube social-icon fa-2x"></i>
        </a>
        <a href="https://www.reddit.com/r/Genshin_Impact/">
          <i class="fab fa-reddit social-icon fa-2x"></i>
        </a>
      </div>
    </div>
    <div class="characters-container">
      <CharacterRow
        v-for="characterElement in characterElements"
        :element-characters="characterElement"
        :key="characterElement.elementName"
      />
    </div>
    <div class="team-form">
      <div class="dropdown">
        <p>Team Size :</p>
        <select v-model="teamSize">
          <option v-for="option in 4" :value="option">{{ option }}</option>
        </select>
      </div>
      <div class="dropdown">
        <p>Number Of Teams :</p>
        <select v-model="numberOfTeams">
          <option v-for="option in 8" :value="option">{{ option }}</option>
        </select>
      </div>
      <div>
        <div class="generate" @click="toggleGenerated">Generate Team</div>
        <div v-show="undersize" class="error-message">**Not enough characters**</div>
      </div>
    </div>
    <div class="disclaimer">
      <Popper hover arrow :arrowPadding="-20">
        <img src="../assets/qiqi_stare.png" />
        <template #content>
          <div>Genshin Team Generator is a fanmade website</div>
          <div>Website is not affiliated with miHoYo, all assets files are property of their original owners</div>
        </template>
      </Popper>
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { ref } from 'vue';
import characterElements from '../data/characters.json'
import { useSelectedCharactersStore } from '../stores/selectedCharactersStore';
import CharacterRow from './CharacterRow.vue';
import GeneratedModal from './GeneratedModal.vue';
//@ts-ignore
import Popper from "vue3-popper";



const generated = ref(false)
const selectedCharacters = useSelectedCharactersStore()
const { selectedLength } = storeToRefs(selectedCharacters)

const teamSize = ref(4)
const numberOfTeams = ref(2)

const undersize = ref(false)

const toggleGenerated = () => {
  if (selectedCharacters.selectedCharacters.length < (teamSize.value * numberOfTeams.value)) return undersize.value = true
  undersize.value = false;
  selectedCharacters.shuffleSelections()
  generated.value = !generated.value
}

</script>

<style >
.bg-container {
  width: 100%;
  height: 100%;
  min-height: 100vh;
  background-image: url("../assets/bg.webp");
  background-repeat: no-repeat;
  background-size: cover;
  box-shadow: inset 0 0 0 2000px rgba(49, 43, 71, 0.712);
  justify-content: center;
  align-items: center;
  --popper-theme-background-color: #0e0000;
  --popper-theme-border-width: 1px;
  --popper-theme-border-style: solid;
  --popper-theme-border-color: #eeeeee;
  --popper-theme-border-radius: 6px;
  --popper-theme-padding: 16px;
  --popper-theme-box-shadow: 0 6px 30px -6px rgba(0, 0, 0, 0.25);
}

.social-icon {
  color: #ffffff;
  margin-right: 1.5rem;
  cursor: pointer;
}

.social-icon:hover {
  opacity: 50% !important;
}

.header-row {
  display: flex;
  justify-content: space-between;
}

.social-media {
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  width: fit-content;
}

.social-media p {
  font-size: large;
  font-weight: 300;
  margin-right: 1rem;
  margin-left: 0.75rem;
}

.header {
  font-weight: 4rem;
  font-size: 4vh;
}

.characters-container {
  width: 95%;
  height: 83vh;
  top: 5%;
  left: 2.5%;
  margin: auto;
  justify-content: center;
  align-items: center;
  overflow-y: auto;
}

.modal {
  position: absolute;
  z-index: 2;
}

.team-form {
  margin-top: 1rem;
  display: flex;
  justify-content: space-evenly;
  font-size: larger;
  color: white;
  display: flex;
  align-items: center;
}

.generate {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 35px;
  width: auto;
  border-radius: 1rem;
  border: solid white;
  border-width: 1px;
  background-color: rgba(5, 21, 37, 0.603);
  color: rgb(255, 255, 255);
  font-size: large;
  padding: 18px;
  cursor: pointer;
  font-weight: 540;
  transition: background-color 0.2s, box-shadow 0.2s ease-in-out;
}

.error-message {
  margin-top: 2px;
  color: rgb(245, 55, 86);
}

.generate:hover {
  background-color: rgba(32, 36, 95, 0.63);
  box-shadow: 0px 3px 5px 1px #c9cbce, 0px -1px 5px 1px #aeafb1;
}

.dropdown {
  display: flex;
  align-items: center;
}

.dropdown select {
  margin: 1rem;
  height: 35px;
  width: 7rem;
  border-radius: 0.5rem;
  background-color: rgba(5, 21, 37, 0.603);
  font-size: larger;
  transition: box-shadow 0.1s ease-in-out;
  color: white;
}

.dropdown select:hover {
  box-shadow: 0px 3px 5px 1px #c9cbce, 0px -1px 5px 1px #aeafb1;
}

.dropdown select option:first-child {
  border-top-left-radius: 30px;
  border-top-right-radius: 1rem;
}

.disclaimer {
  display: flex;
  position: absolute;
  bottom: 0;
  left: 0;
  transform: translateY(-15px);

  width: auto;
  height: 125px;
  float: left;
}

.disclaimer img {
  left: 0;
  width: 50%;
  height: 50%;
  transform: translateX(-2.5rem);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@media only screen and (max-width: 1200px) {
  .disclaimer img {
    left: 0;
    width: 30%;
    height: 30%;
  }
}
</style>