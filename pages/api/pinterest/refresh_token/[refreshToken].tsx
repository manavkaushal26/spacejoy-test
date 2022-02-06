import { NextApiHandler } from 'next';

export interface RefreshTokenResponse {
  access_token: string;
  response_type: 'refresh_token';
  token_type: string;
  expires_in: number;
  scope: string;
}

const getRefreshToken: NextApiHandler<RefreshTokenResponse> = (req, res) => {
  const { refreshToken } = req.query;
  const headers = new Headers();
  headers.append(
    'Authorization',
    `Basic ${Buffer.from(
      `${process.env.NEXT_PUBLIC_PINTEREST_APP_ID}:${process.env.NEXT_PUBLIC_PINTEREST_CLIENT_SECRET}`
    ).toString('base64')}`
  );

  headers.append('Content-Type', 'application/x-www-form-urlencoded');
  const bodyParams = new URLSearchParams();
  bodyParams.set('refresh_token', refreshToken as string);
  bodyParams.set('grant_type', 'refresh_token');
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

export default getRefreshToken;
