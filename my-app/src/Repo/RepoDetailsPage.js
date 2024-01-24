import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./RepoDetailsPage.css";

const RepoDetailsPage = () => {
  const { username, repoName } = useParams();
  const [repoDetails, setRepoDetails] = useState(null);

  useEffect(() => {
    const fetchRepoDetails = async () => {
      try {
        const response = await axios.get(
          `https://api.github.com/repos/${username}/${repoName}`
        );
        setRepoDetails(response.data);
      } catch (error) {
        console.error("Error fetching repository details:", error);
      }
    };

    fetchRepoDetails();
  }, [username, repoName]);

  return (
    <div className="repo-details-container">
      {repoDetails && (
        <>
          <div className="user-info">
            <img
              className="repo-avatar"
              src={repoDetails.owner.avatar_url}
              alt={`${repoDetails.owner.login}'s avatar`}
            />
            <div>
              <div className="repo-info">
                <h2 className="repo-name">{repoDetails.name}</h2>
                <p className="repo-description">
                  {repoDetails.description || "No description available"}
                </p>
                <div className="repo-meta">
                  <span className="repo-meta-item">
                    Language: {repoDetails.language || "N/A"}
                  </span>
                  <span className="repo-meta-item">
                    Stars: {repoDetails.stargazers_count}
                  </span>
                  <span className="repo-meta-item">
                    Watchers: {repoDetails.watchers_count}
                  </span>
                  <span className="repo-meta-item">
                    Created At:{" "}
                    {new Date(repoDetails.created_at).toLocaleString()}
                  </span>
                  <span className="repo-meta-item">
                    Updated At:{" "}
                    {new Date(repoDetails.updated_at).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default RepoDetailsPage;
