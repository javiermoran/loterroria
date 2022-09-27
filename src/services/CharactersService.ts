import { charactersMovies } from '../constants';

export interface BaseCharacterItem {
  id: number | string;
  label: string;
  points: number;
}

interface CharacterSortItem {
  value: BaseCharacterItem;
  sort: number;
}

const isBaseEnabled = (): boolean =>
  localStorage.getItem('isBaseCharactersEnabled') !== 'false';

const getBaseCharacters = (): BaseCharacterItem[] => {
  return charactersMovies;
};

const getCharacters = (): BaseCharacterItem[] => {
  let characters: BaseCharacterItem[] = [];
  if (localStorage.getItem('mimicCharacters') === null) {
    if (isBaseEnabled()) {
      characters = [...getBaseCharacters()];
    }
    if (isCustomEnabled()) {
      characters = [...getCustomCharacters()];
    }

    const characterList = characters
      .map(
        (
          value: BaseCharacterItem
        ): { value: BaseCharacterItem; sort: number } => ({
          value,
          sort: Math.random(),
        })
      )
      .sort(
        (a: CharacterSortItem, b: CharacterSortItem): number => a.sort - b.sort
      )
      .map(({ value }: CharacterSortItem): BaseCharacterItem => value);

    localStorage.setItem('mimicCharacters', JSON.stringify(characterList));
  }

  const mimicCharacters = localStorage.getItem('mimicCharacters');
  return JSON.parse(mimicCharacters || '[]');
};

const getNextCharacter = (): BaseCharacterItem => {
  if (localStorage.getItem('mimicCharacters') === null) {
    localStorage.setItem('mimicCharacters', JSON.stringify(getCharacters()));
  }
  const chars = JSON.parse(localStorage.getItem('mimicCharacters') || '[]');
  const last = chars.pop();
  localStorage.setItem('mimicCharacters', JSON.stringify(chars));
  return last;
};

const getLastCharacter = (): BaseCharacterItem => {
  const characters = getCharacters();
  return characters[characters.length - 1];
};

const toggleBaseEnabled = (): void => {
  const isBaseEnabled = localStorage.getItem('isBaseCharactersEnabled');
  if (!isBaseEnabled || isBaseEnabled === 'true') {
    localStorage.setItem('isBaseCharactersEnabled', 'false');
  } else {
    localStorage.setItem('isBaseCharactersEnabled', 'true');
  }
};

const isCustomEnabled = (): boolean =>
  localStorage.getItem('isCustomCharacterEnabled') !== 'false';

const toggleCustomEnabled = (): void => {
  const isCustomEnabled = localStorage.getItem('isCustomCharacterEnabled');
  if (!isCustomEnabled || isCustomEnabled === 'true') {
    localStorage.setItem('isCustomCharacterEnabled', 'false');
  } else {
    localStorage.setItem('isCustomCharacterEnabled', 'true');
  }
};

const getCustomCharacters = (): BaseCharacterItem[] => {
  if (localStorage.getItem('customCharacters') === null) {
    localStorage.setItem('customCharacters', '[]');
  }
  return JSON.parse(localStorage.getItem('customCharacters') || '[]');
};

const createCustomCharacter = (item: BaseCharacterItem): void => {
  const characters = getCustomCharacters();
  characters.push(item);
  localStorage.setItem('customCharacters', JSON.stringify(characters));
};

const CharactersService = {
  getBaseCharacters,
  isBaseEnabled,
  toggleBaseEnabled,
  getNextCharacter,
  getLastCharacter,
  getCustomCharacters,
  createCustomCharacter,
  toggleCustomEnabled,
  isCustomEnabled,
};

export default CharactersService;
