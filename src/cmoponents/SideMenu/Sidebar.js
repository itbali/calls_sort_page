import React from 'react';
import logo from './../../assets/Sidebar/logo.svg'
import calls from './../../assets/Sidebar/icon/calls-24px.svg'
import briefcase from './../../assets/Sidebar/icon/briefcase-outline.svg'
import timeline from './../../assets/Sidebar/icon/chart-timeline-variant.svg'
import documents from './../../assets/Sidebar/icon/documents-24px.svg'
import mail from './../../assets/Sidebar/icon/mail_outline-24px.svg'
import library from './../../assets/Sidebar/icon/local_library_black_24dp.svg'
import orders from './../../assets/Sidebar/icon/orders-24px.svg'
import people from './../../assets/Sidebar/icon/people-24px.svg'
import person from './../../assets/Sidebar/icon/perm_identity_black_24dp.svg'
import setting from './../../assets/Sidebar/icon/settings-24px.svg'
import {NavLink} from "react-router-dom";
import s from "./sidebar.module.css"

export const Sidebar = () => {
	return (
		<div className={s.sideBar}>
			<img className={s.logo} src={logo} alt=""/>
			<nav className={s.menu}>
				<NavLink className={({isActive}) => (!isActive ? s.menuItem : (s.menuItemActive+' '+s.menuItem))}
						 to={"/404"}><img src={timeline} alt=""/>Итоги</NavLink>
				<NavLink className={({isActive}) => (!isActive ? s.menuItem : (s.menuItemActive+' '+s.menuItem))}
						 to={"/404"}><img src={orders} alt=""/>Заказы</NavLink>
				<NavLink className={({isActive}) => (!isActive ? s.menuItem : (s.menuItemActive+' '+s.menuItem))}
						 to={"/404"}><img src={mail} alt=""/>Сообщения</NavLink>
				<NavLink className={({isActive}) => (!isActive ? s.menuItem : (s.menuItemActive+' '+s.menuItem))}
						 to={"/"}><img src={calls}	alt=""/>Звонки</NavLink>
				<NavLink className={({isActive}) => (!isActive ? s.menuItem : (s.menuItemActive+' '+s.menuItem))}
						 to={"/404"}><img src={people} alt=""/>Контрагенты</NavLink>
				<NavLink className={({isActive}) => (!isActive ? s.menuItem : (s.menuItemActive+' '+s.menuItem))}
						 to={"/404"}><img src={documents} alt=""/>Документы</NavLink>
				<NavLink className={({isActive}) => (!isActive ? s.menuItem : (s.menuItemActive+' '+s.menuItem))}
						 to={"/404"}><img src={person} alt=""/>Исполнители</NavLink>
				<NavLink className={({isActive}) => (!isActive ? s.menuItem : (s.menuItemActive+' '+s.menuItem))}
						 to={"/404"}><img src={briefcase} alt=""/>Отчеты</NavLink>
				<NavLink className={({isActive}) => (!isActive ? s.menuItem : (s.menuItemActive+' '+s.menuItem))}
						 to={"/404"}><img src={library} alt=""/>База знаний</NavLink>
				<NavLink className={({isActive}) => (!isActive ? s.menuItem : (s.menuItemActive+' '+s.menuItem))}
						 to={"/404"}><img src={setting} alt=""/>Настройки</NavLink>
			</nav>
		</div>
	);
};
