import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../appReducer";

export interface IPlayer {
  id: string;
  flag_image: string;
  player_name: string;
  jersey_number: string;
  height: string;
  weight: string;
  nationality: string;
  starter: "Yes" | "No";
  appearances: string;
  minutes_played: string;
  position: "Goalkeeper" | "Defender" | "Midfielder" | "Forward";
  player_image: string;
  assits: string;
  clean_sheets: string;
  saves: string;
  goals: string;
}

export interface IFormation {
  Goalkeeper: string[];
  Defender: string[];
  Midfielder: string[];
  Forward: string[];
}

export interface playerManagerState {
  [key: string]: IPlayer;
}

const initialState: playerManagerState = {};

export const playerManagerSlice = createSlice({
  name: "playerManager",
  initialState,
  reducers: {
    populatePlayers: (state, action: PayloadAction<IPlayer[]>) => {
      // Normalize all players data and populater players field.
      const players = action.payload;
      const playerObj = {};
      players.forEach((player: IPlayer) => {
        const randomId: string =
          Math.floor(Math.random() * Math.floor(Math.random() * Date.now())) +
          "";
        // @ts-ignore
        playerObj[randomId + ""] = {
          ...player,
          player_image: player.player_image.replace(/["']/g, ""),
          id: randomId + "",
        };
      });
      return playerObj;
    },
    updatePlayer: (state, action: PayloadAction<IPlayer>) => {
      const { id } = action.payload;
      state[id] = action.payload;
    },
    deletePlayer: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      if (state[id]) {
        delete state[id];
      }
    },
  },
});

export const selectNationalities = (state: RootState) => {
  const nationalityObj = {};
  Object.values(state.playerManager).forEach((player: IPlayer) => {
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
  Object.values(state.playerManager || {});

export const selectPlayerInfo = (id: string) => (state: RootState) => {
  return state.playerManager[id] || {};
};

export const selectFormation = (state: RootState) => {
  const formation: IFormation = {
    Goalkeeper: [],
    Defender: [],
    Midfielder: [],
    Forward: [],
  };
  Object.values(state.playerManager || {}).map((player) => {
    const { starter = "", position, id } = player;
    if (starter === "Yes") {
      formation[position as keyof typeof formation].push(id);
    }
  });
  return Object.values(formation || {});
};

export const selectFormationCount = createSelector(
  selectFormation,
  (formation: Array<number[]>) => {
    return formation.map((form) => form.length);
  }
);

export const selectTableView = (state: RootState) => {
  return Object.keys(state.playerManager || {}).length > 0;
};

export const playerManagerActions = {
  ...playerManagerSlice.actions,
};

export default playerManagerSlice.reducer;
