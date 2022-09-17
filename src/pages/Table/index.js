import { useRef, useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import cookie from 'react-cookies';
import axios from '../../api/MdTimetableAPI';
import NavbarTop from './components/navbarTop';
import jwt_decode from 'jwt-decode';
import './index.css';


const loginAPI = '/cloud/users/login';
// document.body.onload = addElement("d1n1", "班會", "呂信寬");

// function addElement(id, classname, teacher) {
//     const classnameDiv = document.createElement("div");
//     const classnameContent = document.createTextNode(classname);
//     classnameDiv.appendChild(classnameContent);
//     const teacherDiv = document.createElement("div");
//     const teacherContent = document.createTextNode(teacher);
//     teacherDiv.appendChild(teacherContent);

//     document.getElementById(id).appendChild(classnameDiv).appendChild(teacherDiv);
// }


const Table = () => {
    const [isLoading, setLoading] = useState(false);

    // const [d1n1_C, set_d1n1_C] = useState('');
    // set_d1n1_C('123');

    // if (isLoading) {
    //     return <div className="App">Loading...</div>;
    // }
    // else {

    // }

    return (
        <>
            <div className='TablePage_background'>
                <NavbarTop />
            </div>
        </>
    );
}

export default function TablePage() {
    try {
        if (localStorage.getItem('authorization')) {
            if (jwt_decode(localStorage.getItem('authorization')).exp <= (new Date().getTime() / 1000)) {
                localStorage.clear();
                console.log('Local storage authorization expired, clear local storage');
                return (<Navigate to='/' />);
            }
            else {
                console.log('Local storage authorization found');
                if (cookie.load('navigate') === 'true') {
                    console.log('Cookie navigate found');
                    return (<Table />);
                }
                else {
                    console.log('Cookie navigate not found');
                    return (<Navigate to='/' />);
                };
            };
        }
        else {
            console.log('Local storage authorization not found');
            localStorage.clear();
            cookie.remove('navigate');
            return (<Navigate to='/' />);
        };
    }
    catch (err) {
        localStorage.clear();
        cookie.remove('navigate');
        console.log('Catch error, clear local storage and cookie');
        return (<Navigate to='/' />);
    };
}