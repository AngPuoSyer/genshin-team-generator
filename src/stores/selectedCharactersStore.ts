import { defineStore } from 'pinia';
import { CharacterType } from '../types/character.type';
import { find, remove, shuffle } from 'lodash';

type StateType = {
  selectedCharacters: Array<CharacterType>;
};

export const useSelectedCharactersStore = defineStore('selectedCharacters', {
  state: (): StateType => ({
    selectedCharacters: [],
  }),
  getters: {
    selectedLength: (state: StateType): number => {
      return state.selectedCharacters.length;
    },
  },
  actions: {
    selectCharacter: function (character: CharacterType): void {
      if (
        find(this.selectedCharacters, chara => {
          return (
            chara.name === character.name && chara.element === character.element
          );
        })
      ) {
        return;
      }
      this.selectedCharacters.push(character);
    },
    removeSelect: function (character: CharacterType): void {
      remove(this.selectedCharacters, {
        name: character.name,
        element: character.element,
      });
    },
    shuffleSelections: function (): void {
      this.selectedCharacters = shuffle(this.selectedCharacters);
    },
  },
});
