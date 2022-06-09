import React, { createContext, useContext, useState, useRef } from "react";

interface ModalContextData {
  showModal: boolean;
  closeModalOverlay: (e: React.MouseEvent<Element, MouseEvent>) => void;
  modalRef: any;
  openModal: () => void;
  closeModal: () => void;
}

const ModalContext = createContext<ModalContextData>({} as ModalContextData);

const ModalProvider = ({ children }: { children: JSX.Element }) => {
  const modalRef = useRef();

  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal((prev) => !prev);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const closeModalOverlay = (e: React.MouseEvent<Element, MouseEvent>) => {
    if (modalRef.current === e.target) {
      setShowModal(false);
    }
  };

  return (
    <ModalContext.Provider
      value={{ showModal, openModal, closeModal, modalRef, closeModalOverlay }}
    >
      {children}
    </ModalContext.Provider>
  );
};

function useModal() {
  const context = useContext(ModalContext);

  if (!context) {
    throw new Error("useModal must be used within an ModalProvider");
  }

  return context;
}

export { useModal, ModalProvider };
