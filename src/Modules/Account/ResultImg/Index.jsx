import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom"; // Replacing BackHandler and props.history
import SimpleHeader from "../../../Components/CustomHeader/SimpleHeader/SimpleHeader";
import languages from "../../../Assets/i18n/i18n";
import storage from "../../../Factories/Storage"; // Import functional storage

function ResultImg() {
  const navigate = useNavigate();
  const { id } = useParams(); // Replacing props.match.params.id
  const [url, setUrl] = useState("");

  useEffect(() => {
    // Replacing BackHandler with browser back navigation
    const handleBack = () => {
      navigate(`/historyDetails/${id}`);
      storage.remove("ResultImg"); // Updated to functional storage
      return true;
    };
    window.addEventListener("popstate", handleBack);

    // Fetch image URL from storage
    storage.get("ResultImg", (data) => {
      setUrl(data || "");
    });

    return () => window.removeEventListener("popstate", handleBack);
  }, [navigate, id]);

  const handleBackButtonClick = () => {
    navigate(`/historyDetails/${id}`);
    storage.remove("ResultImg"); // Updated to functional storage
  };

  return (
    <div className="flex flex-col items-center justify-center bg-white h-screen">
      <SimpleHeader
        func={handleBackButtonClick}
        title="عکس تحلیل شده از نمونه"
      />
      <div className="flex items-center justify-center flex-1 w-full">
        {/* Replacing ImageZoom with a simple zoomable image using CSS */}
        <div className="w-[calc(100%-20px)] h-[calc(100vh-80px)] overflow-auto">
          <img
            className="w-full h-auto rounded-lg object-contain"
            src={url} // Removed file:// prefix as it’s not needed for web blob URLs
            alt="Analyzed Image"
            style={{ maxWidth: "100%", maxHeight: "100%", cursor: "zoom-in" }}
            onWheel={(e) => {
              e.currentTarget.style.transform = `scale(${e.deltaY > 0 ? 0.9 : 1.1})`;
            }} // Simple zoom on wheel
          />
        </div>
      </div>
    </div>
  );
}

export default ResultImg;