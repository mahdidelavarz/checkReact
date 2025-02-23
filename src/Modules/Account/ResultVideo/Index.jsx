import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom"; // Replacing BackHandler and props.history
import { toast } from "react-toastify"; // For error messages

import SimpleHeader from "../../../Components/CustomHeader/SimpleHeader/SimpleHeader";
import Loading from "../../../Components/Loading/Loading";
import languages from "../../../assets/i18n/i18n";
import storage from "../../../Factories/Storage"; // Import functional storage
import { Url } from "../../../Configs/Urls";

function ResultVideo() {
    const navigate = useNavigate();
    const { id } = useParams(); // Replacing props.match.params.id
    const [uri, setUri] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        // Replacing BackHandler with browser back navigation
        const handleBack = () => {
            navigate(`/historyDetails/${id}`);
            return true;
        };
        window.addEventListener("popstate", handleBack);

        // Fetch video URL
        setIsLoading(true);
        storage.get("Token", (token) => {
            getResultVideo(token);
        });

        return () => window.removeEventListener("popstate", handleBack);
    }, [navigate, id]);

    const getResultVideo = async (token) => {
        try {
            // Replacing RNFetchBlob with fetch for web
            const response = await fetch(`${Url.serverUrl}Analysis/results/video/?analysis_id=${id}`, {
                method: "GET",
                headers: {
                    Accept: "video/mp4", // Assuming MP4; adjust if different
                    Authorization: `token ${token}`,
                },
            });
            if (!response.ok) throw new Error("Failed to fetch video");
            const blob = await response.blob();
            const videoUrl = URL.createObjectURL(blob); // Create a URL for the video blob
            setUri(videoUrl);
            setIsLoading(false);
        } catch (error) {
            console.error("Error fetching video:", error);
            toast.error("Failed to load result video");
            setIsLoading(false);
        }
    };

    const handleBackButtonClick = () => {
        navigate(`/historyDetails/${id}`);
    };

    return (
        <div className="flex flex-col h-screen">
            <SimpleHeader
                func={handleBackButtonClick}
                title="ویدیو تحلیل شده از نمونه"
            />
            {!isLoading ? (
                <div className="flex items-center justify-center flex-1">
                    <video
                        src={uri}
                        controls // Adds play/pause, volume, etc.
                        autoPlay
                        loop // Replacing repeat={true}
                        muted // Replacing volume={0.0}
                        className="w-full h-full object-fill" // Replacing resizeMode="stretch"
                    />
                </div>
            ) : (
                <Loading />
            )}
        </div>
    );
}

export default ResultVideo;