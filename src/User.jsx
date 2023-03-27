import React, { useEffect, useState } from "react";
import Search from "./Search";

const User = () => {
  let [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

const url = "https://api.github.com/users";

  const fetchUsers = async () => {
    try {
      const res = await fetch(url);
        const users = await res.json();
      if (
        users.message ===
        "API rate limit exceeded for 197.243.61.202. (But here's the good news: Authenticated requests get a higher rate limit. Check out the documentation for more details.)"
      ) {
        setIsError(true);
      }
      setUsers(users);
      setIsLoading(false);
    } catch (err) {
      console.log("error fetching users", err.message);
      setIsError(true);
    }
  };
  useEffect(() => {
    fetchUsers();
  }, []);

  if (isError) {
      return (
        <>
              <h2>Error occured</h2>
              <p>Check Your Connection and Try Again</p>
        </>
      );
  }

  if (isLoading) {
    return (
      <div className="loader">
        <div className="spinner"></div>
        <h2>Loading Users...</h2>
      </div>
    );
  } else {
    return (
      <>
        <h2>github Users</h2>
        <Search />

            <h2>Other Users</h2>
                   <div className="users">
          {users.map((user) => {
            return (
              <div className="user" key={user.id}>
                <div>
                  <img src={user.avatar_url} alt="" />
                </div>
                <div>
                  <li>{user.login}</li>
                  <a href={user.html_url} target="_blank">
                    Profile
                  </a>
                </div>
              </div>
            );
          })}
        </div>
        <p>&copy;Tresor 2023</p>
      </>
    );
  }
};

export default User;
