import { useInvoice } from '@/contexts/Index';

const Users = () => {
    const { users } = useInvoice();
    console.log(users);
    return (
        <div className='page-container'>
            <h4>Users</h4>
            <div>
                <select name='users'>
                    <option>Choose user</option>
                    {users.map((user) => (
                        <option key={user.id} value={user.id}>
                            {user.name}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
};

export default Users;
