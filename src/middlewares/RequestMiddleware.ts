import Middleware from './Middleware';
import fs from 'fs';
import Ajv from 'ajv';

import logger from '@shared/Logger';
import { decryptData } from '@shared/functions';

class RequestMiddleware extends Middleware {

    constructor() {
        super();
    }

    /**
     * Call index
     */
    public index() {
        (this.OinputData as any).body.data = decryptData((this.OinputData as any).body.data);
        /**
         * log the request
         */
        logger.info((this.OinputData as any).body.data);
        const urlArray = (this.OinputData as any).url.split('/');
        const actionName = (urlArray[3] === undefined) ? urlArray[2] : urlArray[2] + '_' + urlArray[3];
        /**
         * Json schema validation
         */
        const path = __dirname+'/../json_schemas/'+ actionName + '.json';
        try {
            if (fs.existsSync(path)) {
                fs.readFile(path, 'utf8', (err, data) => {
                    const schema = JSON.parse(data);

                    const ajv = new Ajv();
                    const valid = ajv.validate(schema, (this.OinputData as any).body.data);
                    if (!valid) {
                        logger.info(ajv.errorsText());
                        this.setResponse({ 'msg': ajv.errorsText()}, true);
                    } else {
                        this.next();
                    }
                });
            } else {
                this.setResponse({ 'msg': 'Json schema is not found' }, true);
            }
        } catch (err) {
            logger.error(err);
        }
    }
}

export default new RequestMiddleware();