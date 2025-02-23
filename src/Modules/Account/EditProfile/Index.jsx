import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom"; // Replacing BackHandler and props.history
import { toast } from "react-toastify"; // Replacing react-native-simple-toast
import moment from "moment-jalaali";

import { ic_user, ic_date, ic_gmail, ic_mobile } from "../../../Components/Images/Images";
import SimpleHeader from "../../../Components/CustomHeader/SimpleHeader/SimpleHeader";
import LoadingModal from "../../../Components/CustomModal/LoadingModal/LoadingModal";
import SimpleButton from "../../../Components/CustomButton/SimpleButton";
import { statusHandle } from "../../../Factories/HttpHandler";
import Loading from "../../../Components/Loading/Loading";
import DataModal from "./Components/DateModal/DateModal";
import { findMessages } from "../../../Filters/Filters";
import storage from "../../../Factories/Storage"; // Import functional storage
import Store from "../../../Store/Store";
import Row from "./Components/Row/Row";

function EditProfile() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isDateModal, setIsDateModal] = useState(false);
  const [isLoadingSubmit, setIsLoadingSubmit] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const inputs = useRef({}); // Replacing this.inputs with useRef

  useEffect(() => {
    // Replacing BackHandler with browser back navigation
    const handleBack = () => {
      Store.incrementTabBar();
      navigate(-1);
      return true;
    };
    window.addEventListener("popstate", handleBack);

    // Fetch initial data
    setIsLoading(true);
    storage.get("Token", (token) => {
      if (token) {
        Token = token; // Keep Token in closure (could also use state if needed)
        getData();
      } else {
        setIsLoading(false);
        toast.error("No token found");
      }
    });

    return () => window.removeEventListener("popstate", handleBack);
  }, [navigate]);

  const getData = () => {
    storage.get("Profile", (data) => {
      const res = data ? JSON.parse(data) : {};
      setEmail(res.email || "");
      setBirthDate(res.birth_date || "");
      setFirstName(res.first_name || "");
      setLastName(res.last_name || "");
      setPhoneNumber(res.phone || "");
      setIsLoading(false);
    });
  };

  const focusNextField = (id) => {
    if (inputs.current[id]) {
      inputs.current[id].focus();
    }
  };

  const onPressShowPicker = () => {
    setIsDateModal((prev) => !prev);
  };

  const onPressSubmit = async () => {
    setIsLoadingSubmit(true);
    try {
      const response = await fetch(`${Url.serverUrl}Auth/profile/`, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `token ${Token}`, // Token from closure
        },
        body: JSON.stringify({
          email,
          first_name: firstName || null,
          last_name: lastName || null,
          birth_date: birthDate,
          phone: phoneNumber || null,
        }),
      });
      statusHandle(response.status, navigate); // Updated to use navigate
      const responseJson = await response.json();
      setIsLoadingSubmit(false);
      storage.remove("Profile"); // Updated to functional storage
      handleBackButtonClick();
      findMessages(responseJson.detail, (message) => {
        toast.info(message); // Replaced Toast.show
      });
    } catch (error) {
      setIsLoadingSubmit(false);
      toast.error(`${error.message}`); // Replaced Toast.show
    }
  };

  const handleBackButtonClick = () => {
    Store.incrementTabBar();
    navigate(-1);
  };

  return (
    <div className="flex flex-col bg-white min-h-screen">
      <SimpleHeader func={handleBackButtonClick} title="ویرایش پروفایل" />
      {!isLoading ? (
        <div className="flex flex-col items-center">
          <Row
            img={ic_user}
            label="نام"
            event={(e) => setFirstName(e)}
            keyboardType="default" // Adjust in Row if needed for web
            defaultValue={firstName}
            onRef={(ref) => (inputs.current["firstName"] = ref)}
            onSubmitEditing={() => focusNextField("lastName")}
          />
          <Row
            img={ic_user}
            label="نام خانوادگی"
            event={(e) => setLastName(e)}
            keyboardType="default"
            defaultValue={lastName}
            onRef={(ref) => (inputs.current["lastName"] = ref)}
            onSubmitEditing={() => focusNextField("date")}
          />
          <Row
            img={ic_date}
            mode="date"
            date={moment(birthDate, "YYYY/M/D").format("jYYYY/jM/jD")}
            label="تاریخ تولد"
            func={onPressShowPicker}
          />
          <Row
            img={ic_mobile}
            label="شماره موبایل"
            event={(e) => setPhoneNumber(e)}
            keyboardType="numeric" // Adjust in Row if needed for web
            defaultValue={phoneNumber}
            onRef={(ref) => (inputs.current["phoneNumber"] = ref)}
            onSubmitEditing={() => focusNextField("email")}
          />
          <Row
            img={ic_gmail}
            label="ایمیل"
            event={(e) => setEmail(e)}
            keyboardType="email-address" // Adjust in Row if needed for web
            defaultValue={email}
            onRef={(ref) => (inputs.current["email"] = ref)}
            onSubmitEditing={onPressSubmit}
          />
          <SimpleButton
            func={onPressSubmit}
            btnStyle="w-3/5 h-10 rounded-3xl flex items-center justify-center mt-7 mb-1 bg-blue-500"
            title="ویرایش"
            titleStyle="text-lg text-white"
          />
        </div>
      ) : (
        <Loading />
      )}
      <LoadingModal isVisible={isLoadingSubmit} />
      <DataModal
        isVisible={isDateModal}
        onClose={onPressShowPicker}
        date={(date) => setBirthDate(date)}
      />
    </div>
  );
}

export default EditProfile;

// Note: Token is kept in closure for simplicity; could be moved to state if needed
let Token;