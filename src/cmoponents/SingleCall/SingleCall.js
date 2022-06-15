import React, {useEffect, useState} from 'react';
import s from './singleCall.module.css';
import inCall from './../../assets/table component/icon/inCall.svg'
import inFallCall from './../../assets/table component/icon/inFallCall.svg'
import outCall from './../../assets/table component/icon/outCall.svg'
import outFallCall from './../../assets/table component/icon/outFallCall.svg'
import {useDispatch, useSelector} from "react-redux";
import {getRecordTC, setCallRecord} from "../../bll/reducer";

export const SingleCall = ({el}) => {


	const dispatch = useDispatch()
	const callRecord = useSelector(state => state.appReducer.currentCallRecord)
	const [isMouseOver, setIsMouseOver] = useState(false)

	//обработчик времени звонка
	const callTime = (
		new Date(el.date).getHours().toString().padStart(2, '0') + ":" +
		new Date(el.date).getMinutes().toString().padStart(2, '0')
	)
	//обработка длительности звонка
	const date = new Date(0);
	date.setSeconds(el.time);
	const timeString = date.toISOString().slice(14, 19);
	//обработчик типа звонка
	const callType = el.in_out
		? el.status === "Дозвонился" ? inCall : inFallCall
		: el.status === "Дозвонился" ? outCall : outFallCall

	//получаем запись при наведении мышки
	useEffect(()=>{
		if (el.record){
		}
	},[])
	let callRecordUrl;

	const onMouseEnterHandler = () => {
		setIsMouseOver(true)
		el.record && dispatch(getRecordTC(el.record, el.partnership_id))
		dispatch(getRecordTC(el.record, el.partnership_id))
	}
	const onMouseLeaveHandler = () => {
		setIsMouseOver(false)
		dispatch(setCallRecord(null))
	}
	if (callRecord) {
		callRecordUrl = window.URL.createObjectURL(callRecord)
	}

	return (
		<div>
			<div key={el.id}
				 className={s.singCall}
				 onMouseEnter={onMouseEnterHandler}
				 onMouseLeave={onMouseLeaveHandler}
			>
				<img className={s.tabType} src={callType} alt=""/>
				<div className={s.tabTime}> {callTime} </div>
				<div className={s.tabEmployer}><img src={el.person_avatar} alt="no_ava"
					 className={s.avatar}/></div>
				<div className={s.tabCall}>{el.from_number}</div>
				<div className={s.tabSource}>{el.source}</div>
				{!isMouseOver
					? <div className={s.tabDurance}>{timeString}</div>
					: el.record
						? <audio controls src={callRecordUrl} className={s.tabDurance}><a href={callRecordUrl}></a></audio>
						: <div className={s.tabDurance}>{timeString}</div>
				}
			</div>
		</div>
	);
};
