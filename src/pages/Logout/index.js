import { Navigate } from 'react-router-dom';
import cookie from 'react-cookies';
import background from './background.svg';
import './index.css';


export function LogoutPage() {
    localStorage.clear();
    cookie.remove('navigate');
    console.log("Clear local storage and cookie");

    return (
        <>
            <div className='LoginPage_background' style={{ backgroundImage: `url(${background})` }}></div>
            <Navigate to='/' />
        </>
    );
}