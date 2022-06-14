import React, { forwardRef, useMemo, useState } from "react";
import styled from "styled-components";
import { useAppSelector } from "../app/hooks";
import {
  selectFormation,
  selectPlayerInfo,
} from "../app/store/playerManagerSlice";
import FormationErrorModal from "./modals/formation-error-modal";
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
    left: "192px",
  },
  {
    top: "37.5%",
    left: "182px",
  },
  {
    top: "62.5%",
    left: "182px",
  },
  {
    top: "87.5%",
    left: "192px",
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
    useAppSelector(selectFormation);

  const [playerId, setPlayerId] = useState<string>(totalGoalKeeper[0] || "");

  const player = useAppSelector(selectPlayerInfo(playerId));

  const isDisplayDetail = useMemo(() => {
    return (
      totalGoalKeeper.length === 1 &&
      totalDefender.length === 4 &&
      totalMidfielder.length === 3 &&
      totalForward.length === 3
    );
  }, [totalGoalKeeper, totalDefender, totalMidfielder, totalForward]);

  return (
    <>
      <DetailContainer>
        <Field>
          {isDisplayDetail && (
            <>
              <PlayerName
                id={totalGoalKeeper[0]}
                top={"50%"}
                left={"50px"}
                isActive={playerId === totalGoalKeeper[0]}
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
                  isActive={playerId === defenderId}
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
                  left={"50% - 52px"}
                  isActive={playerId === midfielderId}
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
                  isActive={playerId === forwardId}
                  onClick={() => {
                    setPlayerId(forwardId);
                  }}
                />
              ))}
            </>
          )}
        </Field>
        <PlayerDetail isDisplay={isDisplayDetail} {...player} />
      </DetailContainer>
      <FormationErrorModal isFileUpload={isFileUpload} />
    </>
  );
}
