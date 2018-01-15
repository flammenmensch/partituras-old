import axios from 'axios';
import {Observable} from 'rxjs';

const API_URL = '/api/partituras';

const api = (endpoint, config={}) =>
  Observable
    .fromPromise(axios.get(`${API_URL}/${endpoint}`, {
      ...config,
      timeout: 5000,
      responseType: 'json',
    }))
    .map((response) => response.data);

export const getRandomPartituras = (limit=10) =>
  api('random', { params: { limit }});

export const searchPartituras = (query='') =>
  api('search', { params: { q: query } });

export const getPartituraById = (id) =>
  api(`${id}`);
