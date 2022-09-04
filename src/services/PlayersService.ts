import Player from '../models/Player';

const addPlayer = (player: Player) => {
  const players = getPlayers();
  players.push(player);
  localStorage.setItem('players', JSON.stringify(players));
};

const getPlayers = (): Player[] => {
  const playersItem = localStorage.getItem('players');
  return playersItem ? JSON.parse(playersItem) : [];
};

const deletePlayer = (playerToDelete: Player): void => {
  const players = getPlayers();
  const playerIndex = players?.findIndex(
    (player: Player) => player?.name === playerToDelete?.name
  );
  players.splice(playerIndex, 1);
  localStorage.setItem('players', JSON.stringify(players));
};

const PlayersService = { addPlayer, getPlayers, deletePlayer };

export default PlayersService;
