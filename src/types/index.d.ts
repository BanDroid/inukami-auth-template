import { Manga } from "@prisma/client";

export type Query = {
  page?: number;
  limit?: number;
  offset?: number;
  order: "asc" | "desc";
  search?: string;
};

export type PaginationResult = {
  next?: number | null;
  prev?: number | null;
  totalData: number;
  data: Manga[];
  paginate: {
    before?: number[];
    after?: number[];
  };
};
