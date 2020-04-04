import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { FiLogIn as IconLogin } from "react-icons/fi";

import api from "../../services/api";

import bannerImg from "../../assets/heart-hand.png";
import logoImg from "../../assets/logo.svg";

import "./styles.css";

const Logon = () => {
	const [id, setId] = useState("");
	const history = useHistory();
	async function handleLogin(event) {
		event.preventDefault();

		try {
			const response = await api.post("sessions", { id });
			localStorage.setItem("companyId", id);
			localStorage.setItem("companyName", response.data.name);
			history.push("/profile");
		} catch {
			alert("Falha no login. Tente novamente.");
		}
	}

	return (
		<div className="logon-container">
			<section className="form">
				<img src={logoImg} alt="Remote HeartCount" />

				<form onSubmit={handleLogin}>
					<h1>Login</h1>

					<input
						value={id}
						onChange={(e) => setId(e.target.value)}
						placeholder="Company ID"
						type="text"
					/>
					<button className="button" type="submit">
						Enter
					</button>

					<Link className="back-link" to="/register">
						<IconLogin size={16} color="#E02041" />
						Register company
					</Link>
				</form>
			</section>
			<img
				src={bannerImg}
				alt="Illustration of a woman doing a heart with hands"
			></img>
		</div>
	);
};

export default Logon;
