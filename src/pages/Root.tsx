import Navbar from "@/components/Navbar";
import { Outlet } from "react-router-dom";

type Props = {};

const Root = (props: Props) => {
	return (
		<div className="root-container">
			<Navbar />
			<Outlet />
		</div>
	);
};

export default Root;
