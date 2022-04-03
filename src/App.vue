<template>
  <MainContainer />
</template>

<script setup lang="ts">
import { onBeforeMount } from 'vue';
import MainContainer from './components/MainContainer.vue'
import { CharacterType } from './types/character.type';
import characterElements from './data/characters.json'
import { useSelectedCharactersStore } from './stores/selectedCharactersStore';

const selectedCharacters = useSelectedCharactersStore()

onBeforeMount(() => {
  for (const characterElement in characterElements) {
    const charaElement: Array<CharacterType> = characterElements[characterElement].characters
    charaElement.forEach(chara => {
      selectedCharacters.selectCharacter(chara)
    })
  }
})
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #ffffff;
  display: block;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
body {
  margin: 0;
}

::-webkit-scrollbar {
  width: 0.75rem;
}

::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.568);
}

::-webkit-scrollbar-thumb:hover {
  background: rgba(0, 0, 0, 0.815);
}

::-webkit-scrollbar-track {
  background: rgba(90, 85, 85, 0.774);
}
</style>
