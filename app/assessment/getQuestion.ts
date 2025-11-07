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

  let { response, data } = await retryRequest<Question[]>(url, config, 3, 3000);

  return data;
};

const retryRequest = async <T>(
  url: string,
  config: RequestInit,
  retries: number,
  delayN: number
): Promise<ApiResponse<T>> => {
  let lastError: unknown;
  for(let attempt = 1; attempt <= retries; attempt++) {
    console.log(`Attempt ${attempt}...`);
    try{
      const response   = await fetch(url, config);
      if(!response.ok){
        throw new Error(`HTTP error: ${response.status}`);
      }
      const data: T = await response.json();
      return { response, data };
    } catch (error) {
      lastError = error;
      console.warn(`Attempt ${attempt} failed: ${error}`);
      if (attempt < retries) {
        await delay(delayN);
      }
    }
  }
  throw new Error( `Request failed after ${retries} attempts: ${(lastError as Error).message}`);
};

const delay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export default getQuestion;
