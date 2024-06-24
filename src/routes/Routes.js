import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from '../pages/Login';
import Menu from '../pages/Menu';
import TransferirMio from "../pages/TransferirMio";
import TransferirOtro from "../pages/TransferirOtro";

function RoutesComponent() {
    return (
        <BrowserRouter>
            <Routes>
                <Route exact path="/" element={<Login />} />
                <Route exact path="/menu" Component={Menu} />
                <Route exact path="/transferirMio" Component={TransferirMio}/>
                <Route exact path="/transferirOtro" Component={TransferirOtro}/>
            </Routes>
        </BrowserRouter>
    );
}

export default RoutesComponent;
