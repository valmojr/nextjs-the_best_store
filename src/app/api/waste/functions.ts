"use server";

import { Waste } from "@prisma/client";
import prisma from "../database";

export async function createWaste(data: Waste) {
  return await prisma.waste.create({ data });
}

export async function getWaste(wasteOrWasteId: Waste | string) {
  return await prisma.waste.findUnique({
    where: {
      id:
        typeof wasteOrWasteId === "string" ? wasteOrWasteId : wasteOrWasteId.id,
    },
  });
}

export async function getAllWastes() {
  return await prisma.waste.findMany();
}

export async function updateWaste(data: Waste) {
  return await prisma.waste.update({
    where: { id: data.id },
    data,
  });
}

export async function deleteWaste(wasteOrWasteId: Waste | string) {
  return await prisma.waste.delete({
    where: {
      id:
        typeof wasteOrWasteId === "string" ? wasteOrWasteId : wasteOrWasteId.id,
    },
  });
}
