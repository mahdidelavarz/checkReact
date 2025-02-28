import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs"; // Replacing TabView and TabBar
import ReactPlayer from "react-player"; // Replacing Video
import SimpleHeader from "../../Components/CustomHeader/SimpleHeader/SimpleHeader";
import languages from "../../Assets/i18n/i18n";
import autoBack from "../../Components/Images/auth_back.jpg"; // Added per your instruction
import autoBackRtl from "../../Components/Images/auth_back_rtl.jpg";
import CustomText from "../../Components/CustomText/CustomText"; // Assuming web-compatible replacement for Text
// import videoMp4 from "../../../"; // Example video import; adjust path as needed

import "react-tabs/style/react-tabs.css"; // Optional CSS for react-tabs

function VideoTraining() {
  const navigate = useNavigate();
  const [index, setIndex] = useState(0);
  const [back, setBack] = useState(autoBackRtl); // Default to RTL image
  const routes = [
    { key: "1", title: languages("shopping_training") },
    { key: "2", title: languages("analysis_training") },
    { key: "3", title: languages("training_payment") },
  ];

  useEffect(() => {
    // Check document direction to set background image
    if (document.dir !== "rtl") {
      setBack(autoBack);
    }

    // Replacing BackHandler with browser back navigation
    const handleBack = () => {
      navigate("/tabBar");
      return true;
    };
    window.addEventListener("popstate", handleBack);

    return () => window.removeEventListener("popstate", handleBack);
  }, [navigate]);

  const handleBackButtonClick = () => {
    navigate("/tabBar");
  };

  const handleTabSelect = (newIndex) => {
    setIndex(newIndex);
  };

  return (
    <div
      className="min-h-screen flex flex-col bg-cover bg-center"
      style={{ backgroundImage: `url(${back})` }}
    >
      <SimpleHeader func={handleBackButtonClick} title={languages("video_training")} />
      <div className="flex-1">
        <Tabs selectedIndex={index} onSelect={handleTabSelect}>
          <TabList className="flex bg-white border-b border-gray-200">
            {routes.map((route) => (
              <Tab
                key={route.key}
                className="flex-1 py-2 text-center text-green-500 text-sm font-bold cursor-pointer focus:outline-none"
                selectedClassName="border-b-2 border-green-500"
              >
                {route.title}
              </Tab>
            ))}
          </TabList>
          <TabPanel>
            <Screen1 />
          </TabPanel>
          <TabPanel>
            <Screen2 />
          </TabPanel>
          <TabPanel>
            <Screen3 />
          </TabPanel>
        </Tabs>
      </div>
    </div>
  );
}

function Screen1() {
  return (
    <div className="flex-1 bg-green-500 flex items-center justify-center">
      <CustomText className="text-white text-lg">Screen 1 Content</CustomText>
      <VideoPlayer />
    </div>
  );
}

function Screen2() {
  return (
    <div className="flex-1 bg-blue-500 flex items-center justify-center">
      <CustomText className="text-white text-lg">Screen 2 Content</CustomText>
      <VideoPlayer />
    </div>
  );
}

function Screen3() {
  return (
    <div className="flex-1 bg-orange-500 flex items-center justify-center">
      <CustomText className="text-white text-lg">Screen 3 Content</CustomText>
      <VideoPlayer />
    </div>
  );
}

function VideoPlayer() {
  return (
    <div className="w-full h-full">
      <ReactPlayer
        url={videoMp4} // Adjust path or use a URL
        width="100%"
        height="100%"
        controls={true}
        config={{ file: { attributes: { style: { objectFit: "fill" } } } }} // Replaces resizeMode='stretch'
      />
    </div>
  );
}

export default VideoTraining;