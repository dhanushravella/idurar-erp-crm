import axios from 'axios';
import { API_BASE_URL } from '@/config/serverApiConfig';

import errorHandler from './errorHandler';
import successHandler from './successHandler';
// Import words.json file
import profanityWords from '@/words.json';

axios.defaults.baseURL = API_BASE_URL;
// Commented temporarlily for testing the cors issue
axios.defaults.withCredentials = true;

const request = {
  create: async ({ entity, jsonData }) => {
    console.log('🚀 Create Request 🚀 ~ file: request.js ~ line 19 ~ create: ~ jsonData', jsonData);

    try {
      const response = await axios.post(entity + '/create', jsonData);
      successHandler(response, {
        notifyOnSuccess: true,
        notifyOnFailed: true,
      });
      return response.data;
    } catch (error) {
      return errorHandler(error);
    }
  },
  read: async ({ entity, id }) => {
    try {
      const response = await axios.get(entity + '/read/' + id);
      successHandler(response, {
        notifyOnSuccess: false,
        notifyOnFailed: true,
      });
      return response.data;
    } catch (error) {
      return errorHandler(error);
    }
  },
  update: async ({ entity, id, jsonData }) => {
    console.log('🚀 ~ file: request.js ~ line 34 ~ update: ~ id', id);
    console.log('🚀 Update Request 🚀 ~ file: request.js ~ line 42 ~ update: ~ jsonData', jsonData);

    try {
      const response = await axios.patch(entity + '/update/' + id, jsonData);
      successHandler(response, {
        notifyOnSuccess: true,
        notifyOnFailed: true,
      });
      return response.data;
    } catch (error) {
      return errorHandler(error);
    }
  },

  delete: async ({ entity, id, options = {} }) => {
    try {
      const response = await axios.delete(entity + '/delete/' + id);
      successHandler(response, {
        notifyOnSuccess: true,
        notifyOnFailed: true,
      });
      return response.data;
    } catch (error) {
      return errorHandler(error);
    }
  },

  filter: async ({ entity, options = {} }) => {
    try {
      let filter = options.filter ? 'filter=' + options.filter : '';
      let equal = options.equal ? '&equal=' + options.equal : '';
      let query = `?${filter}${equal}`;

      const response = await axios.get(entity + '/filter' + query);
      successHandler(response, {
        notifyOnSuccess: false,
        notifyOnFailed: false,
      });
      return response.data;
    } catch (error) {
      return errorHandler(error);
    }
  },

  search: async ({ entity, options = {} }) => {
    try {
      let query = '?';
      for (var key in options) {
        query += key + '=' + options[key] + '&';
      }
      query = query.slice(0, -1);
      // headersInstance.cancelToken = source.token;
      const response = await axios.get(entity + '/search' + query);

      successHandler(response, {
        notifyOnSuccess: false,
        notifyOnFailed: false,
      });
      return response.data;
    } catch (error) {
      return errorHandler(error);
    }
  },

  list: async ({ entity, options = {} }) => {
    try {
      axios.defaults.baseURL = entity === 'payrolls' ? 'http://localhost:8080/api/' : API_BASE_URL;
      axios.defaults.withCredentials = entity === 'payrolls' ? false : true;
      console.log(axios.defaults.baseURL);
      let query = '?';
      for (var key in options) {
        query += key + '=' + options[key] + '&';
      }
      query = query.slice(0, -1);

      const response = await axios.get(entity + '/list' + query);

      successHandler(response, {
        notifyOnSuccess: false,
        notifyOnFailed: false,
      });
      // Remove the item from response.data by checking with from the list of profanity words and return the response.data
      // Add a condition to check if response data is null and conatcins result only then do the profanity check
      if (response.data && response.data.result) {
        response.data.result = response.data.result.filter((item) => {
          let isProfanity = false;
          profanityWords.forEach((word) => {
            if (item.name?.toLowerCase().includes(word)) {
              isProfanity = true;
            }
          });
          return !isProfanity;
        });
      }

      return response.data;
    } catch (error) {
      return errorHandler(error);
    }
  },

  fetch: async ({ entity, options = {} }) => {
    try {
      axios.defaults.baseURL = entity === 'payrolls' ? 'http://localhost:8080/api/' : API_BASE_URL;
      axios.defaults.withCredentials = entity === 'payrolls' ? false : true;
      console.log(axios.defaults.baseURL);
      let query = '?';
      for (var key in options) {
        query += key + '=' + options[key] + '&';
      }
      query = query.slice(0, -1);

      const response = await axios.get(entity + '/fetch' + query);

      successHandler(response, {
        notifyOnSuccess: false,
        notifyOnFailed: false,
      });
      // Remove the item from response.data by checking with from the list of profanity words and return the response.data
      // Add a condition to check if response data is null and conatcins result only then do the profanity check
      if (response.data && response.data.result) {
        response.data.result = response.data.result.filter((item) => {
          let isProfanity = false;
          profanityWords.forEach((word) => {
            if (item.name?.toLowerCase().includes(word)) {
              isProfanity = true;
            }
          });
          return !isProfanity;
        });
      }

      return response.data;
    } catch (error) {
      return errorHandler(error);
    }
  },

  master: async ({ entity, options = {} }) => {
    try {
      axios.defaults.baseURL = entity === 'payrolls' ? 'http://localhost:8080/api/' : API_BASE_URL;
      axios.defaults.withCredentials = entity === 'payrolls' ? false : true;
      console.log(axios.defaults.baseURL);
      let query = '?';
      for (var key in options) {
        query += key + '=' + options[key] + '&';
      }
      query = query.slice(0, -1);

      const response = await axios.get(entity + '/master' + query);

      successHandler(response, {
        notifyOnSuccess: false,
        notifyOnFailed: false,
      });
      // Remove the item from response.data by checking with from the list of profanity words and return the response.data
      // Add a condition to check if response data is null and conatcins result only then do the profanity check
      if (response.data && response.data.result) {
        response.data.result = response.data.result.filter((item) => {
          let isProfanity = false;
          profanityWords.forEach((word) => {
            if (item.name?.toLowerCase().includes(word)) {
              isProfanity = true;
            }
          });
          return !isProfanity;
        });
      }

      return response.data;
    } catch (error) {
      return errorHandler(error);
    }
  },

  post: async ({ entity, jsonData, options = {} }) => {
    try {
      const response = await axios.post(entity, jsonData);

      return response.data;
    } catch (error) {
      return errorHandler(error);
    }
  },
  get: async ({ entity }) => {
    try {
      const response = await axios.get(entity);
      return response.data;
    } catch (error) {
      return errorHandler(error);
    }
  },
  patch: async ({ entity, jsonData }) => {
    try {
      const response = await axios.patch(entity, jsonData);
      successHandler(response, {
        notifyOnSuccess: true,
        notifyOnFailed: true,
      });
      return response.data;
    } catch (error) {
      return errorHandler(error);
    }
  },

  source: () => {
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();
    return source;
  },
};
export default request;
