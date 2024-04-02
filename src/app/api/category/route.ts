import { NextResponse } from "next/server";
import {
  createCategory,
  getCategory,
  getAllCategories,
  updateCategory,
  deleteCategory,
} from "./functions";
import GetStreamData, { StringToJSON } from "@/lib/utils";
import { NextApiRequest, NextApiResponse } from "next";

export async function GET(request: Request) {
  const data = StringToJSON(await GetStreamData(request?.body));

  if (!data.category) {
    return NextResponse.json({ error: "Bad Request", status: 401 });
  }

  const { category } = data;

  if (category) {
    return NextResponse.json(await getCategory(category));
  } else {
    return NextResponse.json(await getAllCategories());
  }
}

export async function POST(request: Request) {
  const data = StringToJSON(await GetStreamData(request?.body));

  if (!data.category) {
    return NextResponse.json({ error: "Bad Request", status: 401 });
  }

  const { category } = data;

  const categoryOnDatabase = await createCategory(category);

  if (!categoryOnDatabase) {
    return NextResponse.json({ error: "Internal Server Error", status: 500 });
  }

  return NextResponse.json({ category: categoryOnDatabase });
}

export async function PUT(request: Request) {
  const data = StringToJSON(await GetStreamData(request?.body));

  if (!data.category) {
    return NextResponse.json({ error: "Bad Request", status: 401 });
  }

  const { category } = data;

  const categoryIsOnDatabase = await getCategory(category);

  if (!categoryIsOnDatabase) {
    return NextResponse.json(await createCategory(category));
  } else {
    return NextResponse.json(await updateCategory(category));
  }
}

export async function PATCH(request: Request) {
  const data = StringToJSON(await GetStreamData(request?.body));

  if (!data.category) {
    return NextResponse.json({ error: "Bad Request", status: 401 });
  }

  const { category } = data;

  const updatedCategory = await updateCategory(category);

  if (updatedCategory) {
    return NextResponse.json({ category: updatedCategory });
  } else {
    return NextResponse.json({ error: "Internal Server Error", status: 500 });
  }
}

export async function DELETE(
  request: NextApiRequest,
  response: NextApiResponse
) {
  const adeq = request.body as unknown as NodeJS.ReadableStream;
  adeq.pipe(response);

  const data = StringToJSON(await GetStreamData(request?.body));

  if (!data.category) {
    return NextResponse.json({ error: "Bad Request", status: 401 });
  }

  const { category } = data;

  const deletedCategory = await deleteCategory(category);

  if (deletedCategory) {
    return NextResponse.json({ category: deletedCategory });
  } else {
    return NextResponse.json({ error: "Internal Server Error", status: 500 });
  }
}
