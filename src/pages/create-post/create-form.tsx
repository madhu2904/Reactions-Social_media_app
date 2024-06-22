import {useForm} from "react-hook-form";
import * as yup from'yup';
import {addDoc,collection} from 'firebase/firestore';
import {db,auth} from "../../config/firebase";
import { yupResolver } from "@hookform/resolvers/yup";
import {useAuthState} from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";

interface CreateFormData{
    title:string;
    description:string;
}


export const CreateForm=()=>
    {
        const [user]=useAuthState(auth);
        const schema=yup.object().shape
        ({
            title:yup.string().required("Your post must have a title."),
            description:yup.string().required("You are requested to give a description"),
        });
        //for link from yup to form we use yup resover 
        const {register,handleSubmit,formState:{errors}}=useForm<CreateFormData>({resolver:yupResolver(schema)});
        
        const navigate=useNavigate();
        
        const postsRef=collection(db,"posts");

        

        const onCreatePost=async (data:CreateFormData)=>{
            await addDoc(postsRef,{
                title:data.title,
                description:data.description,
                user:user?.displayName,
                userId:user?.uid,
            })

            navigate("/");
        };

        return <form onSubmit={handleSubmit(onCreatePost)} className="createPostForm">
                   <input placeholder="Add title of your Post" {...register("title")} className="createPostTitle"/>
                   <p style={{color:"red"}}>{errors.title?.message}</p>
                   <textarea placeholder="Add Description of your Post" {...register("description")} className="createPostDescription"/>
                   <p style={{color:"red"}}>{errors.description?.message}</p>
                   <input type="submit" className="submitBtn"/>
        </form>
    }