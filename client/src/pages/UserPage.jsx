import { useParams } from "react-router-dom";
import UserHeader from "../components/UserHeader";
import UserPost from "../components/UserPost";
import useShowToast from "../hooks/useShowToast";
import { useState, useEffect } from "react";

const UserPage = () => {
  const [user,setuser] = useState(null);
  const {username} = useParams();
  const showtoast = useShowToast();
  useEffect(()=>{
    const getuser = async()=>{
      try {
        const res = await fetch(`/api/users/profile/${username}`);
        const data  =await res.json();
        if(data.error){
          showtoast("Error",data.error,"error");
          return;
        }  
        setuser(data);
        
      } catch (error) {
        showtoast("Error",error,"error");
      }
    };
    getuser();
  },[username,showtoast]);
if(!user) return null;
  return (
    <>
      <UserHeader user={user} />
      <UserPost
        likes={1200}
        replies={909}
        postImg={"/post1.png"}
        postTitle={"hello there"}
        postId={1}
      />
      <UserPost
        likes={1200}
        replies={909}
        postImg={"/post2.png"}
        postTitle={"hello there"}
        postId={2}
      />
      <UserPost
        likes={1200}
        replies={909}
        postImg={"/post3.png"}
        postTitle={"hello there"}
        postId={3}
      />
    </>
  );
};

export default UserPage;
