import { Context } from "../index";
import { Post } from ".prisma/client";

interface PostArgs {
  post: {
    title?: string;
    content?: string;
  };
}

interface PostPayloadType {
  userErrors: { message: string }[];
  post: Post | null;
}

export const Mutation = {
  postCreate: async (_: any, { post }: PostArgs, { prisma }: Context): Promise<PostPayloadType> => {
    const { title, content } = post;
    if (!title || !content) {
      return {
        userErrors: [
          {
            message: "You must provide a title and a content to create a post",
          },
        ],
        post: null,
      };
    }

    const createdPost = await prisma.post.create({
      data: {
        title,
        content,
        authorId: 1,
      },
    });

    return { userErrors: [], post: createdPost };
  },
  postUpdate: async (_: any, { postId, post }: { postId: string; post: PostArgs["post"] }, { prisma }: Context): Promise<PostPayloadType> => {
    const { title, content } = post;

    if (!title && !content) {
      return {
        userErrors: [{ message: "Need to have at least one field to update!" }],
        post: null,
      };
    }

    const existingPost = await prisma.post.findUnique({ where: { id: Number(postId) } });
    if (!existingPost) {
      return {
        userErrors: [{ message: "Post does not exist!" }],
        post: null,
      };
    }

    let payloadToUpdate = {
      title,
      content,
    };
    if (!title) delete payloadToUpdate.title;
    if (!content) delete payloadToUpdate.content;

    const updatedPost = await prisma.post.update({ where: { id: Number(postId) }, data: { ...payloadToUpdate } });
    return { userErrors: [], post: updatedPost };
  },
};