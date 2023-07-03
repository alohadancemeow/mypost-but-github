import Feed from "@/components/Feed";
import Nav from "@/components/Feed/Nav";

import getCurrentUser from "@/actions/getCurrentUser";

type Props = {};

const page = async (props: Props) => {
  const currentUser = await getCurrentUser();
  console.log("currentUser", currentUser);

  return (
    <>
      <Nav currentUser={currentUser} />
      <Feed currentUser={currentUser} />
    </>
  );
};

export default page;
