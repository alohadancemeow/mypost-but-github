import Feed from "@/components/Feed";
import getCurrentUser from "@/actions/getCurrentUser";
import getUsersByPost from "@/actions/getUsersByPost";
import getPopularPosts from "@/actions/getPopularPosts";

type Props = {};

const page = async (props: Props) => {
  const currentUser = await getCurrentUser();
  const users = await getUsersByPost();
  const popularPosts = await getPopularPosts();

  return (
    <>
      <Feed
        currentUser={currentUser}
        users={users}
        popularPosts={popularPosts}
      />
    </>
  );
};

export default page;
