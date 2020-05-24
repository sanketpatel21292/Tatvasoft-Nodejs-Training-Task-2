import { Sequelize } from 'sequelize';

export const db: Sequelize = new Sequelize('EmployeeManagement', 'postgres', 'password', {
    host: 'localhost',
    dialect: 'postgres'
});