import React from "react";

import styled from "styled-components";

import { ReactComponent as Logo } from "../assets/logo.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const NavBar = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 60px;
  height: 100vh;
  background: #111111;
  padding-top: 20px;
  position: relative;

  > .table {
    margin: 45px 0px;
  }

  > svg:not(:first-child) {
   
  }
`;

const SVG = styled(FontAwesomeIcon)<{isActive: boolean}>`
  margin-top: 45px;
  cursor: pointer;
  > path {
    fill: ${(p) => p.isActive ? "var(--primaryorange)" : "var(--primaryorange-muted)"};
  }
`

const Dot = styled.span<{top: string}>`
  display: block;
  width: 4px;
  height: 4px;
  position: absolute;
  top: ${(p) => p.top};
  left: 10px;
  border-radius: 50%;
  background-color: var(--primaryorange);
`

export default function Navigation({
  selected,
  onSelect,
}: {
  selected: string;
  onSelect: (item: "table" | "detail") => void;
}) {
  return (
    <NavBar>
      <Logo
        style={{
          borderRadius: "50%",
          border: "2px solid var(--primaryorange)",
        }}
      />
      <SVG
        icon={["fas", "bars"]}
        isActive={selected === "table" }
        onClick={() => onSelect("table")}
      />
      <SVG
        icon={["fas", "users-line"]}
        isActive={selected === "detail" }
        onClick={() => onSelect("detail")}
      />

      <Dot top={selected === "table" ? "98px" : "156px"} />
    </NavBar>
  );
}
