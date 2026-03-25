export interface Card {
  id: number;
  playerId?: string;
  name: string;
  naipe: string;
  value: number;
  order: number;
}

export interface PlayerPublicData {
  publicId: number;
  name: string;
  avatar: number;
  points: number;
  team: number;
  numCards: number;
  actualMove: Card | null;
}

export interface PlayerData extends PlayerPublicData {
  hand: Card[];
}

export interface GameData {
  idRoom: string;
  gameStatus: boolean;
  numPlayers: number;
  gameTrump: string;
  playerTurn: number | null;
  statusAs: boolean;
  numberOfPlays: number;
  currentPlayer: PlayerData;
  players: PlayerPublicData[];
  teams: any[];
  numberOfCardsInDeck: number;
}

export interface Message {
  player: string;
  text: string;
  id?: string;
  playerName?: string;
}
