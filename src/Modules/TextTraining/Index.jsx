import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import icLeftBack from "../../Components/Images/ic_left_back.png"; // Direct import
import SimpleHeader from "../../Components/CustomHeader/SimpleHeader/SimpleHeader";
import RulesModal from "./Components/RulesModal/RulesModal";
import languages from "../../Assets/i18n/i18n";
import Slide from "./Components/Slide/Slide";
import autoBack from "../../Components/Images/auth_back.jpg"; // Added per your instruction
import autoBackRtl from "../../Components/Images/auth_back_rtl.jpg";

// Direct image imports for slides
import step1 from "../../Components/Images/step_1.jpg";
import step2 from "../../Components/Images/step_2.jpg";
import step3 from "../../Components/Images/step_3.jpg";
import step4 from "../../Components/Images/step_4.jpg";
import step5 from "../../Components/Images/step_5.jpg";
import step6 from "../../Components/Images/step_6.jpg";
import step7 from "../../Components/Images/step_7.jpg";
import step8 from "../../Components/Images/step_8.jpg";
import step9 from "../../Components/Images/step_9.jpg";
import step10 from "../../Components/Images/step_10.jpg";
import step11 from "../../Components/Images/step_11.jpg";
import step12 from "../../Components/Images/step_12.jpg";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Slides data with imported images
const slides = [
  {
    image: step1,
    description:
      "در گام اول بعد از حصول اطمینان از وجود تجهیزات مورد نیاز اشاره شده تیک مربوطه را انتخاب کرده و دکمه ادامه را بفشارید.",
  },
  {
    image: step2,
    description:
      "در گام دوم در صورت عدم تهیه گجت از طریق درگاه فراهم شده نسبت به تهیه گجت اقدام نمایید. چنانچه از قبل گجت را خریداری نموده اید از طریق آیکون اضافه کردن گجت نسبت به ثبت آن در نرم افزار اقدام فرمایید. برای ثبت تنها کافی است تا کد QR موجود بر روی جعبه را اسکن نمایید.",
  },
  {
    image: step3,
    description:
      "در گام سوم نمونه گیری طبق توضیحات گفته شده در بخش روش آماده سازی نمونه را انجام دهید و تیک مربوطه را انتخاب نمایید.",
  },
  {
    image: step4,
    description:
      "در گام چهارم در بخش عنوان آنالیز تاریخ روز انجام آزمایش را درج نمایید. بخش گرانروی (ویسکوزیتی)، غلظت نمونه خود را با توجه به آیتم های نمایش داده شده انتخاب نمایید. بخش رنگ نمونه، رنگ نمونه خود را با توجه به آیتم های نمایش داده شده انتخاب نمایید. بخش حجم نمونه، با توجه به توضیحات گفته شده در بخش روش آماده سازی نمونه، حجم اندازه گیری شده توسط سرنگ را در اینجا انتخاب نمایید. تکمیل نمودن این بخش جهت داشتن پرونده کاملی از نتیجه آزمایش به شما کمک می کند اگر تعیین ویژگی ها برای شما سخت است میتوانید به راحتی به مرحله بعد مراجعه نمایید.",
  },
  {
    image: step5,
    description:
      "در گام پنجم 20 دقیقه زمان برای مایع و روان شدن کامل نمونه لازم است طبق زمان نمایش داده شده 20 دقیقه صبر نمایید. سپس بعد از اتمام زمان به مرحله بعد بروید دقت شود مراحل را با سرعت انجام دهید تا زمان طلایی از دست نرود تا نتیجه آزمایش دچار اختلال نشود.",
  },
  {
    image: step6,
    description:
      "گام ششم در این مرحله مطابق تصویر نمایش داده شده گجت مربوط به گوشی خود را وصل نموده از تمیز بودن لنز دوربین خود اطمینان حاصل نمایید و از این مرحله به بعد طبق توضیحات مندرج، گوشی بایستی در سطح صاف و بدون حرکت قرار گیرد.",
  },
  {
    image: step7,
    description:
      "گام هفتم در این مرحله مطابق فیلم آموزشی و توضیحات در بخش روش آماده سازی نمونه، چندین بار نمونه را با کمک سرنگ پر و خالی نمایید تا کاملا همگن شود، سپس مقدار کمی از نمونه را با استفاده از سرنگ بردارید.",
  },
  {
    image: step8,
    description:
      "گام هشتم، یک قطره از نمونه را در محل نشان داده شده روی چمبر قرار داده و چمبر را بصورت عمودی نگهدارید تا لوزی از نمونه کامل پر شود اگر بصورت کامل پر نشده بود بار دیگر قطره ای بریزید. سپس چمبر را با استفاده از دستمال کاغذی تمیز نمایید به گونه ای که نمونه خارج از محفظه چمبر باقی نمانده باشد.",
  },
  {
    image: step9,
    description:
      "گام نهم، چمبر را مطابق شکل و فیلم آموزشی در محفظه خود بر روی گجت قرار داده به گونه ای که تا علامت F1 وارد گجت شود.",
  },
  {
    image: step10,
    description:
      "گام دهم، در صورتیکه کلیه مراحل قبلی به درستی انجام شده باشد در این مرحله می можете حرکت اسپرم ها را مشاهده نمایید سپس کلید قرمز رنگ را فشار داده و منتظر پیام \"ارسال انجام شد\" بمانید. در صورت بروز مشکل این مرحله را مجددا تکرار نمایید.",
  },
  {
    image: step11,
    description:
      "گام یازدهم، در این مرحله لام را تا محل F2 بیرون کشیده و در صورت مشاهده اسپرم ها کلید قرمز را بفشارید و همانند مرحله قبل منتظر پیام \"ارسال انجام شد\" بمانید در غیر اینصورت این مرحله را تکرار نمایید.",
  },
  {
    image: step12,
    description:
      "گام دوازدهم، در این مرحله لام را تا محل F3 بیرون کشیده و در صورت مشاهده اسپرم ها کلید قرمز را بفشارید و همانند مرحله قبل منتظر پیام \"ارسال انجام شد\" بمانید در غیر اینصورت این مرحله را تکرار نمایید. در این مرحله پس از انجام ارسال کلید شروع تحلیل را انتخاب نمایید  و منتظر جواب آزمایش خود بمانید.",
  },
];

