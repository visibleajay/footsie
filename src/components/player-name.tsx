import React from "react";
import styled from "styled-components";
import { useAppSelector } from "../app/hooks";
import { selectPlayerInfo } from "../app/store/playerManagerSlice";

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

export default function PlayerName({
  id,
  top,
  left,
  isActive,
  onClick = () => {},
}: {
  id: string;
  isActive: boolean;
  top: string;
  left: string;
  onClick: () => void;
}) {
  const { jersey_number, player_name: name } = useAppSelector(
    selectPlayerInfo(id)
  );

  return (
    <PlayerNameContainer {...{ top, left, isActive }} onClick={onClick}>
      <span>{jersey_number}</span>
      {name}
    </PlayerNameContainer>
  );
}
