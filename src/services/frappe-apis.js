import config from "../common/config";
import { toast } from 'react-toastify';
import axios from 'axios';

const axiosAPI = axios.create({
    baseURL: config.apiURL,
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    }
});

function handleResponse(error) {
    toast.error(error?.response?.statusText);
    return { 'status': "error", 'data': error?.response?.statusText }
}

export function loginApi(path, params) {
    let headers = { 'Content-Type': 'application/json' }
    return axiosAPI.post(path, params, { headers: headers })
        .then((response) => {
            return response.data
        })
        .catch((error) => {
            return handleResponse(error);
        });
}

export function apiGetCall(path, params) {
    let token = params.token
    delete params.token
    let newUrl = `${path}`
    return axiosAPI.get(newUrl, { headers: { 'Authorization': token } })
        .then((response) => {
            return response.data
        })
        .catch((error) => {
            console.log(error)
            return handleResponse(error);
        });
}

export function apiPostCall(path, params) {
    let token = params.token
    delete params.token
    let newUrl = `${path}`
    return axiosAPI.post(newUrl, params, { headers: { 'Authorization': token } })
        .then((response) => {
            return response.data
        })
        .catch((error) => {
            console.log(error)
            return handleResponse(error);
        });
}

export function postCmdApi(params) {
    let headers = {}
    if (params.token) {
        headers.Authorization = params.token
    }
    delete params.token
    let body = ``;
    for (let key in params) {
        if (params[key]) {
            body = body + `${key}=${params[key]}&`
        }
    }
    return axiosAPI.post('', body, { headers: headers })
        .then((response) => {
            return response
        })
        .catch((error) => {
            return handleResponse(error);
        });
}

export function postMethodApi(params) {
    let token = params.token
    let method = params.method
    delete params.token
    delete params.method

    let headers = {}
    if (token) {
        headers.Authorization = token
    }

    let body = ``;
    for (let key in params) {
        if (params[key]) {
            body = body + `${key}=${params[key]}&`
        }
    }
    return axiosAPI.post(`api/method/${method}`, body, { headers: headers })
        .then((response) => {
            return response
        })
        .catch((error) => {
            return handleResponse(error);
        });
}

export function getAllSingleDataApi(params) {
    let headers = {}
    if (params.token) {
        headers.Authorization = params.token
    }
    let body = `doctype=${params.doctype}&cmd=frappe.client.get_value`;
    if (params.fields) {
        body = body + `&fieldname=${JSON.stringify(params.fields)}`
    }
    if (params.orderBy) {
        body = body + `&order_by=${params.orderBy}`
    }
    if (params.search) {
        let filters = []
        for (let key in params.search) {
            if (params.search[key]) {
                filters.push([params.doctype, key, "like", params.search[key]])
            }
        }
        body = body + `&filters=${JSON.stringify(filters)}`
    }
    if (params.limit_start) {
        body = body + `&limit_start=${params.limit_start}`
    }
    if (params.limit_page_length) {
        body = body + `&limit_page_length=${params.limit_page_length}`
    }
    delete params.token
    delete params.doctype
    delete params.search
    return axiosAPI.post('', body, { headers: headers })
        .then((response) => {
            return response.data.message
        })
        .catch((error) => {
            return handleResponse(error);
        });
}

export async function getAllDataApi(params) {
    let doctype = params.doctype
    let token = params.token
    let filters = params.filters
    delete params.token
    delete params.doctype
    delete params.filters

    let headers = {}
    if (token) {
        headers.Authorization = token
    }
    let body = `doctype=${doctype}&cmd=frappe.client.get_list`;
    if (params.fields) {
        body = body + `&fields=${JSON.stringify(params.fields)}`
    }
    if (params.orderBy) {
        body = body + `&order_by=${params.orderBy}`
    }
    if (filters) {
        body = body + `&filters=${JSON.stringify(filters)}`
    }
    if (params.page) {
        let limitStart = (params.page == 1) ? 0 : String(Number(params.page) - 1) + "0"
        body = body + `&limit_start=${limitStart}`
    }
    if (params.size) {
        body = body + `&limit_page_length=${params.size}`
    } else {
        body = body + `&limit_page_length=None`
    }

    // Get Counts
    let count = 0
    let countHeaders = { 'Content-Type': 'application/json' }
    let searchBy = {}
    if (filters) {
        for (let key in filters) {
            if (filters[key]) {
                searchBy[filters[key][1]] = filters[key][3]
            }
        }
    }
    let counts = await axiosAPI.post('api/method/erp_custom_auth.authentication.getDataDB', { doctype: doctype, search: searchBy }, { headers: countHeaders })
    if (counts) {
        count = counts?.data?.message ? counts?.data?.message : 0
    }
    return axiosAPI.post('', body, { headers: headers })
        .then((response) => {
            return { data: response.data.message, count }
        })
        .catch((error) => {
            return handleResponse(error);
        });
}

