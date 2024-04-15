import {
  createProductCount,
  getProductCount,
  getAllProductCounts,
  updateProductCount,
  deleteProductCount,
} from "./functions";
import GetStreamData, { StringToJSON } from "@/lib/utils";

export async function GET(request: Request, response: Response) {
  const { ProductCount } = StringToJSON(await GetStreamData(request?.body));
  if (ProductCount) {
    return await getProductCount(ProductCount);
  } else {
    return await getAllProductCounts();
  }
}

export async function POST(request: Request, response: Response) {
  const { ProductCount } = StringToJSON(await GetStreamData(request?.body));

  if (!ProductCount) {
    return { error: "Bad Request", status: 401 };
  }

  const ProductCountOnDatabase = await createProductCount(ProductCount);

  if (!ProductCountOnDatabase) {
    return { error: "Internal Server Error", status: 500 };
  }

  return { ProductCount: ProductCountOnDatabase };
}

export async function PUT(request: Request, response: Response) {
  const { ProductCount } = StringToJSON(await GetStreamData(request?.body));

  if (!ProductCount) {
    return { error: "Bad Request", status: 401 };
  }

  const ProductCountIsOnDatabase = await getProductCount(ProductCount);

  if (!ProductCountIsOnDatabase) {
    return await createProductCount(ProductCount);
  } else {
    return await updateProductCount(ProductCount);
  }
}

export async function PATCH(request: Request, response: Response) {
  const { ProductCount } = StringToJSON(await GetStreamData(request?.body));

  if (!ProductCount) {
    return { error: "Bad Request", status: 401 };
  }

  const updatedProductCount = await updateProductCount(ProductCount);

  if (updatedProductCount) {
    return { ProductCount: updatedProductCount };
  } else {
    return { error: "Internal Server Error", status: 500 };
  }
}

export async function DELETE(request: Request, response: Response) {
  const { ProductCount } = StringToJSON(await GetStreamData(request?.body));

  if (!ProductCount) {
    return { error: "Bad Request", status: 401 };
  }

  const deletedProductCount = await deleteProductCount(ProductCount);

  if (deletedProductCount) {
    return { ProductCount: deletedProductCount };
  } else {
    return { error: "Internal Server Error", status: 500 };
  }
}
