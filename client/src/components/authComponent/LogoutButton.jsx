import React from 'react'
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

export default function LogoutButton() {
  const navigate=useNavigate();

  const logout = async (e) => {
    try {
      e.preventDefault();
      const res = await axios.post('/api/auth/logout');
      toast.success(res.data.message || "Logout successful");
      navigate('/');
    } catch (error) {
      const message = error.response?.data?.message || "Login failed. Please try again.";
      toast.error(message);
    } finally {
      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
    }
  }
  return (
    <>
      <Button
        variant="secondary"
        onClick={logout}
      >logout</Button>
    </>
  )
}
