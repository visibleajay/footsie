import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

import styled from "styled-components";

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  border: 1px solid var(--bordersdefault);
  border-radius: 8px;
  height: 21px;
  min-width: 248px;
  padding: 11px 16px;

  & > svg {
    position: absolute;
    width: 0.875rem;
    left: 0.5rem;
  }
`;

const Input = styled.input`
  color: var(--textmuted);
  font-weight: 400;
  margin-left: 10px;
  min-height: 21px;
  border: none;
  outline: none;
  background: inherit;
`;

const Button = styled.button`
  display: flex;
  align-items: flex-start;
  background-color: var(--primaryorange);
  border-radius: 8px;
  cursor: pointer;
  margin-left: 8px;
  overflow: hidden;
  padding: 11px 20px;
  width: 132px;
  color: var(--textheadings);
  font-weight: 500;
  height: 44px;
`;

export default function TableProps() {
  const display = (val: string) => {
    console.log({ val });
  };
  return (
    <div style={{display: "flex", flexDirection: "row"}}>
      <InputContainer>
        <FontAwesomeIcon icon={["fas", "magnifying-glass"]} />
        <Input placeholder="Find Player" />
      </InputContainer>
      <Button onClick={() => display("Import Team Modal")}>Import Team</Button>
    </div>
  );
}
