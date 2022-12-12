import { Context } from "../index";

interface PostParentType {
  authorId: number;
}

export const Post = {
  user: async (parent: PostParentType, __: any, { prisma, userInfo }: Context) => {
    return await prisma.user.findUnique({
      where: {
        id: parent.authorId,
      },
    });
  },
};
