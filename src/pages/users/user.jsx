import { useQueryClient, useQuery } from "react-query";
import { api } from "../../utils/apiWrapper";
import UserDetail from "../../components/userDetail/userDetail";
import { getUserToken } from "../../utils/localStorage.utils";

const Users = ({token}) => {

    if (!token) {
        return (
            <div>
                <h1>Users</h1>
                <div>You are not logged in</div>
            </div>
        );
    }

    
    const getUsers = () => {
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        }
        return api.get('/users', config)
            .then(res => res.data)
            .catch(e => console.log(e));
    }

    const {data, isLoading} = useQuery('users', getUsers);

    if (isLoading) return <div>Loading...</div>;


    return (
    <div>
        <h1>Users</h1>
        {data?.length === 0 && <div>No users found</div>}
        {data?.map(user => (
            <UserDetail key={user._id} user={user} />
        ))}
    </div>);
};

export default Users;