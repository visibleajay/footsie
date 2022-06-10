import styled from "styled-components";

const ImportBTN = styled.button`
  background-color: var(--primaryorange);
  border: 1px solid var(--primaryorange);
  border-radius: 8px;
  cursor: pointer;
  margin-left: 8px;
  overflow: hidden;
  padding: 11px 20px;
  color: var(--textheadings);
  font-weight: 500;
  height: 44px;
`;

const ModalViewContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  position: absolute;
  background-color: var(--neutralbackground-2);
  box-shadow: 0px 12px 28px rgba(22, 22, 22, 0.5);
  border-radius: 8px;
  top: 50px;
  left: 20%;
  color: var(--textmuted);
`;

export {
  ImportBTN,
  ModalViewContainer,
};
