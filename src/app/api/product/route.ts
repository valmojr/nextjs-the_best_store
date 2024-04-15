import {
  createProduct,
  getProduct,
  getAllProducts,
  updateProduct,
  deleteProduct,
} from "./functions";
import GetStreamData, { StringToJSON } from "@/lib/utils";

export async function GET(request: Request, response: Response) {
  const { product } = StringToJSON(await GetStreamData(request?.body));
  if (product) {
    return await getProduct(product);
  } else {
    return await getAllProducts();
  }
}

export async function POST(request: Request, response: Response) {
  const { product } = StringToJSON(await GetStreamData(request?.body));

  if (!product) {
    return { error: "Bad Request", status: 401 };
  }

  const productOnDatabase = await createProduct(product);

  if (!productOnDatabase) {
    return { error: "Internal Server Error", status: 500 };
  }

  return { product: productOnDatabase };
}

export async function PUT(request: Request, response: Response) {
  const { product } = StringToJSON(await GetStreamData(request?.body));

  if (!product) {
    return { error: "Bad Request", status: 401 };
  }

  const productIsOnDatabase = await getProduct(product);

  if (!productIsOnDatabase) {
    return await createProduct(product);
  } else {
    return await updateProduct(product);
  }
}

export async function PATCH(request: Request, response: Response) {
  const { product } = StringToJSON(await GetStreamData(request?.body));

  if (!product) {
    return { error: "Bad Request", status: 401 };
  }

  const updatedProduct = await updateProduct(product);

  if (updatedProduct) {
    return { product: updatedProduct };
  } else {
    return { error: "Internal Server Error", status: 500 };
  }
}

export async function DELETE(request: Request, response: Response) {
  const { product } = StringToJSON(await GetStreamData(request?.body));

  if (!product) {
    return { error: "Bad Request", status: 401 };
  }

  const deletedProduct = await deleteProduct(product);

  if (deletedProduct) {
    return { product: deletedProduct };
  } else {
    return { error: "Internal Server Error", status: 500 };
  }
}
