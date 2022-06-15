import axios from "axios";

const token = 'testtoken'

const instance = axios.create({
	baseURL: 'https://api.skilla.ru/mango/',
	withCredentials: true,
	headers: {
		"Authorization": `Bearer ${token}`
	}
})

export const api = {
	getList() {
		return instance.post('getList', {}, {params: {limit: 1000}})
			.then(res => {
				return res.data
			})
	},
	getRecord(record, partnership_id) {
		return instance.post('getRecord', {}, {
			params: {record, partnership_id},
			responseType: 'blob'
		}).then(res => {
			return res.data
		})
	},
}
