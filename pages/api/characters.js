import api from '../../services/api';

export default async (req, res) => {
  const response = await api.get('characters', { params: req.query });

  res.status(200).json({ response: response.data.data });
};
