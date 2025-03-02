import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { observer } from "mobx-react";
import { toast } from "react-toastify"; // Replacing Toast

import SimpleModal from "../../Components/CustomModal/SimpleModal/SimpleModal";
import icUser from "../../Components/Images/ic_user.png";
import icHome from "../../Components/Images/ic_home.png";
import icExitApp from "../../Components/Images/ic_exit_app.png";
import CustomText from "../../Components/CustomText/CustomText";
import language from "../../assets/i18n/i18n";
import Store from "../../Store/Store";
import Profile from "../../Modules/Account/Profile/Index";
import Home from "../../Modules/Home/Index";

function TabBar() {
  const navigate = useNavigate();
  const [index, setIndex] = useState(Store.tabBarIndex);
  const [isModalExit, setIsModalExit] = useState(false);
  const [routes] = useState([
    { key: "home", title: language("home"), icon: icHome },
    { key: "account", title: language("profile"), icon: icUser },
  ]);

  useEffect(() => {
    // Replacing BackHandler with browser back navigation
    const handleBack = () => {
      if (index === 0) {
        setIsModalExit(true);
      } else {
        setIndex(0);
        Store.decrementTabBar();
      }
      return true;
    };
    window.addEventListener("popstate", handleBack);

    return () => window.removeEventListener("popstate", handleBack);
  }, [index]);

  const handleIndexChange = (newIndex) => {
    setIndex(newIndex);
    if (newIndex === 0) {
      Store.decrementTabBar();
    } else {
      Store.incrementTabBar();
    }
  };

  const renderScene = () => {
    switch (routes[index].key) {
      case "home":
        return <Home />;
      case "account":
        return <Profile />;
      default:
        return null;
    }
  };

  const onPressExitToApp = () => {
    setIsModalExit(false);
    // BackHandler.exitApp() isn't applicable in web; simulate logout or redirect
    Store.clearStore(); // Assuming Store has a method to clear state
    navigate("/logIn"); // Redirect to login as a web equivalent of exiting
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Main Content */}
      <div className="flex-1">{renderScene()}</div>

      {/* Tab Bar */}
      <div className="flex flex-row justify-around bg-white border-t border-gray-200 p-2">
        {routes.map((route, i) => (
          <button
            key={route.key}
            className="flex flex-col items-center justify-center p-2 w-1/2"
            onClick={() => handleIndexChange(i)}
          >
            <img
              className={`w-6 h-6 ${index === i ? "opacity-100" : "opacity-50"}`}
              src={route.icon}
              alt={route.title}
            />
            <CustomText
              className={`text-xs mt-1 ${
                index === i ? "text-green-500 font-bold" : "text-gray-500"
              }`}
            >
              {route.title}
            </CustomText>
          </button>
        ))}
      </div>

      {/* Exit Modal */}
      <SimpleModal
        isVisible={isModalExit}
        img={icExitApp}
        title="خروج"
        description="آیا مایلید از برنامه خارج شوید؟"
        right_func={onPressExitToApp}
        left_func={() => setIsModalExit(false)}
      />
    </div>
  );
}

export default observer(TabBar);