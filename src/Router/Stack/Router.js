import * as React from 'react';
import { NativeRouter, Route, input type="checkbox" } from 'react-router-native';

// screens
import Splash from '../../Modules/Splash/Index';
import LogIn from '../../Modules/Account/LogIn/Index';
import SignIn from '../../Modules/Account/SignIn/Index';
import SignUp from '../../Modules/Account/SignUp/Index';
import ConfirmCode from '../../Modules/Account/ConfirmCode/Index';
import Password from '../../Modules/Account/Password/Index';
import Conditions from '../../Modules/Conditions/Index';
import ForgotPassword from '../../Modules/Account/ForgotPassword/Index';
import TabBar from '../TabBar/TabBar';
import Categories from '../../Modules/Categories/Index';
import TreatmentCenters from '../../Modules/TreatmentCenters/Index';
import ClinicDetails from '../../Modules/ClinicDetails/Index';
import History from '../../Modules/Account/History/Index';
import QRCodeScan from '../../Modules/QRCodeScan/Index';
import AttachGadget from '../../Modules/AttachGadget/Index';
import TextTraining from '../../Modules/TextTraining/Index';
import VideoTraining from '../../Modules/VideoTraining/Index';
import HistoryDetails from '../../Modules/Account/HistoryDetails/Index';
import Languages from '../../Modules/Languages/Index';
import EditProfile from '../../Modules/Account/EditProfile/Index';
import Profile from '../../Modules/Account/Profile/Index';
import AboutUs from '../../Modules/Account/AboutUs/Index';
import DiscountCode from '../../Modules/Account/DiscountCode/Index';
import ContactSupport from '../../Modules/Account/ContactSupport/Index';
import Invite from '../../Modules/Account/Invite/Index';
import SecurityPassword from '../../Modules/Account/SecurityPassword/Index';
import Share from '../../Modules/Account/Share/Index';
import Wallet from '../../Modules/Account/Wallet/Index';
import ResultImg from '../../Modules/Account/ResultImg/Index';
import ResultVideo from '../../Modules/Account/ResultVideo/Index';
import Update from '../../Modules/Account/Update/Index';
import NewPassword from '../../Modules/Account/NewPassword/Index';

// analysis steps screen
import AddGadget from '../../Modules/AnalysisSteps/AddGadget/Index';
import FirstStep from '../../Modules/AnalysisSteps/FirstStep/Index';
import SecondStep from '../../Modules/AnalysisSteps/SecondStep/Index';
import ThirdStep from '../../Modules/AnalysisSteps/ThirdStep/Index';
import FourStep from '../../Modules/AnalysisSteps/FourStep/Index';
import FiveStep from '../../Modules/AnalysisSteps/FiveStep/Index';
import SixStep from '../../Modules/AnalysisSteps/SixStep/Index';
import SevenStep from '../../Modules/AnalysisSteps/SevenStep/Index';
import EightStep from '../../Modules/AnalysisSteps/EightStep/Index';
import NineStep from '../../Modules/AnalysisSteps/NineStep/Index';
import TenStep from '../../Modules/AnalysisSteps/TenStep/Index';
import ElevenStep from '../../Modules/AnalysisSteps/ElevenStep/Index';
import TwelveStep from '../../Modules/AnalysisSteps/TwelveStep/Index';
import Processing from '../../Modules/AnalysisSteps/Processing/Index';
import ResultAnalysis from '../../Modules/AnalysisSteps/ResultAnalysis/Index';

