import { Request, Response } from 'express';
import routes from '@shared/routes';
import { setFinalResponse } from '@shared/functions';

class Module {
    public OinputData!: Request;
    public response!: Response;

    /**
     * Call Module
     * @param request Request
     * @param response Response
     */
    public callModule (request: Request, response: Response) {
        this.OinputData = request.body.data;
        this.response = response;

		/**
		 * call actions based on route config
		 */
        const currentPath = routes.filter(route => (route.path === request.path))[0];
        if (typeof (currentPath as any).action !== 'undefined' && (currentPath as any).action !== '') {
            this[(currentPath as any).action]();
        } else {
            this.index();
        }
    }

    /**
     * index
     */
    public index(): any {
        return 'Index is not found...';
    }

    /**
     * Set Response
     * @param data object
     * @param status boolean
     * @param httpStatusCode number
     */
    public setResponse(data: object, status: boolean = false, httpStatusCode:number = 200): any {
        setFinalResponse(this.response, data, status, httpStatusCode);
    }
}

export default Module;