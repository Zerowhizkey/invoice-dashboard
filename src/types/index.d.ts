interface ProviderProps {
	children?: React.ReactNode;
}
type Wish = {
	id: number;
	text: string;
};

interface InvoiceContext {
	wishes: Wish[];
	addWish: (text: string) => void;
}
