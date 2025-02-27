import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserQRCodeReader } from "@zxing/browser"; // Replacing QRCodeScanner and RNCamera

import SimpleHeader from "../../Components/CustomHeader/SimpleHeader/SimpleHeader";
import LoadingModal from "../../Components/CustomModal/LoadingModal/LoadingModal";
import autoBack from "../../Components/Images/auth_back.jpg"; // Added per your instruction
import autoBackRtl from "../../Components/Images/auth_back_rtl.jpg";
import CustomText from "../../Components/CustomText/CustomText";

function QRCodeScan() {
  const navigate = useNavigate();
  const [isAccess, setIsAccess] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [back, setBack] = useState(autoBackRtl); // Default to RTL image
  const videoRef = useRef(null); // Ref for video element
  const codeReader = useRef(new BrowserQRCodeReader()); // ZXing QR code reader instance

  useEffect(() => {
    // Check document direction to set background image
    if (document.dir !== "rtl") {
      setBack(autoBack);
    }

    // Replacing BackHandler with browser back navigation
    const handleBack = () => {
      navigate("/addGadget");
      return true;
    };
    window.addEventListener("popstate", handleBack);

    // Request camera permission and start scanning
    requestCameraPermission();

    // Cleanup on unmount
    return () => {
      window.removeEventListener("popstate", handleBack);
      if (codeReader.current) {
        codeReader.current.reset(); // Stop scanning and release camera
      }
    };
  }, [navigate]);

  const requestCameraPermission = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } });
      setIsAccess(true);
      setIsLoading(false);
      videoRef.current.srcObject = stream; // Attach stream to video element
      startScanning(stream); // Start QR scanning
    } catch (err) {
      console.error("Camera permission error:", err);
      toast.error("Camera access denied. Please allow camera permissions.");
      setIsAccess(false);
      setIsLoading(false);
      navigate("/addGadget"); // Redirect if permission denied
    }
  };

  const startScanning = (stream) => {
    if (videoRef.current) {
      // Decode QR code from video stream
      codeReader.current.decodeFromVideoDevice(
        null, // Use default device (rear camera prioritized)
        videoRef.current,
        (result, error) => {
          if (result) {
            navigate(`/attachGadget/${result.getText()}`); // Navigate on successful scan
            codeReader.current.reset(); // Stop scanning after success
          }
          if (error && error.name !== "NotFoundException") {
            // Ignore "NotFoundException" (no QR code in frame), handle other errors
            console.error("QR scan error:", error);
            toast.error("Failed to scan QR code: " + error.message);
          }
        }
      );
    }
  };

  const handleBackButtonClick = () => {
    navigate("/addGadget");
  };

  return (
    <div
      className="min-h-screen flex flex-col bg-cover bg-center"
      style={{ backgroundImage: `url(${back})` }}
    >
      <SimpleHeader func={handleBackButtonClick} title="اسکن QR Code" />
      {isLoading ? (
        <LoadingModal isVisible={true} />
      ) : isAccess ? (
        <div className="flex-1 relative">
          <video
            ref={videoRef}
            autoPlay
            playsInline // Prevents fullscreen on mobile
            className="w-full h-full object-cover"
          />
          <Marker /> {/* Custom marker overlay */}
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center">
          <CustomText className="text-white text-center text-lg">
            Camera permission denied. Please allow access to scan QR codes.
          </CustomText>
        </div>
      )}
    </div>
  );
}

function Marker() {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-transparent pointer-events-none">
      <div className="h-36 w-[85%] border-2 border-green-600 bg-transparent rounded-lg flex justify-center items-center">
        <div className="w-[85%] h-[0.15rem] bg-violet-600 animate-slide-down" />
      </div>
    </div>
  );
}

export default QRCodeScan;