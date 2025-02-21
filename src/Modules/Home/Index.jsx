import React, { useState, useEffect } from 'react';
import LoadingModal from '../../Components/CustomModal/LoadingModal/LoadingModal';
import SimpleModal from '../../Components/CustomModal/SimpleModal/SimpleModal';
import { findStates, findMessages } from '../../Filters/Filters';
import { statusHandle } from '../../Factories/HttpHandler';
import BoxButton from './Components/BoxButton/BoxButton';
import Slider from './Components/Slider/Slider';
import Banner from './Components/Banner/Banner';
import Storage from '../../Factories/Storage';
import language from '../../assets/i18n/i18n';
import { Url } from '../../Configs/Urls';
import Store from "../../Store/Store";

const width = window.innerWidth;
let Token;
const storage = new Storage();

const isOnline = () => navigator.onLine;

const Home = ({ route }) => {
  const [isResultReadyModal, setIsResultReadyModal] = useState(false);
  const [descriptionModal, setDescriptionModal] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    storage.get("Token", data => Token = data);
    
    if (!isOnline()) {
      alertNetwork();
    }
    getDeviceModels();
  }, []);

  const getDeviceModels = () => {
    storage.get("DeviceModel", async data => {
      const models = JSON.parse(data);
      if (!models) {
        setIsLoading(true);
        try {
          const response = await fetch("https://daddycheck.s3.ir-thr-at1.arvanstorage.com/devicemodels.json");
          const responseJson = await response.json();
          storage.set("DeviceModel", JSON.stringify(responseJson));
          setIsLoading(false);
        } catch (error) {
          getDeviceModels();
          setIsLoading(false);
        }
      }
    });
  };

  const alertNetwork = () => {
    window.alert('عدم دسترسی به اینترنت\nلطفا اتصال به اینترنت را چک کنید.');
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
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'token ' + Token
        },
      });
      statusHandle(response.status, route.history);
      const responseJson = await response.json();
      setIsLoading(false);
      findStates(responseJson.state, data => {
        if (data.is_new_analysis_permitted) {
          route.history.push('/firstStep');
        } else if (data.code === "waiting_for_qc1") {
          route.history.push('/tenStep');
        } else if (data.code === "waiting_for_qc2") {
          route.history.push('/elevenStep');
        } else if (data.code === "waiting_for_qc3") {
          route.history.push('/twelveStep');
        } else if (data.code === "waiting_for_vids") {
          route.history.push('/processing');
        } else if (data.code === "results_ready" || data.code === "waiting_for_results") {
          findMessages(data.message, message => {
            setDescriptionModal(message);
            setIsResultReadyModal(true);
          });
        }
      });
    } catch (error) {
      setIsLoading(false);
    }
  };

  const onPressGoToHistoryScreen = () => {
    setIsResultReadyModal(false);
    route.history.push('/history');
  };

  return (
    <div className="flex flex-col bg-white min-h-screen">
      <header 
        className="flex items-center justify-center border-b border-gray-300 py-4"
        style={{ backgroundColor: "green" }}
      >
        <img 
          className="w-48 h-12 object-center" 
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
            title={language('online_sperm_analyze')}
            img="/Images/sperm_analysis"
          />
          <BoxButton
            func={() => route.history.push('/categories')}
            title={language('centers_search')}
            img="/Images/specia_list"
          />
          <BoxButton
            func={() => route.history.push('/videoTraining')}
            title={language('video_training')}
            img="/Images/videoSuccess"
          />
          <BoxButton
            func={() => route.history.push('/textTraining')}
            title={language('text_training')}
            img="/Images/text_education"
          />
          <BoxButton
            func={onPressGoToHistoryScreen}
            title={language('history')}
            img="/Images/analytsis_history"
          />
          <BoxButton
            func={() => window.alert('این صفحه فعلا آماده نیست\nبرای جزئیات بیشتر با پشتیبانی تماس بگیرید')}
            title={language('training_of_medical_staff')}
            img="/Images/health_education"
          />
        </div>
      </main>

      <footer className="py-5 flex items-center justify-center">
        <Banner />
      </footer>

      <SimpleModal
        isVisible={isResultReadyModal}
        img={'/Images/ic_analysis'}
        title={'آنالیز'}
        isReady={true}
        description={descriptionModal}
        right_func={onPressGoToHistoryScreen}
        left_func={() => setIsResultReadyModal(false)}
      />
      <LoadingModal isVisible={isLoading} />
    </div>
  );
};

export default Home;