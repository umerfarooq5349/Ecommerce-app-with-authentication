// import { ApiResponse } from "@/types/apiResponse";

export function sendResponce(
  success: boolean,
  message: string,
  status: number,
  data?: unknown,
  error?: unknown
): Response {
  return Response.json({ success, message, data, error }, { status });
}
