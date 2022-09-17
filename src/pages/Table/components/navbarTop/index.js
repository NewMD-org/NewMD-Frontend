import { Link, useMatch, useResolvedPath } from 'react-router-dom';
import cookie from 'react-cookies';
import './index.css';


function removeCookie() {
    cookie.remove('navigate');
    console.log('Cookie removed');
}

export default function NavbarTop() {
    return (
        <nav className='nav'>
            <Link to='/' className='site-title' onClick={removeCookie}>
                NewMD
            </Link>
            <ul>
                <CustomLink to='/logout'>Logout</CustomLink>
            </ul>
        </nav>
    );
}

function CustomLink({ to, children, ...props }) {
    const resolvedPath = useResolvedPath(to);
    const isActive = useMatch({ path: resolvedPath.pathname, end: true });

    return (
        <li className={isActive ? 'active' : ''}>
            <Link to={to} {...props}>
                {children}
            </Link>
        </li>
    );
}