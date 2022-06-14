import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { ImportBTN, ModalViewContainer } from "../../common/component";
import { useAppDispatch } from "../../app/hooks";
import {
  playerManagerActions,
  IPlayer,
} from "../../app/store/playerManagerSlice";

const ModalContainer = styled.div<{ isOpen: boolean }>`
  display: ${(p) => (p.isOpen ? "flex" : "none")};
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.1);
  position: fixed;
  top: 0px;
  left: 0px;
  z-index: 100;
  overflow: hidden;
`;

const ImportModal = styled(ModalViewContainer)`
  height: 600px;
  padding: 14px 24px;
  width: 800px;
  font-size: 1em;
`;

const Heading = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 27px;
  width: 100%;
`;

const ImportText = styled.div`
  color: var(--textheadings);
  font-weight: 600;
`;

const HorizontalSeparator = styled.span`
  width: 100%;
  border: 1px solid #494949;
  margin-top: 15px;
`;

const RosterFile = styled.div`
  color: var(--textheadings);
  font-weight: 500;
  margin-top: 22px;
`;

const FilePickerContainer = styled.div<{ isError: boolean }>`
  display: flex;
  align-items: space-between;
  margin-top: 9px;
  border: ${(p) => `1px solid ${p.isError ? "#D23131" : "#494949"}`};
  border-radius: 8px;
  height: 44px;
  width: 300px;
`;

const Container = styled.div`
  flex: 1;
  padding: 11px 16px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;

const InputContainer = styled.button<{ isError: boolean }>`
  border-radius: 8px;
  padding: 11px 20px;
  color: #cbcbcb;
  background: none;
  border: none;
  border-left: ${(p) => `1px solid ${p.isError ? "#D23131" : "#494949"}`};
  cursor: pointer;
`;

const ImportButton = styled(ImportBTN)<{ isActive: boolean }>`
  position: absolute;
  bottom: 24px;
  right: 24px;
  width: 88px;
  pointer-events: inherit;
  ${(p) =>
    !p.isActive &&
    `
    pointer-events: none;
    background: none;
    border: none;
    color: var(--textdisabled);
  `}
`;

const initialFileState = {
  name: "",
  error: false,
  "Total Player": 0,
  Goalkeeper: 0,
  Defender: 0,
  Midfielder: 0,
  Forward: 0,
};

const ImportTableModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const fileModalRef = useRef(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const [players, setPlayers] = useState<IPlayer[]>([]);

  const [file, setFile] = useState(initialFileState);
  const dispatch = useAppDispatch();

  const [isDisplay, setState] = useState(false);

  const setDisplay = (bool: boolean) => {
    // Clear Out Modal State.
    setFile(initialFileState);
    setPlayers([]);
    setState(bool);
    if (bool === false) onClose();
  };

  const processCSV = (str: string, name: string, delim = ",") => {
    const headers = str
      .slice(0, str.indexOf("\n"))
      .split(delim)
      .map((header) => header.toLowerCase().trim().split(" ").join("_"));
    const rows = str.slice(str.indexOf("\n") + 1).split("\n");

    console.log({ headers });
    try {
      const position = {
        Goalkeeper: 0,
        Defender: 0,
        Midfielder: 0,
        Forward: 0,
      };

      const players = rows.map((row) => {
        const values = row
          .split(/,(?=(?:[^\"]*\"[^\"]*\")*[^\"]*$)/)
          .map((val) => val.trim());

        const isEmptyCol = values.some((val) => val.length === 0);
        if (isEmptyCol) throw "Invalid File";

        const eachPlayer = headers.reduce((obj, header, i) => {
          // @ts-ignore
          obj[header] = values[i];
          if (header === "position") {
            position[values[i] as keyof typeof position] += 1;
          }
          return obj;
        }, {});
        return eachPlayer;
      });

      setPlayers(players as IPlayer[]);
      setFile((s) => ({
        ...s,
        name,
        error: false,
        ...position,
        "Total Player": players.length,
      }));
    } catch (e) {
      setFile((s) => ({ ...initialFileState, name, error: true }));
    }
  };

  useEffect(() => {
    if (isOpen) setDisplay(true);
  }, [isOpen]);

  return (
    <ModalContainer
      onClick={(e) => {
        if (fileModalRef.current === e.target) {
          setDisplay(false);
        }
      }}
      isOpen={isDisplay}
      ref={fileModalRef}
    >
      <ImportModal>
        <Heading>
          <ImportText>Importer</ImportText>
          <FontAwesomeIcon
            style={{
              height: 14,
              width: 14,
              cursor: "pointer",
            }}
            icon={["fas", "close"]}
            color="#CBCBCB"
            onClick={() => {
              setDisplay(false);
            }}
          />
        </Heading>
        <HorizontalSeparator />
        <RosterFile>Roster File</RosterFile>
        <FilePickerContainer isError={!!file.error}>
          <Container>
            {file.name.length ? file.name : "No File Selected"}
          </Container>
          <InputContainer
            isError={!!file.error}
            onClick={() =>
              inputRef && inputRef.current && inputRef.current.click()
            }
          >
            <input
              ref={inputRef}
              type="file"
              placeholder="Select File"
              accept="text/csv"
              style={{ display: "none" }}
              onChange={(e) => {
                // @ts-ignore
                const file = e.target.files[0];
                const reader = new FileReader();

                const { name } = file;
                reader.onload = function (e) {
                  const text = (e.target as FileReader).result as string;
                  processCSV(text || "", name);
                };

                reader.readAsText(file);
              }}
            />
            Select File
          </InputContainer>
        </FilePickerContainer>
        {!file.error ? (
          <>
            <div style={{ paddingTop: 16 }}>File must be in .csv format</div>
            {file.name.length > 0 && (
              <>
                <div style={{ marginTop: 32 }}>File Summary</div>
                <div
                  style={{
                    marginTop: 24,
                    display: "flex",
                    justifyContent: "space-between",
                    width: "100%",
                  }}
                >
                  {[
                    "Total Player",
                    "Goalkeeper",
                    "Defender",
                    "Midfielder",
                    "Forward",
                  ].map((val) => (
                    <div
                      key={val}
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        flex: 1,
                      }}
                    >
                      <span>{`${val}s`}</span>
                      <br />
                      <span>{file[val as keyof typeof file]}</span>
                    </div>
                  ))}
                </div>
              </>
            )}
          </>
        ) : (
          <div style={{ marginTop: 16 }}>
            <span style={{ color: "#D23131" }}>Error</span>
            <br />
            <span style={{ marginTop: 8, color: "#cbcbcb" }}>
              Your sheet is missing data. Please ensure all cells are filled
              out.
            </span>
          </div>
        )}
        <ImportButton
          isActive={!file.error && file.name.length > 0}
          onClick={() => {
            dispatch(
              playerManagerActions.populatePlayers(players as IPlayer[])
            );
            setDisplay(false);
          }}
        >
          Import
        </ImportButton>
      </ImportModal>
    </ModalContainer>
  );
};

export default ImportTableModal;
