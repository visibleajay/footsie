import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect } from "react";
import styled from "styled-components";
import { useModal } from "../context/ModalProvider";

const ModalContainer = styled.div`
  display: none;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.1);
  position: fixed;
  top: 0px;
  left: 0px;
  z-index: 100;
  overflow: hidden;
`;

const ImportModal = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background-color: var(--neutralbackground-2);
  height: 600px;
  padding: 14px 24px;
  width: 800px;
  font-size: 1em;
  position: absolute;
  box-shadow: 0px 12px 28px rgba(22, 22, 22, 0.5);
  border-radius: 8px;
  top: 50px;
  left: 20%;
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

const FilePickerContainer = styled.div`
  display: flex;
  align-items: flex-start;
  margin-top: 9px;
`;

const FileGroup = styled.div`
  border-radius: 8px;
  height: 44px;
  position: relative;
  width: 300px;
`;

const Container = styled.div`
  align-items: flex-start;
  border-radius: 8px;
  display: flex;
  height: 44px;
  left: 0;
  min-width: 300px;
  padding: 11px 16px;
  position: absolute;
  top: 0;
`;

const InputContainer = styled.div`
  align-items: flex-start;
  border-radius: 8px;
  display: flex;
  height: 44px;
  left: 190px;
  overflow: hidden;
  padding: 11px 20px;
  position: absolute;
  top: 0;
  width: 110px;
`;

const ImportButton = styled.button`
  position: absolute;
  bottom: 24px;
  right: 24px;
  border-radius: 8px;
  height: 44px;
  overflow: hidden;
  padding: 11px 20px;
  font-weight: 500;
  width: 88px;
  min-height: 21px;
  background-color: var(--neutralbackground-2);
  color: var(--textdisabled);
`;

const ImportTableModal = ({
  isOpen,
  setView,
}: {
  isOpen: boolean;
  setView: () => void;
}) => {
  const {
    showModal: isDisplay,
    openModal: openFileModal,
    closeModal,
    modalRef: fileModalRef,
    closeModalOverlay: closeFileModal,
  } = useModal();

  useEffect(() => {
    if (isOpen) openFileModal();
  }, [isOpen]);

  return (
    <ModalContainer
      onClick={(e) => {
        setView();
        closeFileModal(e);
      }}
      style={{ display: isDisplay ? "flex" : "none" }}
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
              closeModal();
              setView();
            }}
          />
        </Heading>
        <HorizontalSeparator />
        <RosterFile>Roster File</RosterFile>
        <FilePickerContainer>
          <FileGroup>
            <Container>No File Selected</Container>
            <InputContainer>
              <input
                type="file"
                placeholder="Select File"
                accept="text/csv"
                style={{ display: "none" }}
              />
              <button>Select File</button>
            </InputContainer>
          </FileGroup>
        </FilePickerContainer>
        <div>File must be in .csv format</div>
        <ImportButton>Import</ImportButton>
      </ImportModal>
    </ModalContainer>
  );
};

export default ImportTableModal;
