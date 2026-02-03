import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserByEmail } from '../service/authService';
import { useUser } from '../context/UserContext';
import { toast } from 'react-hot-toast';

export const useLogin = () => {
  const navigate = useNavigate();

  const { user, login } = useUser();
  const [formData, setFormData] = useState({
    email: '',
    pass: '',
  });

  const [error, setError] = useState('');

  useEffect(() => {
    if (user) {
      if (user.role == 'admin') {
        toast.success("Welcome Back Admin")
        navigate('/admin/dashboard', { replace: true });
      } else {
        toast.success("Welcome Back")
        navigate('/home', { replace: true });
      }
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError('');

     if (formData.email == '' || formData.pass == '') {
        toast.error('All fields are required');
        return;
      }

    try {
      
     
      const res = await getUserByEmail(formData.email);

      if (res.length === 0) {
        toast.error('User not found. Please register');
        // setFormData({
        //   email: '',
        //   pass: '',
        // });
        return;
      }

      const loggedUser = res[0];

      if (loggedUser.password !== formData.pass) {
        toast.error('Incorrect password');
        setFormData({
          pass: '',
        });
        return;
      }

      login(loggedUser);
    } catch (error) {
      toast.error('The Server is not responding....');
    }
  };
  return { formData, handleChange, handleSubmit, error };
};
