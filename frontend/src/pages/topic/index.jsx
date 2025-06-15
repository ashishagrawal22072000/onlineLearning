import React, { useEffect, useState } from "react";
import { topic } from "../../api/blog";
import Header from "../../components/header";
import Toast from "../../components/toast";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { user } from "../../api/user";

const Index = () => {
  const [data, setData] = useState(null);
  const [statusMap, setStatusMap] = useState({});

  const getTopicsAndProgress = async () => {
    try {
      const [topicRes, progressRes] = await Promise.all([
        topic.getTopics(),
        user.getProgress(),
      ]);

      if (topicRes?.success && progressRes?.success) {
        const topics = topicRes.data;
        const progress = progressRes.data?.[0]?.progress || [];
        const completedSet = new Set();
        progress.forEach((p) => {
          p.completedSubtopics.forEach((sid) =>
            completedSet.add(`${p.topicId}-${sid}`)
          );
        });

        const map = {};
        topics.forEach((t) => {
          t.subtopics.forEach((s) => {
            const key = `${t._id}-${s._id}`;
            map[key] = completedSet.has(key);
          });
        });

        setData(topics);
        setStatusMap(map);
      }
    } catch (err) {
      Toast(err?.message || "Something went wrong", "error");
    }
  };

  useEffect(() => {
    getTopicsAndProgress();
  }, []);

  const handleStatusChange = async (topicId, subtopicId, checked) => {
    const res = await user.updateStatus({ topicId, subtopicId, checked });
    if (res?.success) {
      const key = `${topicId}-${subtopicId}`;
      setStatusMap((prev) => ({
        ...prev,
        [key]: checked,
      }));
    } else {
      Toast(res?.message || "Failed to update status", "error");
    }
  };

  if (!data) {
    return (
      <>
        <Header />
        <div className="container text-center my-5">
          <h5>Topic not found</h5>
        </div>
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="container my-5">
        <h2 className="mb-4">Topics</h2>
        <div className="accordion" id="topicAccordion">
          {data.map((topic, index) => (
            <div className="accordion-item" key={topic._id}>
              <h2 className="accordion-header" id={`heading${index}`}>
                <button
                  className={`accordion-button ${
                    index !== 0 ? "collapsed" : ""
                  }`}
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target={`#collapse${index}`}
                  aria-expanded={index === 0 ? "true" : "false"}
                  aria-controls={`collapse${index}`}
                >
                  {topic.name}
                </button>
              </h2>
              <div
                id={`collapse${index}`}
                className={`accordion-collapse collapse ${
                  index === 0 ? "show" : ""
                }`}
                aria-labelledby={`heading${index}`}
                data-bs-parent="#topicAccordion"
              >
                <div className="accordion-body">
                  <div className="table-responsive">
                    <table className="table table-bordered align-middle">
                      <thead className="table-light">
                        <tr>
                          <th>Name</th>
                          <th>LeetCode</th>
                          <th>YouTube</th>
                          <th>Article</th>
                          <th>Level</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {topic.subtopics.map((sub) => {
                          const key = `${topic._id}-${sub._id}`;
                          const checked = statusMap[key] || false;

                          return (
                            <tr key={sub._id}>
                              <td>
                                <div className="form-check d-flex align-items-center gap-2">
                                  <input
                                    type="checkbox"
                                    className="form-check-input"
                                    name={`status-${sub._id}`}
                                    id={`status-${sub._id}`}
                                    checked={checked}
                                    onChange={(e) =>
                                      handleStatusChange(
                                        topic._id,
                                        sub._id,
                                        e.target.checked
                                      )
                                    }
                                  />
                                  <label
                                    className="form-check-label"
                                    htmlFor={`status-${sub._id}`}
                                  >
                                    {sub.name}
                                  </label>
                                </div>
                              </td>
                              <td>
                                <a
                                  href={sub.leetcodeLink}
                                  target="_blank"
                                  rel="noreferrer"
                                >
                                  LeetCode
                                </a>
                              </td>
                              <td>
                                <a
                                  href={sub.youtubeLink}
                                  target="_blank"
                                  rel="noreferrer"
                                >
                                  YouTube
                                </a>
                              </td>
                              <td>
                                <a
                                  href={sub.articleLink}
                                  target="_blank"
                                  rel="noreferrer"
                                >
                                  Article
                                </a>
                              </td>
                              <td>
                                <span className="badge bg-secondary text-capitalize">
                                  {sub.level}
                                </span>
                              </td>
                              <td>
                                <span
                                  className={`badge ${
                                    checked
                                      ? "bg-success"
                                      : "bg-warning text-dark"
                                  }`}
                                >
                                  {checked ? "Done" : "Pending"}
                                </span>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Index;
