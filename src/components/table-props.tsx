import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { ImportBTN } from "../common/component";

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  border: 1px solid var(--bordersdefault);
  border-radius: 8px;
  height: 44px;
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

  &:focus {
    color: var(--textnormal);
  }
`;

const ImportButton = styled(ImportBTN)<{ isActive: boolean }>`
  ${(p) =>
    !p.isActive &&
    `
    border: 1px solid var(--bordersdefault);
    background: none;
    color: var(--textnormal);
  `}
`;

export default function TableProps({
  isFileUpload,
  setFilterValue,
  onOpen,
}: {
  isFileUpload: boolean;
  setFilterValue: (val: string) => void;
  onOpen: () => void;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <InputContainer>
        <FontAwesomeIcon icon={["fas", "magnifying-glass"]} />
        <Input
          readOnly={!isFileUpload}
          placeholder="Find Player"
          onChange={(event) => {
            setFilterValue(event.target.value);
          }}
        />
      </InputContainer>
      <ImportButton isActive={!isFileUpload} onClick={onOpen}>
        {!isFileUpload ? "Import Team" : "Re-Import Team"}
      </ImportButton>
    </div>
  );
}
