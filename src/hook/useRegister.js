import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../service/api";

export const useRegister=()=>{ 
    
const navigate = useNavigate();

    const nameRegex = /^[A-Za-z ]{2,}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        role:"user"

    });

    const [error, setError] = useState("");

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (!nameRegex.test(formData.name)) {
            setError("Invalid name");
            return;
        }

        if (!emailRegex.test(formData.email)) {
            setError("Invalid email");
            return;
        }
        if (formData.password == "") {
            setError("Please enter password");
            return;
        }

        try {
            const res = await api.get(`/users?email=${formData.email}`);
            if (res.data.length > 0) {
                setError("The email is already taken");
                return;
            }

            await api.post("/users", formData);
            navigate("/login");
        } catch (error) {
            console.log("Oops!" + error);
        }
    }
return {formData,handleChange,handleSubmit,error}

        }