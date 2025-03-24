const API_URL = "http://localhost:2002"; // API bazinis adresas

const get = async (url) => {
    const response = await fetch(`${API_URL}${url}`, {
        method: "GET",
        headers: {"Content-Type": "application/json"}
    });

    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return await response.json();
};

const getToken = async (url) => {
    const token = localStorage.getItem("token");

    if (!token) {
        console.error("No authentication token found");
        return {error: "Unauthorized - No Token"};
    }

    const response = await fetch(`${API_URL}${url}`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
        }
    });
    return await response.json();
};

const postToken = async (url, data) => {
    const token = localStorage.getItem("token");

    if (!token) {
        console.error("No authentication token found");
        return {error: "Unauthorized - No Token"};
    }

    const response = await fetch(`${API_URL}${url}`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });
    return await response.json();
};

const post = async (url, data) => {
    const response = await fetch(`${API_URL}${url}`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(data)
    });
    return await response.json();
};

const http = { get, getToken, postToken, post };

export default http;