function TextTraining() {
  const navigate = useNavigate();
  const [isModal, setIsModal] = useState(true);
  const [back, setBack] = useState(autoBackRtl); // Default to RTL image
  const sliderRef = useRef(null);

  useEffect(() => {
    // Check document direction to set background image
    if (document.dir !== "rtl") {
      setBack(autoBack);
    }

    // Replacing BackHandler with browser back navigation
    const handleBack = () => {
      navigate(-1);
      return true;
    };
    window.addEventListener("popstate", handleBack);

    return () => window.removeEventListener("popstate", handleBack);
  }, [navigate]);

  const handleBackButtonClick = () => {
    navigate(-1);
  };

  const renderItem = ({ item }) => <Slide item={item} />;

  const renderNextButton = () => (
    <button className="w-10 h-10 bg-green-500 rounded-full flex justify-center items-center hover:bg-green-600">
      <img className="w-4 h-4" src={icLeftBack} alt="Next" />
    </button>
  );

  const renderPrevButton = () => (
    <button className="w-10 h-10 bg-green-500 rounded-full flex justify-center items-center hover:bg-green-600">
      <img className="w-4 h-4 transform rotate-180" src={icLeftBack} alt="Previous" />
    </button>
  );

  // Slider settings for react-slick
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: renderNextButton(),
    prevArrow: renderPrevButton(),
    customPaging: () => <div className="w-4 h-4 bg-green-500 rounded-full" />,
  };

  return (
    <div
      className="min-h-screen flex flex-col bg-cover bg-center"
      style={{ backgroundImage: `url(${back})` }}
    >
      <SimpleHeader func={handleBackButtonClick} title={languages("text_training")} />
      <div className="flex-1">
        <Slider ref={sliderRef} {...settings}>
          {slides.map((item, index) => (
            <div key={index}>{renderItem({ item })}</div>
          ))}
        </Slider>
        <RulesModal
          isVisible={isModal}
          closeFunc={() => setIsModal(false)}
        />
      </div>
    </div>
  );
}

export default TextTraining;