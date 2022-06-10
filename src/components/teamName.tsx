import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useRef, useState } from "react";
import styled from "styled-components";

const Container = styled.div<{ isSvgDisplay: boolean }>`
  display: flex;
  flex-direction: column;

  > div {
    color: var(--textheadings);
  }
  & input {
    flex: 1;
    min-width: 0;
    color: var(--textheadings);
    background: none;
    border: none;
    outline: none;
  }

  & svg {
    display: ${(p) => (p.isSvgDisplay ? "inherit" : "none")};
    margin-left: 13px;
    cursor: pointer;
  }
`;
const TeamHeading = styled.span`
  font-size: 12px;
  line-height: 18px;
  color: var(--primaryorange);
  white-space: nowrap;
`;

export default function TeamName() {
  const inputRef = useRef(null);
  const [name, setName] = useState("My Team");
  const [inputState, setInputState] = useState<
    "initial" | "focus" | "visited" | "show" | "hide"
  >("initial");

  return (
    <Container isSvgDisplay={inputState === "show" || inputState === "initial"}>
      <TeamHeading>Roster Details</TeamHeading>
      <div style={{ display: "flex", alignItems: "center" }}>
        <div
          style={{
            display: "flex",
            flex: 1,
            alignItems: "center",
          }}
          onMouseLeave={() => {
            if (inputState === "show") setInputState("hide");
          }}
        >
          <input
            ref={inputRef}
            value={name}
            onChange={(event) => {
              setName(event.target.value);
            }}
            onMouseEnter={() => {
              if (inputState === "visited" || inputState === "hide") {
                setInputState("show");
              }
            }}
            onBlur={() => {
              setInputState("visited");
            }}
            style={{
              width: `calc(${name.length}rem - ${name.length * 4}px)`,
            }}
            readOnly={inputState !== "focus"}
          />
          <FontAwesomeIcon
            onClick={() => {
              if (inputRef.current) {
                const element = inputRef.current as HTMLInputElement;
                element.focus();
              }
              setInputState("focus");
            }}
            icon={["fas", "pen"]}
          />
        </div>
        <div style={{ flex: 6, display: "flex" }}></div>
      </div>
    </Container>
  );
}
