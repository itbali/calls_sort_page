import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {initializeAppTC} from "../../bll/reducer";
import {SingleCall} from "../SingleCall/SingleCall";
import {Button, DateRangePicker, Nav} from "rsuite";
import s from "./callspage.module.css"

export const CallsPage = () => {
	const dispatch = useDispatch()
	const resData = useSelector(state => state.appReducer.callData)

	const [finalResult, setFinalResult] = useState([])
	const [doubleDate, setDoubleDate] = useState([new Date(), new Date()])
	const [filters, setFilters] = useState({
		callType:'',
		employer:'',
	})

	const onDateChange = (dateFromPicker) => {
		setDoubleDate(dateFromPicker)
		if (dateFromPicker) {
			const startDayForSearch = new Date(dateFromPicker[0].setHours(0, 0, 0))
			const endDayForSearch = new Date(dateFromPicker[1].setHours(23, 59, 59))

			setFinalResult(resData.results.filter(eachCall => (
				(startDayForSearch <= new Date(eachCall.date_notime))
				& (new Date(eachCall.date_notime) <= endDayForSearch)
			)))
		}
	}

//сортировка по типу звонка
	const selectCallTypeHandler = (e) => {
		// console.log(e)
		if (e !== '') {
			setFinalResult(resData.results.filter(c => c.in_out === +e))
		} else {
			setFinalResult(resData.results)
		}
	}

//запрос при инициализации компоненты
	useEffect(() => {
		dispatch(initializeAppTC())
		if (resData) {
			setFinalResult(resData.results)
		}
	}, [])
//сетаем данные для отрисовки в стейт если пришли данные с сервера
// (по факту это первая отрисовка всех звонков)
	useEffect(() => {
		setFinalResult(resData.results)
	}, [resData])

//функция сортировки данных по дате
	const selectCallDateHandler = (e) => {
		console.log(e.target.value)
		let nowDate = new Date();
		switch (e.target.value) {
			case "3":
				let dayThreeDaysBefore = new Date(new Date().setHours(nowDate.getHours() - 72));
				return setFinalResult(resData.results.filter(el => (
					new Date(el.date_notime) >= dayThreeDaysBefore
				)))
			case "7":
				let dayWeekBefore = new Date(new Date().setHours(nowDate.getHours() - 168));
				return setFinalResult(resData.results.filter(el => (
					new Date(el.date_notime) >= dayWeekBefore
				)))
			case "month":
				let dayMonthBefore = new Date(new Date().setMonth(nowDate.getMonth() - 1));
				return setFinalResult(resData.results.filter(el => (
					new Date(el.date_notime) >= dayMonthBefore
				)))
			case "year":
				let dayYearBefore = new Date(new Date().setFullYear(nowDate.getFullYear() - 1));
				return setFinalResult(resData.results.filter(el => (
					new Date(el.date_notime) >= dayYearBefore
				)))
			default:
				return setFinalResult(resData.results)
		}
	}

	return (
		<div className={s.callsPage}>
			<h1>
				всего звонков:{finalResult?.length}
			</h1>
			<br/>
			<div className={s.filtersField}>
				<div className={s.balanceCalendar}>
					<span>Баланс 252р</span>
					<div>
						<Button>
							{"<<"}
						</Button>
						<span>date</span>
						<Button>
							{">>"}
						</Button>
					</div>
				</div>
				<div>
					<Nav className={s.searchFilters}>
						<input type="text" placeholder="Поиск по звонкам"/>
						<div>
							<Nav.Item>сбросить фильтры</Nav.Item>
							<Nav.Menu title="Звонки">
								<Nav.Item eventKey="" onSelect={selectCallTypeHandler}>Все звонки</Nav.Item>
								<Nav.Item eventKey="0" onSelect={selectCallTypeHandler}>Исходящий</Nav.Item>
								<Nav.Item eventKey="1" onSelect={selectCallTypeHandler}>Входящий</Nav.Item>
							</Nav.Menu>
						</div>
						<div>
							<select name="date" id="date" onChange={selectCallDateHandler} defaultValue={""}>
								<option value="">за все время</option>
								<option value="3">3 дня</option>
								<option value="7">неделя</option>
								<option value="month">месяц</option>
								<option value="year">год</option>
								<option value="doubleDate">по двум датам</option>
							</select>
							<DateRangePicker
								placeholder={"__.__.__-__.__.__"}
								character={'-'}
								value={doubleDate}
								onChange={onDateChange}
								onClean={() => {
									setFinalResult(resData.results)
								}}
							/>
						</div>
					</Nav>
				</div>
			</div>
			<div className={s.tableResult}>
				<section>
					<div className={s.tableHeader}>
						<div style={{width:"23px",marginRight:"30px"}}>ТИП</div>
						<div style={{width:"41px",marginRight:"48px"}}>Время</div>
						<div style={{width:"68px",marginRight:"60px"}}>Сотрудник</div>
						<div style={{width:"254px",marginRight:"72px"}}>Звонок</div>
						<div style={{width:"197px",marginRight:"17px"}}>Источник</div>
						<div style={{width:"41px",marginRight:"48px"}}>Длительность</div>
					</div>
				</section>
				<section>
					{finalResult?.map(el => {
						return <SingleCall el={el} key={el.id}/>
					})}
				</section>
			</div>
		</div>
	);
};
