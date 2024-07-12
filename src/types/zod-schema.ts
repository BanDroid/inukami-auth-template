import { z } from "zod";

export const genreSchema = z.string().toLowerCase();

export const mangaSchema = z.object({
  title: z.string(),
  alternativeTitle: z.string(),
  slug: z.string().url({ message: "Slug should be URL valid" }),
  synopsis: z.string(),
  thumbnail: z.string().url({ message: "Invalid URL thumbnail" }),
  author: z.string(),
  artist: z.string(),
  type: z.string(),
  releaseDate: z.string({ message: "Invalid date" }).date(),
  score: z.number().min(0).max(10),
  status: z.string().optional(),
  genre: z.array(genreSchema),
});

const userBaseSchema = z.object({
  email: z.string().email(),
  username: z.string({ required_error: "Username is required" }),
});

const userWithPasswordSchema = userBaseSchema.extend({
  password: z.string().min(8),
});

const userWithoutPasswordSchema = userBaseSchema.extend({
  password: z.string().nullable(),
});

const userSchema = z.union([userWithPasswordSchema, userWithoutPasswordSchema]);

const accountSchema = z.object({
  type: z.string(),
  provider: z.string(),
  providerAccountId: z.string(),
  refresh_token: z.string().nullable(),
  access_token: z.string().nullable(),
  expires_at: z.number().nullable(),
  token_type: z.string().nullable(),
  scope: z.string().nullable(),
  id_token: z.string().nullable(),
  session_state: z.string().nullable(),
});

const sessionSchema = z.object({
  sessionToken: z.string(),
  userId: z.string(),
  expires: z.string(), // ISO date string
});

export { userSchema, accountSchema, sessionSchema };
