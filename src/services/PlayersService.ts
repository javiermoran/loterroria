import Player from '../models/Player';
import Team from '../models/Team';
import SyncService from './SyncService';

const addPlayer = (player: Player) => {
  const players = getPlayers();
  players.push(player);
  localStorage.setItem('players', JSON.stringify(players));

  SyncService.uploadData();
};

const getPlayers = (): Player[] => {
  const playersItem = localStorage.getItem('players');
  return playersItem ? JSON.parse(playersItem) : [];
};

const deletePlayer = (playerToDelete: Player): void => {
  const players = getPlayers();
  const playerIndex = players?.findIndex(
    (player: Player): boolean => player?.name === playerToDelete?.name
  );
  players.splice(playerIndex, 1);
  localStorage.setItem('players', JSON.stringify(players));

  SyncService.uploadData();
};

const playerAddPoints = (id: string, points: number) => {
  const players = getPlayers();
  const index = players.findIndex((player: Player) => player?.id === id);
  players[index].points += points;
  localStorage.setItem('players', JSON.stringify(players));

  SyncService.uploadData();
};

const playerSubstractPoints = (id: string, points: number) => {
  const players = getPlayers();
  const index = players.findIndex((player: Player) => player?.id === id);
  players[index].points -= points;
  localStorage.setItem('players', JSON.stringify(players));
};

const getTeams = (): Team[] => {
  const teamsItem = localStorage.getItem('teams');
  return teamsItem ? JSON.parse(teamsItem) : [];
};

const addTeam = (team: Team): void => {
  const teams = getTeams();
  teams.push(team);
  localStorage.setItem('teams', JSON.stringify(teams));
  SyncService.uploadData();
};

const getTeam = (id: string): Team | undefined => {
  const teams = getTeams();
  return teams.find((team: Team): boolean => team?.id === id);
};

const teamAddPoints = (teamId: string, points: number): void => {
  const players = getPlayers();
  const teams = getTeams();
  const index = teams.findIndex((team: Team): boolean => team?.id === teamId);
  teams[index].points += points;
  localStorage.setItem('teams', JSON.stringify(teams));

  teams[index].members.forEach((id: string): void => {
    const index = players.findIndex(
      (player: Player): boolean => player?.id === id
    );
    players[index].points += points;
  });
  localStorage.setItem('players', JSON.stringify(players));

  SyncService.uploadData();
};

const PlayersService = {
  addPlayer,
  getPlayers,
  deletePlayer,
  playerAddPoints,
  playerSubstractPoints,
  getTeams,
  addTeam,
  getTeam,
  teamAddPoints,
};

export default PlayersService;
