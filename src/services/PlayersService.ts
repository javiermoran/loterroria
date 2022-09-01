import Player from '../models/Player';

const addPlayer = (player: Player) => {
  const players = getPlayers();
  players.push(player);
  localStorage.setItem('players', JSON.stringify(players));
};

const getPlayers = () => {
  const playersItem = localStorage.getItem('players');
  return playersItem ? JSON.parse(playersItem) : [];
};

const PlayersService = { addPlayer, getPlayers };

export default PlayersService;
