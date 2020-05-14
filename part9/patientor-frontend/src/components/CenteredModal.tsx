import React, { ReactNode } from "react";
import { Modal } from "semantic-ui-react";

interface Props {
  modalOpen: boolean;
  onClose: () => void;
  children?: ReactNode;
  title: string;
}

const CenteredModal: React.FC<Props> = ({ title, modalOpen, onClose, children }: Props) => (
  <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
    <Modal.Header>{title}</Modal.Header>
    <Modal.Content>{children}</Modal.Content>
  </Modal>
);

export default CenteredModal;
