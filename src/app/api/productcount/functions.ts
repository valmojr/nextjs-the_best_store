"use server";

import { ProductCount } from "@prisma/client";
import prisma from "../database";

export async function createProductCount(data: ProductCount) {
  return await prisma.productCount.create({ data });
}

export async function getProductCount(
  productCountOrProductCountId: ProductCount | string
) {
  return await prisma.productCount.findUnique({
    where: {
      id:
        typeof productCountOrProductCountId === "string"
          ? productCountOrProductCountId
          : productCountOrProductCountId.id,
    },
  });
}

export async function getAllCategories() {
  return await prisma.productCount.findMany();
}

export async function updateProductCount(data: ProductCount) {
  return await prisma.productCount.update({
    where: { id: data.id },
    data,
  });
}

export async function deleteProductCount(
  productCountOrProductCountId: ProductCount | string
) {
  return await prisma.productCount.delete({
    where: {
      id:
        typeof productCountOrProductCountId === "string"
          ? productCountOrProductCountId
          : productCountOrProductCountId.id,
    },
  });
}
