import { NextApiHandler } from 'next';

export interface Boards {
  id: number;
  name: string;
  description: string;
  owner: {};
  privacy: string;
}

export interface GetBoardResponse {
  items?: Boards[];
  bookmark?: string;
  message?: string;
}

const getBoards: NextApiHandler<GetBoardResponse> = (req, res) => {
  const { boardId, pageSize, bookmark, accessCode } = req.query;
  const urlParams = new URLSearchParams();
  if (pageSize) urlParams.set('page_size', pageSize as string);
  if (bookmark) urlParams.set('bookmark', bookmark as string);
  const headers = new Headers();

  headers.append('Authorization', `Bearer ${accessCode}`);
  fetch(`https://api.pinterest.com/v5/boards${boardId ? `/${boardId}` : ''}?${urlParams.toString()}`, {
    method: 'GET',
    headers,
  })
    .then((data) => data.json())
    .then((body) => {
      res.send(body);
    })
    .catch((e) => res.status(500).send({ message: 'Failed to fetch boards' }));
};

export default getBoards;
