import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Yönlendirme için
import Cookies from 'js-cookie'; // Çerez okumak için

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);

    const navigate = useNavigate(); // Yönlendirme fonksiyonu çağırılıyor

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess(false);

        try {
            const response = await axios.post('https://grez-shop.vercel.app/api/users/auth', {
                email,
                password,
            }, {
                withCredentials: true, // Cookie'leri göndermek için
            });

            console.log('API yanıtı:', response.data); // Yanıtı kontrol et

            // Tokeni çerezden al
            const token = Cookies.get('jwt'); // 'jwt' çerez ismi
            console.log('Token:', token); // Sadece giriş başarılı olduğunda token'ı kontrol et

            const { userType } = response.data; // Token yoksa, sadece userType alınıyor

            if (userType === 'admin') {
                setIsAdmin(true);
                setSuccess(true);
                navigate('/admin'); // Admin paneline yönlendir
            } else {
                setError('Sadece admin kullanıcılar bu işlemi yapabilir.');
            }

        } catch (err) {
            console.log('Hata:', err); // Hata detaylarını kontrol et
            setError('Giriş başarısız: ' + (err.response?.data?.message || 'Bir hata oluştu'));
        }
    };

    return (
        <div className="flex items-center justify-center h-screen">
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md">
                <h2 className="text-lg font-bold mb-4">Giriş Yap</h2>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                {success && <p className="text-green-500 mb-4">Giriş başarılı!</p>}

                <div className="mb-4">
                    <label htmlFor="email" className="block mb-2">E-posta</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="border rounded w-full px-3 py-2"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="password" className="block mb-2">Şifre</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="border rounded w-full px-3 py-2"
                    />
                </div>

                <button type="submit" className="bg-blue-500 text-white rounded px-4 py-2">Giriş Yap</button>
            </form>
        </div>
    );
};

export default Login;
