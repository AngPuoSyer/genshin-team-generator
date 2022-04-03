<template>
  <div class="row-container">
    <div class="element-container" @click="selected = !selected">
      <h1 class="element-text">{{ elementCharacters.elementName }}</h1>
      <img :src="elementIconPath" class="element-icon" :class="{ selected }" />
    </div>
    <div class="chara-row">
      <CharacterCard
        v-for="character in elementCharacters.characters"
        :chara-name="character.name"
        :img-path="character.imgPath"
        :element="elementCharacters.elementName"
        :rarity="character.rarity"
        :key="character.name"
        :selectable="true"
        :selected="selected"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, PropType, ref } from 'vue';
import { ElementCharacters } from '../types/character.type'
import CharacterCard from './CharacterCard.vue'

const props = defineProps({
  elementCharacters: {
    type: Object as PropType<ElementCharacters>,
    required: true
  }
})

const selected = ref(true)

const elementIconPath = computed(() => {
  const imgUrl = new URL(`../assets/Elements/${props.elementCharacters.elementIcon}.svg`,
    import.meta.url)
  return imgUrl.href
})
</script>

<style>
.row-container {
  display: flex;
}

.element-container {
  min-width: 19rem;
}

.element-text {
  margin: 0;
}

.element-icon {
  height: 50%;
  width: 50%;
  transition: filter 0.2s ease-in-out;
  opacity: 50%;
  transition: opacity 0.2s ease-in-out;
}

.selected {
  opacity: 100%;
}

.element-icon:hover {
  stroke: white;
  stroke-width: 10px;
  filter: drop-shadow(0px 0px 10px #888);
}

.chara-row {
  width: max-content;
  height: max-content;
  display: flex;
  flex-wrap: wrap;
  object-fit: cover;
}

@media only screen and (max-width: 1200px) {
  .element-icon {
    height: 40%;
    width: 40%;
  }

  .element-container {
    min-width: 19rem;
  }
}

@media only screen and (max-width: 700px) {
  .element-icon {
    height: 30%;
    width: 30%;
  }

  .element-container {
    min-width: 15rem;
  }
}
</style>