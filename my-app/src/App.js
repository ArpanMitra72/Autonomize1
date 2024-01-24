// App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SearchPage from "./Search/SearchPage";
import RepoListPage from "./Repo/RepoListPage";
import RepoDetailsPage from "./Repo/RepoDetailsPage";
import FollowerListPage from "./Follower/FollowerListPage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SearchPage />} />
        <Route path="/repos/:username" element={<RepoListPage />} />
        <Route
          path="/repos/:username/followers"
          element={<FollowerListPage />}
        />
        <Route
          path="/repos/:username/:repoName"
          element={<RepoDetailsPage />}
        />
      </Routes>
    </Router>
  );
};

export default App;
