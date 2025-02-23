import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Replacing BackHandler and props.history
import { toast } from "react-toastify"; // Replacing Alert
import moment from "moment-jalaali";

import CustomText from "../../../Components/CustomText/CustomText";
import { statusHandle } from "../../../Factories/HttpHandler";
import Loading from "../../../Components/Loading/Loading";
import EmptyList from "./Components/EmptyList/EmptyList";
import language from "../../../assets/i18n/i18n";
import storage from "../../../Factories/Storage";
import Header from "./Components/Header/Header";
import Chart from "./Components/Chart/Chart";
import { Url } from "../../../Configs/Urls";
import List from "./Components/List/List";

// Replacing react-native-tab-view with a simple tab solution
function TabView({ navigationState, renderScene, onIndexChange }) {
  const { index, routes } = navigationState;

  return (
    <div className="flex-1">
      {/* Tab Bar */}
      <div className="flex flex-row bg-green-500">
        {routes.map((route, i) => (
          <button
            key={route.key}
            onClick={() => onIndexChange(i)}
            className={`flex-1 py-2 text-center ${
              index === i ? "bg-dark-green" : ""
            }`}
          >
            <span className="text-white text-xs font-bold">{route.title}</span>
          </button>
        ))}
      </div>
      {/* Tab Content */}
      <div className="flex-1">{renderScene({ route: routes[index] })}</div>
    </div>
  );
}

function History() {
  const navigate = useNavigate();
  const [isActiveAnalysis] = useState(false); // Assuming this is static or managed elsewhere
  const [isResultSearch, setIsResultSearch] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "history", title: language("historys_list") },
    { key: "chart", title: language("chart") },
  ]);
  const [searchValue, setSearchValue] = useState("");
  const [data, setData] = useState([]);
  const [filterData, setFilterData] = useState([]); // Replacing this.filterData

  useEffect(() => {
    // Replacing BackHandler with browser back navigation
    const handleBack = () => {
      navigate("/tabBar");
      return true;
    };
    window.addEventListener("popstate", handleBack);

    // Fetch initial data
    setIsLoading(true);
    storage.get("Token", (token) => {
      if (token) {
        // Replacing NetInfo with a simple connectivity check
        if (navigator.onLine) {
          getResults(token);
        } else {
          toast.error("عدم دسترسی به اینترنت. لطفا اتصال به اینترنت را چک کنید.");
          setIsLoading(false);
        }
      } else {
        setIsLoading(false);
        toast.error("No token found");
      }
    });

    return () => window.removeEventListener("popstate", handleBack);
  }, [navigate]);

  const getResults = async (token) => {
    try {
      const response = await fetch(`${Url.serverUrl}Analysis/results/`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `token ${token}`,
        },
      });
      statusHandle(response.status, navigate); // Updated to use navigate
      const responseJson = await response.json();
      const sortedCars = responseJson.sort(
        (a, b) =>
          new Date(...b.analysis.register_date.substring(0, 10).split("/").reverse()) -
          new Date(...a.analysis.register_date.substring(0, 10).split("/").reverse())
      );
      setData(sortedCars);
      setFilterData(sortedCars);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      toast.error(`${error.message}`);
    }
  };

  const handleIndexChange = (index) => {
    setIndex(index);
  };

  const searchData = (text) => {
    setSearchValue(text);
    if (text.length > 1) {
      setIsResultSearch(true);
      const newData = filterData.filter((item) => {
        const itemData = item.analysis.title
          ? item.analysis.title.toUpperCase()
          : "".toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setData(newData);
    } else {
      setIsResultSearch(false);
      setData(filterData);
    }
  };

  const renderScene = ({ route }) => {
    switch (route.key) {
      case "history":
        return (
          <div className="flex-1">
            {isActiveAnalysis ? <DoingAnalysis /> : null}
            {!isResultSearch ? (
              <div className="mb-10">
                {data.length === 0 ? (
                  <EmptyList />
                ) : (
                  data.map((item, index) => (
                    <List key={index} item={item} route={{ navigate }} />
                  ))
                )}
              </div>
            ) : (
              <div className="mb-10">
                {data.length === 0 ? (
                  <EmptyList />
                ) : (
                  data.map((item, index) => (
                    <List key={index} item={item} route={{ navigate }} />
                  ))
                )}
              </div>
            )}
          </div>
        );
      case "chart":
        const progs = [];
        const nprogs = [];
        const immotiles = [];
        data.forEach((item) => {
          const prog = {
            x: item.analysis.register_date.substring(0, 10),
            y: Math.round(item.result.prog),
          };
          const nprog = {
            x: item.analysis.register_date.substring(0, 10),
            y: Math.round(item.result.nprog),
          };
          const immotile = {
            x: item.analysis.register_date.substring(0, 10),
            y: Math.round(item.result.immotile),
          };
          progs.push(prog);
          nprogs.push(nprog);
          immotiles.push(immotile);
        });
        const chartData = JSON.stringify({
          prog: progs,
          nprogs: nprogs,
          immotiles: immotiles,
        });
        return <Chart data={chartData} />;
      default:
        return null;
    }
  };

  return (
    <div className="flex-1 bg-white">
      {/* StatusBar not needed in web; can use CSS for status bar-like styling if desired */}
      <Header func_back={() => navigate("/tabBar")} event={searchData} />
      {!isLoading ? (
        <TabView
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={handleIndexChange}
        />
      ) : (
        <Loading />
      )}
    </div>
  );
}

export default History;

function DoingAnalysis() {
  return (
    <div className="w-11/12 mx-auto flex items-center border border-violet-500 rounded-sm h-15 my-2.5">
      {/* ActivityIndicator replaced with a simple CSS spinner */}
      <div className="w-7.5 h-7.5 border-2 border-t-2 border-green-500 border-t-transparent rounded-full animate-spin"></div>
      <CustomText className="text-dark-txt text-center text-sm ml-2">
        شما یک آنالیز درحال انجام دارید لطفا منتظر بمانید...
      </CustomText>
    </div>
  );
}