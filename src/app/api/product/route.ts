import { NextResponse } from "next/server";
import {
  createProduct,
  getProduct,
  getAllProducts,
  updateProduct,
  deleteProduct,
} from "./functions";
import GetStreamData, { StringToJSON } from "@/lib/utils";

export async function GET(request: Request) {
  const { product } = StringToJSON(await GetStreamData(request?.body));
  if (product) {
    return NextResponse.json(await getProduct(product));
  } else {
    return NextResponse.json(await getAllProducts());
  }
}

export async function POST(request: Request) {
  const { product } = StringToJSON(await GetStreamData(request?.body));

  if (!product) {
    return NextResponse.json({ error: "Bad Request", status: 401 });
  }

  const productOnDatabase = await createProduct(product);

  if (!productOnDatabase) {
    return NextResponse.json({ error: "Internal Server Error", status: 500 });
  }

  return NextResponse.json({ product: productOnDatabase });
}

export async function PUT(request: Request) {
  const { product } = StringToJSON(await GetStreamData(request?.body));

  if (!product) {
    return NextResponse.json({ error: "Bad Request", status: 401 });
  }

  const productIsOnDatabase = await getProduct(product);

  if (!productIsOnDatabase) {
    return NextResponse.json(await createProduct(product));
  } else {
    return NextResponse.json(await updateProduct(product));
  }
}

export async function PATCH(request: Request) {
  const { product } = StringToJSON(await GetStreamData(request?.body));

  if (!product) {
    return NextResponse.json({ error: "Bad Request", status: 401 });
  }

  const updatedProduct = await updateProduct(product);

  if (updatedProduct) {
    return NextResponse.json({ product: updatedProduct });
  } else {
    return NextResponse.json({ error: "Internal Server Error", status: 500 });
  }
}

export async function DELETE(request: Request) {
  const { product } = StringToJSON(await GetStreamData(request?.body));

  if (!product) {
    return NextResponse.json({ error: "Bad Request", status: 401 });
  }

  const deletedProduct = await deleteProduct(product);

  if (deletedProduct) {
    return NextResponse.json({ product: deletedProduct });
  } else {
    return NextResponse.json({ error: "Internal Server Error", status: 500 });
  }
}
