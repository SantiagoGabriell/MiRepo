import express from 'express';
import sequelize from './db.js';
import StarbucksStore from './models/starbucksStore.js';
import countries from "./data/countries.js";
import { Op } from "sequelize";

const app = express();
const PORT = 3000;

app.use(express.static('public'));
app.use(express.json());

app.get("/api/locales", async (req, res) => {
    try {
        const { texto, hemisferio } = req.query;

        let where = {};

        if (texto) {
            where[Op.or] = [
                { storeName: { [Op.like]: `%${texto}%` } },
                { city: { [Op.like]: `%${texto}%` } },
                { streetAddress: { [Op.like]: `%${texto}%` } },
            ];
        }

        // Aplicamos condiciones según el hemisferio
        if (hemisferio) {
            switch (hemisferio) {
                case "NE":
                    where.latitude = { [Op.gte]: 0 };
                    where.longitude = { [Op.gte]: 0 };
                    break;
                case "NO":
                    where.latitude = { [Op.gte]: 0 };
                    where.longitude = { [Op.lt]: 0 };
                    break;
                case "SE":
                    where.latitude = { [Op.lt]: 0 };
                    where.longitude = { [Op.gte]: 0 };
                    break;
                case "SO":
                    where.latitude = { [Op.lt]: 0 };
                    where.longitude = { [Op.lt]: 0 };
                    break;
                default:
                    return res.status(400).json({ error: "Hemisferio inválido" });
            }
        }

        const locales = await StarbucksStore.findAll({
            where,
            limit: 15, 
        });

        const resultado = locales
            .map(local => {
                const lat = parseFloat(local.latitude);
                const long = parseFloat(local.longitude);
                let hemi = "";

                if (lat >= 0 && long >= 0) 
                    hemi = "Noreste (NE)";
                else if (lat >= 0 && long < 0) 
                    hemi = "Noroeste (NO)";
                else if (lat < 0 && long >= 0) 
                    hemi = "Sureste (SE)";
                else if (lat < 0 && long < 0) 
                    hemi = "Suroeste (SO)";
                else 
                    hemi = "Desconocido";

                return {
                    name: local.storeName,
                    address: local.streetAddress,
                    city: local.city,
                    country: countries[local.country] || local.country,
                    hemisferio: hemi,
                };
            })

        res.json(resultado);

    } catch (error) {
        console.log("Error al obtener los locales:\n", error);
        res.status(500).json({ error: "Error al obtener los locales" });
    }
});

(async function start() {
    try {
        await sequelize.authenticate();
        console.log("Conexión establecida...");
    } catch (error) {
        console.log("Error, Imposible conectar a la bd...\n", error);
        process.exit(1);
    }

    app.listen(PORT, () => {
        console.log(`Servidor iniciado y escuchando en el puerto ${PORT}`);
    });
})();
