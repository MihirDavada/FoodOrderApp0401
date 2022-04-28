import React, { Fragment } from "react";
import "./Modal.css";
import  ReactDOM from "react-dom";

const Backdrop = (props) => {
  return <div className="backdrop" onClick={props.onClose} />;
};

const ModalOverlays = (props) => {
  return (
    <div className="modal">
      <div className="content">{props.children}</div>
    </div>
  );
};

const Modal = (props) => {
    const portal = document.getElementById('overlays')
  return (
    <Fragment>

      {ReactDOM.createPortal(<Backdrop onClose = {props.onClose} />, portal)}
      {ReactDOM.createPortal(
        <ModalOverlays> {props.children} </ModalOverlays>,
        portal
      )}
    </Fragment>
  );
};

export default Modal;
