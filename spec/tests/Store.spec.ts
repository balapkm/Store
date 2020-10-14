import request from 'request';
import { base64encode, base64decode } from 'nodejs-base64';
const getStore = 'http://localhost:4000/api/store';

const headers = {
    'Authorization' : 'Basic YWRtaW46YWRtaW5AMTIz',
    'Content-Type' : 'application/json'
};

describe('Get Store', () => {
    it('get store details with empty input', (done) => {
        const data = base64encode(JSON.stringify({}));
        request.post({
            url: getStore,
            body: {data},
            json: true,
            headers
        }, (error, response) => {
            expect(response.statusCode).toEqual(200);
            expect(response.body.data.length).toBeGreaterThan(0);
            expect(response.body.status).toEqual(0);
            response.body.data.map((v,k) => {
                expect(v.id).toMatch(/\d{1,}/);
                expect(v.name.length).toBeGreaterThan(4);
            });
            done();
        });
    });

    it('get store details by id (Jaya store - 1)', (done) => {
        const data = base64encode(JSON.stringify({id: 1 }));
        request.post({
            url: getStore,
            body: {data},
            json: true,
            headers
        }, (error, response) => {
            expect(response.statusCode).toEqual(200);
            expect(response.body.data.length).toEqual(1);
            expect(response.body.status).toEqual(0);
            expect(response.body.data[0].id).toEqual(1);
            expect(response.body.data[0].name).toContain('Jaya');
            done();
        });
    });

    it('get store details with wrong auth', (done) => {
        const data = base64encode(JSON.stringify({id: 1 }));

        const wheaders = {
            'Authorization' : 'Basic YWRtaW46YWRtaW5AMTIz5555',
            'Content-Type' : 'application/json'
        };
        request.post({
            url: getStore,
            body: {data},
            json: true,
            headers : wheaders
        }, (error, response) => {
            expect(response.statusCode).toEqual(401);
            expect(response.body.status).toEqual(1);
            expect(response.body.data.msg).toEqual('Unauthozied user');
            done();
        });
    });
});
