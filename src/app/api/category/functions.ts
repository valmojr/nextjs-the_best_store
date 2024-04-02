"use server";

import { Category } from "@prisma/client";
import prisma from "../database";

export async function createCategory(data: Category) {
  return await prisma.category.create({ data });
}

export async function getCategory(categoryOrCategoryId: Category | string) {
  return await prisma.category.findUnique({
    where: {
      id:
        typeof categoryOrCategoryId === "string"
          ? categoryOrCategoryId
          : categoryOrCategoryId.id,
    },
  });
}

export async function getAllCategories() {
  return await prisma.category.findMany();
}

export async function updateCategory(data: Category) {
  return await prisma.category.update({
    where: { id: data.id },
    data,
  });
}

export async function deleteCategory(categoryOrCategoryId: Category | string) {
  return await prisma.category.delete({
    where: {
      id:
        typeof categoryOrCategoryId === "string"
          ? categoryOrCategoryId
          : categoryOrCategoryId.id,
    },
  });
}
