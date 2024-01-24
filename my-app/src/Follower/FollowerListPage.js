import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import "./FollowerListPage.css";

const FollowerListPage = () => {
  const { username } = useParams();
  const [followerList, setFollowerList] = useState([]);

  useEffect(() => {
    const fetchFollowers = async () => {
      try {
        const response = await axios.get(
          `https://api.github.com/users/${username}/followers`
        );
        setFollowerList(response.data);
      } catch (error) {
        console.error("Error fetching followers:", error);
      }
    };

    fetchFollowers();
  }, [username]);

  return (
    <div className="follower-list-container">
      <h2>Follower List</h2>
      <Link to={`/repos/${username}`} className="back-to-repo-list">
        Back to Repository List
      </Link>

      <ul>
        {followerList.map((follower) => (
          <li key={follower.id} className="follower-item">
            <div className="follower-box">
              <Link to={`/repos/${follower.login}`}>
                <img
                  src={follower.avatar_url}
                  alt={`${follower.login}'s avatar`}
                  className="follower-avatar"
                />
                <div className="follower-details">
                  <strong>{follower.login}</strong>
                </div>
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FollowerListPage;