export function getSingleDataApi(params) {
    let headers = {}
    if (params.token) {
        headers.Authorization = params.token
    }
    let body = `doctype=${params.doctype}&cmd=frappe.client.get_list&fields=${JSON.stringify(['*'])}&filters=${JSON.stringify([[params.doctype, "name", "like", params.id]])}`;
    return axiosAPI.post('', body, { headers: headers })
        .then((response) => {
            return response?.data?.message ? response.data.message[0] : {}
        })
        .catch((error) => {
            return handleResponse(error);
        });
}

export function addNewDataApi(params) {
    let doctype = params.doctype
    let headers = {}
    if (params.token) {
        headers.Authorization = params.token
    }
    delete params.token
    delete params.doctype
    return axiosAPI.post(`api/resource/${doctype}`, params, { headers: headers })
        .then((response) => {
            return response.data.data
        })
        .catch((error) => {
            return handleResponse(error);
        });
}

export function editDataApi(params) {
    let token = params.token
    let doctype = params.doctype
    delete params.token
    delete params.doctype
    return axiosAPI.put(`api/resource/${doctype}/${params.name}`, params, { headers: { 'Authorization': token } })
        .then((response) => {
            return response.data.data
        })
        .catch((error) => {
            return handleResponse(error);
        });
}

export function deleteDataApi(params) {
    let token = params.token
    delete params.token
    return axiosAPI.delete(`/api/resource/${params.doctype}/${params.name}`, { headers: { 'Authorization': token } })
        .then((response) => {
            return response
        })
        .catch((error) => {
            return handleResponse(error);
        });
}

export function uploadImgApi(file, token) {
    return axiosAPI.get(`${config.frappe_url}/uploader?filename=${file.name}`, { headers: { 'Authorization': token } })
        .then((response) => {
            let fields = response.data.data.fields
            let url = response.data.data.url
            let myHeaders = new Headers();
            myHeaders.append("key", fields.key);
            const formData = new FormData();
            for (const [key, value] of Object.entries(fields)) {
                formData.append(key, value);
            }
            formData.append('file', file);
            return fetch(url, {
                method: "POST",
                headers: myHeaders,
                body: formData,
            })
                .then(response => {
                    if (response.status == 204) {
                        return `${url}/${fields.key}`
                    } else {
                        return null
                    }
                })
                .catch(error => {
                    return handleResponse(error);
                })
        })
        .catch((error) => {
            return handleResponse(error);
        });
}

export function uploadVideoApi(file, token) {
    const data = new FormData();
    data.append('file', file);
    return fetch(`${config.apiBaseUrl}/videos/upload`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            authorization: token,
        },
        body: data,
    })
        .then(response => response.json())
        .then(responseJson => {
            if (responseJson) {
                return `${responseJson.data[0].url}`
            }
            return null
        }).catch(error => {
            return handleResponse(error);
        });
}


export async function getScoreDataApi({ path, query }) {
    let headers = { 'Content-Type': 'application/json' }
    let data = await axiosAPI.post(`api/method/news_management.cric_api.${path}`, { query }, { headers })
    return data?.data?.message
}


export async function getQueryDataApi(query) {
    let headers = { 'Content-Type': 'application/json' }
    let data = await axiosAPI.post('api/method/erp_custom_auth.authentication.getSqlQuery', { query }, { headers })
    return data?.data?.message
}

export async function getLiveDataDataApi(query) {
    let headers = { 'Content-Type': 'application/json' }
    let data = await axiosAPI.post('api/method/news_management.fixtures_api.getEventsData', { query: `data?locale=en_INT&event_id=${query.name}` }, { headers })
    let events = null
    let tournaments = null
    if (data?.data?.message) {
        events = data?.data?.message?.DATA?.EVENT
        tournaments = data?.data?.message?.DATA?.TOURNAMENT
    }
    return { events, tournaments }
}