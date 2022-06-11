import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";

const Container = styled.div<{ isOpen: boolean }>`
  position: absolute;
  top: 0;
  right: 0;
  display: ${(p) => (p.isOpen ? "flex" : "none")};
  flex-direction: column;
  align-items: flex-start;
  padding: 16px 16px 24px;

  position: absolute;
  width: 233px;
  height: 150px;
  z-index: 100;

  background: var(--neutralbackground-2);

  box-shadow: 0px 12px 28px rgba(22, 22, 22, 0.5);
  border-radius: 8px;

  & > div {
    display: flex;
    justify-content: space-between;
    width: 100%;
    align-items: center;
  }
`;

const MenuItemContainer = styled.div`
  margin-top: 16px;
  flex-direction: column;
  > div {
    padding: 8px 8px 8px 0px;
    width: 100%;
    height: 40px;
    border-radius: 4px;
    cursor: pointer;
  }

  & svg {
    height: 16px;
    width: 16px;
    color: var(--textmuted);
    margin-right: 12px;
  }
`;
const Heading = styled.div`
  font-weight: 600;
  color: var(--textheadings);
`;

export default function ActionModal({
  isOpen,
  onClose,
  onEdit,
  onDelete,
}: {
  isOpen: boolean;
  onClose: () => void;
  onEdit: () => void;
  onDelete: () => void;
}) {
  return (
    <Container isOpen={isOpen}>
      <div>
        <Heading>Action Modal</Heading>
        <FontAwesomeIcon
          icon={["fas", "close"]}
          style={{ height: 16, width: 10, cursor: "pointer" }}
          onClick={onClose}
        />
      </div>
      <MenuItemContainer>
        <div onClick={onEdit}>
          <FontAwesomeIcon icon={["fas", "pen"]} />
          Edit Player
        </div>
        <div onClick={onDelete}>
          <FontAwesomeIcon icon={["fas", "trash-alt"]} />
          Delete Player
        </div>
      </MenuItemContainer>
    </Container>
  );
}
