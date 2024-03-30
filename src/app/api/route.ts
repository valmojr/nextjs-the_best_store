import { NextResponse } from "next/server";

function HelloWorld(Request: Request, response: Response) {
  return new NextResponse<{ message: string }>(
    JSON.stringify({ message: "Hello World" })
  );
}

export {
  HelloWorld as GET,
  HelloWorld as POST,
  HelloWorld as PUT,
  HelloWorld as PATCH,
  HelloWorld as DELETE,
};
