import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavigationBar from "./components/Navbar";
import Home from "./components/Home";
import Articles from "./components/Articles";
import SingleArticleCard from "./components/SingleArticleCard";
import Users from "./components/Users";
import { UserContext } from "./components/UserContext";
import { useState, useMemo } from "react";

function App() {
	const [loggedIn, setLoggedIn] = useState("Guest");
	const loggedInValue = useMemo(
		() => ({ loggedIn, setLoggedIn }),
		[loggedIn, setLoggedIn]
	);

	return (
		<BrowserRouter>
			<div className="App">
				<UserContext.Provider value={loggedInValue}>
					<NavigationBar />
					<Routes>
						<Route path="/" element={<Home />}></Route>
						<Route path="/articles" element={<Articles />}></Route>
						<Route path="/users" element={<Users />}></Route>
						<Route
							path="/api/articles/:article_id"
							element={<SingleArticleCard />}
						></Route>
					</Routes>
				</UserContext.Provider>
			</div>
		</BrowserRouter>
	);
}

export default App;
