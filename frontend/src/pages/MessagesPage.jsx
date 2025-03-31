import React, {useEffect, useRef, useState} from 'react';
import http from "../plugins/https";

const MessagesPage = () => {
    const [messages, setMessages] = useState([]);
    const replayRefs = useRef({}); // Saugo inputus pagal messageId

    const fetchMessages = async () => {
        const response = await http.getToken("/getmessages");
        if (response.success) {
            setMessages(response.messages);
        }
    };

    useEffect(() => {
        fetchMessages();
    }, []);

    async function deleteMessage(messageId) {
        console.log("Deleting message with ID:", messageId);
        const response = await http.deleteToken("/deletemessage/" + messageId, {messageId});
        console.log(response);
        if (response.success) {
            await fetchMessages(); // Atnaujinam sąrašą po ištrynimo
            alert("Message deleted!");
        } else {
            alert("Failed to delete message.");
        }
    }

    async function replayMessageSend(messageId) {
        const input = replayRefs.current[messageId];
        const messageText = input?.value.trim();

        if (!messageText) return;

        const senderUsername = messages.find(msg => msg._id === messageId)?.sender?.username;
        if (!senderUsername) {
            alert("User not found.");
            return;
        }

        const response = await http.postToken("/createmessage", {
            receiverUsername: senderUsername,
            text: messageText
        });

        if (response.success) {
            input.value = "";
            alert("Reply sent!");
            await fetchMessages();
        } else {
            alert("Failed to send reply.");
        }
    }

    return (
        <div className="container pt-5">
            <h3>Your Messages</h3>
            {messages.length === 0 ? (
                <p>No messages yet.</p>
            ) : (
                <div className="">
                    {messages.map(msg => (
                        <div className="d-flex border rounded p-3 gap-4 mb-4" key={msg._id}>
                            <div className="flex-grow-1">
                                <p>Message from: <b>{msg.sender?.username || "[deleted user]"}</b></p>
                                <p className="blockquote">"{msg.text}"</p>
                                <small>{new Date(msg.time).toLocaleString("lt-LT")}</small>
                            </div>
                            <div className="flex-grow-1 justify-content-center me-5">
                                <input type="text" placeholder="Enter your message" className="w-100 p-1 mb-2" ref={el => replayRefs.current[msg._id] = el}/>
                                <div className="d-flex justify-content-center">
                                    <button className="btn btn-secondary w-50 border-dark" onClick={() => replayMessageSend(msg._id)}>Replay</button>
                                </div>
                            </div>
                            <div className="">
                                <button onClick={() => deleteMessage(msg._id)} className="btn btn-danger w-100 border-dark mb-4">Delete message</button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MessagesPage;