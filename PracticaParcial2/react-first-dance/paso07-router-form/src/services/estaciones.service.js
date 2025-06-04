import axios from "axios";

const crearEstacion = async (estacion) => {
  try {
    const response = await axios.post(
      "http://localhost:3000/api/estaciones/",
        estacion
    );
    return response.data;
  } catch (err) {

  }
};

const obtenerEstaciones = async () => {
    try {
        const response = await axios.get("http://localhost:3000/api/estaciones/");
        return response.data;
    } catch (err) {
        console.error("Error al obtener las estaciones:", err);
        throw err;
    }
    }

export default {
    crearEstacion,
    obtenerEstaciones
}
