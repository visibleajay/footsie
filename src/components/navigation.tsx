import React from "react";

import styled from "styled-components";
import classNames from "classnames";

import { ReactComponent as Logo } from "../assets/logo.svg";
import { ReactComponent as Detail } from "../assets/details.svg";
import { ReactComponent as Bar } from "../assets/bars.svg";

const NavBar = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 60px;
  height: 100vh;
  background: #111111;
  padding-top: 20px;

  > .table {
    margin: 45px 0px;
  }

  > svg:not(:first-child) {
    cursor: pointer;
  }

  > svg:not(:first-child).active > path {
    fill: #fea013;
  }
`;

export default function Navigation({
  selected,
  onSelect,
}: {
  selected: string;
  onSelect: (item: string) => void;
}) {
  return (
    <NavBar>
      <Logo />
      <Bar
        className={classNames("table", { active: selected === "table" })}
        onClick={() => onSelect("table")}
      />
      <Detail
        className={classNames("detail", { active: selected === "detail" })}
        onClick={() => onSelect("detail")}
      />
    </NavBar>
  );
}
