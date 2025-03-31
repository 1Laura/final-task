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
    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return await response.json();
};

const postToken = async (url, data) => {
    try {
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
        if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Failed to fetch:", error);
        throw error;
    }
};

const post = async (url, data) => {
    try {
        const response = await fetch(`${API_URL}${url}`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(data)
        });
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Failed to fetch:", error);
        throw error;
    }
};

const http = {get, getToken, postToken, post};

export default http;
