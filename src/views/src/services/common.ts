import { URL } from '../config/url';
import $ from 'jquery';

/**
 * Call Webservice
 */
const callWS = async (payload: object, query: string) => {
    const data = {
        data: encryptData(payload)
    };
    const response = await fetch(`${URL.API_ENDPOINT}/${query}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'Authorization' : URL.AUTH_HEADER
        },
        body: JSON.stringify(data)
    });
    return response.json();
}

/**
 * Encrypt the data
 * @param payload object
 */
const encryptData = (payload: object) => {
    return btoa(JSON.stringify(payload));
}

/**
 * Show alert
 * @param msg string
 */
const showAlert = (msg: string) => {
    return alert(msg);
}

/**
 * Show hide Loader
 * @param type string
 */
const showHideLoader = (type: string = 'hide') => {
    (type === 'hide') ? ($('#overlay') as any).hide() : ($('#overlay') as any).show();
}

export {
    callWS,
    showHideLoader,
    showAlert
};