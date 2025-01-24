// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  name: string;
  error?:any;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  try {
    const response:any = await fetch('https://sitemap.spacejoy.com/sitemap.xml');
    const resData = await response.text();
    res.setHeader('Content-Type', 'text/xml');
    res.status(200).send(resData);
  } catch (error) {
    console.error('Error fetching the sitemap:', error);

    res.status(500).json({
      error: 'Unable to fetch the sitemap',
    });
  }
}
