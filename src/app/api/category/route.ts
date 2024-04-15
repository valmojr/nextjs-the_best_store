import {
  createCategory,
  getCategory,
  getAllCategories,
  updateCategory,
  deleteCategory,
} from "./functions";
import GetStreamData, { StringToJSON } from "@/lib/utils";

export async function GET(request: Request, response: Response) {
  const data = StringToJSON(await GetStreamData(request?.body));

  if (!data.category) {
    return { error: "Bad Request", status: 401 };
  }

  const { category } = data;

  if (category) {
    return await getCategory(category);
  } else {
    return await getAllCategories();
  }
}

export async function POST(request: Request, response: Response) {
  const data = StringToJSON(await GetStreamData(request?.body));

  if (!data.category) {
    return { error: "Bad Request", status: 401 };
  }

  const { category } = data;

  const categoryOnDatabase = await createCategory(category);

  if (!categoryOnDatabase) {
    return { error: "Internal Server Error", status: 500 };
  }

  return { category: categoryOnDatabase };
}

export async function PUT(request: Request, response: Response) {
  const data = StringToJSON(await GetStreamData(request?.body));

  if (!data.category) {
    return { error: "Bad Request", status: 401 };
  }

  const { category } = data;

  const categoryIsOnDatabase = await getCategory(category);

  if (!categoryIsOnDatabase) {
    return await createCategory(category);
  } else {
    return await updateCategory(category);
  }
}

export async function PATCH(request: Request, response: Response) {
  const data = StringToJSON(await GetStreamData(request?.body));

  if (!data.category) {
    return { error: "Bad Request", status: 401 };
  }

  const { category } = data;

  const updatedCategory = await updateCategory(category);

  if (updatedCategory) {
    return { category: updatedCategory };
  } else {
    return { error: "Internal Server Error", status: 500 };
  }
}

export async function DELETE(request: Request, response: Response) {
  const data = StringToJSON(await GetStreamData(request?.body));

  if (!data.category) {
    return { error: "Bad Request", status: 401 };
  }

  const { category } = data;

  const deletedCategory = await deleteCategory(category);

  if (deletedCategory) {
    return { category: deletedCategory };
  } else {
    return { error: "Internal Server Error", status: 500 };
  }
}
