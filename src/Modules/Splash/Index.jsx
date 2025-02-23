import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Replacing props.history
import { toast } from "react-toastify"; // Replacing Toast and Alert

import CustomText from "../../Components/CustomText/CustomText";
import storage from "../../Factories/Storage"; // Import functional storage
import { downloadJson } from "./Controller";

function Splash() {
    const navigate = useNavigate();
    const [isBtnRetry, setIsBtnRetry] = useState(false);

    useEffect(() => {
        startApp();
    }, [navigate]);

    const startApp = () => {
        if (navigator.onLine) {
            getData().catch((err) => {
                console.error("Error fetching data:", err);
                retry();
            });
        } else {
            internetAlert();
        }
    };

    const retry = () => {
        setIsBtnRetry(true);
    };

    const onPressRetryDownloadJson = () => {
        setIsBtnRetry(false);
        startApp();
    };

    const restartApp = () => {
        toast.error("خطای داخلی", { autoClose: 2000 }); // Show error for 2 seconds
        setTimeout(() => {
            window.location.reload(); // Web equivalent of restarting the app
        }, 2000);
    };

    const getData = async () => {
        let _version, _keylist;
        await new Promise((resolve) => {
            storage.get("Version", (version) => {
                _version = version;
                resolve();
            });
        });
        await new Promise((resolve) => {
            storage.get("keylist.json", (keylist) => {
                _keylist = keylist;
                resolve();
            });
        });

        const response = await downloadJson("version.json");
        if (!_version || _version !== response.version) {
            const keylist = await downloadJson("keylist.json");
            _keylist = _keylist ? JSON.parse(_keylist) : {};
            for (const file of keylist) {
                if (
                    _keylist[file.filename] &&
                    _keylist[file.filename].last_modified === file.last_modified
                )
                    continue;

                const downloadedFile = await downloadJson(file.filename);
                storage.set(file.filename, JSON.stringify(downloadedFile));
                _keylist[file.filename] = {
                    filename: file.filename,
                    last_modified: file.last_modified,
                };
            }
            storage.set("keylist.json", JSON.stringify(_keylist));
            storage.set("Version", response.version);
        }
        checkIdentity();
    };

    const checkIdentity = () => {
        setTimeout(() => {
            storage.get("Token", (token) => {
                if (token) {
                    storage.get("Password", (password) => {
                        navigate(password ? "/password" : "/tabBar");
                    });
                } else {
                    navigate("/conditions");
                }
            });
        }, 5000); // Match original 5-second delay
    };

    const internetAlert = () => {
        toast.error("عدم دسترسی به اینترنت\nلطفا اتصال به اینترنت را چک کنید.", {
            onClose: () => restartApp(), // Restart app after alert closes
        });
    };

    return (
        <div className="flex flex-col min-h-screen bg-white">
            <div className="flex-3 flex items-center justify-center bg-black animate-zoomIn">
                <img
                    className="w-32 h-32 object-contain"
                    src="/Images/logo.png"
                    alt="Logo"
                />
            </div>
            {!isBtnRetry ? (
                <div className="flex-2 flex items-center justify-center">
                    <div className="w-10 h-10 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
            ) : (
                <div className="flex-2 flex items-center justify-center">
                    <button
                        className="w-1/2 h-10 rounded-full flex items-center justify-center bg-green-600"
                        onClick={onPressRetryDownloadJson}
                    >
                        <CustomText font_weight="bold" className="text-white text-center text-lg">
                            تلاش مجدد
                        </CustomText>
                    </button>
                </div>
            )}
            <div className="flex-5 flex items-center justify-center">
                <img
                    className="w-4/5 h-4/5 object-contain"
                    src="/Images/happy_boy.png"
                    alt="Happy Boy"
                />
            </div>
        </div>
    );
}

export default Splash;