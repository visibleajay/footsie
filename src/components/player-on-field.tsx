import React from "react";
import styled from "styled-components";
import { useAppSelector } from "../app/hooks";
import { selectFormationCount } from "../app/store/footballManagerSlice";
import PlayerDetail from "./player-details";

const DetailContainer = styled.div`
  display: flex;
  align-items: center;
  background-color: var(--neutralbackground-2);
  border: 1px solid var(--neutralbackground-2);
  border-radius: 8px;
  height: 40rem;
  color: var(--textnormal);
  padding: 32px;
`;

const Field = styled.div`
  position: relative;
  background-image: url("./assets/field.png");
  background-repeat: no-repeat;
  background-size: cover;
  height: 100%;
  flex: 5;
`;

const PlayerNameContainer = styled.div<{
  top: string;
  left: string;
  isActive: boolean;
}>`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: ${(p) => `calc(${p.top})`};
  left: ${(p) => `calc(${p.left})`};
  font-weight: 500;
  color: var(--textheadings);
  text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.2);
  text-align: center;
  text-transform: capitalize;
  cursor: pointer;

  span {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background-color: var(
      ${(p) => (p.isActive ? "--primaryorange" : "--neutralbackground-2")}
    );
    font-weight: 500;
  }
`;

export default function PlayerOnField({
  isFileUpload,
}: {
  isFileUpload: boolean;
}) {
  const [totalGoalKeeper, totalDefender, totalMidfielder, totalForward] =
    useAppSelector(selectFormationCount);

  console.log({
    totalGoalKeeper,
    totalDefender,
    totalMidfielder,
    totalForward,
  });

  return (
    <DetailContainer>
      <Field>
        <PlayerName
          name="ajay"
          jersey_number={"1"}
          top={"50%"}
          left={"50px"}
          isActive={false}
          onClick={() => {
            console.log("inside rock");
          }}
        />
        <PlayerName
          name="vijay"
          jersey_number={"50"}
          top={"12.5%"}
          left={"202px"}
          isActive={false}
          onClick={() => {
            console.log("inside rock");
          }}
        />
        <PlayerName
          name="jay"
          jersey_number={"15"}
          top={"37.5%"}
          left={"192px"}
          isActive={true}
          onClick={() => {
            console.log("inside rock");
          }}
        />
        <PlayerName
          name="stong"
          jersey_number={"76"}
          top={"62.5%"}
          left={"192px"}
          isActive={true}
          onClick={() => {
            console.log("inside rock");
          }}
        />
        <PlayerName
          name="sanjay"
          jersey_number={"87"}
          top={"87.5%"}
          left={"202px"}
          isActive={false}
          onClick={() => {
            console.log("inside rock");
          }}
        />
        <PlayerName
          name="sanjay"
          jersey_number={"87"}
          top={"20.5%"}
          left={"50% - 16px"}
          isActive={false}
          onClick={() => {
            console.log("inside rock");
          }}
        />
        <PlayerName
          name="sanjay"
          jersey_number={"87"}
          top={"52%"}
          left={"50% - 16px"}
          isActive={false}
          onClick={() => {
            console.log("inside rock");
          }}
        />
        <PlayerName
          name="sanjay"
          jersey_number={"87"}
          top={"77.5%"}
          left={"50% - 16px"}
          isActive={false}
          onClick={() => {
            console.log("inside rock");
          }}
        />

        <PlayerName
          name="sanjay"
          jersey_number={"87"}
          top={"22.5%"}
          left={"70%"}
          isActive={false}
          onClick={() => {
            console.log("inside rock");
          }}
        />

        <PlayerName
          name="sanjay"
          jersey_number={"87"}
          top={"52%"}
          left={"70%"}
          isActive={false}
          onClick={() => {
            console.log("inside rock");
          }}
        />

        <PlayerName
          name="sanjay"
          jersey_number={"87"}
          top={"82%"}
          left={"70%"}
          isActive={false}
          onClick={() => {
            console.log("inside rock");
          }}
        />
      </Field>
      <PlayerDetail
        player_image="https://images.psg.media/media/207194/card_21-22_gharbi.png?center=0.5,0.5&mode=crop&width=400&height=600&quality=75"
        jersey_number="1"
      />
    </DetailContainer>
  );
}

const PlayerName = ({
  name,
  jersey_number,
  top,
  left,
  isActive,
  onClick = () => {},
}: {
  name: string;
  jersey_number: string;
  isActive: boolean;
  top: string;
  left: string;
  onClick: () => void;
}) => {
  return (
    <PlayerNameContainer {...{ top, left, isActive }} onClick={onClick}>
      <span>{jersey_number}</span>
      {name}
    </PlayerNameContainer>
  );
};
