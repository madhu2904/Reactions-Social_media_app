import { addDoc, collection,query, where,getDocs,deleteDoc, doc } from "firebase/firestore";
import {Post as IPost} from "./main";
import { auth, db } from "../../config/firebase";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect, useState } from "react";
interface Props
{
    post:IPost;
}
interface Like{
    userId:string;
    likeId:string;
}
export const Post=(props:Props)=>
    {   
const [like,setLike]=useState<Like[] | null>(null)
        const {post}=props;
        const likesRef=collection(db,"likes");

        const likesDoc=query(likesRef,where("postId","==",post.id));
        const [user]=useAuthState(auth);
        const addLike=async ()=>{
            try{
            const newDoc=await addDoc(likesRef,{
                userId:user?.uid,
                postId:post.id
            });
            if(user){
        setLike((prev)=> prev ? [...prev,{userId:user.uid, likeId:newDoc.id}] : [{userId:user.uid,likeId:newDoc.id}])}
        }
        catch(err){
            console.log(err);
        }};

        const removeLike=async ()=>{
            try{
                const likeToDeleteQuery=query(likesRef,where("postId","==",post.id),where("userId","==",user?.uid));
                
                const likeToDeleteData=await getDocs(likeToDeleteQuery);
                const likeId = likeToDeleteData.docs[0].id;
                const likeToDelete=doc(db,"likes",likeId);
                await deleteDoc(likeToDelete);
             if(user){
        setLike((prev)=> prev && prev.filter((like)=>like.likeId !== likeId) );}
        }
        catch(err){
            console.log(err);
        }};

     const getLikes=async()=>
                {
                    const data=await getDocs(likesDoc);
                    setLike(data.docs.map((doc)=>({userId: doc.data().userId,likeId:doc.data().likeId})));
                }

               useEffect(() =>{getLikes();},[]);

    const hasUserLiked = like?.find((lik)=>(lik.userId === user?.uid))  

        
        return <div className="post">
             <header><p>@{post.user}</p></header>
<div className="postInside">
   
            <div className="title">
                <h1>{post.title}</h1>
            </div>
            <div className="description">
                <p>{post.description}</p>
            </div>
            <div className="footer">
                <footer>
                    
                    <button className="likeBtn" onClick={hasUserLiked ? removeLike : addLike}>{hasUserLiked ? <>&#128151; </> : <> &#9825;</>}</button>
                    {like && <p className="likeAmount"> {like?.length}</p>}
                </footer>
            </div>
            
        </div>
        </div>
    }