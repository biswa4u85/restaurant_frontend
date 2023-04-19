import config from "./config";
import { toast } from 'react-toastify';
import axios from 'axios';

const axiosAPI = axios.create({
  baseURL: process.env.REACT_APP_ENV == 'dev' ? config.apiURL : '',
  headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' }
});

export function apiPostCall(path, params, token) {
  let headers = {}
  // if (process.env.REACT_APP_ENV == 'dev') {
  //   headers.Authorization = config.token
  // } else {
  //   headers['X-Frappe-CSRF-Token'] = token
  // }
  if (token && token != 'None') {
    headers['X-Frappe-CSRF-Token'] = token
  } else {
    headers.Authorization = config.token
  }
  return axiosAPI.post(path, params, { headers: headers })
    .then((response) => {
      return response.data
    })
    .catch((error) => {
      let errors = null
      if (error.response) {
        errors = error.response
      } else if (error.request) {
        errors = error.request
      } else {
        errors = error.message
      }
      toast(errors.statusText);
      return errors.statusText
    });
}

export function addNewDataApi(params) {
  let doctype = params.doctype
  let token = params.token
  let headers = {}
  // if (process.env.REACT_APP_ENV == 'dev') {
  //   headers.Authorization = config.token
  // } else {
  //   headers['X-Frappe-CSRF-Token'] = token
  // }
  if (token && token != 'None') {
    headers['X-Frappe-CSRF-Token'] = token
  } else {
    headers.Authorization = config.token
  }
  delete params.token
  delete params.doctype
  return axiosAPI.post(`api/resource/${doctype}`, params, { headers: headers })
    .then((response) => {
      return response.data.data
    })
    .catch((error) => {
      let errors = null
      if (error.response) {
        errors = error.response
      } else if (error.request) {
        errors = error.request
      } else {
        errors = error.message
      }
      toast(errors.statusText);
      return errors.statusText
    });
}

export function fileUpload(file, token) {
  let headers = {}
  // if (process.env.REACT_APP_ENV == 'dev') {
  //   headers.Authorization = config.token
  // } else {
  //   headers['X-Frappe-CSRF-Token'] = token
  // }
  if (token && token != 'None') {
    headers['X-Frappe-CSRF-Token'] = token
  } else {
    headers.Authorization = config.token
  }
  let formData = new FormData();
  formData.append('file', file);
  formData.append('is_private', '0');
  formData.append('folder', 'Home/Attachments');
  formData.append('doctype', 'Web Page');
  return axiosAPI.post('/api/method/upload_file', formData, { headers: headers })
    .then((response) => {
      return response.data
    })
    .catch((error) => {
      let errors = null
      if (error.response) {
        errors = error.response
      } else if (error.request) {
        errors = error.request
      } else {
        errors = error.message
      }
      alert(errors.statusText);
    });


}