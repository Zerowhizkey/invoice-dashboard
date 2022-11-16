import { createContext, useState, useContext, useEffect } from "react";
import { v4 as uuid } from "uuid";
import { fetchData, isUser } from "@/api/index";
const InvoiceContex = createContext<InvoiceContext | null>(null);

export const InvoiceProvider = ({ children }: ProviderProps) => {
	const [users, setUsers] = useState<User[]>([]);

	useEffect(() => {
		fetchData(`https://silk-sapphire-houseboat.glitch.me/users`).then(
			(data) => {
				if (isUser(data)) {
					console.log(data);
					setUsers(data.users);
				}
			}
		);
	}, []);
	console.log(users);

	// const addUser: InvoiceContext["addUser"] = (text) => {
	// 	setUsers((prev) => {
	// 		return [
	// 			...prev,
	// 			{
	// 				id: uuid(),
	// 				text,
	// 			},
	// 		];
	// 	});
	// 	return users;
	// };

	return (
		<InvoiceContex.Provider value={{ users }}>
			{children}
		</InvoiceContex.Provider>
	);
};

export const useInvoice = () => {
	const contextValue = useContext(InvoiceContex);
	if (!contextValue) {
		throw new Error("UseInvoice is outside InvoiceProvider");
	}
	return contextValue;
};
