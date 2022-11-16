interface ProviderProps {
	children?: React.ReactNode;
}
type User = {
	id: string;
	text: string;
};

interface InvoiceContext {
	users: User[];
	// addUser: (text: string) => void;
}
