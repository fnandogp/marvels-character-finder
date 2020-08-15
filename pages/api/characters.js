import axios from 'axios';
import md5 from 'js-md5';

export default async (req, res) => {
  const ts = Math.floor(Date.now() / 1000);
  const publicKey = process.env.PUBLIC_KEY;
  const privatecKey = process.env.PRIVATE_KEY;
  const hash = md5(`${ts}${privatecKey}${publicKey}`);

  const response = await axios.get(
    'http://gateway.marvel.com/v1/public/characters',
    {
      params: { ts, apikey: publicKey, hash, limit: 24, ...req.query },
    }
  );

  res.status(200).json({ response: response.data });
};
