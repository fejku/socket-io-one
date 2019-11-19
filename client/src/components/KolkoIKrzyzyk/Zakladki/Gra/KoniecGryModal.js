import React from 'react';
import { Button, Modal } from 'react-bootstrap';

const KoniecGryModal = ({ title, onZagrajPonownie, onWyjdz }) => {
  const czyPokazac = title ? true : false;

  return (
    <Modal show={czyPokazac} backdrop="static" keyboard={false}>
      <Modal.Header>
        <Modal.Title>{title}</Modal.Title>
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
  )
}

export default KoniecGryModal;