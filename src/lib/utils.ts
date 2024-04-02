import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function JSONtoString(data: any) {
  return JSON.stringify(data);
}

export function StringToJSON(data: string) {
  try {
    return JSON.parse(data);
  } catch (error) {
    return false;
  }
}

export default async function GetStreamData(
  readableStream: ReadableStream<Uint8Array> | null
): Promise<string> {
  if (!readableStream) {
    throw new Error("undefined stream");
  }
  const reader = readableStream.getReader();

  return new Promise((resolve, reject) => {
    const chunks: Uint8Array[] = [];

    async function pump(): Promise<void> {
      return reader.read().then(({ done, value }) => {
        if (done) {
          const buffer = Buffer.concat(chunks);

          resolve(buffer.toString("utf8"));
          return;
        }

        if (value) {
          chunks.push(value);
        }

        return pump();
      });
    }

    pump().catch(reject);
  });
}
