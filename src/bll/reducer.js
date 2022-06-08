import {api} from "../api/api";

const initialState = {
	error: null,
	isInitialized: false,
	callData:{},
}
export const appReducer = (state = initialState, action) => {
	switch (action.type) {
		case "APP/SET-IS-INITIALIZED":
			return {...state, isInitialized: action.isInitialized}
		case "APP/SET-RESOLVED-DATA":
			return {...state, callData: action.data}
		case "APP/SET-ERROR":
			return {...state, error: action.error}
		default:
			return {...state}
	}
}
export const setAppIsInitializedAC = (isInitialized) => ({
	type: 'APP/SET-IS-INITIALIZED',
	isInitialized
})
export const setResolveData = (data) => ({
	type: 'APP/SET-RESOLVED-DATA',
	data
})
export const setError = (err) => ({
	type: 'APP/SET-ERROR',
	err
})

export const initializeAppTC = () => (dispatch) => {
	api.getList()
		.then(res => {
				dispatch(setResolveData(res));
		})
		.catch(err => {
			dispatch(setError(err))
		})
		.finally(() => {
			dispatch(setAppIsInitializedAC(true))
		})
}
export const getRecordTC = (record,partnership_ip)=>(dispatch)=>{
	api.getRecord(record,partnership_ip)
		.then(res=>{

		})
}
