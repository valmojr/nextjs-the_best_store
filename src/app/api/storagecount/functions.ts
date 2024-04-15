"use server";

import { Product, StorageCount } from "@prisma/client";
import prisma from "../database";
import { randomUUID } from "crypto";

export async function createStorage(
  data: { product: Product; count: number }[]
) {
  const storage = await prisma.storageCount.create({
    data: {
      id: randomUUID(),
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });

  data.forEach(
    async (productCount) =>
      await prisma.productCount.create({
        data: {
          id: randomUUID(),
          createdAt: new Date(),
          updatedAt: new Date(),
          productId: productCount.product.id,
          count: productCount.count,
        },
      })
  );

  return await prisma.storageCount.findUnique({
    where: {
      id: storage.id,
    },
  });
}

export async function createStorageCount(data: StorageCount) {
  return await prisma.storageCount.create({ data });
}

export async function getStorageCount(
  storageCountOrStorageCountId: StorageCount | string
) {
  return await prisma.storageCount.findUnique({
    where: {
      id:
        typeof storageCountOrStorageCountId === "string"
          ? storageCountOrStorageCountId
          : storageCountOrStorageCountId.id,
    },
  });
}

export async function getAllStorageCounts() {
  return await prisma.storageCount.findMany();
}

export async function updateStorageCount(data: StorageCount) {
  return await prisma.storageCount.update({
    where: { id: data.id },
    data,
  });
}

export async function deleteStorageCount(
  storageCountOrStorageCountId: StorageCount | string
) {
  return await prisma.storageCount.delete({
    where: {
      id:
        typeof storageCountOrStorageCountId === "string"
          ? storageCountOrStorageCountId
          : storageCountOrStorageCountId.id,
    },
  });
}
