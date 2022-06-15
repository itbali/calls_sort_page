import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {initializeAppTC} from "../../bll/reducer";
import {SingleCall} from "../SingleCall/SingleCall";
import {Button, DateRangePicker, Nav} from "rsuite";
import plusBalanceIcon from '../../assets/button/balance/Vector.svg'
import calendarIcon from '../../assets/icon-calendar.svg'
import searchIcon from '../../assets/search.svg'
import s from "./callspage.module.css"

export const CallsPage = () => {
	const dispatch = useDispatch()
	const resData = useSelector(state => state.appReducer.callData)

	const [finalResult, setFinalResult] = useState([])
	const [doubleDate, setDoubleDate] = useState([new Date(), new Date()])

	let employers = new Set();
	//фильтр для сотрудников на будущее
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
// сетаем данные для отрисовки в стейт если пришли данные с сервера
// (по факту это первая отрисовка всех звонков)
// создаем уникальных пользователей

	useEffect(() => {
		setFinalResult(resData.results)
		resData.results?.forEach(el => {
			employers.add(`${el.person_name} ${el.person_surname}`)
		})
		console.log(employers)
	}, [resData])

//функция сортировки данных по дате
	const selectCallDateHandler = (period) => {
		console.log(period)
		let nowDate = new Date();
		switch (period) {
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
			<div>
				<div className={s.balanceCalendar}>
					<span className={s.balance}>Баланс: <span> 252р </span><img src={plusBalanceIcon} alt=""/></span>
					<div style={{display: "flex"}}>
						<Button className={s.dataButton}>{"<"}</Button>
						<Nav>
							<Nav.Menu title={"дата"}
									  noCaret
									  icon={<img src={calendarIcon} alt=""/>}
							>
								<Nav.Item onSelect={() => selectCallDateHandler("3")}>3 дня</Nav.Item>
								<Nav.Item onSelect={() => selectCallDateHandler("7")}>неделя</Nav.Item>
								<Nav.Item onSelect={() => selectCallDateHandler("month")}>месяц</Nav.Item>
								<Nav.Item onSelect={() => selectCallDateHandler("year")}>год</Nav.Item>
								<Nav.Item>
									<DateRangePicker
										placeholder={"__.__.__-__.__.__"}
										character={'-'}
										placement={'auto'}
										value={doubleDate}
										onChange={onDateChange}
										onClean={() => {
											setFinalResult(resData.results)
										}}
									/>
								</Nav.Item>
							</Nav.Menu>
						</Nav>
						<Button className={s.dataButton}>{">"}</Button>
					</div>
				</div>
				<div>
					<Nav className={s.searchFilters}>
						<div>
							<img src={searchIcon} alt=""/>
							<input type="text" placeholder="Поиск по звонкам"/>
						</div>
						<div>
							<Nav.Item>сбросить фильтры</Nav.Item>
							<Nav.Menu title="Звонки">
								<Nav.Item eventKey="" onSelect={selectCallTypeHandler}>Все звонки</Nav.Item>
								<Nav.Item eventKey="0" onSelect={selectCallTypeHandler}>Исходящий</Nav.Item>
								<Nav.Item eventKey="1" onSelect={selectCallTypeHandler}>Входящий</Nav.Item>
							</Nav.Menu>
						</div>
					</Nav>
				</div>
			</div>
			<div className={s.tableResult}>
				<section>
					<div className={s.tableHeader}>
						<div className={s.tabType}>ТИП</div>
						<div className={s.tabTime}>Время</div>
						<div className={s.tabEmployer}>Сотрудник</div>
						<div className={s.tabCall}>Звонок</div>
						<div className={s.tabSource}>Источник</div>
						<div className={s.tabDurance}>Длительность</div>
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
