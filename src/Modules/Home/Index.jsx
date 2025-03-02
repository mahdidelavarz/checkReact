import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Replacing route.history
import { toast } from "react-toastify"; // Replacing Toast

import LoadingModal from "../../Components/CustomModal/LoadingModal/LoadingModal";
import SimpleModal from "../../Components/CustomModal/SimpleModal/SimpleModal";
import { findStates, findMessages } from "../../Filters/Filters";
import { statusHandle } from "../../Factories/HttpHandler";
import BoxButton from "./Components/BoxButton/BoxButton";
import Slider from "./Components/Slider/Slider";
import Banner from "./Components/Banner/Banner";
import storage from "../../Factories/Storage"; // Import functional storage
import language from "../../assets/i18n/i18n";
import { Url } from "../../Configs/Urls";

let Token;

const isOnline = () => navigator.onLine;

function Home() {
  const navigate = useNavigate();
  const [isResultReadyModal, setIsResultReadyModal] = useState(false);
  const [descriptionModal, setDescriptionModal] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Fetch token
    storage.get("Token", (data) => (Token = data));

    // Check network status
    if (!isOnline()) {
      alertNetwork();
    }
    getDeviceModels();
  }, [navigate]);

  const getDeviceModels = () => {
    storage.get("DeviceModel", async (data) => {
      const models = data ? JSON.parse(data) : null;
      if (!models) {
        setIsLoading(true);
        try {
          const response = await fetch(
            "https://daddycheck.s3.ir-thr-at1.arvanstorage.com/devicemodels.json"
          );
          const responseJson = await response.json();
          storage.set("DeviceModel", JSON.stringify(responseJson));
          setIsLoading(false);
        } catch (error) {
          toast.error("Failed to fetch device models. Retrying...");
          getDeviceModels(); // Retry on failure
          setIsLoading(false);
        }
      }
    });
  };

  const alertNetwork = () => {
    toast.error("عدم دسترسی به اینترنت\nلطفا اتصال به اینترنت را چک کنید.");
  };

  const onPressGoToAnalysisScreen = () => {
    if (isOnline()) {
      checkAnalysisState();
    } else {
      alertNetwork();
    }
  };

  const checkAnalysisState = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${Url.serverUrl}Analysis/state/`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `token ${Token}`,
        },
      });
      statusHandle(response.status, navigate); // Updated to use navigate
      const responseJson = await response.json();
      setIsLoading(false);
      findStates(responseJson.state, (data) => {
        if (data.is_new_analysis_permitted) {
          navigate("/firstStep");
        } else if (data.code === "waiting_for_qc1") {
          navigate("/tenStep");
        } else if (data.code === "waiting_for_qc2") {
          navigate("/elevenStep");
        } else if (data.code === "waiting_for_qc3") {
          navigate("/twelveStep");
        } else if (data.code === "waiting_for_vids") {
          navigate("/processing");
        } else if (
          data.code === "results_ready" ||
          data.code === "waiting_for_results"
        ) {
          findMessages(data.message, (message) => {
            setDescriptionModal(message);
            setIsResultReadyModal(true);
          });
        }
      });
    } catch (error) {
      setIsLoading(false);
      toast.error("Failed to check analysis state. Please try again.");
    }
  };

  const onPressGoToHistoryScreen = () => {
    setIsResultReadyModal(false);
    navigate("/history");
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <header
        className="flex items-center justify-center border-b border-gray-300 py-4 bg-green-600"
      >
        <img
          className="w-48 h-12 object-contain"
          src="/Images/logo.png"
          alt="Logo"
        />
      </header>

      <main className="flex-1 p-5 flex flex-col items-center">
        <div className="w-full max-w-4xl mb-5">
          <Slider />
        </div>

        <div className="grid grid-cols-2 gap-4 w-full max-w-4xl">
          <BoxButton
            func={onPressGoToAnalysisScreen}
            title={language("online_sperm_analyze")}
            img="/Images/sperm_analysis.png"
          />
          <BoxButton
            func={() => navigate("/categories")}
            title={language("centers_search")}
            img="/Images/specia_list.png"
          />
          <BoxButton
            func={() => navigate("/videoTraining")}
            title={language("video_training")}
            img="/Images/videoSuccess.png"
          />
          <BoxButton
            func={() => navigate("/textTraining")}
            title={language("text_training")}
            img="/Images/text_education.png"
          />
          <BoxButton
            func={onPressGoToHistoryScreen}
            title={language("history")}
            img="/Images/analytsis_history.png"
          />
          <BoxButton
            func={() =>
              toast.warn(
                "این صفحه فعلا آماده نیست\nبرای جزئیات بیشتر با پشتیبانی تماس بگیرید"
              )
            }
            title={language("training_of_medical_staff")}
            img="/Images/health_education.png"
          />
        </div>
      </main>

      <footer className="py-5 flex items-center justify-center">
        <Banner />
      </footer>

      <SimpleModal
        isVisible={isResultReadyModal}
        img="/Images/ic_analysis"
        title="آنالیز"
        isReady={true}
        description={descriptionModal}
        right_func={onPressGoToHistoryScreen}
        left_func={() => setIsResultReadyModal(false)}
      />
      <LoadingModal isVisible={isLoading} />
    </div>
  );
}

export default Home;