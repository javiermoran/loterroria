import axios from 'axios';
import Player from '../models/Player';
import Team from '../models/Team';
import { BaseCharacterItem } from './CharactersService';

const appId = localStorage.getItem('appId') || 'loterroria';
const path = `https://getpantry.cloud/apiv1/pantry/7e2185fa-e9b6-4b55-bf7c-324d0cf6162b/basket/${appId}`;

export interface BasketData {
  players?: Player[];
  teams?: Team[];
  mimicCharacters?: BaseCharacterItem[];
  customCharacters?: BaseCharacterItem[];
  defaultMimicTime?: number;
  isBaseCharactersEnabled?: boolean;
}

export interface BasketPlayerTeams {
  players?: Player[];
  teams?: Team[];
}

const uploadData = async (): Promise<any> => {
  const players = JSON.parse(localStorage.getItem('players') || '[]');
  const teams = JSON.parse(localStorage.getItem('teams') || '[]');
  const customCharacters = JSON.parse(
    localStorage.getItem('customCharacters') || '[]'
  );

  const data: BasketData = {
    players,
    teams,
    customCharacters,
  };

  const response = await axios.post(path, data);
  return response.data;
};

const getData = async (): Promise<BasketData> => {
  const response = await axios.get(path);
  return response.data;
};

const getPlayers = async (): Promise<BasketPlayerTeams> => {
  const response = await axios.get(path);
  const { players, teams } = response?.data;
  return { players, teams };
};

const syncData = async (): Promise<any> => {
  const response = await axios.get(path);
  const players = JSON.stringify(response?.data?.players || []);
  const teams = JSON.stringify(response?.data?.teams || []);
  const mimicCharacters = JSON.stringify(response?.data?.mimicCharacters || []);
  const customCharacters = JSON.stringify(
    response?.data?.customCharacters || []
  );
  const defaultMimicTime = JSON.stringify(
    response?.data?.defaultMimicTime || 30
  );
  const isBaseCharactersEnabled =
    response?.data?.isBaseCharactersEnabled || 'true';

  localStorage.setItem('players', players);
  localStorage.setItem('teams', teams);
  localStorage.setItem('mimicCharacters', mimicCharacters);
  localStorage.setItem('customCharacters', customCharacters);
  localStorage.setItem('defaultMimicTime', defaultMimicTime);
  localStorage.setItem('isBaseCharactersEnabled', isBaseCharactersEnabled);
};

const SyncService = { uploadData, getData, getPlayers, syncData };

export default SyncService;
