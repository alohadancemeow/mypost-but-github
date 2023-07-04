import Feed from "@/components/Feed";
import getCurrentUser from "@/actions/getCurrentUser";
import getUsersByPost from "@/actions/getUsersByPost";

type Props = {};

const page = async (props: Props) => {
  const currentUser = await getCurrentUser();
  const users = await getUsersByPost();

  return (
    <>
      <Feed currentUser={currentUser} users={users} />
    </>
  );
};

export default page;
