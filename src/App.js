import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavigationBar from "./components/Navbar";
import Home from "./components/Home";
import Articles from "./components/Articles";
import TopicsCard from "./components/TopicsCard";

function App() {
	return (
		<BrowserRouter>
			<div className="App">
				<NavigationBar />
				<Routes>
					<Route path="/" element={<Home />}></Route>
					<Route path="/articles" element={<Articles />}></Route>
          <Route
						path="/api/articles/:topic"
						element={<TopicsCard />}
					></Route>
				</Routes>
			</div>
		</BrowserRouter>
	);
}

export default App;
