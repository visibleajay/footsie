import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { ModalViewContainer } from "../../common/component";
import { useAppDispatch } from "../../app/hooks";
import { footballManagerActions } from "../../app/store/footballManagerSlice";

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
  width: 379px;
  height: 186px;
  padding: 18px 24px 24px;
  top: 30%;
  left: 40%;
  justify-content: space-between;

  & > div {
    display: flex;
    justify-content: space-between;
    width: 100%;
    align-items: center;
  }

  & > div.actions {
    justify-content: flex-end;
  }
`;

const Heading = styled.div`
  color: var(--textheadings);
  font-weight: 600;
`;

const Button = styled.button`
  width: 85px;
  height: 44px;
  border: none;
  color: var(--textheadings);
  padding: 12px 20px 11px;

  background: var(--primaryred);
  border-radius: 8px;
  margin-left: 8px;
  cursor: pointer;
`;

const CancelButton = styled(Button)`
  color: var(--textnormal);
  background: none;
  border: 1px solid #494949;
`;

export default function DeletePlayerModal({
  id,
  isOpen,
  onClose,
}: {
  id: string;
  isOpen: boolean;
  onClose: () => void;
}) {
  const deleteModalRef = useRef(null);

  const dispatch = useAppDispatch();
  const [isDisplay, setDisplay] = useState(false);

  useEffect(() => {
    if (isOpen) setDisplay(true);
  }, [isOpen]);

  return (
    <ModalContainer
      ref={deleteModalRef}
      onClick={(e) => {
        if (deleteModalRef.current === e.target) {
          setDisplay(false);
          onClose();
        }
      }}
      isOpen={isDisplay}
    >
      <Container>
        <div>
          <Heading>Are You Sure</Heading>
          <FontAwesomeIcon
            icon={["fas", "close"]}
            style={{ height: 16, width: 10, cursor: "pointer" }}
            onClick={onClose}
          />
        </div>
        <div>This action cannot be undone.</div>
        <div className="actions">
          <CancelButton
            onClick={() => {
              setDisplay(false);
              onClose();
            }}
          >
            Cancel
          </CancelButton>
          <Button
            onClick={() => {
              dispatch(footballManagerActions.deletePlayer(id));
              setDisplay(false);
            }}
          >
            Delete
          </Button>
        </div>
      </Container>
    </ModalContainer>
  );
}
