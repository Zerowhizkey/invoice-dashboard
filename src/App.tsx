import { useEffect } from "react";
import "./App.css";
import { fetchData } from "@/api/index";

function App() {
	useEffect(() => {
		fetchData(`https://silk-sapphire-houseboat.glitch.me/users`);
	}, []);
	return <div className="App"></div>;
}

export default App;
