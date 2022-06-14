import React, { useState } from "react";
import styled from "styled-components";
import { useAppSelector } from "./app/hooks";
import { selectTableView } from "./app/store/playerManagerSlice";
import ImportTableModal from "./components/modals/import-table-modal";
import Navigation from "./components/navigation";
import PlayerOnField from "./components/player-on-field";
import Table from "./components/table";
import TableProps from "./components/table-props";
import TeamName from "./components/teamName";
import { ModalProvider } from "./context/ModalProvider";

const AppContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const RightViewContainer = styled.div`
  flex: 1;
  padding: 0px 40px;
`;

const TopViewContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding-top: 40px;
  padding-bottom: 24px;
`;

function App() {
  const [view, setView] = useState<"table" | "detail" | "importFile">("table");

  const isFileUpload = useAppSelector(selectTableView);
  const [filterVal, setFilterValue] = useState("");

  console.log({isFileUpload});
  return (
    <ModalProvider>
      <AppContainer>
        <Navigation selected={view} onSelect={setView} />
        <RightViewContainer style={{ flex: 1 }}>
          <TopViewContainer>
            <TeamName />
            {view === "table" && (
              <TableProps
                isFileUpload={isFileUpload}
                onOpen={() => setView("importFile")}
                setFilterValue={(val: string) => setFilterValue(val)}
              />
            )}
          </TopViewContainer>
          {(view === "table" || view === "importFile") && (
            <Table isFileUpload={isFileUpload} filterValue={filterVal} />
          )}
          {view === "detail" && <PlayerOnField isFileUpload={isFileUpload} />}
          <ImportTableModal
            onClose={() => setView("table")}
            isOpen={view === "importFile"}
          />
        </RightViewContainer>
      </AppContainer>
    </ModalProvider>
  );
}

export default App;
