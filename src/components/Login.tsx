import { FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import { RingSpinner } from "react-spinners-kit";
import { logIn } from "../services/auth";
import { Layout } from "./share/Layout";

const Login = () => {

    const [userCredentials, setUserCredentials] = useState({
        email: "",
        password: ""
    });
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleInputChange = (event: FormEvent<HTMLInputElement>) => {
        const { name, value } = event.currentTarget;
        setUserCredentials({
            ...userCredentials,
            [name]: value
        })
    }

    const onSubmitSignIn = (event: FormEvent) => {
        event.preventDefault();
        setLoading(true);
        logIn(userCredentials).then(response => {
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
                <h1>Sign In</h1>
                <form onSubmit={onSubmitSignIn}>
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
                <span>Do you have an account? <Link to="/register">Register</Link></span>
                {
                    error && <span className="error">Invalid credentials</span>
                }
            </div>
        </Layout>
    );
}
export { Login };