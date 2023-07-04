import Feed from "@/components/Feed";
import getCurrentUser from "@/actions/getCurrentUser";

type Props = {};

const page = async (props: Props) => {
  const currentUser = await getCurrentUser();
  console.log("currentUser", currentUser);

  return (
    <>
      <Feed currentUser={currentUser} />
    </>
  );
};

export default page;
