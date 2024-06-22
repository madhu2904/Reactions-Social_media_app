import { collection,getDocs } from "firebase/firestore";
import {db} from "../../config/firebase";
import { useState,useEffect} from "react";
import { Post } from "./post";

export interface Post{
    id:string;
    userId:string;
    user:string;
    title:string;
    description:string;
}

export const Main=()=>
  {
    const postsRef= collection(db,"posts");
const[postsList,setPostsList]=useState<Post[] | null>(null);

const getPosts=async()=>
    {
        const data=getDocs(postsRef);
       setPostsList((await data).docs.map((doc)=>({...doc.data(),id:doc.id})) as Post[]);
    }
useEffect(()=>{getPosts();},[]);
    return <div>
        {postsList?.map((post)=>(<Post post={post}/>))}</div>
    }