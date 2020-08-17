import api from '../../utils/api';
import {getSession} from '../../utils/iron';

export default async (req, res) => {
  const session = await getSession(req)
  if(!session) 
  {
    return res.status(403).json({ message: 'Forbidden.' });
  }

  if (req.method !== 'GET') {
    return res.status(404).json({ message: 'Not Found.' });
  }

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

  return res.status(200).json(response.data.data);
};
