import { Context } from "../index";

interface ProfileParentType {
  id: number;
  bio: string;
  userId: number;
}

export const Profile = {
  user: async (parent: ProfileParentType, __: any, { prisma, userInfo }: Context) => {
    return await prisma.user.findUnique({
      where: {
        id: parent.userId,
      },
    });
  },
};
