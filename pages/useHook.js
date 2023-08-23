import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import jwt from "jsonwebtoken";

export const useHook = () => {
  const router = useRouter();
  const [users, setUsers] = useState([]);
  const [ids, setIds] = useState([]);
  const [myId, setMyid] = useState("");
  const [token, setToken] = useState("");
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    setToken(token);
    setMyid(jwt.decode(token)?.id);
    if (!token) {
      router.push("/login");
    } else {
      axios
        .get("/api/users/getAll", {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
        .then((res) =>
          setUsers(
            res.data.users.map((user) => {
              return { ...user, checked: false };
            })
          )
        )
        .catch((err) => alert(err.response.data.message));
    }
  }, []);

  const handleSelect = (id) => {
    if (ids.includes(id)) {
      console.log("shit");
      let idsCopy = [...ids];
      let usersCopy = [...users];
      idsCopy = idsCopy.filter((item) => item !== id);
      usersCopy = usersCopy.map((user) => {
        if (user._id === id) {
          return { ...user, checked: false };
        } else {
          return { ...user };
        }
      });
      setUsers(usersCopy);
      setIds(idsCopy);
    } else {
      let idsCopy = [...ids];
      let usersCopy = [...users];
      idsCopy.push(id);
      usersCopy = usersCopy.map((user) => {
        if (user._id === id) {
          return { ...user, checked: true };
        } else {
          return { ...user };
        }
      });
      setUsers(usersCopy);
      setIds(idsCopy);
    }
  };

  const handleDelete = () => {
    axios
      .post(
        "/api/users/delete",
        { id: ids },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then((res) => {
        if (ids.includes(myId)) {
          router.push("/register");
        } else {
          router.reload();
        }
      });
  };

  const handleBlock = () => {
    axios
      .post(
        "/api/users/block",
        { id: ids },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then((res) => {
        if (ids.includes(myId)) {
          router.push("/login");
        } else {
          router.reload();
        }
      });
  };

  const handleUnblock = () => {
    axios
      .post(
        "/api/users/unblock",
        { id: ids },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then((res) => {
        router.reload();
      });
  };

  const handleLogout = () => {
    localStorage.clear();
    router.push("/login");
  };

  return {
    users,
    handleSelect,
    handleUnblock,
    handleDelete,
    handleBlock,
    handleLogout,
  };
};
