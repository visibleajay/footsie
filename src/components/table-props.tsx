import React, { useState, useEffect } from "react";
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
    cursor: pointer;
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
  onSearch,
  onOpen,
}: {
  isFileUpload: boolean;
  onSearch: (val: string) => void;
  onOpen: () => void;
}) {
  const [value, setFilterValue] = useState<string>("");
  const [isSearched, setSearched] = useState<boolean>(false);

  useEffect(() => {
    // @ts-ignore
    const escFunction = (event) => {
      if (event.key === "Escape" && value.length) {
        onSearch("");
        setFilterValue("");
        setSearched(false);
      }
    };
    document.addEventListener("keydown", escFunction);

    return () => {
      document.removeEventListener("keydown", escFunction);
    };
  }, [value]);

  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <InputContainer>
        <FontAwesomeIcon
          icon={["fas", isSearched ? "close" : "magnifying-glass"]}
          onClick={() => {
            if (value.length) {
              if (!isSearched) {
                onSearch(value);
              } else {
                setFilterValue("");
                onSearch("");
              }
              setSearched(!isSearched);
            }
          }}
        />
        <Input
          readOnly={!isFileUpload}
          placeholder="Find Player"
          value={value}
          onChange={(event) => {
            setFilterValue(event.target.value);
            if (event.target.value === "") {
              setSearched(false);
            }
          }}
          onKeyUp={(event) => {
            event.preventDefault();
            event.stopPropagation();
            if (event.key === "Enter") {
              if (value.length) setSearched(true);
              onSearch(value);
            }
          }}
        />
      </InputContainer>
      <ImportButton isActive={!isFileUpload} onClick={onOpen}>
        {!isFileUpload ? "Import Team" : "Re-Import Team"}
      </ImportButton>
    </div>
  );
}
