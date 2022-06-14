import React, { forwardRef, useState } from "react";
import styled from "styled-components";
import { useAppSelector } from "../app/hooks";
import { selectFormationCount, selectPlayerInfo } from "../app/store/playerManagerSlice";
import PlayerDetail from "./player-details";
import PlayerName from "./player-name";

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

const DefenderPosition = [
  {
    top: "12.5%",
    left: "202px",
  },
  {
    top: "37.5%",
    left: "192px",
  },
  {
    top: "62.5%",
    left: "192px",
  },
  {
    top: "87.5%",
    left: "202px",
  },
];

const MidfielderPosition = ["20.5%", "52%", "77.5%"];
const ForwardPosition = ["22.5%", "52%", "81.5%"];

export default function PlayerOnField({
  isFileUpload,
}: {
  isFileUpload: boolean;
}) {
  const [totalGoalKeeper, totalDefender, totalMidfielder, totalForward] =
    useAppSelector(selectFormationCount);

  const [playerId, setPlayerId] = useState<string>(totalGoalKeeper[0] || "");

  const player = useAppSelector(selectPlayerInfo(playerId));

  return (
    <DetailContainer>
      <Field>
        {totalGoalKeeper === 1 &&
          totalDefender === 4 &&
          totalMidfielder === 3 &&
          totalForward === 3 && (
            <>
              <PlayerName
                id={totalGoalKeeper[0]}
                top={"50%"}
                left={"50px"}
                isActive={false}
                onClick={() => {
                  setPlayerId(totalGoalKeeper[0]);
                }}
              />
              {totalDefender.map((defenderId: string, index: number) => (
                <PlayerName
                  key={defenderId}
                  id={defenderId}
                  top={DefenderPosition[index].top}
                  left={DefenderPosition[index].left}
                  isActive={false}
                  onClick={() => {
                    setPlayerId(defenderId);
                  }}
                />
              ))}

              {totalMidfielder.map((midfielderId: string, index: number) => (
                <PlayerName
                  key={midfielderId}
                  id={midfielderId}
                  top={MidfielderPosition[index]}
                  left={"50% - 16px"}
                  isActive={false}
                  onClick={() => {
                    setPlayerId(midfielderId);
                  }}
                />
              ))}

              {totalForward.map((forwardId: string, index: number) => (
                <PlayerName
                  key={forwardId}
                  id={forwardId}
                  top={ForwardPosition[index]}
                  left={"70%"}
                  isActive={false}
                  onClick={() => {
                    setPlayerId(forwardId);
                  }}
                />
              ))}
            </>
          )}
      </Field>
      <PlayerDetail isFileUpload={isFileUpload} {...player} />
    </DetailContainer>
  );
}
