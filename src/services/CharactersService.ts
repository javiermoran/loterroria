import { charactersMovies } from '../constants';

export interface BaseCharacterItem {
  id: number;
  label: string;
  points: number;
}

const isBaseEnabled = (): boolean =>
  localStorage.getItem('isBaseCharactersEnabled') !== 'false';

const getBaseCharacters = (): BaseCharacterItem[] => {
  return charactersMovies;
};

const toggleBaseEnabled = (): void => {
  const isBaseEnabled = localStorage.getItem('isBaseCharactersEnabled');
  if (!isBaseEnabled || isBaseEnabled === 'true') {
    localStorage.setItem('isBaseCharactersEnabled', 'false');
  } else {
    localStorage.setItem('isBaseCharactersEnabled', 'true');
  }
};

const CharactersService = {
  getBaseCharacters,
  isBaseEnabled,
  toggleBaseEnabled,
};

export default CharactersService;
