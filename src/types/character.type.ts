export type CharacterType = {
  name: string;
  imgPath: string;
  element: string;
  rarity: string;
};

export type ElementCharacters = {
  elementName: string;
  elementIcon: string;
  characters: CharacterType[];
};
