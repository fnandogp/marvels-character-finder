import api from '../../../services/api';

export default async (req, res) => {
  if (req.method !== 'GET') {
    return res.status(404).json({ message: 'Not Found.' });
  }

  const {
    query: { id },
  } = req;

  const response = await api.get(`/characters/${id}`);

  return res.status(200).json(response.data.data);
};
