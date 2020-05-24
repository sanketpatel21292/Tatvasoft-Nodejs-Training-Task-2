import { DataTypes, Model } from 'sequelize';
import { db } from '../config/database';

export class UserTeam extends Model { }

UserTeam.init({
    userId: {
        type: DataTypes.INTEGER
    },
    teamid: {
        type: DataTypes.INTEGER
    }
}, {
    sequelize: db,
    modelName: 'UserTeams',
    timestamps: false
})
