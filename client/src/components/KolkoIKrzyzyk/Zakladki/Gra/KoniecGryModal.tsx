import React from "react";
import { Button, Modal } from "react-bootstrap";

interface IKoniecGryModalProps {
  tytul: string;
  onZagrajPonownie: () => void;
  onWyjdz: () => void;
}

const KoniecGryModal: React.FC<IKoniecGryModalProps> = ({ tytul, onZagrajPonownie, onWyjdz }) => {
  const czyPokazac = tytul ? true : false;

  return (
    <Modal show={czyPokazac} backdrop="static" keyboard={false}>
      <Modal.Header>
        <Modal.Title>{tytul}</Modal.Title>
      </Modal.Header>
      <Modal.Footer>
        <Button variant="primary" onClick={onZagrajPonownie}>
          Zagraj jeszcze raz
        </Button>
        <Button variant="primary" onClick={onWyjdz}>
          Wyjdź
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default KoniecGryModal;
