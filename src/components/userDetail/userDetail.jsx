import {api} from '../../utils/apiWrapper';
import { useQueryClient } from 'react-query';

const UserDetail = ({ user }) => {
    const { name, email, _id: id } = user;

    const queryClient = useQueryClient();
    
    const deleteUser = () => {
        api.delete(`/users/${id}`)
        .then(res => console.log(res.data) )
        .catch(e => console.log(e))
        .finally(() => queryClient?.invalidateQueries('users'));
    }


    return (
        <div className="user-detail">
            <h2>{name}</h2>
            <p>{email}</p>
            <button onClick={deleteUser}>Delete</button>
        </div>
    );
};

export default UserDetail;