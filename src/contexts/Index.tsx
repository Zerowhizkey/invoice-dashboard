import { createContext, useState, useContext } from "react";

const InvoiceContex = createContext<InvoiceContext | null>(null);

export const InvoiceProvider = ({ children }: ProviderProps) => {
	const [wishes, setWishes] = useState<Wish[]>([]);

	const addWish: InvoiceContext["addWish"] = (text) => {
		setWishes((prev) => {
			return [
				...prev,
				{
					id: prev.length + 1,
					text,
				},
			];
		});
		return wishes;
	};

	return (
		<InvoiceContex.Provider value={{ wishes, addWish }}>
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
