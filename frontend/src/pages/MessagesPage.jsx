import React, {useEffect, useState} from 'react';
import http from "../plugins/https";

const MessagesPage = () => {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const fetchMessages = async () => {
            const response = await http.getToken("/getmessages");
            if (response.success) {
                setMessages(response.messages);
            }
        };

        fetchMessages();
    }, []);

    return (
        <div className="container pt-5">
            <h3>Your Messages</h3>
            {messages.length === 0 ? (
                <p>No messages yet.</p>
            ) : (
                <div className="d-flex flex-column gap-3">
                    {messages.map(msg => (
                        <div key={msg._id} className="border rounded p-3">
                            <p><b>From:</b> {msg.sender?.username || "[deleted user]"}</p>
                            <p>{msg.text}</p>
                            <small>{new Date(msg.time).toLocaleString("lt-LT")}</small>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MessagesPage;