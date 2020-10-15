import React from 'react';
import appsFlyer from "react-native-appsflyer";

export async function initializeAppsFlyer() {
    // appsFlyer.onInstallConversionData(
    //     (res) => {
    //         console.log('res');
    //         console.log(res);
    //     },
    // );
    appsFlyer.onInstallConversionData(
        (res) => {

            if (JSON.parse(res.data.is_first_launch) === true) {
                if (res.data.af_status === 'Non-organic') {
                    var media_source = res.data.media_source;
                    var campaign = res.data.campaign;
                    console.log('This is first launch and a Non-Organic install. Media source: ' + media_source + ' Campaign: ' + campaign);
                } else if (res.data.af_status === 'Organic') {
                    console.log('This is first launch and a Organic Install');
                }
            } else {
                console.log('This is not first launch');
            }
        }
    );
    let options = {
        devKey: '6tg9v7APozsR3Z7GENoDeE' };
    const result = await appsFlyer.initSdk(options)

    // appsFlyer.initSdk(options, (res) => {
    //     console.log(res)
    // },
    //     error => {
    //     console.log('ERROR')
    //     })


}
