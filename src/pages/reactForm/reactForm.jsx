import styles from './reactForm.module.css';
import { useForm } from "react-hook-form"
import { useState } from 'react';

const ReactForm = (props) => {
    const [responseError, setResponseError] = useState('');
    const [success, setSuccess] = useState(false);

    const { register, handleSubmit, watch, formState: { errors } } = useForm({
        defaultValues: {
            name: 'Pepe',
            email: 'pepe@gmail.com',
            password: '12345',
            age: '30',
            fruit: 'apple'
        }
    });

    const name = watch('name');


    const onSubmit = (data) => {
        console.log(watch('name'));
        console.log(data);
        fetch('http://localhost:3001/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then((response) => {
            console.log(response);
            if (response.status !== 200) {
                setResponseError(true);
            }
            return response.json();
        }).then((data) => {
            console.log(data);
            setSuccess(true);
        }).catch((error) => {
            console.log(error);
            setResponseError(true);
        });
    };

    if (responseError) return (
        <div className={styles.container}>
            <h1>HTML Form</h1>
            <h3>Something went wrong!</h3>
        </div>
    );

    if (success) return (
        <div className={styles.container}>
            <h1>HTML Form</h1>
            <h3>User created!</h3>
        </div>
    );

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
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

            <label for="name">
                Age:
            </label>
            <input {...register('age', { valueAsNumber: true, min: { value: 14, message: "Age must be a positive number" } })} placeholder="Age" type="number" /><br/>

            <label for="name">
                Favourite fruit:
            </label>
            <select {...register('fruit')}>
                <option value="">Select...</option>
                <option value="apple">Apple</option>
                <option value="banana">Banana</option>
                <option value="orange">Orange</option>
            </select><br/>

            <input type="submit" />
    
        </form>
    );

};

export default ReactForm;