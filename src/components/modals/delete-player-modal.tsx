import React, { useRef, useEffect } from "react";
import styled from "styled-components";

import { ModalViewContainer } from "../../common/component";
import { useModal } from "../../context/ModalProvider";

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
export default function DeletePlayerModal({ isOpen }: { isOpen: boolean }) {
  const deleteModalRef = useRef(null);

  const { showModal: isDisplay, openModal, closeModal } = useModal();

  useEffect(() => {
    if (isOpen) openModal();
  }, [isOpen]);

  return (
    <ModalContainer
      ref={deleteModalRef}
      onClick={() => closeModal()}
      isOpen={isDisplay}
    >
      <ModalViewContainer style={{ padding: "18px 24px 24px" }}>
        Delete Player Modal
      </ModalViewContainer>
    </ModalContainer>
  );
}
