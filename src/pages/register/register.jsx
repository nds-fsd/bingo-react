
import { useForm } from "react-hook-form"
import { useState } from 'react';
import { api } from '../../utils/apiWrapper';
import { setUserSession } from '../../utils/localStorage.utils';

const Register = ({forceUpdate}) => {
    const [error, setError] = useState();

    const { register, handleSubmit, watch, formState: { errors } } = useForm({
    });

    const doRegister = (data) => {
        api.post('/auth/register', data)
        .then((response) => {
            console.log(response);
            if (response?.data.token) {
                setUserSession(response.data);
                forceUpdate();
            }
            
        });
    };

    const onSubmit = (data) => {
        doRegister(data);
    };


    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <h2>Create user</h2>
            <label for="name">
                Name*:
            </label>
            <input {...register('name', { required: "Name is required" })} placeholder="Name" />
            {errors.name && <p>{errors.name.message}</p>}<br/>
            

            <label for="name">
                Email*:
            </label>
            <input {...register('email', { required: "Email is required", pattern: { value: /^\S+@\S+$/i, message: "Invalid email format" } })} placeholder="Email" />
            {errors.email && <p>{errors.email.message}</p>}<br/>

            <label for="name">
                Password*:
            </label>
            <input {...register('password', { required: "Password is required", minLength: { value: 8, message: "Password must be at least 8 characters" } })} placeholder="Password" type="password" />
            {errors.password && <p>{errors.password.message}</p>}<br/>

           
            <input type="submit" />
    
        </form>
    );

};

export default Register;