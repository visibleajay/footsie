import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/appReducer";

export interface IPlayer {
  id: string;
  flag_image: string;
  player_name: string;
  jersey_number: string;
  height: string;
  weight: string;
  nationality: string;
  starter: "Yes" | "No";
  appearance: string;
  minutes_played: string;
  position: "Goalkeeper" | "Defender" | "Midfielder" | "Forward";
}

export interface IFormation {
  Goalkeeper: string[];
  Defender: string[];
  Midfielder: string[];
  Forward: string[];
}

export interface FootballManagerState {
  players: {
    [key: string]: IPlayer;
  }
  formation: IFormation;
}

const initialState: FootballManagerState = {
  players: {},
  formation: {
    Goalkeeper: [],
    Defender: [],
    Midfielder: [],
    Forward: [],
  },
};

export const footballManagerSlice = createSlice({
  name: "footballManager",
  initialState,
  reducers: {
    populatePlayers: (state, action: PayloadAction<IPlayer[]>) => {
      // Normalize all players data and populater players field.
      const players = action.payload;
      const playerObj = {};
      const formation: IFormation = {
        Goalkeeper: [],
        Defender: [],
        Midfielder: [],
        Forward: [],
      };
      players.forEach((player: IPlayer) => {
        const randomId: string =
          Math.floor(Math.random() * Math.floor(Math.random() * Date.now())) +
          "";

        const { starter = "", position } = player;
        if ((starter + "").toLowerCase() === "yes") {
          formation[position as keyof typeof formation].push(randomId);
        }

        // @ts-ignore
        playerObj[randomId + ""] = { ...player, id: randomId + "" };
      });
      state.players = playerObj;
      state.formation = formation;
    },
    deletePlayer: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      const { players } = state;
      if (players[id]) {
        delete players[id];
        state.players = players;
      }
    },
    setFormation: (
      state,
      action: PayloadAction<{ key: keyof IFormation; id: string }>
    ) => {
      const { formation } = state;
      const { key, id } = action.payload;
      state.formation = { ...formation, [key]: [...formation[key], id] };
    },
  },
});

export const selectNationalities = (state: RootState) => {
  const { players } = state.footballManager;
  const nationalityObj = {};
  // @ts-ignore
  Object.values(players).forEach((player: IPlayer) => {
    const { nationality, flag_image } = player;
    // @ts-ignore
    nationalityObj[nationality] = {
      // @ts-ignore
      nationality,
      flagImage: flag_image,
    };
  });
  return nationalityObj;
};

export const selectPlayers = (state: RootState) =>
  Object.values(state.footballManager.players || {});

export const selectPlayerInfo = (id: string) => (state: RootState) => {
  return state.footballManager.players[id];
};

export const selectFormationCount = (state: RootState) => {
  const {
    formation: { Goalkeeper, Defender, Midfielder, Forward },
  } = state.footballManager;
  return [
    Goalkeeper.length,
    Defender.length,
    Midfielder.length,
    Forward.length,
  ];
};

export const selectTableView = (state: RootState) => {
  return Object.keys(state.footballManager.players || {}).length > 0;
};

export const footballManagerActions = {
  ...footballManagerSlice.actions,
};

export default footballManagerSlice.reducer;
