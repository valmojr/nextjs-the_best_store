import {
  createStorageCount,
  getStorageCount,
  getAllStorageCounts,
  updateStorageCount,
  deleteStorageCount,
} from "./functions";
import GetStreamData, { StringToJSON } from "@/lib/utils";

export async function GET(request: Request, response: Response) {
  const { StorageCount } = StringToJSON(await GetStreamData(request?.body));
  if (StorageCount) {
    return await getStorageCount(StorageCount);
  } else {
    return await getAllStorageCounts();
  }
}

export async function POST(request: Request, response: Response) {
  const { StorageCount } = StringToJSON(await GetStreamData(request?.body));

  if (!StorageCount) {
    return { error: "Bad Request", status: 401 };
  }

  const StorageCountOnDatabase = await createStorageCount(StorageCount);

  if (!StorageCountOnDatabase) {
    return { error: "Internal Server Error", status: 500 };
  }

  return { StorageCount: StorageCountOnDatabase };
}

export async function PUT(request: Request, response: Response) {
  const { StorageCount } = StringToJSON(await GetStreamData(request?.body));

  if (!StorageCount) {
    return { error: "Bad Request", status: 401 };
  }

  const StorageCountIsOnDatabase = await getStorageCount(StorageCount);

  if (!StorageCountIsOnDatabase) {
    return await createStorageCount(StorageCount);
  } else {
    return await updateStorageCount(StorageCount);
  }
}

export async function PATCH(request: Request, response: Response) {
  const { StorageCount } = StringToJSON(await GetStreamData(request?.body));

  if (!StorageCount) {
    return { error: "Bad Request", status: 401 };
  }

  const updatedStorageCount = await updateStorageCount(StorageCount);

  if (updatedStorageCount) {
    return { StorageCount: updatedStorageCount };
  } else {
    return { error: "Internal Server Error", status: 500 };
  }
}

export async function DELETE(request: Request, response: Response) {
  const { StorageCount } = StringToJSON(await GetStreamData(request?.body));

  if (!StorageCount) {
    return { error: "Bad Request", status: 401 };
  }

  const deletedStorageCount = await deleteStorageCount(StorageCount);

  if (deletedStorageCount) {
    return { StorageCount: deletedStorageCount };
  } else {
    return { error: "Internal Server Error", status: 500 };
  }
}
