import { ListEndpoints } from "../../app/api/consts";
import { ApiResponse, Question } from "../utils/interfaces/interfaces";

const getQuestion = async (questionId: number): Promise<Question[]> => {
  const baseURL = process.env.NEXT_PUBLIC_API_URL;
  const tokenAPI = process.env.NEXT_PUBLIC_API_KEY;

  const url =
    baseURL +
    `${ListEndpoints.Assessment.GetQuestion}?questionId=${questionId}`;
  const config: RequestInit = {
    headers: {
      Authorization: `Bearer ${tokenAPI}`,
      mode: "cors",
      "Access-Control-Allow-Origin": "*", // Use cautiously
    } as HeadersInit,
  };

  let { response, data } = await originalRequest<Question[]>(url, config);

  return data;
};

const originalRequest = async <T>(
  url: string,
  config: RequestInit
): Promise<ApiResponse<T>> => {
  const response = await fetch(url, config);
  const data: T = await response.json();
  return { response, data };
};

export default getQuestion;
