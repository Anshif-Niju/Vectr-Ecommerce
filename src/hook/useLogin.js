import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getUserByEmail } from "../service/authService";

export const useLogin = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        pass: "",
    });

    const [error, setError] = useState("");

    useEffect(() => {
        const user = JSON.parse(sessionStorage.getItem("user"));
        if (user) {
            navigate("/home");
        }
    }, []);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");

        try {
            const res = await getUserByEmail(formData.email);

            console.log(res);

            if (formData.email == "" || formData.pass == "") {
                setError("All fields are required");
                return;
            }

            if (res.length === 0) {
                setError("User not found. Please register");
                setFormData({
                    email: "",
                    pass: "",
                });
                return;
            }

            const user = res[0];

            if (user.password !== formData.pass) {
                setError("Incorrect password");
                setFormData({
                    pass: "",
                });
                return;
            }

            sessionStorage.setItem("user", JSON.stringify(user));

            navigate("/home", { replace: true });
        } catch (error) {
            setError("The Server is not responding....");
        }
    };
    return { formData, handleChange, handleSubmit, error };
};
