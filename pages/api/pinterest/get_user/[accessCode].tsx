import { NextApiHandler } from 'next';

export interface GetUserResponse {
  account_type: string;
  profile_image: string;
  website_url: string;
  username: string;
}
const getUser: NextApiHandler<GetUserResponse> = (req, res) => {
  const { accessCode } = req.query;
  const headers = new Headers();
  headers.append('Authorization', `Bearer ${accessCode}`);
  fetch('https://api.pinterest.com/v5/user_account', {
    method: 'GET',
    headers,
  })
    .then((data) => data.json())
    .then((body) => {
      res.send(body);
    });
};

export default getUser;
