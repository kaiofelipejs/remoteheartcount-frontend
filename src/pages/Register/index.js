import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { FiArrowLeft as ArrowLeft } from "react-icons/fi";

import api from "../../services/api";

import "./styles.css";
import logoImg from "../../assets/logo.svg";

const Register = () => {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");

	const history = useHistory();

	async function handleRegister(event) {
		event.preventDefault();

		const data = {
			name,
			email
		};

		try {
			const response = await api.post("companies", data);
			alert(`Seu ID de acesso: ${response.data.id}`);
			history.push("/");
		} catch (err) {
			alert(`Erro no cadastro. Tente novamente.`);
			console.log(err);
		}
	}

	return (
		<div className="register-container">
			<div className="content">
				<section>
					<img src={logoImg} alt="Be The Hero" />
				</section>

				<form onSubmit={handleRegister}>
					<input
						value={name}
						onChange={e => setName(e.target.value)}
						placeholder="Company name"
						type="text"
					/>
					<input
						value={email}
						onChange={e => setEmail(e.target.value)}
						placeholder="E-mail"
						type="email"
					/>

					<button className="button" type="submit">
						Register
					</button>
					<Link className="back-link" to="/">
						<ArrowLeft size={16} color="#E02041" />
						Back to login
					</Link>
				</form>
			</div>
		</div>
	);
};

export default Register;
