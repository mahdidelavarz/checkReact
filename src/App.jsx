import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { I18nextProvider } from 'react-i18next';
import i18next from './Assets/i18n/i18n'; // Adjust path
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './App.css'

import Splash from './Modules/Splash/Index';
import Home from './Modules/Home/Index';
import LogIn from './Modules/Account/LogIn/Index';
import SignIn from './Modules/Account/SignIn/Index';
import SignUp from './Modules/Account/SignUp/Index';
import ConfirmCode from './Modules/Account/ConfirmCode/Index';
import Password from './Modules/Account/Password/Index';
import Conditions from './Modules/Conditions/Index';
import ForgotPassword from './Modules/Account/ForgotPassword/Index';
import TabBar from './Router/TabBar/TabBar';
import Categories from './Modules/Categories/Index';
import TreatmentCenters from './Modules/TreatmentCenters/Index';
import ClinicDetails from './Modules/ClinicDetails/Index';
import History from './Modules/Account/History/Index';
import QRCodeScan from './Modules/QRCodeScan/Index';
import AttachGadget from './Modules/AttachGadget/Index';
import TextTraining from './Modules/TextTraining/Index';
import VideoTraining from './Modules/VideoTraining/Index';
import HistoryDetails from './Modules/Account/HistoryDetails/Index';
import Languages from './Modules/Languages/Index';
// import EditProfile from './Modules/Account/EditProfile/Index';
// import Profile from './Modules/Account/Profile/Index';
// import AboutUs from './Modules/Account/AboutUs/Index';
// import DiscountCode from './Modules/Account/DiscountCode/Index';
// import ContactSupport from './Modules/Account/ContactSupport/Index';
// import Invite from './Modules/Account/Invite/Index';
// import SecurityPassword from './Modules/Account/SecurityPassword/Index';
// import Share from './Modules/Account/Share/Index';
// import Wallet from './Modules/Account/Wallet/Index';
// import ResultImg from './Modules/Account/ResultImg/Index';
// import ResultVideo from './Modules/Account/ResultVideo/Index';
// import Update from './Modules/Account/Update/Index';
import NewPassword from './Modules/Account/NewPassword/Index';

// // analysis steps screen
import AddGadget from './Modules/AnalysisSteps/AddGadget/Index';
import FirstStep from './Modules/AnalysisSteps/FirstStep/Index';
import SecondStep from './Modules/AnalysisSteps/SecondStep/Index';
import ThirdStep from './Modules/AnalysisSteps/ThirdStep/Index';
import FourStep from './Modules/AnalysisSteps/FourStep/Index';
import FiveStep from './Modules/AnalysisSteps/FiveStep/Index';
import SixStep from './Modules/AnalysisSteps/SixStep/Index';
import SevenStep from './Modules/AnalysisSteps/SevenStep/Index';
import EightStep from './Modules/AnalysisSteps/EightStep/Index';
import NineStep from './Modules/AnalysisSteps/NineStep/Index';
import TenStep from './Modules/AnalysisSteps/TenStep/Index';
import ElevenStep from './Modules/AnalysisSteps/ElevenStep/Index';
import TwelveStep from './Modules/AnalysisSteps/TwelveStep/Index';
import Processing from './Modules/AnalysisSteps/Processing/Index';
// import ResultAnalysis from './Modules/AnalysisSteps/ResultAnalysis/Index';


