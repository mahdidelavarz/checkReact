import React from 'react';
import Modal from "react-modal";
import { Link } from 'react-router-native';

import CustomText from '../../CustomText/CustomText';
import colors from '../../../Assets/Styles/Colors';
import languages from '../../../Assets/i18n/i18n';
import { alert } from '../../Images/Images';

function CloseModal(props) {
    const { visible, resumeFunc } = props;
    return (
        <Modal
            isOpen={visible}
            onRequestClose={resumeFunc} // Close modal when clicking outside
            className="modal-container"
            overlayClassName="modal-overlay"
        >
            <div className="container">
                <div className="content">
                    <div className="header">
                        <div className="header-circle">
                            <img className="header-circle-img" src={alert} alt="alert" />
                        </div>
                    </div>
                    <div className="center">
                        <div className="center-view">
                            <CustomText className="center-view-txt">
                                {languages('close_modal_txt')}
                            </CustomText>
                        </div>
                    </div>
                    <div className="bottom">
                        <button className="bottom-btn bottom-btn-2" onClick={resumeFunc}>
                            <CustomText className="bottom-btn-txt">
                                {languages('resume_analysis')}
                            </CustomText>
                        </button>
                        <Link className="bottom-btn" to="/tabBar">
                            <CustomText className="bottom-btn-txt">
                                {languages('close_analysis')}
                            </CustomText>
                        </Link>
                    </div>
                </div>
            </div>

        </Modal>
    );
};
export default CloseModal;