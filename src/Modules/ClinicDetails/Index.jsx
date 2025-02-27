import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { getPreciseDistance } from "geolib";

import SimpleHeader from "../../Components/CustomHeader/SimpleHeader/SimpleHeader";
import Description from "./Components/Description/Description";
import emptyImage from "../../Components/Images/empty_image.png"; // Direct import
import Loading from "../../Components/Loading/Loading";
import Detiles from "./Components/Detiles/Detiles"; // Assuming typo 'Detiles' is intentional
import storage from "../../Factories/Storage";
import { CDN_Url } from "../../Configs/Urls";
import Map from "./Components/Map/Map";
import autoBack from "../../Components/Images/auth_back.jpg"; // Updated per your instruction
import autoBackRtl from "../../Components/Images/auth_back_rtl.jpg";

function ClinicDetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [approximateDistance, setApproximateDistance] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [description, setDescription] = useState("");
  const [logoImg, setLogoImg] = useState("");
  const [address, setAddress] = useState("");
  const [mapImg, setMapImg] = useState("");
  const [title, setTitle] = useState("");
  const [long, setLong] = useState("");
  const [lat, setLat] = useState("");
  const [score, setScore] = useState("");
  const [times, setTimes] = useState([]);
  const [back, setBack] = useState(autoBackRtl); // Default to RTL image

  useEffect(() => {
    // Check document direction to set background image
    if (document.dir !== "rtl") {
      setBack(autoBack);
    }

    // Replacing BackHandler with browser back navigation
    const handleBack = () => {
      navigate(`/treatmentCenters/${id || "123"}`); // Use id if available, fallback to '123'
      return true;
    };
    window.addEventListener("popstate", handleBack);

    // Fetch data
    getData();

    // Web geolocation
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const details = JSON.parse(id);
          if (details.loc_latitude && details.loc_longitude) {
            const precise = getPreciseDistance(
              {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
              },
              {
                latitude: details.loc_latitude,
                longitude: details.loc_longitude,
              }
            );
            const km = precise / 1000;
            setApproximateDistance(km.toFixed(0));
          }
        },
        (error) => {
        //   console.error("Geolocation error:", error);
          // Optional: Uncomment to notify user
          toast.error("Cannot access location. Please enable location services.");
        }
      );
    } else {
    //   console.warn("Geolocation not supported");
      // Optional: Uncomment to notify user
      toast.error("Geolocation is not supported in your browser.");
    }

    return () => window.removeEventListener("popstate", handleBack);
  }, [navigate, id]);

  const getData = () => {
    const details = JSON.parse(id);
    setTitle(details.title);
    setPhoneNumber(details.phone);
    setScore(details.score);
    setAddress(details.address);
    setDescription(details.description);
    setTimes(details.times);
    setLat(details.loc_latitude);
    setLong(details.loc_longitude);
    setLogoImg(details.logo_image);
    setMapImg(details.map_image);
    setIsLoading(false);
  };

  const handleBackButtonClick = () => {
    navigate(`/treatmentCenters/${id || "123"}`); // Use id if available, fallback to '123'
  };

  return (
    <div
      className="min-h-screen flex flex-col bg-cover bg-center"
      style={{ backgroundImage: `url(${back})` }}
    >
      <SimpleHeader func={handleBackButtonClick} title={title} />
      {!isLoading ? (
        <div className="flex-1 bg-white">
          <div className="w-full flex items-center justify-center">
            {logoImg ? (
              <img
                className="w-[55%] h-[55%] object-contain"
                src={`${CDN_Url.serverUrl}${CDN_Url.centerLogoDirUrl}${logoImg}`}
                alt={title}
              />
            ) : (
              <img
                className="w-[140px] h-[140px] self-center"
                src={emptyImage}
                alt="Empty"
              />
            )}
          </div>
          <div className="w-[95%] mx-auto mt-2 p-4 rounded-md bg-white shadow-md">
            <Detiles
              title={title}
              score={score}
              phoneNumber={phoneNumber}
              address={address}
            />
          </div>
          <div className="w-[95%] mx-auto mt-2 p-4 rounded-md bg-white shadow-md">
            <Description description={description} />
          </div>
          {lat && (
            <div className="w-[95%] mx-auto mt-2 mb-1 p-4 rounded-md bg-white shadow-md">
              <Map
                img={mapImg}
                lat={lat}
                long={long}
                approximate={approximateDistance}
              />
            </div>
          )}
        </div>
      ) : (
        <Loading />
      )}
    </div>
  );
}

export default ClinicDetails;