function App() {
  const [count, setCount] = useState(0)

  return (
    <I18nextProvider i18n={i18next}>
      <ToastContainer />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route key={"splash"} exact path={"/"} element={<Splash />} />
          <Route key={"logIn"} exact path={"/logIn"} element={<LogIn />} />
          <Route key={"SignIn"} exact path={"/SignIn"} element={<SignIn />} />
          <Route key={"signUp"} exact path={"/signUp"} element={<SignUp />} />
          <Route key={"password"} exact path={"/password"} element={<Password />} />
          <Route key={"forgotPassword"} exact path={"/forgotPassword"} element={<ForgotPassword />} />
          <Route key={"newPassword"} exact path={"/newPassword"} element={<NewPassword />} />
          <Route key={"confirmCode"} exact path={"/confirmCode/:userId"} element={<ConfirmCode />} />
          <Route key={"conditions"} exact path={"/conditions"} element={<Conditions />} />
          {/* <Route key={"update"} exact path={"/update"} element={<Update/>} /> */}
          <Route key={"tabBar"} exact path={"/tabBar"} element={<TabBar />} />
          <Route key={"categories"} exact path={"/categories"} element={<Categories />} />
          <Route key={"treatmentCenters"} exact path={"/treatmentCenters/:id"} element={<TreatmentCenters />} />
          <Route key={"clinicDetails"} exact path={"/clinicDetails/:id"} element={<ClinicDetails />} />
          <Route key={"history"} exact path={"/history"} element={<History />} />
          <Route key={"historyDetails"} exact path={"/historyDetails/:historyId"} element={<HistoryDetails />} />
          <Route key={"qRCodeScan"} exact path={"/qRCodeScan"} element={<QRCodeScan />} />
          <Route key={"attachGadget"} exact path={"/attachGadget/:code"} element={<AttachGadget />} />
          <Route key={"textTraining"} exact path={"/textTraining"} element={<TextTraining />} />
          <Route key={"videoTraining"} exact path={"/videoTraining"} element={<VideoTraining />} />
          <Route key={"addGadget"} exact path={"/addGadget"} element={<AddGadget />} />
          <Route key={"firstStep"} exact path={"/firstStep"} element={<FirstStep />} />
          <Route key={"secondStep"} exact path={"/secondStep"} element={<SecondStep />} />
          <Route key={"thirdStep"} exact path={"/thirdStep"} element={<ThirdStep />} />
          <Route key={"fourStep"} exact path={"/fourStep"} element={<FourStep />} />
          <Route key={"fiveStep"} exact path={"/fiveStep"} element={<FiveStep />} />
          <Route key={"sixStep"} exact path={"/sixStep"} element={<SixStep />} />
          <Route key={"sevenStep"} exact path={"/sevenStep"} element={<SevenStep />} />
          <Route key={"eightStep"} exact path={"/eightStep"} element={<EightStep />} />
          <Route key={"nineStep"} exact path={"/nineStep"} element={<NineStep />} />
          <Route key={"tenStep"} exact path={"/tenStep"} element={<TenStep />} />
          <Route key={"elevenStep"} exact path={"/elevenStep"} element={<ElevenStep />} />
          <Route key={"twelveStep"} exact path={"/twelveStep"} element={<TwelveStep />} />
          <Route key={"processing"} exact path={"/processing"} element={<Processing />} />
          {/* <Route key={"resultAnalysis"} exact path={"/resultAnalysis"} element={<ResultAnalysis />} /> */}
          <Route key={"languages"} exact path={"/languages/:screenName"} element={<Languages/>} />
       {/* <Route key={"profile"} exact path={"/profile"} element={Profile} />
        <Route key={"editProfile"} exact path={"/editProfile"} element={EditProfile} />
        <Route key={"aboutUs"} exact path={"/aboutUs"} element={AboutUs} />
        <Route key={"discountCode"} exact path={"/discountCode"} element={DiscountCode} />
        <Route key={"contactSupport"} exact path={"/contactSupport"} element={ContactSupport} />
        <Route key={"invite"} exact path={"/invite"} element={Invite} />
        <Route key={"securityPassword"} exact path={"/securityPassword"} element={SecurityPassword} />
        <Route key={"share"} exact path={"/share"} element={Share} />
        <Route key={"wallet"} exact path={"/wallet"} element={Wallet} />
        <Route key={"resultImg"} exact path={"/resultImg/:id"} element={ResultImg} />
        <Route key={"resultVideo"} exact path={"/resultVideo/:id"} element={ResultVideo} /> */}

        </Routes>
      </Router>
    </I18nextProvider>
  )
}

export default App
