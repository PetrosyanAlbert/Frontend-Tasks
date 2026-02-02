import { DataTypes, Model } from "sequelize";
import sequelize from "../db";

export class Post extends Model {
    public id!: number;
    public title!: string;
    public content!: string;
    public userId!: number;
    public readonly createdAt!: Date;
}

Post.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        userId: {
            field: "user_id",
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        sequelize,
        tableName: "posts",
        timestamps: true,

        createdAt: "created_at",
        updatedAt: false,
    },
);
