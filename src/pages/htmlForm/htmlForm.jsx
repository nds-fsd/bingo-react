import { useState } from 'react';
import styles from './htmlForm.module.css';
import { set } from 'react-hook-form';

const HtmlForm = (props) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [age, setAge] = useState('');
    const [fruit, setFruit] = useState('apple');
    const [success, setSuccess] = useState(false);

    const [errors , setError] = useState({name: '', email: '', password: '', age: ''});

    const [responseError, setResponseError] = useState(false);

    const handleName = (event) => {
        setName(event.target.value);
    };

    const handleEmail = (event) => {
        setEmail(event.target.value);
    };

    const handlePassword = (event) => {
        setPassword(event.target.value);
    };

    const handleAge = (event) => {
        setAge(event.target.value);
    };

    const handleChangeFruit = (event) => {
        setFruit(event.target.value);
    };

    function validateEmail(email) {
        const pattern = new RegExp(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/);
        return pattern.test(email);
    };

    const handleSubmit = () => {
        const data = {name, email, password, age, fruit};
        console.log(data);
        let error = {...errors};

        if (!name) {
            error = {...error, name: 'Name is required'};
        } else {
            error = {...error, name: ''};
        }
        if (!email || !validateEmail(email)) {
            error = {...error, email: 'Email is required'};
        } else {
            error = {...error, email: ''};
        }
        if (!password || password.length < 8) {
            error = {...error, password: 'Password must be at least 8 characters'};
        } else {
            error = {...error, password: ''};
        }
        if (!age || (age < 14 || age > 130)) {
            error = {...error, age: 'Age must more than 14'};
        } else {
            error = {...error, age: ''};
        }
        setError(error);
        console.log('error', error);

        if (error.name || error.email || error.password || error.age) return;
        
        console.log('data', data);

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
        <div className={styles.container}>
            <h1>HTML Form</h1>
            <h3>Create user</h3>
            {errors.name && <p>{errors.name}</p>}
            <label for="name">
                Name*:
                <input id='name' required  minlength="3" type="text" value={name} placeholder='Pepe' onChange={handleName}/>
            </label><br/>

            {errors.email && <p>{errors.email}</p>}
            <label for="email">
                Email*:
                <input id='email' required  minlength="3" type="text" value={email} placeholder='example@example.com' onChange={handleEmail}/>
            </label><br/>
            
            {errors.password && <p>{errors.password}</p>}
            <label for="password">
                Password*:
                <input id='password' required  minlength="8" type="password" value={password} placeholder='******' onChange={handlePassword}/>
            </label><br/>

            <label for="age">
                Age:
                <input id='age' min="14" max="130" type="number" value={age} placeholder='18' onChange={handleAge}/>
            </label><br/>

            <label for="fruit">
                Favourite fruit:
                <select required  name="fruit" id="fruit" onChange={handleChangeFruit}>
                    <option value="apple">Apple</option>
                    <option value="banana">Banana</option>
                    <option value="orange">Orange</option>
                </select>
            </label><br/>

            <button type="submit" onClick={handleSubmit}>Submit</button>
        </div>
    );
};

export default HtmlForm;