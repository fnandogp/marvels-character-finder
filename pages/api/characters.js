import api from '../../services/api';

export default async (req, res) => {
  const page = req.query?.page || 1;
  const pageSize = req.query?.pageSize || 20;
  const query = req.query?.query;

  const params = {
    offset: (page - 1) * pageSize,
    limit: pageSize,
  };

  if (query) {
    params.nameStartsWith = query;
  }

  const response = await api.get('characters', { params });

  res.status(200).json(response.data.data);
};
