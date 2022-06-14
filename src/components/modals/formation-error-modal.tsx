import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { ModalViewContainer } from "../../common/component";
import { useAppSelector } from "../../app/hooks";
import { selectFormationCount } from "../../app/store/playerManagerSlice";

const ModalContainer = styled.div<{ isOpen: boolean }>`
  display: ${(p) => (p.isOpen ? "flex" : "none")};
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.1);
  position: fixed;
  align-items: center;
  justify-content: center;
  top: 0px;
  left: 0px;
  z-index: 100;
  overflow: hidden;
`;

const Container = styled(ModalViewContainer)<{ type: string }>`
  display: ${(p) => (p.type === "close" ? "none" : "flex")};
  width: 389px;
  height: ${(p) => (p.type === "no" ? "107px" : "127px")};
  padding: 24px;
  top: 40%;
  left: 40%;
  justify-content: space-between;
  background-color: var(--neutralbackground-2);
  align-items: center;
  color: var(--textnormal);
  font-weight: 400;
  font-size: 14px;
  text-align: center;

  .error {
    font-weight: 600;
    font-size: 18px;
    color: var(--textheadings);
    margin-left: 8px;
  }

  svg {
    font-size: 18px;
  }
`;

export default function FormationErrorModal({
  isFileUpload = false,
}: {
  isFileUpload: boolean;
}) {
  const errorModalRef = useRef(null);

  const [totalGoalKeeper, totalDefender, totalMidfielder, totalForward] =
    useAppSelector(selectFormationCount);

  const [errorType, setErrorType] = useState<"close" | "no" | "less" | "more">(
    "close"
  );

  useEffect(() => {
    if (!isFileUpload) {
      setErrorType("no");
    } else {
      if (
        totalGoalKeeper === 1 &&
        totalDefender === 4 &&
        totalMidfielder === 3 &&
        totalForward === 3
      ) {
        setErrorType("close");
      } else {
        if (
          totalGoalKeeper + totalDefender + totalMidfielder + totalForward >
          11
        ) {
          setErrorType("more");
        } else {
          setErrorType("less");
        }
      }
    }
  }, [
    isFileUpload,
    totalGoalKeeper,
    totalDefender,
    totalMidfielder,
    totalForward,
  ]);

  return (
    <Container type={errorType}>
      <span>
        <FontAwesomeIcon
          icon={["fas", "triangle-exclamation"]}
          width={18}
          height={24}
          color={"var(--primaryorange)"}
        />
        <span className="error">
          {errorType === "no" && "No player data found "}
          {errorType === "less" && "Not enough starters"}
          {errorType === "more" && "There are too many starters"}
        </span>
      </span>
      <span style={{ marginTop: 8 }}>
        {errorType === "no" && "Please importer your roster first"}
        {errorType === "less" &&
          "Your team doesn’t have enough starters for one or more of the positions in the 4-3-3 formation"}
        {errorType === "more" &&
          "Your team has too many starters for one or more of the positions in the 4-3-3 formation"}
      </span>
    </Container>
  );
}
