import api from '../../../utils/api';
import { getSession } from '../../../utils/iron';

export default async (req, res) => {
  const session = await getSession(req);

  if (!session) {
    return res.status(403).json({ message: 'Forbidden.' });
  }

  if (req.method !== 'GET') {
    return res.status(404).json({ message: 'Not Found.' });
  }

  const {
    query: { id },
  } = req;

  const response = await api.get(`/characters/${id}`);

  return res.status(200).json(response.data.data);
};
