"use server";

import { Product } from "@prisma/client";
import prisma from "../database";

export async function createProduct(data: Product) {
  return await prisma.product.create({ data });
}

export async function getProduct(productOrProductId: Product | string) {
  return await prisma.product.findUnique({
    where: {
      id:
        typeof productOrProductId === "string"
          ? productOrProductId
          : productOrProductId.id,
    },
  });
}

export async function getAllProducts() {
  return await prisma.product.findMany();
}

export async function updateProduct(data: Product) {
  return await prisma.product.update({
    where: { id: data.id },
    data,
  });
}

export async function deleteProduct(productOrProductId: Product | string) {
  return await prisma.product.delete({
    where: {
      id:
        typeof productOrProductId === "string"
          ? productOrProductId
          : productOrProductId.id,
    },
  });
}
