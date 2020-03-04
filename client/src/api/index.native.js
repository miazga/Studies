import api from './config.json';
export default __DEV__
  ? `${api.dev.protocol}//${api.dev.host}:${api.dev.port}/api`
  : `${api.prod.protocol}//${api.prod.host}:${api.prod.port}/api`;
