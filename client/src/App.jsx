import React, { useEffect, useRef, useState } from "react";

function App() {
  const [users, setUsers] = useState([]);
  const [status, setStatus] = useState(null);
  const [search, setSearch] = useState("");

  async function getUsers(value) {
    try {
      let path;

      path = `http://localhost:5000/api/users/${value}`;

      const res = await fetch(path);
      const data = await res.json();
      if (res.status === 200) {
        setStatus(200);
        setUsers(data);
        console.log("Successful", data);
      } else {
        console.log("Failed", data);
        setUsers(res.status);
      }
    } catch (err) {
      console.log("Error:", err);
      setUsers(res.status);
    }
  }
  // show users
  useEffect(() => {
    getUsers("");
  }, []);

  //check users
  function checkUsers(users) {
    switch (users.length) {
      case 1:
        <p>{users.firstname}</p>;
        break;
      default:
        <p>Loading...</p>;
    }
  }

  const handlerChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    getUsers(search);
  };

  return (
    <>
      <h1>Hello</h1>
      <form onSubmit={handleSubmit}>
        <input
          onChange={handlerChange}
          type="text"
          value={search}
          required
          placeholder="search for people"
        />
        <button type="submit">Search</button>
      </form>
      {status !== 200}
      {status === 200 ? (
        users.length > 1 ? (
          users.map((user, id) => {
            return <p key={id}>{user.firstname}</p>;
          })
        ) : (
          <p>{users.firstname}</p>
        )
      ) : (
        console.log("No users")
      )}

      <button type="button" onClick={() => getUsers("")}>
        Get all users
      </button>
    </>
  );
}

export default App;
