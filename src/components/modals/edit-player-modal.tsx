import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  playerManagerActions,
  IPlayer,
  selectNationalities,
  selectPlayerInfo,
} from "../../app/store/playerManagerSlice";

import { ImportBTN, ModalViewContainer } from "../../common/component";

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

const Container = styled(ModalViewContainer)`
  width: 480px;
  height: 582px;
  padding: 24px;
  top: 50px;
  left: 35%;

  & > div,
  & > div > div {
    display: flex;
    justify-content: space-between;
    width: 100%;
    align-items: center;
  }

  & svg {
    color: var(--textnormal);
  }
`;

const Heading = styled.div`
  color: var(--textheadings);
  font-weight: 600;
`;

const EditButton = styled(ImportBTN)<{ isActive: boolean }>`
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

const ElementContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start !important;
  height: 73px;
  justify-content: space-between;

  &.nationality,
  &.position {
    width: 100%;
  }

  & > label {
    color: #ffffff;
  }

  & > input,
  & > select {
    background: none;
    border: 1px solid #494949;
    border-radius: 8px;
    padding: 10px 16px;
    color: var(--textmuted);
  }

  & > input:focus {
    color: var(--textnormal);
  }

  & > select {
    width: 100%;
    appearance: none;
    border: 1px solid #494949;
    background: "\f078";
    background-repeat: no-repeat;
    background-size: 16px 17px;
    background-position: right 0px;
  }

  input[type="radio"] {
    display: grid;
    place-content: center;
    appearance: none;
    margin: 0;
    font: inherit;
    color: currentColor;
    width: 1.15em;
    height: 1.15em;
    border-radius: 50%;
    border: 1px solid var(--bordersdefault);
    cursor: pointer;
  }

  input[type="radio"]:checked {
    border: 0.35em solid var(--primaryorange);
    transform: translateY(-0.075em);
  }

  input[type="radio"]::before {
    content: "";
    width: 0.65em;
    height: 0.65em;
    border-radius: 50%;
    transform: scale(0);
    transition: 120ms transform ease-in-out;
    box-shadow: inset 1em 1em var(--form-control-color);
  }

  input[type="radio"]:checked::before {
    transform: scale(1);
  }

  input[type="number"] {
    -moz-appearance: textfield;
    margin: 0;
  }

  input[type="number"]::-webkit-inner-spin-button,
  input[type="number"]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  span {
    display: flex;
    flex-direction: row;
    align-items: center;

    > label {
      margin-left: 12px;
    }
  }
`;

