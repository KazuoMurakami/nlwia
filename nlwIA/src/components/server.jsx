// axios.js

import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:3333', // Substitua pela sua baseURL
  // Outras configurações comuns, como headers, podem ser definidas aqui
});

export default instance;