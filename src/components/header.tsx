import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { changeMode } from "../redux/app/app.slide";

function Header() {
  const { mode } = useAppSelector((state) => state.app);
  const dispatch = useAppDispatch();
  useEffect(() => {
    const body = document.querySelector("body");
    if (body) body.setAttribute("data-bs-theme", mode);
  }, [mode]);
  return (
    <Navbar className="bg-body-tertiary" data-bs-theme={mode}>
      <Container>
        <Navbar.Brand href="#home">Navbar with text</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Form.Check
            type="switch"
            value={mode}
            onChange={() => {
              dispatch(changeMode());
            }}
            id="custom-switch"
            label={
              mode === "light" ? (
                <Navbar.Text>Light mode</Navbar.Text>
              ) : (
                <Navbar.Text>Dark mode</Navbar.Text>
              )
            }
          />
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