export default function EditPlayerModal({
  id,
  isOpen,
  onClose,
}: {
  id: string;
  isOpen: boolean;
  onClose: () => void;
}) {
  const editModalRef = useRef(null);
  const [isDisplay, setDisplay] = useState(false);
  const nationalities = useAppSelector(selectNationalities);
  const dispatch = useAppDispatch();
  const playerInfo = useAppSelector(selectPlayerInfo(id));

  const [values, setValues] = useState<IPlayer>({} as IPlayer);
  const [isEdited, setEdited] = useState<boolean>(false);

  useEffect(() => {
    if (isOpen) {
      setDisplay(true);
      setValues({ ...playerInfo });
    }
  }, [isOpen, playerInfo]);

  const onSubmit = () => {
    const {
      player_name = "Unknown",
      jersey_number = "Unknown",
      nationality,
      height = "Unknown",
      weight = "Unknown",
      starter,
    } = values;
    // @ts-ignore
    const { flagImage } = nationalities[nationality];
    dispatch(
      playerManagerActions.updatePlayer({
        ...playerInfo,
        player_name: player_name || "Unknown",
        jersey_number: isNaN(+jersey_number)
          ? "Unknown"
          : jersey_number || "Unknown",
        nationality,
        flag_image: flagImage,
        height: isNaN(+height) ? "Unknown" : height || "Unknown",
        weight: isNaN(+weight) ? "Unknown" : weight || "Unknown",
        starter,
      })
    );
    closeForm();
  };

  const closeForm = () => {
    setDisplay(false);
    setValues({} as IPlayer);
    setEdited(false);
    onClose();
  };

  return (
    <ModalContainer
      ref={editModalRef}
      onClick={(e) => {
        if (editModalRef.current === e.target) {
          closeForm();
        }
      }}
      isOpen={isDisplay}
    >
      <Container>
        <div className="topView">
          <Heading>Edit Player</Heading>
          <FontAwesomeIcon
            icon={["fas", "close"]}
            style={{ height: 16, width: 10, cursor: "pointer" }}
            onClick={() => {
              closeForm();
            }}
          />
        </div>

        {Object.keys(playerInfo || {}).length > 0 && (
          <div
            style={{
              flex: 1,
              flexDirection: "column",
              marginTop: 20,
            }}
          >
            <div>
              <ElementContainer className="playerName">
                <label>Player Name</label>
                <input
                  size={17}
                  value={values.player_name || ""}
                  onChange={(event) => {
                    const { value } = event.target;
                    setValues((s) => ({ ...s, player_name: value }));
                    setEdited(true);
                  }}
                />
              </ElementContainer>
              <ElementContainer className="jerseyNumber">
                <label>Jersey Number</label>
                <input
                  size={7}
                  value={values.jersey_number || ""}
                  onChange={(event) => {
                    const { value } = event.target;
                    setValues((s) => ({ ...s, jersey_number: value }));
                    setEdited(true);
                  }}
                  type="number"
                />
              </ElementContainer>
            </div>

            <div>
              <ElementContainer className="height">
                <label>Height</label>
                <input
                  size={12}
                  value={values.height || ""}
                  onChange={(event) => {
                    const { value } = event.target;
                    setValues((s) => ({ ...s, height: value }));
                    setEdited(true);
                  }}
                  type="number"
                />
              </ElementContainer>
              <ElementContainer className="weight">
                <label>Weight</label>
                <input
                  size={12}
                  value={values.weight || ""}
                  onChange={(event) => {
                    const { value } = event.target;
                    setValues((s) => ({ ...s, weight: value }));
                    setEdited(true);
                  }}
                  type="number"
                />
              </ElementContainer>
            </div>

            <div>
              <ElementContainer className="nationality">
                <label>Nationality</label>
                <select
                  placeholder="Select Nationality"
                  name="nationality"
                  onChange={(event) => {
                    const { value } = event.target;
                    setValues((s) => ({ ...s, nationality: value }));
                    setEdited(true);
                  }}
                  value={values.nationality}
                >
                  {Object.values(nationalities || {}).map(
                    // @ts-ignore
                    ({ nationality }) => (
                      // @ts-ignore
                      <option key={nationality} value={nationality}>
                        {nationality}
                      </option>
                    )
                  )}
                </select>
              </ElementContainer>
            </div>

            <div>
              <ElementContainer className="position">
                <label>Position</label>
                <select
                  name="position"
                  placeholder="Select Position"
                  onChange={(event) => {
                    const { value } = event.target;
                    // @ts-ignore
                    setValues((s) => ({ ...s, position: value }));
                    setEdited(true);
                  }}
                  value={values.position}
                >
                  {["Goalkeeper", "Defender", "Midfielder", "Forward"].map(
                    (val) => (
                      <option key={val} value={val}>
                        {val}
                      </option>
                    )
                  )}
                </select>
              </ElementContainer>
            </div>

            <div>
              <ElementContainer className="starter">
                <label>Starter</label>
                <span style={{ height: 48 }}>
                  <span>
                    <input
                      type="radio"
                      name="starter"
                      checked={values.starter === "No"}
                      onChange={() => {
                        // @ts-ignore
                        setValues((s) => ({ ...s, starter: "No" }));
                        setEdited(true);
                      }}
                    />
                    <label>No</label>
                  </span>
                  <span style={{ marginLeft: 12 }}>
                    <input
                      type="radio"
                      name="starter"
                      checked={values.starter === "Yes"}
                      onChange={() => {
                        // @ts-ignore
                        setValues((s) => ({ ...s, starter: "Yes" }));
                        setEdited(true);
                      }}
                    />
                    <label>Yes</label>
                  </span>
                </span>
              </ElementContainer>
            </div>
            <div style={{ justifyContent: "flex-end" }}>
              <EditButton
                isActive={isEdited}
                className="actions"
                onClick={onSubmit}
              >
                Edit Player
              </EditButton>
            </div>
          </div>
        )}
      </Container>
    </ModalContainer>
  );
}
