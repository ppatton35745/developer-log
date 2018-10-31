const APIManager = {
  getAllTopics: () => {
    return fetch("http://localhost:5000/api/Topics", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${localStorage.getItem("DevLogToken")}`
      }
    }).then(resp => resp.json());
  },

  getTopicResources: topicId => {
    return fetch(`http://localhost:5000/api/Resources?topicId=${topicId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${localStorage.getItem("DevLogToken")}`
      }
    }).then(resp => resp.json());
  }
};

module.exports = APIManager;
