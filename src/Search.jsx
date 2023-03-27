import React, { useEffect, useState } from "react";

const Search = () => {

    let [userName, setUserName] = useState(null)
    let [thisUser, setThisUser] = useState({})
    let [userFound, setUserFound] = useState("")
    let [isError, setIsError] = useState(false)

    const searchUser = async (username) => {
        
        try {
            const res = await fetch(`https://api.github.com/users/${username}`)
            const data = await res.json()
            console.log(data);
            if (data.message != "Not Found") {
                setThisUser(data)
                setUserFound(true)
            } else {
                setUserFound(false)
            }   
            setIsError(true)
        } catch (err) {
            console.log('error getting user:', err.message);
        }
    }

    const trackUsername = async (e) => {
        let username = e.target.value
        setUserName(username)
    }

  return (
    <div className="search">
      <h4>Search For a Specific User</h4>
      <input
        type="text"
        placeholder="Search"
        onChange={(e) => trackUsername(e)}
      />
      <button onClick={() => searchUser(userName)}>Search</button>

          <div className="user">
        {userFound && (
          <div>
                      <img src={thisUser.avatar_url} alt="" />
                      <h2>{ thisUser.name}</h2>
                      <h4>username: {thisUser.login}</h4>
                      <p>Bio: { thisUser.bio}</p>
                      <a href={thisUser.html_url} target="_blank">Profile</a>
                      <p>Joined {new Date(thisUser.created_at).toLocaleDateString() }</p>
            <p>Followers: {thisUser.followers}</p>
            <p>Following: {thisUser.following}</p>
            <p>Public Repos: {thisUser.public_repos}</p>
          </div>
                  )}
              
              {userFound === false && (
                  <h3>No user found</h3>
              )}
      </div>
    </div>
  );
};

export default Search;
