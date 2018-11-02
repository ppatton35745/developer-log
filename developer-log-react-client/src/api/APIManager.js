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

  getAllResourceTypes: () => {
    return fetch("http://localhost:5000/api/ResourceTypes", {
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
  },

  getResourceTypeResources: resourceTypeId => {
    return fetch(
      `http://localhost:5000/api/Resources?resourceTypeId=${resourceTypeId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${localStorage.getItem("DevLogToken")}`
        }
      }
    ).then(resp => resp.json());
  },

  getResourceDetails: resourceId => {
    return fetch(`http://localhost:5000/api/Resources/${resourceId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${localStorage.getItem("DevLogToken")}`
      }
    }).then(resp => resp.json());
  },

  createNewTopic: topic => {
    console.log(topic);
    return fetch(`http://localhost:5000/api/Topics`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${localStorage.getItem("DevLogToken")}`
      },
      body: JSON.stringify(topic)
    }).then(resp => resp.json());
  },

  createNewResource: resource => {
    return fetch(`http://localhost:5000/api/Resources`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${localStorage.getItem("DevLogToken")}`
      },
      body: JSON.stringify(resource)
    }).then(resp => resp.json());
  },

  updateResource: resource => {
    return fetch(
      `http://localhost:5000/api/Resources/${resource["resourceId"]}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${localStorage.getItem("DevLogToken")}`
        },
        body: JSON.stringify(resource)
      }
    );
  },

  updateTopic: topic => {
    return fetch(`http://localhost:5000/api/Topics/${topic["topicId"]}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${localStorage.getItem("DevLogToken")}`
      },
      body: JSON.stringify(topic)
    });
  },

  deleteTopic: topicId => {
    return fetch(`http://localhost:5000/api/Topics/${topicId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${localStorage.getItem("DevLogToken")}`
      }
    });
  },

  deleteResource: resourceId => {
    return fetch(`http://localhost:5000/api/Resources/${resourceId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${localStorage.getItem("DevLogToken")}`
      }
    });
  }
};

module.exports = APIManager;