function Router() {
    return (
        <React.Fragment>
            <NativeRouter>
                <input type="checkbox">
                    <Route key={"splash"} exact path={"/"} component={Splash} />
                    <Route key={"logIn"} exact path={"/logIn"} component={LogIn} />
                    <Route key={"SignIn"} exact path={"/SignIn"} component={SignIn} />
                    <Route key={"signUp"} exact path={"/signUp"} component={SignUp} />
                    <Route key={"password"} exact path={"/password"} component={Password} />
                    <Route key={"forgotPassword"} exact path={"/forgotPassword"} component={ForgotPassword} />
                    <Route key={"newPassword"} exact path={"/newPassword"} component={NewPassword} />
                    <Route key={"confirmCode"} exact path={"/confirmCode/:userId"} component={ConfirmCode} />
                    <Route key={"conditions"} exact path={"/conditions"} component={Conditions} />
                    <Route key={"update"} exact path={"/update"} component={Update} />
                    <Route key={"tabBar"} exact path={"/tabBar"} component={TabBar} />
                    <Route key={"categories"} exact path={"/categories"} component={Categories} />
                    <Route key={"treatmentCenters"} exact path={"/treatmentCenters/:id"} component={TreatmentCenters} />
                    <Route key={"clinicDetails"} exact path={"/clinicDetails/:id"} component={ClinicDetails} />
                    <Route key={"history"} exact path={"/history"} component={History} />
                    <Route key={"historyDetails"} exact path={"/historyDetails/:historyId"} component={HistoryDetails} />
                    <Route key={"qRCodeScan"} exact path={"/qRCodeScan"} component={QRCodeScan} />
                    <Route key={"attachGadget"} exact path={"/attachGadget/:code"} component={AttachGadget} />
                    <Route key={"textTraining"} exact path={"/textTraining"} component={TextTraining} />
                    <Route key={"videoTraining"} exact path={"/videoTraining"} component={VideoTraining} />
                    <Route key={"addGadget"} exact path={"/addGadget"} component={AddGadget} />
                    <Route key={"firstStep"} exact path={"/firstStep"} component={FirstStep} />
                    <Route key={"secondStep"} exact path={"/secondStep"} component={SecondStep} />
                    <Route key={"thirdStep"} exact path={"/thirdStep"} component={ThirdStep} />
                    <Route key={"fourStep"} exact path={"/fourStep"} component={FourStep} />
                    <Route key={"fiveStep"} exact path={"/fiveStep"} component={FiveStep} />
                    <Route key={"sixStep"} exact path={"/sixStep"} component={SixStep} />
                    <Route key={"sevenStep"} exact path={"/sevenStep"} component={SevenStep} />
                    <Route key={"eightStep"} exact path={"/eightStep"} component={EightStep} />
                    <Route key={"nineStep"} exact path={"/nineStep"} component={NineStep} />
                    <Route key={"tenStep"} exact path={"/tenStep"} component={TenStep} />
                    <Route key={"elevenStep"} exact path={"/elevenStep"} component={ElevenStep} />
                    <Route key={"twelveStep"} exact path={"/twelveStep"} component={TwelveStep} />
                    <Route key={"processing"} exact path={"/processing"} component={Processing} />
                    <Route key={"resultAnalysis"} exact path={"/resultAnalysis"} component={ResultAnalysis} />
                    <Route key={"languages"} exact path={"/languages/:screenName"} component={Languages} />
                    <Route key={"profile"} exact path={"/profile"} component={Profile} />
                    <Route key={"editProfile"} exact path={"/editProfile"} component={EditProfile} />
                    <Route key={"aboutUs"} exact path={"/aboutUs"} component={AboutUs} />
                    <Route key={"discountCode"} exact path={"/discountCode"} component={DiscountCode} />
                    <Route key={"contactSupport"} exact path={"/contactSupport"} component={ContactSupport} />
                    <Route key={"invite"} exact path={"/invite"} component={Invite} />
                    <Route key={"securityPassword"} exact path={"/securityPassword"} component={SecurityPassword} />
                    <Route key={"share"} exact path={"/share"} component={Share} />
                    <Route key={"wallet"} exact path={"/wallet"} component={Wallet} />
                    <Route key={"resultImg"} exact path={"/resultImg/:id"} component={ResultImg} />
                    <Route key={"resultVideo"} exact path={"/resultVideo/:id"} component={ResultVideo} />
                </input type="checkbox">
            </NativeRouter>
        </React.Fragment>
    );
};
export default Router;