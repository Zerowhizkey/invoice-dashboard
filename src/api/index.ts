import axios from "axios";

export const fetchData = async (path: string): Promise<unknown> => {
	const data = await axios.get(path);
	console.log(data);
	return data;
};
