import Encabezado from "./components/Encabezado.jsx";
import PiePagina from "./components/PiePagina.jsx";
import Inicio from "./pages/Inicio.jsx";
import { Estaciones } from "./pages/Estaciones.jsx";
import { BrowserRouter, Route, Routes } from "react-router";
import { NuevaEstacion } from "./pages/NuevaEstacion.jsx";

function App() {
  return (
    <>      
    <BrowserRouter>
    <Encabezado />
      <Routes>
        <Route index element={<Inicio />} />
        <Route path="estaciones">
          <Route index element={<Estaciones/>}/>
          <Route path="nueva-estacion" element={<NuevaEstacion/>}/>
        </Route>
      </Routes>
      <PiePagina />
    </BrowserRouter>
    </>
  );
}

export default App;
