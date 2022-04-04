<template>
  <div @click="selectable && (selectedChara = !selectedChara)">
    <div class="base-chara-container" :class="{ selected: selectedChara }">
      <div class="chara-top" :class="rarity">
        <img class="card-element-icon" :src="elementIconPath" />
        <img class="img" :src="imagePath" />
      </div>
      <div class="chara-bottom">{{ charaName }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, Ref, ref, toRefs, watch } from 'vue';
import { useSelectedCharactersStore } from '../stores/selectedCharactersStore';

const props = defineProps({
  charaName: String,
  imgPath: String,
  element: String,
  rarity: String,
  selectable: Boolean,
  selected: Boolean
})

const { rarity, selected } = toRefs(props)

const selectedCharacters = useSelectedCharactersStore()

const imagePath = computed(() => {
  if (props.charaName?.includes('Traveler')) return new URL(`../assets/traveler.png`, import.meta.url).href
  return new URL(`../assets/${props.element}/${props.imgPath}.png`,
    import.meta.url).href
})

const elementIconPath = computed(() => {
  const imgUrl = new URL(`../assets/Elements/${props.element}.svg`,
    import.meta.url)
  return imgUrl.href
})

const selectedChara: Ref<boolean> = ref(selected.value)
watch(selectedChara, newSelect => {
  if (newSelect) return selectedCharacters.selectCharacter({
    name: props.charaName as string, imgPath: props.imgPath as string,
    element: props.element as string,
    rarity: ''
  })
  else return selectedCharacters.removeSelect({
    name: props.charaName as string, imgPath: props.imgPath as string,
    element: props.element as string,
    rarity: ''
  })
})

watch(selected, select => {
  selectedChara.value = select
})


</script>

<style>
.base-chara-container {
  height: auto;
  width: 7em;
  min-width: 4rem;
  background-color: rgb(238, 232, 217);
  border-radius: 0.5rem;
  border-width: 1px;
  border-style: solid;
  border-color: rgb(233, 229, 220);
  box-shadow: 0px 3px 5px -2px#c9cbce, 0px -1px 5px -2px #aeafb1;
  margin: 0.25rem;
  opacity: 50%;
  transition: box-shadow 0.2s, opacity 0.2s ease-in-out;
  position: relative;
}

.base-chara-container:hover {
  box-shadow: 0px 3px 5px 1px #c9cbce, 0px -1px 5px 1px #aeafb1;
}

.chara-top {
  height: 100%;
  overflow: hidden;
  background-image: linear-gradient(
    143deg,
    rgba(160, 93, 17, 0.89),
    rgba(250, 165, 68, 0.9),
    rgba(179, 108, 28, 0.849)
  );
  border-bottom-right-radius: 2rem;
  border-top-left-radius: 0.5rem;
  border-top-right-radius: 0.5rem;
}

.four {
  background-image: linear-gradient(
    143deg,
    rgba(62, 5, 105, 0.753),
    rgba(87, 29, 121, 0.63),
    rgba(100, 22, 136, 0.774)
  );
}

.collab {
  background-image: linear-gradient(
    143deg,
    rgba(236, 29, 29, 0.822),
    rgba(219, 31, 31, 0.671),
    rgba(235, 52, 52, 0.733)
  );
}

.chara-bottom {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 2.5rem;
  font-size: 0.9rem;
  line-height: 1.25rem;
  font-weight: 600;
  color: rgb(65, 9, 110);
}

.img {
  max-width: 100%;
  border-bottom-right-radius: 2rem;
  bottom: 0;
  left: 0;
  float: left;
}

.selected {
  opacity: 100%;
}

.card-element-icon {
  position: absolute;
  width: 25%;
  height: 25%;
  left: 3px;
  stroke: white;
  stroke-width: 10px;
  filter: drop-shadow(0px 0px 3px rgb(255, 255, 255));
}

@media only screen and (max-width: 1200px) {
  .base-chara-container {
    width: 5em;
  }

  .chara-bottom {
    font-size: 0.7rem;
    line-height: 1rem;
    font-weight: 600;
    color: rgb(65, 9, 110);
  }
}

@media only screen and (max-width: 720px) {
  .base-chara-container {
    width: 3em;
  }
}
</style>
