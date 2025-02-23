import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Replacing props.route.history
import { toast } from "react-toastify"; // Replacing Toast

import AnonymousUser from "./Components/AnonymousUser/AnonymousUser";
import FamiliarUser from "./Components/FamiliarUser/FamiliarUser";
import { statusHandle } from "../../../Factories/HttpHandler";
import Loading from "../../../Components/Loading/Loading";
import { findMessages } from "../../../Filters/Filters";
import storage from "../../../Factories/Storage";
import Header from "./Components/Header/Header";
import { Url } from "../../../Configs/Urls";

function Profile() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [token, setToken] = useState("");
    const [email, setEmail] = useState("");

    useEffect(() => {
        setIsLoading(true);
        storage.get("Token", (token) => {
            setToken(token);
            getData(token);
        });
    }, []);

    const getData = (token) => {
        storage.get("Profile", (data) => {
            const res = data ? JSON.parse(data) : null;
            if (res) {
                setEmail(res.email || "");
                setIsLoading(false);
                console.log("full");
            } else {
                getDataFromServer(token);
                console.log("empty");
            }
        });
    };

    const getDataFromServer = async (token) => {
        try {
            const response = await fetch(`${Url.serverUrl}Auth/profile/`, {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: `token ${token}`,
                },
            });

            statusHandle(response.status, navigate); 
            const responseJson = await response.json();

            if (responseJson.detail === "err_user_anonymous") {
                findMessages(responseJson.detail, (message) => {
                    toast.info(message); // Replacing Toast.show
                });
            } else {
                storage.set("Profile", JSON.stringify(responseJson)); 
                setEmail(responseJson.email || "");
            }

            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
            toast.error(`${error.message}`); // Replacing Toast.show
        }
    };

    if (!isLoading) {
        return (
            <div className="flex flex-col h-screen bg-white">
                {/* StatusBar not needed in web */}
                <div className="flex-2">
                    <Header userName={email} />
                </div>
                <div className="flex-8">
                    {!email ? (
                        <AnonymousUser param={{ navigate }} />
                    ) : (
                        <FamiliarUser param={{ navigate }} />
                    )}
                </div>
            </div>
        );
    } else {
        return <Loading />;
    }
}

export default Profile;