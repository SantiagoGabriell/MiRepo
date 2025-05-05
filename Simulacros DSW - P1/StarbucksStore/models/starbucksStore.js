import { DataTypes, Model } from "sequelize"
import sequelize from "../db.js"

class StarbucksStore extends Model {}

StarbucksStore.init(
    {
        storeNumber: {
            type: DataTypes.STRING,
            field: "STORE_NUMBER",
            primaryKey: true,
            autoIncrement: true,
        },
        storeName: {
            type: DataTypes.STRING,
            field: "STORE_NAME",
        },
        streetAddress: {
            type: DataTypes.STRING,
            field: "STREET_ADDRESS",
        },
        city: {
            type: DataTypes.STRING,
            field: "CITY",
        },
        province: {
            type: DataTypes.STRING,
            field: "PROVINCE",
        },
        country: {
            type: DataTypes.STRING,
            field: "COUNTRY",
        },
        postCode: {
            type: DataTypes.STRING,
            field: "POSTCODE",
        },
        longitude: {
            type: DataTypes.REAL,
            field: "LONGITUDE",
        },
        latitude: {
            type: DataTypes.REAL,
            field: "LATITUDE",
        },
    },
    {
        sequelize,
        modelName: "StarbucksStore",
        tableName: "STARBUCKS_DIRECTORY",
        timestamps: false
    }
);

export default StarbucksStore;