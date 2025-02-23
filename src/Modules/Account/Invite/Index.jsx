import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Replacing BackHandler and props.history

import SimpleButton from "../../../Components/CustomButton/SimpleButton";
import { inviteBack, ic_back } from "../../../Components/Images/Images";
import CustomText from "../../../Components/CustomText/CustomText";
import storage from "../../../Factories/Storage";
import language from "../../../assets/i18n/i18n";
import Store from "../../../Store/Store";

// Removed let storage = new Storage();

function Invite() {
    const navigate = useNavigate();
    const [userName, setUserName] = useState("");

    useEffect(() => {
        storage.get("Profile", (data) => {
            const res = data ? JSON.parse(data) : {};
            setUserName(res.email || "");
        });

        // Replacing BackHandler with browser back navigation
        const backHandler = () => {
            Store.incrementTabBar();
            navigate(-1);
            return true;
        };
        window.addEventListener("popstate", backHandler);

        return () => window.removeEventListener("popstate", backHandler);
    }, [navigate]);

    const share = async () => {
        try {
            // Replacing Share.share with navigator.share for web
            if (navigator.share) {
                await navigator.share({
                    title: "Invite",
                    text: "Check out this link!",
                    url: "http://etcco.ir",
                });
                console.log("Share successful");
            } else {
                // Fallback for browsers that don’t support Web Share API
                navigator.clipboard.writeText("http://etcco.ir");
                alert("Link copied to clipboard: http://etcco.ir");
            }
        } catch (error) {
            console.error("Share error:", error);
            alert("Failed to share: " + error.message);
        }
    };

    const backAction = () => {
        Store.incrementTabBar();
        navigate(-1);
    };

    return (
        <div
            className="flex-1 flex flex-col bg-cover bg-center"
            style={{ backgroundImage: `url(${inviteBack})` }}
        >
            {/* StatusBar not needed in web; can use CSS if desired */}
            <div className="flex-1 flex items-start pt-[10px] w-[90%] mx-auto">
                <button
                    className="w-[40px] h-[40px] flex items-center justify-center"
                    onClick={backAction}
                >
                    <img className="w-[25px] h-[25px]" src={ic_back} alt="Back" />
                </button>
            </div>

            <div className="flex-4 flex flex-col">
                <div className="flex-3" />
                <div className="flex-7 flex flex-col justify-between">
                    <CustomText font_weight="bold" className="text-[16px] text-center text-dark_green">
                        {userName}
                    </CustomText>
                    <div className="w-[80%] mx-auto">
                        <CustomText className="text-[12px] w-[92%] mx-auto text-center leading-[30px] text-ligh_txt">
                            لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است،
                            چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی
                            مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه
                            درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت
                            بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد
                            کرد، در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها، و شرایط سخت تایپ
                            به پایان رسد و زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات پیوسته اهل
                            دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.
                        </CustomText>
                    </div>
                </div>
            </div>

            <div className="flex-1 flex items-center justify-center">
                <SimpleButton
                    func={share}
                    btnStyle="w-[50%]"
                    title={language("share")}
                    titleStyle=""
                />
            </div>
        </div>
    );
}

export default Invite;