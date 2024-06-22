import {NavLink} from 'react-router-dom'
import {auth} from '../config/firebase'; 
import {useAuthState} from 'react-firebase-hooks/auth';
import {signOut} from 'firebase/auth';

export const Navbar=()=>
    {
        const [user]=useAuthState(auth);
        const signUserOut= async ()=>{
            await signOut(auth);
        }
        return <div className='navbar'>
            <div className="link">
            <NavLink   className={({ isActive }) => isActive ? 'nav-link active-nav-link' : 'nav-link'}  to="/">Home</NavLink>
            {!user ?<NavLink  className={({ isActive }) => isActive ? 'nav-link active-nav-link' : 'nav-link'}  to="/login">Login</NavLink>
           : <NavLink  className={({ isActive }) => isActive ? 'nav-link active-nav-link' : 'nav-link'}  to="/createpost">Create Post</NavLink>}

            </div>
            <div className="user">
                {user && <div className="user">
                    <img src={user?.photoURL || ""} height="20" width="20" />
                    <p className="userName">{user?.displayName}</p>
                    <button className="logout" onClick={signUserOut}>LogOut</button>
                </div>
            }
            </div>

        </div>
    }