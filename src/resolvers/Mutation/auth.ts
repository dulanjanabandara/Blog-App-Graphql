import validator from "validator";
import { Context } from "../../index";

interface SignupArgs {
  email: string;
  name: string;
  bio: string;
  password: string;
}

interface UserPayload {
  userErrors: { message: string }[];
  user: null;
}

export const authResolvers = {
  signup: async (_: any, { email, name, password, bio }: SignupArgs, { prisma }: Context): Promise<UserPayload> => {
    const isEmail = validator.isEmail(email);
    const isValidPassword = validator.isLength(password, {
      min: 5,
    });

    if (!isEmail) {
      return {
        userErrors: [{ message: "Invalid email" }],
        user: null,
      };
    }

    if (!isValidPassword) {
      return {
        userErrors: [{ message: "Invalid password" }],
        user: null,
      };
    }

    if (!name || !bio) {
      return {
        userErrors: [{ message: "Invalid name or bio" }],
        user: null,
      };
    }

    return {
      userErrors: [],
      user: null,
    };

    // return prisma.user.create({ data: { email, name, password } });
  },
};
