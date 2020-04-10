import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { FiPower as PowerIcon } from "react-icons/fi";
import { FiTrash2 as TrashIcon } from "react-icons/fi";

import api from "../../services/api";

import "./styles.css";
import logoImg from "../../assets/logo.svg";

const Profile = () => {
	const [employees, setEmployees] = useState([]);
	const companyId = localStorage.getItem("companyId");
	const history = useHistory();

	useEffect(() => {
		api
			.get("profile", {
				headers: {
					Authorization: companyId,
				},
			})
			.then((response) => {
				setEmployees(response.data);
			});
	}, [companyId]);

	async function handleDeleteEmployee(id) {
		try {
			await api.delete(`employees/${id}`, {
				headers: {
					Authorization: companyId,
				},
			});

			setEmployees(employees.filter((employee) => employee.id !== id));
		} catch (err) {
			alert("Erro ao deletar. Tente novamente.");
		}
	}

	function handleLogout() {
		localStorage.clear();

		history.push("/");
	}

	const months = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"October",
		"September",
		"November",
		"December",
		"Waiting Offer",
	];

	function quantityEmployees(employees) {
		switch (employees.length) {
			case 0:
				break;
			case 1:
				return `${employees.length} new employee!`;
			default:
				return `${employees.length} new employees!`;
		}
	}

	return (
		<div className="profile-container">
			<header>
				<img src={logoImg} alt="Remote HeartCount" />
				<Link className="button" to="/employees/new">
					New Employee!
				</Link>
				<button type="button" onClick={() => handleLogout()}>
					<PowerIcon size={18} color="#E02041" />
				</button>
			</header>
			<h1>{quantityEmployees(employees)}</h1>
			<section className="boards">
				{months.map((month, index) => (
					<div key={index} className="board-month">
						<h2 key={month}>{month}</h2>
						<ul key={index.length + 1}>
							{employees
								.filter((employee) => {
									return employee.month === month;
								})
								.map((employee) => (
									<li key={employee.id}>
										<span
											className={employee.rotation ? "rotation" : ""}
											onClick={() => handleDeleteEmployee(employee.id)}
										>
											<TrashIcon size={20} color="#a8a8b3" />
										</span>

										<div
											className={
												employee.rotation
													? "employee-heart-rotation"
													: "employee-heart"
											}
										></div>
										<a
											href={
												employee.linkedinProfile !== ""
													? employee.linkedinProfile
													: undefined
											}
											target="_blank"
											rel="noopener noreferrer"
											className={
												employee.rotation
													? "employee-name-rotation"
													: "employee-name"
											}
										>
											{employee.name}
										</a>
									</li>
								))}
						</ul>
					</div>
				))}
			</section>
		</div>
	);
};

export default Profile;
