import { Request, Response, NextFunction } from 'express';
import { setFinalResponse } from '@shared/functions';

class Middleware {
    public OinputData!: Request;
    public response!: Response;
    public next!: NextFunction;

    /**
     * call middleware
     * @param request Request
     * @param response Response
     * @param next Nexfunction
     */
    public callMiddleware(request: Request, response: Response, next: NextFunction) {
        this.OinputData = request;
        this.response = response;
        this.next = next;

		/**
		 * call the middleware
		 */

        this.index();
    }

    /**
     * index
     */
    public index(): any {
        return 'Index is not found...';
    }

    /**
     * set response data
     * @param data object
     * @param status boolean
     * @param httpStatusCode number
     */
    public setResponse(data: object, status: boolean = false, httpStatusCode: number = 200): any {
        setFinalResponse(this.response, data, status, httpStatusCode);
    }
}

export default Middleware;