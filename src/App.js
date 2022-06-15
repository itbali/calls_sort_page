import React from 'react';
import s from './App.module.css';
import 'rsuite/dist/rsuite.min.css';
import {Sidebar} from "./cmoponents/SideMenu/Sidebar";
import {Route, Routes} from "react-router-dom";
import {CallsPage} from "./cmoponents/CallsPage/CallsPage";
import {NotFound} from "./cmoponents/NotFound/NotFound";
import {HeaderContent} from "./cmoponents/HeaderContent/HeaderContent";

function App() {

	return (
		<div className={s.App}>
			<Sidebar/>
			<div className={s.rightSide}>
				<HeaderContent/>
				<Routes>
					<Route path={'/'} element={<CallsPage/>}/>
					<Route path={'/404'} element={<NotFound/>}/>
				</Routes>
			</div>
		</div>
	);
}

export default App;
