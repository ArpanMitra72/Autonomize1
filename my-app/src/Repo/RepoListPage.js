import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import "./RepoListPage.css";

const RepoListPage = () => {
  const { username } = useParams();
  //   const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState(null);
  const [repoList, setRepoList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch user information
        const userResponse = await axios.get(
          `https://api.github.com/users/${username}`
        );
        setUserInfo(userResponse.data);

        // Fetch repositories
        const repoResponse = await axios.get(
          `https://api.github.com/users/${username}/repos`
        );
        setRepoList(repoResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [username]);

  return (
    <div>
      {userInfo && (
        <div id="user-info">
          <h2>User Info</h2>
          <div className="user-info">
            <img
              id="user-avatar"
              src={userInfo.avatar_url}
              alt={`${userInfo.login}'s avatar`}
            />
            <div className="user-other-info">
              <p>Name: {userInfo.name}</p>
              <p>Bio: {userInfo.bio || "No bio available"}</p>
              <p>Followers: {userInfo.followers}</p>
              <p>Public Repositories: {userInfo.public_repos}</p>
              <p>Company: {userInfo.company || "Not specified"}</p>
              <p>Location: {userInfo.location || "Not specified"}</p>
              <p>Website: {userInfo.blog || "Not specified"}</p>
            </div>
          </div>
        </div>
      )}

      <Link to={`/repos/${username}/followers`} id="view-followers">
        View Followers
      </Link>

      {repoList.length > 0 && (
        <div className="repo-container">
          {repoList.map((repo) => (
            <div className="repo-item" key={repo.id}>
              <img
                className="repo-avatar"
                src={repo.owner.avatar_url}
                alt={`${repo.owner.login}'s avatar`}
              />
              <div>
                <p className="repo-name">
                  <Link to={`/repos/${username}/${repo.name}`}>
                    {repo.name}
                  </Link>
                </p>
                <p className="repo-description">
                  {repo.description || "No description available"}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RepoListPage;
