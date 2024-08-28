import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import "./App.css";
import './styles/globals.css';
import "./styles/sign.css"
import './styles/loading.css'
import './styles/plan.css'

// pages
import Home from "./pages/Home";
import SignIn from "./pages/Login";
import SignUp from "./pages/Register";


function App() {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/login" element={<SignIn />} />
				<Route path="/register" element={<SignUp />} />
			</Routes>
		</Router>
	);
}

export default App;
