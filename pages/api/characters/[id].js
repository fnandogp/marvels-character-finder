import api from '../../../services/api';

export default async (req, res) => {
  const {
    query: { id },
  } = req;

  const response = await api.get(`/characters/${id}`);

  res.status(200).json(response.data.data);
};
