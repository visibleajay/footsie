import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/appReducer";

export interface IPlayer {
  [key: string]: string | number;
}

export interface IFormation {
    Goalkeeper: string[];
    Defender: string[];
    Midfielder: string[];
    Forward: string[];
}

export interface FootballManagerState {
  players: IPlayer;
  formation: IFormation;
}

const initialState: FootballManagerState = {
  players: {} as IPlayer,
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
      const playerObj: IPlayer = {};
      const formation: IFormation = {
        Goalkeeper: [],
        Defender: [],
        Midfielder: [],
        Forward: [],
      };
      players.forEach((player: IPlayer) => {
        const randomId: string = Math.floor(
          Math.random() * Math.floor(Math.random() * Date.now())
        )+"";

        const { starter = "", position } = player;
        if ((starter+"").toLowerCase() === "yes") {
          formation[position as keyof typeof formation].push(randomId);
        }

        // @ts-ignore
        playerObj[randomId + ""] = { ...player, id: randomId + "" };
      });
      state.players = playerObj;
      state.formation = formation;
    },
    setFormation: (state, action: PayloadAction<{key: keyof IFormation; id: string}>) => {
      const {formation} = state;
      const {key, id} = action.payload;
      state.formation = {...formation, [key]: [...formation[key], id]};
    },
  },
});

export const selectPlayers = (state: RootState) => Object.values(state.footballManager.players || {});

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

export const footballManagerActions = {
  ...footballManagerSlice.actions,
};

export default footballManagerSlice.reducer;
