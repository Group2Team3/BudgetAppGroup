import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import { Modal, Col, Row } from "react-bootstrap";
import { Button } from "@mui/material";
import "../Style/Modal.css";
import cookie from "../assets/budgetImages/cookie.png";

function ModalCookies() {
  const [cookies, setCookie] = useCookies(["allowcookies"]);

  function handleCookie() {
    setCookie("allowcookies", true, {
      path: "/",
      expires: new Date(Date.now() + 100 * 24 * 60 * 60 * 1000),
    });
  }

  function closeModal() {
    handleCookie();
  }

  return (
    <Modal
      show={cookies.allowcookies ? false : true}
      onHide={closeModal}
      className="custom-modal"
    >
      <Modal.Header closeButton></Modal.Header>
      <Modal.Body>
        <Row>
          <Col className="col-sm-12 col-md-3 text-center col-cookies d-flex">
            <img
              src={cookie}
              alt="Piggy photo"
              className="img-fluid img-custom"
            />
          </Col>

          <Col className="col-sm-12 col-md-6 text-center d-flex justify-content-center align-items-center">
            <p>
              Nasza strona korzysta z ciasteczek. Wyraź zgodę na wykorzystywanie
              ciasteczek by dalej korzystać z witryny. By dowiedzieć w jakim
              celu wykorzystywane są ciasteczka odwiedź
              <Link to="/policy" className="link-2">
                &nbsp; Politykę Prywatności
              </Link>
              &nbsp;lub&nbsp;
              <Link to="/terms" className="link-2">
                Zasady i warunki&nbsp;
              </Link>
              korzystania ze strony
            </p>
          </Col>

          <Col className="col-sm-12 col-md-3 text-center d-flex justify-content-center align-items-center">
            <Button className="some-btn" onClick={closeModal}>
              ZAAKCEPTUJ
            </Button>
          </Col>
        </Row>
      </Modal.Body>
    </Modal>
  );
}

export default ModalCookies;
