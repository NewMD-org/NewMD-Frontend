import { Navigate } from 'react-router-dom';
import cookie from 'react-cookies';
import background from './background.svg';
import './index.css';


export default function LogoutPage() {
    localStorage.clear();
    console.log('Local storage authorization removed');
    cookie.remove('navigate');
    console.log('Cookie navigate removed');

    return (
        <>
            <div className='LoginPage_background' style={{ backgroundImage: `url(${background})` }}></div>
            <Navigate to='/' />
        </>
    );
}