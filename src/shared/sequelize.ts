import { Sequelize } from 'sequelize';
import configuration from './constants';
/**
 * configure DB
 */
const sequelize = new Sequelize(configuration.database);

export default sequelize;