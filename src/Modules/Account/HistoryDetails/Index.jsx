import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom"; // Replacing BackHandler and props.history
import { toast } from "react-toastify"; // For error messages if needed

import SimpleHeader from "../../../Components/CustomHeader/SimpleHeader/SimpleHeader";
import SimpleButton from "../../../Components/CustomButton/SimpleButton";
import CustomText from "../../../Components/CustomText/CustomText";
import HeaderTable from "./Components/HeaderTable/HeaderTable";
import ColumnTable from "./Components/ColumnTable/ColumnTable";
import { happy_boy } from "../../../Components/Images/Images";
import { CustomPDF } from "./Components/CustomPDF/CustomPDF";
import Loading from "../../../Components/Loading/Loading";
import { findMessages } from "../../../Filters/Filters";
import languages from "../../../assets/i18n/i18n";
import storage from "../../../Factories/Storage"; 
import { Url } from "../../../Configs/Urls";

// Variables moved outside the component for simplicity (could use state if reactive)
let Token;
let fullName;
let phoneNumber;

function HistoryDetails() {
  const navigate = useNavigate();
  const { historyId } = useParams(); // Replacing props.match.params
  const [totalMotile, setTotalMotile] = useState("");
  const [analysis, setAnalysis] = useState("");
  const [message, setMessage] = useState("");
  const [result, setResult] = useState("");
  const [sample, setSample] = useState("");
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [imgUrl, setImgUrl] = useState(null); // For the image URL

  useEffect(() => {
    // Replacing BackHandler with browser back navigation
    const handleBack = () => {
      navigate("/history");
      return true;
    };
    window.addEventListener("popstate", handleBack);

    // Fetch initial data
    setIsLoading(true);
    storage.get("Token", (token) => {
      Token = token;
      getDetails();
    });
    storage.get("Profile", (data) => {
      const res = data ? JSON.parse(data) : {};
      fullName = res.first_name + " " + res.last_name;
      phoneNumber = res.phone;
    });

    return () => window.removeEventListener("popstate", handleBack);
  }, [navigate, historyId]);

  const getDetails = async () => {
    try {
      const response = await fetch(`${Url.serverUrl}Analysis/results/detail/?analysis_id=${historyId}`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `token ${Token}`,
        },
      });
      const responseJson = await response.json();
      setAnalysis(responseJson.analysis || {});
      setResult(responseJson.result || {});
      setSample(responseJson.sample || {});
      setTime(responseJson.analysis?.register_date?.substring(11, 19) || "");
      setDate(responseJson.analysis?.register_date?.substring(0, 10) || "");
      setTotalMotile(
        Math.round(responseJson.result?.prog || 0) + Math.round(responseJson.result?.nprog || 0)
      );
      setIsLoading(false);
      findMessages(responseJson.result?.detail, (msg) => setMessage(msg));
      getResultImage(historyId);
    } catch (error) {
      setIsLoading(false);
      toast.error(`${error.message}`);
    }
  };

  const getResultImage = async (id) => {
    try {
      // Replacing RNFetchBlob with fetch for web
      const response = await fetch(`${Url.serverUrl}Analysis/results/image/?analysis_id=${id}`, {
        method: "GET",
        headers: {
          Accept: "image/jpeg", // Assuming JPEG; adjust if different
          Authorization: `token ${Token}`,
        },
      });
      const blob = await response.blob();
      const url = URL.createObjectURL(blob); // Create a URL for the image blob
      setImgUrl(url);
    } catch (error) {
      console.error("Error fetching image:", error);
      toast.error("Failed to load result image");
    }
  };

  const onPressResultImg = () => {
    storage.set("ResultImg", imgUrl); // Store the URL
    navigate(`/resultImg/${historyId}`);
  };

  const onPressResultVideo = () => {
    navigate(`/resultVideo/${historyId}`);
  };

  const createPdf = () => {
    const model = {
      title: analysis.title || historyId,
      fullName,
      phoneNumber,
      date,
      time,
      volume: sample.volume,
      color: sample.color,
      viscosity: sample.viscosity,
      quantity: Math.round(result.quantity || 0),
      prog: Math.round(result.prog || 0),
      n_prog: Math.round(result.nprog || 0),
      immotile: Math.round(result.immotile || 0),
      imgUrl,
    };
    CustomPDF(model); // Assuming CustomPDF works in web context
  };

  const handleBackButtonClick = () => {
    navigate("/history");
  };

  return (
    <div className="flex-1">
      <SimpleHeader func={handleBackButtonClick} title={languages("history_details")} />
      {!isLoading ? (
        <div className="flex-1 overflow-y-auto">
          <div className="w-full h-48 flex justify-center items-center">
            <img className="w-4/5 h-4/5 object-contain" src={happy_boy} alt="Happy Boy" />
          </div>
          <div className="w-11/12 mx-auto border border-gray-400 mt-2 rounded-lg">
            <div className="h-8 bg-green-500 flex justify-center items-center">
              <CustomText className="text-white text-center">{analysis.title}</CustomText>
            </div>
            <CustomText className="text-center mx-auto text-xs w-11/12 my-2">
              {message}
            </CustomText>
            <SimpleButton
              btnStyle="w-3/5 mx-auto mt-2 mb-2"
              titleStyle="text-xs"
              title="مشاهده مراکز درمانی"
              func={() => navigate("/categories")}
            />
          </div>
          <div className="my-2">
            <CustomText font_weight="bold" className="text-xl text-black text-center my-1">
              Information
            </CustomText>
            <HeaderTable title1="Analysis Name" title2="Analysis Data" title3="Analysis Time" />
            <ColumnTable value1={analysis.title} value2={date} value3={time} />
          </div>
          <div className="my-2">
            <CustomText font_weight="bold" className="text-xl text-black text-center my-1">
              Initial Data
            </CustomText>
            <HeaderTable title1="Parameter" title2="Value" title3="Normal Range" />
            <ColumnTable value1="Volume(ml)" value2={sample.volume} value3="> 1.5 ml" />
            <ColumnTable value1="Color" value2={sample.color} value3="Milky" />
            <ColumnTable value1="Viscosity" value2={sample.viscosity} value3="thick" />
          </div>
          <div className="my-2">
            <CustomText font_weight="bold" className="text-xl text-black text-center my-1">
              Motility Result
            </CustomText>
            <HeaderTable title1="Spermatozoa" title2="Value" title3="Reference Value" />
            <ColumnTable value1="Quantity" value2={Math.round(result.quantity || 0)} value3="-" />
            <ColumnTable value1="Concentration" value2="-" value3="15" />
          </div>
          <div className="my-2">
            <HeaderTable title1="Class" title2="Quantity" title3="%" title4="Reference Value" />
            <ColumnTable
              value1="Total Motile"
              value2={totalMotile}
              value3={percent(totalMotile, totalMotile, result.immotile)}
              value4="> 40 %"
            />
            <ColumnTable
              value1="Progressive"
              value2={Math.round(result.prog || 0)}
              value3={percent(result.prog, totalMotile, result.immotile)}
              value4="> 32 %"
            />
            <ColumnTable
              value1="None Progressive"
              value2={Math.round(result.nprog || 0)}
              value3={percent(result.nprog, totalMotile, result.immotile)}
              value4="-"
            />
            <ColumnTable
              value1="Immotile"
              value2={Math.round(result.immotile || 0)}
              value3={percent(result.immotile, totalMotile, result.immotile)}
              value4="< 60 %"
            />
          </div>
          <SimpleButton
            btnStyle="w-3/5 mx-auto mt-2 mb-2"
            titleStyle="text-xs"
            title="دانلود نسخه PDF"
            func={createPdf}
          />
          <div className="w-11/12 mx-auto">
            <CustomText font_weight="bold" className="text-xl text-black text-center my-1">
              Processed photo from sample
            </CustomText>
            <button onClick={onPressResultImg} className="w-full">
              <img
                className="w-full h-48 rounded-lg object-cover"
                src={imgUrl || "placeholder.jpg"} // Fallback image if imgUrl is null
                alt="Result Image"
              />
            </button>
          </div>
          <SimpleButton
            btnStyle="w-3/5 mx-auto mt-2 mb-2"
            titleStyle="text-xs"
            title="مشاهده ویدیو تحلیل شده"
            func={onPressResultVideo}
          />
        </div>
      ) : (
        <Loading />
      )}
    </div>
  );
}

export default HistoryDetails;

function percent(value = 0, total = 0, immotile = 0) {
  const result = (Math.round(value) / (total + immotile)) * 100 || 0; // Avoid NaN
  const string = result.toString();
  const indexOf = string.indexOf(".");
  return indexOf === -1 ? string : string.substring(0, indexOf === 2 ? 5 : 4);
}