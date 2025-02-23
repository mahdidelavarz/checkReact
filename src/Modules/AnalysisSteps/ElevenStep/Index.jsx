import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom"; // Replacing BackHandler and props.history
import { toast } from "react-toastify"; // Replacing Toast and Alert

import LoadingRecord from "../../../Components/Analysis/LoadingRecord/LoadingRecord";
// PendingView not used in this version; remove if not needed elsewhere
import HelpHeader from "../../../Components/Analysis/HelpHeader/HelpHeader";
import CloseModal from "../../../Components/Analysis/CloseModal/CloseModal";
import FirstStepRecord from "./Components/FirstStepRecord/FirstStepRecord";
import ThreeStepRecord from "./Components/ThreeStepRecord/ThreeStepRecord";
import HelpModal from "../../../Components/Analysis/HelpModal/HelpModal";
import TwoStepRecord from "./Components/TwoStepRecord/TwoStepRecord";
import { statusHandle } from "../../../Factories/HttpHandler";
import { findMessages } from "../../../Filters/Filters";
import languages from "../../../Assets/i18n/i18n";
import storage from "../../../Factories/Storage"; // Import functional storage
import { Url } from "../../../Configs/Urls";
import Store from "../../../Store/Store";

let Token;

function ElevenStep() {
    const navigate = useNavigate();
    const videoRef = useRef(null); // Reference for video element
    const [isLoading, setIsLoading] = useState(false);
    const [isHelpModal, setIsHelpModal] = useState(false);
    const [isCloseModal, setIsCloseModal] = useState(false);
    const [isStartRecordOne, setIsStartRecordOne] = useState(false);
    const [isEndRecordOne, setIsEndRecordOne] = useState(false);
    const [isStatusPhoto, setIsStatusPhoto] = useState(false);
    const [videoBlob, setVideoBlob] = useState(null); // Store recorded video Blob
    const [stream, setStream] = useState(null); // Camera stream

    useEffect(() => {
        // Replacing BackHandler with browser back navigation
        const handleBack = () => {
            setIsCloseModal(true);
            return true;
        };
        window.addEventListener("popstate", handleBack);

        // Get token
        storage.get("Token", (token) => (Token = token));

        // Request camera access (web equivalent of permissionCamera)
        async function setupCamera() {
            try {
                const mediaStream = await navigator.mediaDevices.getUserMedia({
                    video: true,
                    audio: false, // Mute, matching original mute: true
                });
                setStream(mediaStream);
                if (videoRef.current) {
                    videoRef.current.srcObject = mediaStream;
                }
            } catch (err) {
                console.error("Camera access denied:", err);
                toast.error("دسترسی به دوربین رد شد. لطفاً مجوز را فعال کنید.");
            }
        }
        setupCamera();

        return () => {
            window.removeEventListener("popstate", handleBack);
            if (stream) {
                stream.getTracks().forEach((track) => track.stop()); // Cleanup stream
            }
        };
    }, [navigate]);

    const startRecording = async () => {
        if (!stream) {
            toast.error("دوربین آماده نیست");
            return;
        }
        setIsStartRecordOne(true);
        const mediaRecorder = new MediaRecorder(stream, { mimeType: "video/webm" });
        const chunks = [];

        mediaRecorder.ondataavailable = (e) => chunks.push(e.data);
        mediaRecorder.onstop = () => {
            const blob = new Blob(chunks, { type: "video/webm" });
            setVideoBlob(blob);
            takePicture(blob); // Simulate taking a picture from the video
        };

        mediaRecorder.start();
        setTimeout(() => {
            mediaRecorder.stop();
        }, 6000); // Match original 6-second duration
    };

    const takePicture = (videoBlob) => {
        setIsStartRecordOne(false);
        setIsLoading(true);
        setIsEndRecordOne(true);
        uploadQcImage(videoBlob); // Use video blob as a proxy for image
    };

    const uploadQcImage = async (blob) => {
        if (navigator.onLine) {
            const formData = new FormData();
            formData.append("index", JSON.stringify(2));
            formData.append("image", blob, "video.webm"); // Sending video as blob; adjust if server expects image

            try {
                const response = await fetch(`${Url.serverUrl}Analysis/qc/`, {
                    method: "POST",
                    headers: {
                        Authorization: `token ${Token}`,
                    },
                    body: formData,
                });
                statusHandle(response.status, navigate);
                const responseJson = await response.json();
                if (response.status === 200) {
                    setIsStatusPhoto(true);
                } else {
                    toast.warn("اطلاعات ارسالی تایید نشد دوباره تلاش کنید");
                    setIsStatusPhoto(false);
                    setIsEndRecordOne(false);
                }
                setIsLoading(false);
                findMessages(responseJson.detail, (message) => toast.info(message));
            } catch (err) {
                setIsLoading(false);
                setIsStatusPhoto(false);
                toast.error("خطا در ارسال اطلاعات: " + err.message);
            }
        } else {
            toast.error("عدم دسترسی به اینترنت. لطفا اتصال به اینترنت خود را چک کنید");
            setIsLoading(false);
        }
    };

    const onPressNextStep = (step) => {
        if (step === 1) {
            toast.info("ابتدا ویدیو ضبط نمایید");
        } else if (step === 2) {
            toast.info("چند لحظه صبر کنید");
        } else if (step === 3) {
            if (isStatusPhoto) {
                storage.set("VideoRecord2", URL.createObjectURL(videoBlob)); // Store blob URL
                if (stream) stream.getTracks().forEach((track) => track.stop()); // Stop camera
                navigate("/twelveStep");
            } else {
                toast.warn("اطلاعات ارسالی تایید نشد دوباره تلاش کنید");
            }
        }
    };

    let content = (
        <FirstStepRecord
            title={languages("send_two_field")}
            description={languages("send_step_10_sedcription")}
            func={startRecording}
            pageCount={11}
            footerNextFunc={() => onPressNextStep(1)}
        />
    );
    if (isStartRecordOne) {
        content = (
            <TwoStepRecord
                title="در حال ارسال"
                description="سیستم در حال ارسال اطلاعات فیلد دوم می باشد لطفا چند لحظه صبر کنید"
                func={startRecording}
                pageCount={11}
                footerNextFunc={() => onPressNextStep(2)}
            />
        );
    }
    if (isEndRecordOne) {
        content = (
            <ThreeStepRecord
                status={isStatusPhoto}
                step={2}
                footerNextFunc={() => onPressNextStep(3)}
                footerAgainFunc={() => setIsEndRecordOne(false)}
            />
        );
    }

    return (
        <div className="flex flex-col bg-white w-full h-screen relative">
            <video
                ref={videoRef}
                autoPlay
                muted
                className="flex-1 w-full h-full object-cover"
            />
            <div className="absolute top-0 w-full">
                <HelpHeader
                    closeFunc={() => setIsCloseModal(true)}
                    helpFunc={() => setIsHelpModal(true)}
                    count={11}
                />
            </div>
            <div className="flex-1 bg-white">{content}</div>
            <LoadingRecord isVisible={isLoading} />
            <CloseModal
                visible={isCloseModal}
                resumeFunc={() => setIsCloseModal(false)}
            />
            <HelpModal
                visible={isHelpModal}
                closeFunc={() => setIsHelpModal(false)}
                description={languages("help_modal_txt_step_11")}
            />
        </div>
    );
}

export default ElevenStep;