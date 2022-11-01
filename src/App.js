import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavigationBar from "./components/Navbar";
import Home from "./components/Home";
import Articles from "./components/Articles";

function App() {
	return (
		<BrowserRouter>
			<div className="App">
				<NavigationBar></NavigationBar>
				<Routes>
					<Route path="/" element={<Home />}></Route>
					<Route path="/articles" element={<Articles />}></Route>
				</Routes>
			</div>
		</BrowserRouter>
	);
}

export default App;
