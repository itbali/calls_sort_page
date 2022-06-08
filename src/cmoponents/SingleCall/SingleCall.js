import React from 'react';
import s from './singleCall.module.css';
import inCall from './../../assets/table component/icon/inCall.svg'
import inFallCall from './../../assets/table component/icon/inFallCall.svg'
import outCall from './../../assets/table component/icon/outCall.svg'
import outFallCall from './../../assets/table component/icon/outFallCall.svg'

export const SingleCall = ({el}) => {

	const callTime = (new Date(el.date).getHours().toString().padStart(2, '0') + ":" +
		new Date(el.date).getMinutes().toString().padStart(2, '0'))
	const callType = el.in_out
		? el.status==="Дозвонился"? inCall:inFallCall
		: el.status==="Дозвонился"? outCall:outFallCall

	const date = new Date(0);
	date.setSeconds(el.time);
	// var timeString = date.toISOString().substr(11, 8);
	const timeString = date.toISOString().slice(14,19);

	return (
		<div>
			<div key={el.id} className={s.singCall}>
				<img src={callType} alt=""/>
				<div> {callTime} </div>
				<img src={el.person_avatar} alt="no_ava" className={s.avatar}/>
				<div>{el.from_number}</div>
				<div>{el.source}</div>
				<div>{timeString}</div>
			</div>
		</div>
	);
};
