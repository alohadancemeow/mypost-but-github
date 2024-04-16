import Feed from "@/components/feed";
import getCurrentUser from "@/actions/getCurrentUser";
import getUsersByPost from "@/actions/getUsersByPost";
import getPopularPosts from "@/actions/getPopularPosts";

import { auth, currentUser } from "@clerk/nextjs";

type Props = {};

const page = async (props: Props) => {
  // const {userId, user} = auth()
  // const currentUser = await getCurrentUser();

  const user = await currentUser()

  // const users = await getUsersByPost();
  const popularPosts = await getPopularPosts();

  

  return (
    <>
      <Feed
        currentUser={user}
        // users={users}
        popularPosts={popularPosts}
      />
    </>
  );
};

export default page;
