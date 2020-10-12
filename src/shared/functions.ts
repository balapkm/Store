import logger from './Logger';
import { base64encode, base64decode } from 'nodejs-base64';
import { Request, Response } from 'express';
import configuration from '@shared/constants';

/**
 * Set final response
 * @param response Response
 * @param data Object
 * @param status boolean
 * @param httpStatusCode number
 */
export const setFinalResponse = (response: Response|undefined , data: object, status: boolean = false, httpStatusCode: number = 200) => {
    logger.info(data);
    const encryptedData = encryptData(data);
    if(typeof response === 'undefined') {
        return {
            status: (status) ? 1 : 0,
            data: encryptedData
        };
    } else {
        return response.status(httpStatusCode).json({
            status: (status) ? 1 : 0,
            data: encryptedData
        });
    }
};

/**
 * Decrypt data
 * @param data object
 */
export const decryptData = (data: object) => {
    return (configuration.auth as any).request_decryption ? JSON.parse(base64decode(data)) : data;
}

/**
 * encrypt the data
 * @param data object
 */
export const encryptData = (data: object) => {
    return (configuration.auth as any).response_encryption ? base64encode(JSON.stringify(data)) : data;
}