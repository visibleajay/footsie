import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/appReducer";

export interface IPlayer {
  [key: string]: string | number;
}

export interface FootballManagerState {
  players: IPlayer;
  formation: {
    goalkeeper: number[];
    defenders: number[];
    midFielder: number[];
    forwards: number[];
  };
}

const initialState: FootballManagerState = {
  players: {} as IPlayer,
  formation: {
    goalkeeper: [],
    defenders: [],
    midFielder: [],
    forwards: [],
  },
};

export const footballManagerSlice = createSlice({
  name: "footballManager",
  initialState,
  reducers: {
    populatePlayers: (state) => {
      // Normalize all players data and populater players field.
    },
    setFormation: (state) => {
      // Assign all starter players wrt their specific position over field to formation key.
    },
  },
});

const selectFormationCount = (state: RootState) => {
  const {
    formation: { goalkeeper, defenders, midFielder, forwards },
  } = state.footballManager;
  return [
    goalkeeper.length,
    defenders.length,
    midFielder.length,
    forwards.length,
  ];
};

export default footballManagerSlice.reducer;
