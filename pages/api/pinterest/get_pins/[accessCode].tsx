import { NextApiHandler } from 'next';

export interface Pin {
  board_id: number;
  id: number;
  alt_text: string;
  media: {
    images: { ['600x']: { url: string } };
  };
}

export interface GetPinsResponse {
  items: Pin[];
}

const getPins: NextApiHandler<GetPinsResponse> = (req, res) => {
  const { boardId, pageSize, bookmark, accessCode } = req.query;

  const urlParams = new URLSearchParams();
  if (pageSize) urlParams.set('page_size', pageSize as string);
  if (bookmark) urlParams.set('bookmark', bookmark as string);
  const headers = new Headers();
  headers.append('Authorization', `Bearer ${accessCode}`);
  fetch(`https://api.pinterest.com/v5/boards/${boardId}/pins?${urlParams.toString()}`, {
    method: 'GET',
    headers,
  })
    .then((data) => data.json())
    .then((body) => {
      res.send(body);
    });
};

export default getPins;
