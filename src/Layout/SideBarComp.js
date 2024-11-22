/** @format */

import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link, useLocation } from "react-router-dom";
import SubMenuComp from "./SubNavComp";
import { IconContext } from "react-icons/lib";
import { customerSidebar, adminSidebar } from "../components/SidebarData";
import { FaAngleRight, FaAngleLeft, FaAngleDown } from "react-icons/fa";

const NavIcon = styled.div`
	margin-left: 2rem;
	font-size: 2rem;
	height: 80px;
	display: flex;
	justify-content: flex-start;
	align-items: center;
`;

const SidebarWrap = styled.div`
	width: 100%;
	background-color: #263159;
`;

const SidebarComp = () => {
	const location = useLocation();

	// console.log(
	//   "LOCAL STORAGE DATA",
	//   JSON.parse(localStorage.getItem("LazerUser"))
	// );

	const [newSideBarData, setNewSideBarData] = useState(customerSidebar);
	const [accessSideBarData, setAccessSideBarData] = useState([]);

	let [lazerUser, setLazerUser] = useState(
		JSON.parse(localStorage.getItem("LazerUser"))
	);

	console.log("dddd", JSON.parse(localStorage.getItem("LazerUser")));
	const [sidebar, setSidebar] = useState(true);

	const newAccessSideBarData = [];

	function showSidebar() {
		setSidebar(!sidebar);
	}

	//access information is present in laser user
	//modify the array in newSideBarData based on laserUserdata
	// useEffect(() => {
	// 	const tempArray = [...accessSideBarData]; //creating a copy of the accessSideBar

	// 	function filterSidebarData(data, accessPaths) {
	// 		const result1 = [];

	// 		//  console.log(data)

	// 		data.forEach((element) => {
	// 			// console.log(element)
	// 			if (element.subNav) {
	// 				// console.log(element.subNav)
	// 				const subNavFiltered = filterSidebarData(element.subNav, accessPaths);

	// 				element.subNav = subNavFiltered;
	// 				// console.log(subNavFiltered)
	// 				if (
	// 					subNavFiltered.length > 0 ||
	// 					accessPaths?.includes(element?.path)
	// 				) {
	// 					// console.log(element, 'existtttttttttttttttttttttttttttttttttt')
	// 					result1.push(element);
	// 				}
	// 			} else {
	// 				if (accessPaths?.includes(element?.path)) {
	// 					result1.push(element);
	// 				}
	// 			}
	// 		});
	// 		//Adding previous menu to sidebar

	// 		return result1;
	// 	}

	// 	const result1 = filterSidebarData(newSideBarData, lazerUser?.data?.access);
	// 	setAccessSideBarData(result1);
	// 	// setAccessSideBarData(tempArray);
	// }, []);
	useEffect(() => {
		function filterSidebarData(data, accessPaths) {
			console.log("first", data);
			console.log("second", accessPaths);
			const filterSidebar = [];
			let previousMenu = null;

			data.forEach((element) => {
				if (element.subNav) {
					const subNavFiltered = filterSidebarData(element.subNav, accessPaths);
					element.subNav = subNavFiltered;
					if (subNavFiltered.length > 0 || accessPaths.includes(element.path)) {
						// if(element.path)
						//   element.path = element.path.toLowerCase();

						filterSidebar.push(element);
					}
				} else {
					if (element.title === "Previous Menu") {
						previousMenu = element;
					} else if (accessPaths?.includes(element.path)) {
						console.log("element.path", element.path);
						// if(element.path)
						//   element.path = element.path.toLowerCase();
						filterSidebar.push(element);
					}
				}
			});
			if (previousMenu) {
				filterSidebar.push(previousMenu);
			}
			return filterSidebar;
		}

		const filterSidebar = filterSidebarData(
			newSideBarData,
			lazerUser?.data?.access
		);
		console.log("filter", filterSidebar);
		///////////////////////////////////////////////////////////////////////////////////////////////////////
		setAccessSideBarData(filterSidebar);
		// setAccessSideBarData(quotationSidebar)
	}, []);
	useEffect(() => {
		console.log(lazerUser?.data?.access);
	}, []);

	console.log("access", accessSideBarData);

	return (
		<>
			<nav className={sidebar ? "side-nav" : '"side-nav '}>
				<SidebarWrap>
					<div className="admin-title ">
						{/* {sidebar && 'M A G O D'} */}
						<img
							className="logo"
							src={require("../ML-LOGO1.png")}
						/>
						{sidebar ? (
							<FaAngleRight
								className="toggle-icon"
								onClick={() => showSidebar()}
							/>
						) : (
							<FaAngleLeft
								className="toggle-icon"
								onClick={() => showSidebar()}
							/>
						)}
					</div>

					{(location.pathname.startsWith("/admin")
						? adminSidebar
						: location.pathname.startsWith("/Production")
						? accessSideBarData
						: null
					).map((item, index) => {
						return (
							<SubMenuComp
								item={item}
								key={index}
								sidebar={sidebar}
							/>
						);
					})}
				</SidebarWrap>
			</nav>
		</>
	);
};

export default SidebarComp;
