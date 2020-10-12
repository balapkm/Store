import { StoreModel } from '../models/store';
import Module from './Module';
import { Sequelize } from 'sequelize';

class Store extends Module {

    /**
     * Store Attribute to return
     */
    private storeAttr = ['id', 'name', 'phone', 'domain', 'street', 'state', 'updatedAt', 'status'];

    constructor() {
        super();
    }

    /**
     * retrieve the store and based on ID
     */
    public async index() {
        let listOfStore: object[] = [];
        if (typeof (this.OinputData as any).id === 'undefined' || (this.OinputData as any).id === 0) {
            listOfStore = await StoreModel.findAll({
                attributes: this.storeAttr
            });
        } else {
            listOfStore = await StoreModel.findAll({
                attributes: this.storeAttr,
                where: {
                    id: (this.OinputData as any).id
                }
            });
        }
        this.setResponse(listOfStore);
    }

    /**
     * Create the store
     */
    public async create() {
        if (await this.checkRowCount() === 0) {
            await StoreModel.create({
                ...this.OinputData,
                status: 'Y'
            });
            this.setResponse({'msg' : 'Store succesfully created.'});
        } else {
            this.setResponse({ 'msg': 'Store already exists.' },true);
        }
    }

    /**
     * Check row exist based on name
     */
    public async checkRowCount() {
        const { count } = await StoreModel.findAndCountAll({
            attributes: this.storeAttr,
            where: {
                name: (this.OinputData as any).name
            }
        });
        return count;
    }

    /**
     * Delete the store model
     */
    public async delete() {
        await StoreModel.destroy({
            where: {
                id: (this.OinputData as any).id
            }
        });
        this.setResponse({ 'msg': 'Store succesfully deleted.' });
    }

    /**
     * Update store
     */
    public async update() {
        if (await this.checkRowCount() <= 1) {
            await StoreModel.update(this.OinputData, {
                where: {
                    id: (this.OinputData as any).id
                }
            });
            this.setResponse({ 'msg': 'Store succesfully updated.' });
        } else {
            this.setResponse({ 'msg': 'Store already exists.' }, true);
        }
    }

    /**
     * Search store based on params
     */
    public async search() {
        const listOfStore = await StoreModel.findAll({
            limit: 5,
            attributes: this.storeAttr,
            where: {
                name: {
                    [(Sequelize as any).Op.like]: '%'+(this.OinputData as any).name+'%'
                }
            }
        });
        this.setResponse(listOfStore);
    }
}

export default new Store();