import {api} from "../api/api";

const initialState = {
	error: null,
	isInitialized: false,
	callData:{},
	currentCallRecord:null,
}
export const appReducer = (state = initialState, action) => {
	switch (action.type) {
		case "APP/SET-IS-INITIALIZED":
			return {...state, isInitialized: action.isInitialized}
		case "APP/SET-RESOLVED-DATA":
			return {...state, callData: action.data}
		case "APP/SET-ERROR":
			return {...state, error: action.error}
		case "APP/SET-CALL-RECORD":
			return {...state, currentCallRecord: action.callRecord}
		default:
			return {...state}
	}
}
 const setAppIsInitializedAC = (isInitialized) => ({
	type: 'APP/SET-IS-INITIALIZED',
	isInitialized
})
 const setResolveData = (data) => ({
	type: 'APP/SET-RESOLVED-DATA',
	data
})
 const setError = (err) => ({
	type: 'APP/SET-ERROR',
	err
})
export const setCallRecord = (callRecord) =>({
	type: 'APP/SET-CALL-RECORD',
	callRecord
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
			dispatch(setCallRecord(res))
		})
}
