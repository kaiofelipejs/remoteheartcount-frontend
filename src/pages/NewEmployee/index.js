import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { FiArrowLeft as ArrowLeft } from "react-icons/fi";

import api from "../../services/api";

import "./styles.css";
import logoImg from "../../assets/logo.svg";

const NewEmployee = () => {
	const [name, setName] = useState("");
	const [month, setMonth] = useState("Waiting Offer");
	const [linkedinProfile, setLinkedinProfile] = useState();
	const [rotation, setRotation] = useState(false);
	const companyId = localStorage.getItem("companyId");

	const history = useHistory();

	async function handleNewEmployee(event) {
		event.preventDefault();

		const data = {
			name,
			linkedinProfile,
			month,
			rotation,
		};

		try {
			await api.post("/employees", data, {
				headers: {
					Authorization: companyId,
				},
			});

			history.push("/profile");
		} catch (err) {
			alert("Erro ao cadastrar. Tente novamente.");
			console.log(err);
		}
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

	return (
		<div className="new-employee-container">
			<div className="content">
				<section>
					<img src={logoImg} alt="Remote HeartCount" />
				</section>

				<form onSubmit={handleNewEmployee}>
					<input
						value={name}
						onChange={(e) => setName(e.target.value)}
						placeholder="First name"
						type="text"
						required
					/>

					<input
						value={linkedinProfile}
						onChange={(e) => setLinkedinProfile(e.target.value)}
						placeholder="LinkedIn profile"
						type="url"
					/>

					<select
						name="select"
						onChange={(e) => setMonth(e.target.value)}
						value={month}
						required
					>
						{months.map((month, index) => (
							<option key={index}>{month}</option>
						))}
					</select>

					<label className="checkbox">
						Rotation
						<input
							defaultValue={rotation}
							onChange={() => setRotation(!rotation)}
							type="checkbox"
							id="rotation"
							name="rotation"
						/>
						<span className="checkmark"></span>
					</label>

					<button className="button" type="submit">
						New Employee!
					</button>
					<Link className="back-link" to="/profile">
						<ArrowLeft size={16} color="#E02041" />
						Back to home
					</Link>
				</form>
			</div>
		</div>
	);
};

export default NewEmployee;
