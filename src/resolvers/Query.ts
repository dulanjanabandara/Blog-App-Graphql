import { Context } from "../index";

export const Query = {
  me: async (_: any, __: any, { prisma, userInfo }: Context) => {
    if (!userInfo) return null;
    return await prisma.user.findUnique({ where: { id: userInfo.userId } });
  },

  posts: async (_: any, __: any, { prisma }: Context) => {
    return prisma.post.findMany({
      orderBy: [
        {
          createdAt: "desc",
        },
      ],
    });
  },

  profile: async (_: any, { userId }: { userId: string }, { prisma, userInfo }: Context) => {
    return await prisma.profile.findUnique({ where: { userId: Number(userId) } });
  },
};
