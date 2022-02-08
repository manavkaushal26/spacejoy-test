import { page } from '@utils/config';
import fetch from 'isomorphic-unfetch';
import { GetServerSidePropsContext, NextPageContext } from 'next';

interface FetcherArgs {
  endPoint: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  type?: string;
  isSocket?: boolean;
  ctx?: NextPageContext | GetServerSidePropsContext;
  body?: any;
}

const fetcher = async ({
  endPoint,
  method,
  body,
  isSocket = false,
  type = 'text',
}: FetcherArgs): Promise<Record<string, any>> => {
  // const JWT = '';
  const JWT =
    'JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkYTg4M2IzYWZkNzBhYTFiODAwYjE1YSIsIl9pZCI6IjVkYTg4M2IzYWZkNzBhYTFiODAwYjE1YSIsIm5hbWUiOiJBZG1pbiIsImVtYWlsIjoiYWRtaW5Ac3BhY2Vqb3kuY29tIiwicm9sZSI6Im93bmVyIiwiY3JlZGl0cyI6MCwic3RhdHVzIjoiYWN0aXZlIiwidG5jIjpmYWxzZSwicGhvbmUiOm51bGwsInRyaWFsRXhoYXVzdGVkIjpmYWxzZSwiaWF0IjoxNjMwNjc1MTM3LCJleHAiOjE2MzkzMTUxMzd9.Ja4jqvW-8atBqUfjy4Xp43Uy-oe3IUI7j-gp04D_jfc';
  const contentType = type === 'file' ? '' : 'application/json';

  const headers = JWT ? { 'Content-Type': contentType, Authorization: JWT } : { 'Content-Type': contentType };
  const options =
    method === 'GET'
      ? {
          method,
          headers,
        }
      : {
          method,
          headers,
          body,
        };
  delete headers['Content-Type'];
  const finalAPIBaseUrl = isSocket ? page.apiSocketUrl : page.apiBaseUrl;
  const response = await fetch(finalAPIBaseUrl + endPoint, options);
  if (response.status) {
    try {
      if (response.status === 204) {
        return {
          statusCode: response.status,
          status: response.statusText,
        };
      }
      if (response.status !== 401 && response.status !== 204) {
        const resData = await response.json();
        if (resData.statusCode) {
          return resData;
        }

        return { data: resData, statusCode: response.status };
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      return { statusCode: response.status };
    }
  }

  return {
    statusCode: response.status,
    status: response.statusText,
  };
};

export default fetcher;
