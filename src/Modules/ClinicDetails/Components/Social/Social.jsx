import React from 'react';
import { Linking } from 'react-native';

import { ic_home } from '../../../../Components/Images/Images';
import language from '../../../../Assets/i18n/i18n';
import SimpleRow from '../SimpleRow/SimpleRow';

function Social(props) {
    const { telegram, instagram, whatsApp } = props;
    return (
        <div>
            <SimpleRow
                ic={ic_home} title={language('social_networks')} body={''}
            />
            <div className="flex flex-row w-1/2 h-12 self-center">
                <div className="flex-1 items-center justify-center">
                    <button
                        className="w-10 h-10 rounded-full border-2 border-green-500 bg-white flex items-center justify-center"
                        onClick={() => Linking.openURL(`http://${telegram['instagram']}`)}
                    >
                        <img className="w-5 h-5 text-green-500" src={ic_home} />
                    </button>
                </div>
                <div className="flex-1 items-center justify-center">
                    <button
                        className="w-10 h-10 rounded-full border-2 border-green-500 bg-white flex items-center justify-center"
                        onClick={() => Linking.openURL(`http://${instagram['instagram']}`)}
                    >
                        <img className="w-5 h-5 text-green-500" src={ic_home} />
                    </button>
                </div>
                <div className="flex-1 items-center justify-center">
                    <button
                        className="w-10 h-10 rounded-full border-2 border-green-500 bg-white flex items-center justify-center"
                        onClick={() => Linking.openURL(`http://${whatsApp['instagram']}`)}
                    >
                        <img className="w-5 h-5 text-green-500" src={ic_home} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Social;
