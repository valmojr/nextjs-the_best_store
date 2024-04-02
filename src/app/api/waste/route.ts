import { NextResponse } from "next/server";
import {
  createWaste,
  getWaste,
  getAllWastes,
  updateWaste,
  deleteWaste,
} from "./functions";
import GetStreamData, { StringToJSON } from "@/lib/utils";
import { NextApiRequest, NextApiResponse } from "next";

export async function GET(request: Request) {
  const data = StringToJSON(await GetStreamData(request?.body));

  if (!data.waste) {
    return NextResponse.json({ error: "Bad Request", status: 401 });
  }

  const { waste } = data;

  if (waste) {
    return NextResponse.json(await getWaste(waste));
  } else {
    return NextResponse.json(await getAllWastes());
  }
}

export async function POST(request: Request) {
  const data = StringToJSON(await GetStreamData(request?.body));

  if (!data.waste) {
    return NextResponse.json({ error: "Bad Request", status: 401 });
  }

  const { waste } = data;

  const wasteOnDatabase = await createWaste(waste);

  if (!wasteOnDatabase) {
    return NextResponse.json({ error: "Internal Server Error", status: 500 });
  }

  return NextResponse.json({ waste: wasteOnDatabase });
}

export async function PUT(request: Request) {
  const data = StringToJSON(await GetStreamData(request?.body));

  if (!data.waste) {
    return NextResponse.json({ error: "Bad Request", status: 401 });
  }

  const { waste } = data;

  const wasteIsOnDatabase = await getWaste(waste);

  if (!wasteIsOnDatabase) {
    return NextResponse.json(await createWaste(waste));
  } else {
    return NextResponse.json(await updateWaste(waste));
  }
}

export async function PATCH(request: Request) {
  const data = StringToJSON(await GetStreamData(request?.body));

  if (!data.waste) {
    return NextResponse.json({ error: "Bad Request", status: 401 });
  }

  const { waste } = data;

  const updatedWaste = await updateWaste(waste);

  if (updatedWaste) {
    return NextResponse.json({ waste: updatedWaste });
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

  if (!data.waste) {
    return NextResponse.json({ error: "Bad Request", status: 401 });
  }

  const { waste } = data;

  const deletedWaste = await deleteWaste(waste);

  if (deletedWaste) {
    return NextResponse.json({ waste: deletedWaste });
  } else {
    return NextResponse.json({ error: "Internal Server Error", status: 500 });
  }
}
