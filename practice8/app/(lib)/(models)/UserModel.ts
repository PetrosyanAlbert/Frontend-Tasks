import { DataTypes, Model } from "sequelize";
import sequelize from "../db";

export class User extends Model {
    public id!: number;
    public name!: string;
    public email!: string;
    public readonly created_at!: Date;
}

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
    },
    {
        sequelize,
        tableName: "users",
        timestamps: true,

        createdAt: "created_at",
        updatedAt: false,
    },
);
