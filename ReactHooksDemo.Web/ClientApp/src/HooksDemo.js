import axios from 'axios';
import React, { useState, useEffect } from 'react';
import format from 'date-fns/format'

const HooksDemo = () => {

    const [count, setCount] = useState(0);
    const [text, setText] = useState('');
    const [person, setPerson] = useState({ firstName: '', lastName: '', age: '' });
    const [forecasts, setForecasts] = useState([]);

    useEffect(() => {
        const getForecasts = async () => {
            const { data } = await axios.get('/weatherforecast');
            setForecasts(data);
        }

        getForecasts();
    }, []);

    const onButtonClick = () => {
        setCount(count + 1);
    }

    const onTextChange = e => setText(e.target.value);

    const { firstName, lastName, age } = person;

    const onPersonTextChange = e => {
        const copy = { ...person };
        copy[e.target.name] = e.target.value;
        setPerson(copy);
    }

    return (
        <div className='container mt-5'>
            <h1>Hello hooks!!</h1>
            <h1>Count: {count}</h1>
            <button className='btn btn-primary' onClick={onButtonClick}>Click me!</button>
            <h3>{text}</h3>
            <div className='row'>
                <div className='col-md-4'>
                    <input value={text} onChange={onTextChange} className='form-control' type='text' />
                </div>
            </div>

            <table className='table table-bordered'>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Temperature C</th>
                        <th>Temperature F</th>
                        <th>Summary</th>
                    </tr>
                </thead>
                <tbody>
                    {forecasts.map((f, i) => <tr key={i}>
                        <td>{format(new Date(f.date), 'EEEE LLLL dd - yyyy')}</td>
                        <td>{f.temperatureC}</td>
                        <td>{f.temperatureF}</td>
                        <td>{f.summary}</td>
                    </tr>)}
                </tbody>

            </table>


            {/* <div className="row">
                <div className='col-md-6 offset-md-3 card card-body bg-light'>
                    <h2>Add a New Person</h2>
                    <input type="text" value={firstName} onChange={onPersonTextChange} className='form-control' name='firstName' placeholder="First Name" />
                    <br />
                    <input type="text" value={lastName} onChange={onPersonTextChange} className='form-control' name='lastName' placeholder="Last Name" />
                    <br />
                    <input type="text" value={age} onChange={onPersonTextChange} className='form-control' name='age' placeholder="Age" />
                    <br />
                    <button className='btn btn-primary btn-lg btn-block' onClick={() => console.log(person)}>Submit</button>
                </div>
            </div> */}
        </div>
    )
}

export default HooksDemo;