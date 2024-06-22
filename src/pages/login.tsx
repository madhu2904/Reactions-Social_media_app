import {auth,provider} from '../config/firebase';
import { signInWithPopup} from "firebase/auth";
import {useNavigate} from "react-router-dom";
export const Login=()=>
    {
        //As soon as i complete logging in i should be redirected to home page
        const navigate=useNavigate();
        const signInWithGoogle=async ()=>
            {
                const result=await signInWithPopup(auth,provider);
                console.log(result);
                navigate("/");
            }
        return <div>
            <p style={{fontSize:70 }}>Sign In With Google To Continue</p>
            <button onClick={signInWithGoogle} style={{height:40 ,backgroundColor:'lightblue', fontSize:20,color:'black'}}>Sign In with Google</button>
        </div>
    }