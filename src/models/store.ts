import {  Model, DataTypes } from 'sequelize';
import sequelize from '../shared/sequelize';

/**
 * init store model
 */
export class StoreModel extends Model {
    public id!: number;
    public phone!: string;
    public name!: string;
    public domain!: string;
    public street!: string;
    public state!: string;
    public status!: string;
    public readonly createdAt !: Date;
    public readonly updatedAt !: Date;
}
/**
 * store Model init
 */
StoreModel.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        phone: {
            type: new DataTypes.STRING(15),
            allowNull: false,
        },
        name: {
            type: new DataTypes.STRING(50),
            allowNull: false,
        },
        domain: {
            type: new DataTypes.STRING(50),
            allowNull: false,
        },
        street: {
            type: new DataTypes.STRING(50),
            allowNull: false,
        },
        state: {
            type: new DataTypes.STRING(50),
            allowNull: false,
        },
        status: {
            type: DataTypes.ENUM('Y', 'N'),
            allowNull: false,
        }
    },
    {
        tableName: 'store',
        sequelize
    }
);
