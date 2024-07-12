import UserHeader from "../components/UserHeader";
import UserPost from "../components/UserPost";

const UserPage = () => {
  return (
    <>
      <UserHeader />
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
