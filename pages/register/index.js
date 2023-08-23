import Link from "next/link";
import { useHook } from "./useHook";
import { Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Register() {
  const { form, handleRegister, handleChange, msg } = useHook();
  return (
    <div className="register">
      <p className="fs-4 fw-bold mb-4 text-center">Register</p>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Username</Form.Label>
          <Form.Control
            onChange={(e) => handleChange(e)}
            type="text"
            value={form.username}
            name="username"
            placeholder="Enter username"
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            onChange={(e) => handleChange(e)}
            type="password"
            value={form.password}
            name="password"
            placeholder="Password"
          />
        </Form.Group>
        <Form.Group className="mb-4">
          <Form.Label>Confirm password</Form.Label>
          <Form.Control
            onChange={(e) => handleChange(e)}
            type="password"
            value={form.password2}
            name="password2"
            placeholder="Confirm password"
          />
        </Form.Group>
        <Button variant="primary" onClick={handleRegister} type="submit">
          Register
        </Button>
        <Link
          href="/login"
          className="d-block mt-3 link-secondary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover"
        >
          Login
        </Link>
      </Form>
      <p className="text-red-400 mt-4">{msg}</p>
    </div>
  );
}
