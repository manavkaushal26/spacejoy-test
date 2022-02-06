import { NextApiHandler } from 'next';

export interface TokenResponse {
  response_type: string;
  access_token: string;
  token_type: string;
  expires_in: number;
  scope: string;
  refresh_token: string;
  refresh_token_expires_in: number;
}

const getToken: NextApiHandler<TokenResponse> = (req, res) => {
  const { code } = req.query;
  const headers = new Headers();
  headers.append(
    'Authorization',
    `Basic ${Buffer.from(
      `${process.env.NEXT_PUBLIC_PINTEREST_APP_ID}:${process.env.NEXT_PUBLIC_PINTEREST_CLIENT_SECRET}`
    ).toString('base64')}`
  );

  headers.append('Content-Type', 'application/x-www-form-urlencoded');
  const bodyParams = new URLSearchParams();
  bodyParams.set('grant_type', 'authorization_code');
  bodyParams.set('code', code as string);
  bodyParams.set('redirect_uri', 'http://localhost:3000/pinterest/oauth');
  fetch('https://api.pinterest.com/v5/oauth/token', {
    method: 'POST',
    headers,
    body: bodyParams,
  })
    .then((data) => data.json())
    .then((resp) => res.send(resp))
    .catch((e) => {
      res.send(e.message);
    });
};

export default getToken;
