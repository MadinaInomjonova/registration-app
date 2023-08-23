import Link from "next/link";
import { useHook } from "./useHook";
import { Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Login() {
  const { form, handleLogin, handleChange, msg } = useHook();
  return (
    <div className="login">
      <p className="fs-4 fw-bold mb-4 text-center">Login</p>
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
        <Form.Group className="mb-4">
          <Form.Label>Password</Form.Label>
          <Form.Control
            onChange={(e) => handleChange(e)}
            type="password"
            value={form.password}
            name="password"
            placeholder="Password"
          />
        </Form.Group>
        <Button variant="primary" onClick={handleLogin} type="submit">
          Login
        </Button>
        <Link
          href="/register"
          className="d-block mt-3 link-secondary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover"
        >
          Create an account
        </Link>
      </Form>
      <p className="text-red-400 mt-4">{msg}</p>
    </div>
  );
}
