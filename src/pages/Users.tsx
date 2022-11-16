import React, { useEffect } from "react";
import { useInvoice } from "@/contexts/Index";

type Props = {};

const Users = (props: Props) => {
	const { users } = useInvoice();
	console.log(users);
	return <div>Users</div>;
};

export default Users;
