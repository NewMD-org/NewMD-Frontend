import { useRef, useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import cookie from 'react-cookies';
import MdTimetableAPI from '../../api/MdTimetableAPI.js';
import logo from './logo.svg';
import background from './background.svg';
import './index.css';


async function sleep(ms = 0) {
    return new Promise(r => setTimeout(r, ms));
}

const Login = () => {
    const userRef = useRef();
    const errRef = useRef();
    const defaultRememberMe = localStorage.getItem('authorization') ? jwt_decode(localStorage.getItem('authorization')).rememberMe === 'true' ? true : false : false;

    const [ID, setID] = useState(defaultRememberMe ? jwt_decode(localStorage.getItem('authorization')).userID : '');
    const [PWD, setPWD] = useState(defaultRememberMe ? jwt_decode(localStorage.getItem('authorization')).userPWD : '');
    const [rememberMe, setRememberMe] = useState(defaultRememberMe.toString());
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);
    const [isLoading, setLoading] = useState(false);

    useEffect(() => {
        console.log('Render !');
    });

    useEffect(() => {
        userRef.current.focus();
    }, []);

    useEffect(() => {
        setErrMsg('');
    }, [ID, PWD, rememberMe]);

    const handleSubmit = async (e) => {
        console.log(e);
        e.preventDefault();
        setLoading(true);
        console.log('Form content :');
        console.log({ ID, PWD, rememberMe });

        await sleep(3000); // Must be remove before publish

        if (ID === '') setErrMsg('Missing Username.');
        if (PWD === '') setErrMsg('Missing Password.');

        try {
            const response = await new MdTimetableAPI(5).login(ID, PWD, rememberMe);
            localStorage.setItem('authorization', response.headers.authorization);
            cookie.save('navigate', 'true', { path: '/' });
            setID('');
            setPWD('');
            setRememberMe('');
            setSuccess(true);
        }
        catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response.');
            }
            else if (err.response?.status === 400) {
                setErrMsg(err.response?.data);
            }
            else if (err.response?.status === 401) {
                setErrMsg(err.response?.data);
            }
            else if (err.response?.status === 500) {
                setErrMsg(err.response?.data);
            }
            else {
                setErrMsg('Unexpected Error.');
            };
            localStorage.clear();
            cookie.remove('navigate');
            errRef.current.focus();
        };
        setLoading(false);
    };

    return (
        <>
            {success ? (
                <Navigate to='/table' />
            ) : (
                <>
                    <div className='LoginPage'>
                        <div className='LoginPage_background' style={{ backgroundImage: `url(${background})` }}></div>
                        <img alt='logo' src={logo} className='LoginPage_logo' />
                        <div className='LoginPage_center'>
                            <p ref={errRef} className={errMsg ? 'LoginPage_errmsg' : 'LoginPage_offscreen'} aria-live='assertive'>{errMsg}</p>
                            <form onSubmit={handleSubmit}>
                                <div className='LoginPage_textfield LoginPage_rightDiv'>
                                    <input type='text' name='ID' ref={userRef} value={ID} onChange={(e) => setID(e.target.value)} placeholder='Username' />
                                    <span className='LoginPage_text_focusEffect'></span>
                                </div>
                                <div className='LoginPage_textfield LoginPage_rightDiv'>
                                    <input className='LoginPage_password' type='password' name='PWD' value={PWD} onChange={(e) => setPWD(e.target.value)} placeholder='Password' />
                                    <span className='LoginPage_text_focusEffect'></span>
                                </div>
                                <div className='LoginPage_rememberme'>
                                    <div>
                                        <input id='cbox' type='checkbox' name='rememberMe' onChange={(e) => setRememberMe(e.target.checked ? 'true' : 'false')} defaultChecked={defaultRememberMe} />
                                        <label htmlFor='cbox'>Remember me for 7 days</label>
                                    </div>
                                </div>
                                <div className='LoginPage_centerDiv'>
                                    {isLoading ? (
                                        <button className='LoginPage_signin' style={{ 'cursor': 'not-allowed' }} disabled>
                                            <span className='spinner-border' aria-hidden='true'></span>
                                        </button>
                                    ) : (
                                        <button className='LoginPage_signin'>Sign in</button>
                                    )}
                                </div>
                            </form>
                        </div>
                    </div>
                </>
            )}
        </>
    );
}

export default function LoginPage() {
    try {
        if (localStorage.getItem('authorization')) {
            if (jwt_decode(localStorage.getItem('authorization')).exp <= (new Date().getTime() / 1000)) {
                localStorage.clear();
                cookie.remove('navigate');
                console.log('Local storage authorization expired, clear local storage');
                return (<Login />);
            }
            else {
                console.log('Local storage authorization found');
                if (cookie.load('navigate') === 'true') {
                    console.log('Cookie navigate found');
                    return (<Navigate to='/table' />);
                }
                else {
                    cookie.remove('navigate');
                    console.log('Cookie navigate not found');
                    return (<Login />);
                };
            };
        }
        else {
            console.log('Local storage authorization not found');
            localStorage.clear();
            cookie.remove('navigate');
            return (<Login />);
        };
    }
    catch (err) {
        localStorage.clear();
        cookie.remove('navigate');
        console.log('Catch error, clear local storage and cookie');
        return (<Login />);
    };
}