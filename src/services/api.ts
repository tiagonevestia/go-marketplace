import axios from 'axios';
import { URL_API, PORT_API } from 'react-native-dotenv';

const api = axios.create({
  baseURL: `http://${URL_API}:${PORT_API}`,
});

export default api;
