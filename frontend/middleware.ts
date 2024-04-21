import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  publicRoutes: [
    "/",
    "/api/posts",
    "/api/user/(.*)",
    "/user/(.*)",
    "/post/(.*)",
  ],
  ignoredRoutes: ["/((?!api|trpc))(_next.*|.+.[w]+$)", "/api/posts"],
});

export const config = {
  matcher: ["/((?!.+.[w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
