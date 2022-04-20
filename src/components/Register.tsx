import { FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import { RingSpinner } from "react-spinners-kit";
import { INewUser } from "../interfaces/interfaces";
import { register } from "../services/users";
import { Layout } from "./share/Layout"



const Register = () => {

    const [loading, setLoading] = useState(false);
    const [newUser, setNewUser] = useState<INewUser>({
        fullName: "",
        email: "",
        password: ""
    })
    const [error, setError] = useState(false);

    const handleInputChange = (e: FormEvent<HTMLInputElement>) => {
        const { name, value } = e.currentTarget;
        setNewUser({ ...newUser, [name]: value })
    }

    const onSubmitUser = (e: FormEvent) => {
        e.preventDefault()
        setLoading(true);
        register(newUser).then(response => {
            if (response.accessToken) {
                localStorage.setItem("accessToken", response.accessToken);
                window.location.href = "/";
                setLoading(false);
            } else {
                setError(true);
                setLoading(false);
            }
        })
    }

    return (
        <Layout>
            <div className="login">
                <h1>Crear nueva cuenta</h1>
                <form onSubmit={onSubmitUser}>
                    <div>
                        <label>Username</label>
                        <input type="text" name="fullName" onChange={handleInputChange} />
                    </div>
                    <div>
                        <label>Email</label>
                        <input type="email" name="email" onChange={handleInputChange} />
                    </div>
                    <div>
                        <label>Password</label>
                        <input type="password" name="password" onChange={handleInputChange} />
                    </div>
                    <button className="submit-button"><RingSpinner size={16} color="#fff" loading={loading} /> SIGN IN</button>
                </form>
                <span>Do you have an account? <Link to="/login">Sign In</Link></span>
                {
                    error && <span className="error">Invalid credentials</span>
                }
            </div>
        </Layout>
    )
}

export { Register };