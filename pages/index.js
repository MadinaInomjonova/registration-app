import { Button, Container, Navbar } from "react-bootstrap";
import { useHook } from "./useHook";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faUnlock } from "@fortawesome/free-solid-svg-icons";

export default function Home() {
  const {
    users,
    handleSelect,
    handleBlock,
    handleDelete,
    handleUnblock,
    handleLogout,
  } = useHook();

  return (
    <div>
      <Navbar
        expand="lg"
        className="mb-5 py-3 px-4 bg-body-tertiary justify-content-between fixed-top"
      >
        <Container>
          <Navbar.Brand className="fw-bold">List of All Users</Navbar.Brand>
          <Button variant="outline-secondary" onClick={handleLogout}>
            Logout
          </Button>
        </Container>
      </Navbar>
      <Container>
        <div className="d-flex justify-content-end align-items-center gap-4 mb-4 icons">
          <FontAwesomeIcon
            className="trash"
            icon={faTrash}
            onClick={handleDelete}
          />
          <FontAwesomeIcon
            className="unlock"
            icon={faUnlock}
            onClick={handleUnblock}
          />
          <Button variant="outline-secondary" onClick={handleBlock}>
            Block
          </Button>
        </div>
        <div className="table-responsive">
          <table className="table table-hover">
            <thead className="px-4 table-light">
              <tr>
                <th>
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id="flexCheckDefault"
                  />
                </th>
                <th>ID</th>
                <th>Username</th>
                <th>Registration Date</th>
                <th>Last Login Date</th>
                <th>Active</th>
              </tr>
            </thead>

            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td>
                    <input
                      onClick={() => handleSelect(user._id)}
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id="flexCheckDefault"
                    />
                  </td>
                  <td>{user._id}</td>
                  <td>{user.username}</td>
                  <td>{user.registerDate}</td>
                  <td>{user.lastLoginDate}</td>
                  <td>{String(user.isActive)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Container>
    </div>
  );
}

export const getStaticPropsi = async () => {
  const res = await fetch("https://api.github.com/repos/vercel/next.js");
  const repo = await res.json();
  return { props: { repo } };
};
