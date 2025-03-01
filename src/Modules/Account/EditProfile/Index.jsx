import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import moment from "moment-jalaali";

import icUser from "../../../Components/Images/ic_user.png"; // Direct import
import icDate from "../../../Components/Images/ic_date.png"; // Direct import
import icGmail from "../../../Components/Images/ic_gmail.png"; // Direct import
import icMobile from "../../../Components/Images/ic_mobile.png"; // Direct import
import SimpleHeader from "../../../Components/CustomHeader/SimpleHeader/SimpleHeader";
import LoadingModal from "../../../Components/CustomModal/LoadingModal/LoadingModal";
import SimpleButton from "../../../Components/CustomButton/SimpleButton";
import { statusHandle } from "../../../Factories/HttpHandler";
import Loading from "../../../Components/Loading/Loading";
import DataModal from "./Components/DateModal/DateModal";
import { findMessages } from "../../../Filters/Filters";
import storage from "../../../Factories/Storage"; // Functional storage
import Store from "../../../Store/Store";
import Row from "./Components/Row/Row";
import autoBack from "../../../Components/Images/auth_back.jpg"; // Adjusted path
import autoBackRtl from "../../../Components/Images/auth_back_rtl.jpg"; // Adjusted path

let Token; // Kept in closure for simplicity

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
  const inputs = useRef({}); // Ref for input elements
  const [back, setBack] = useState(autoBackRtl); // Default to RTL image

  useEffect(() => {
    // Check document direction to set background image
    if (document.dir !== "rtl") {
      setBack(autoBack);
    }

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
        Token = token; // Store in closure
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
      statusHandle(response.status, navigate);
      const responseJson = await response.json();
      setIsLoadingSubmit(false);
      storage.remove("Profile"); // Functional storage
      handleBackButtonClick();
      findMessages(responseJson.detail, (message) => {
        toast.info(message);
      });
    } catch (error) {
      setIsLoadingSubmit(false);
      toast.error(`${error.message}`);
    }
  };

  const handleBackButtonClick = () => {
    Store.incrementTabBar();
    navigate(-1);
  };

  return (
    <div
      className="min-h-screen flex flex-col bg-cover bg-center"
      style={{ backgroundImage: `url(${back})` }}
    >
      <SimpleHeader func={handleBackButtonClick} title="ویرایش پروفایل" />
      {!isLoading ? (
        <div className="flex flex-col items-center">
          <Row
            img={icUser}
            label="نام"
            event={(e) => setFirstName(e)}
            defaultValue={firstName}
            onRef={(ref) => (inputs.current["firstName"] = ref)}
            onSubmitEditing={() => focusNextField("lastName")}
          />
          <Row
            img={icUser}
            label="نام خانوادگی"
            event={(e) => setLastName(e)}
            defaultValue={lastName}
            onRef={(ref) => (inputs.current["lastName"] = ref)}
            onSubmitEditing={() => focusNextField("date")}
          />
          <Row
            img={icDate}
            mode="date"
            date={moment(birthDate, "YYYY/M/D").format("jYYYY/jM/jD")}
            label="تاریخ تولد"
            func={onPressShowPicker}
          />
          <Row
            img={icMobile}
            label="شماره موبایل"
            event={(e) => setPhoneNumber(e)}
            defaultValue={phoneNumber}
            onRef={(ref) => (inputs.current["phoneNumber"] = ref)}
            onSubmitEditing={() => focusNextField("email")}
          />
          <Row
            img={icGmail}
            label="ایمیل"
            event={(e) => setEmail(e)}
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

// Token kept in closure; could use state if preferred
// let Token;