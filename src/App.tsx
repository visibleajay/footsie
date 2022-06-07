import React, { useState } from "react";
import styled from "styled-components";
import Navigation from "./components/navigation";
import PlayerOnField from "./components/player-on-field";
import Table from "./components/table";
import TableProps from "./components/table-props";
import TeamName from "./components/teamName";

const AppContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const RightViewContainer = styled.div`
  flex: 1;
  padding-left: 20px;
  padding-right: 40px;
`
const TopViewContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding-top: 40px;
  padding-bottom: 24px;
`;


function App() {
  const [view, setView] = useState("table");

  return (
    <AppContainer>
      <Navigation selected={view} onSelect={setView} />
      <RightViewContainer style={{flex: 1}}>
        <TopViewContainer>
          <TeamName />
          <TableProps />
        </TopViewContainer>
        {view === "table" && <Table />}
        {view === "detail" && <PlayerOnField />}
      </RightViewContainer>
    </AppContainer>
  );
}

export default App;
