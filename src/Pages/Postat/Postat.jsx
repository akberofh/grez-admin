import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import styles from './Postat.module.css'; // CSS modülü

const Postat = () => {
    const [form1, setForm1] = useState({ title: '', price: '' }); // PUBG formu
    const [form2, setForm2] = useState({ title: '', price: '' }); // Fann formu
    const [form3, setForm3] = useState({ title: '', price: '' }); // Tiktok formu
    const [items1, setItems1] = useState([]); // PUBG ürünleri
    const [items2, setItems2] = useState([]); // Fann ürünleri
    const [items3, setItems3] = useState([]); // Tiktok ürünleri
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        fetchItems('https://grez-shop.vercel.app/api/pubg/', setItems1, 'pubg');
        fetchItems('https://grez-shop.vercel.app/api/tiktok/', setItems2, 'tiktok');
        fetchItems('https://grez-shop.vercel.app/api/fann/', setItems3, 'fann');
    }, []);

    const fetchItems = async (url, setItems, type) => {
        try {
            const response = await axios.get(url);
            if (type === 'pubg') {
                setItems(response.data.allPubges);
            } else if (type === 'tiktok') {
                setItems(response.data.allTiktokes);
            } else if (type === 'fann') {
                setItems(response.data.allFanns);
            } else {
                setItems([]);
            }
        } catch (error) {
            console.error('Error fetching items:', error);
            setItems([]);
        }
    };

    const handleFormSubmit = async (e, formData, setFormData, url, setItems) => {
        e.preventDefault();
        setError('');
        setSuccess(false);

        try {
            const response = await fetch(url, {
                method: 'POST',
                
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            console.log('Success:', data);
            setSuccess(true);
            setFormData({ title: '', price: '' });
            fetchItems(url, setItems); // Reload items after successful submission

            setTimeout(() => {
                window.location.reload();
            }, 1000); // 1000ms = 1 saniye
    

        } catch (error) {
            console.error('Error:', error);
            setError('Bir hata oluştu. Lütfen tekrar deneyin.');
        }
    };

    const handleDelete = async (id, url, setError) => {
        try {
            const response = await fetch(`${url}${id}`, {
                method: 'DELETE',
            });
    
            if (!response.ok) {
                throw new Error('Delete failed');
            }
    
            console.log('Item deleted');
    
            // 1 saniye bekleyip sayfayı yeniden yükler
            setTimeout(() => {
                window.location.reload();
            }, 1000); // 1000ms = 1 saniye
    
        } catch (error) {
            console.error('Error deleting item:', error);
            setError('Silme işlemi başarısız oldu.');
        }
    };
    
    

    return (
        <div className={styles.container}>
            {/* Form 1: PUBG */}
            <form onSubmit={(e) => handleFormSubmit(e, form1, setForm1, 'https://grez-shop.vercel.app/api/pubg/postt', setItems1)} className={styles.form}>
                <h2 className={styles.title}>Form 1: Yeni Post Oluştur (PUBG)</h2>
                {error && <p className={styles.errorMessage}>{error}</p>}
                {success && <p className={styles.successMessage}>Post başarılı bir şekilde oluşturuldu!</p>}
                <div className="mb-4">
                    <label htmlFor="title1" className="block mb-2 font-medium">Başlık</label>
                    <input
                        type="text"
                        id="title1"
                        value={form1.title}
                        onChange={(e) => setForm1({ ...form1, title: e.target.value })}
                        required
                        className={styles.input}
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="price1" className="block mb-2 font-medium">Fiyat</label>
                    <input
                        type="text"
                        id="price1"
                        value={form1.price}
                        onChange={(e) => setForm1({ ...form1, price: e.target.value })}
                        required
                        className={styles.input}
                    />
                </div>
                <button type="submit" className={styles.button}>ADD PUBG</button>
            </form>

            {/* PUBG Items */}
            <div className={styles.itemList}>
                <h2 className={styles.title}>PUBG Ürünleri</h2>
                {items1.length === 0 ? <p>Hiç ürün yok.</p> : (
                    <ul>
                        {items1.map((item) => (
                            <li key={item._id} className={styles.item}>
                                <p className="text-gray-700">{item.title} - {item.price} ₺</p>
                                <button
                                    onClick={() => handleDelete(item._id, 'https://grez-shop.vercel.app/api/pubg/', setItems1)}
                                    className={styles.deleteButton}
                                >
                                    <FontAwesomeIcon icon={faTrash} />
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            {/* Form 2: Fann */}
            <form onSubmit={(e) => handleFormSubmit(e, form2, setForm2, 'https://grez-shop.vercel.app/api/fann/postt', setItems3)} className={styles.form}>
                <h2 className={styles.title}>Form 2: Yeni Post Oluştur (Fann)</h2>
                {error && <p className={styles.errorMessage}>{error}</p>}
                {success && <p className={styles.successMessage}>Post başarılı bir şekilde oluşturuldu!</p>}
                <div className="mb-4">
                    <label htmlFor="title2" className="block mb-2 font-medium">Başlık</label>
                    <input
                        type="text"
                        id="title2"
                        value={form2.title}
                        onChange={(e) => setForm2({ ...form2, title: e.target.value })}
                        required
                        className={styles.input}
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="price2" className="block mb-2 font-medium">Fiyat</label>
                    <input
                        type="text"
                        id="price2"
                        value={form2.price}
                        onChange={(e) => setForm2({ ...form2, price: e.target.value })}
                        required
                        className={styles.input}
                    />
                </div>
                <button type="submit" className={styles.button}>ADD FANN</button>
            </form>

            {/* Fann Items */}
            <div className={styles.itemList}>
                <h2 className={styles.title}>Fann Ürünleri</h2>
                {items3.length === 0 ? <p>Hiç ürün yok.</p> : (
                    <ul>
                        {items3.map((item) => (
                            <li key={item._id} className={styles.item}>
                                <p className="text-gray-700">{item.title} - {item.price} ₺</p>
                                <button
                                    onClick={() => handleDelete(item._id, 'https://grez-shop.vercel.app/api/fann/', setItems3)}
                                    className={styles.deleteButton}
                                >
                                    <FontAwesomeIcon icon={faTrash} />
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            {/* Form 3: Tiktok */}
            <form onSubmit={(e) => handleFormSubmit(e, form3, setForm3, 'https://grez-shop.vercel.app/api/tiktok/postt', setItems2)} className={styles.form}>
                <h2 className={styles.title}>Form 3: Yeni Post Oluştur (Tiktok)</h2>
                {error && <p className={styles.errorMessage}>{error}</p>}
                {success && <p className={styles.successMessage}>Post başarılı bir şekilde oluşturuldu!</p>}
                <div className="mb-4">
                    <label htmlFor="title3" className="block mb-2 font-medium">Başlık</label>
                    <input
                        type="text"
                        id="title3"
                        value={form3.title}
                        onChange={(e) => setForm3({ ...form3, title: e.target.value })}
                        required
                        className={styles.input}
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="price3" className="block mb-2 font-medium">Fiyat</label>
                    <input
                        type="text"
                        id="price3"
                        value={form3.price}
                        onChange={(e) => setForm3({ ...form3, price: e.target.value })}
                        required
                        className={styles.input}
                    />
                </div>
                <button type="submit" className={styles.button}>ADD TIKTOK</button>
            </form>

            {/* Tiktok Items */}
            <div className={styles.itemList}>
                <h2 className={styles.title}>Tiktok Ürünleri</h2>
                {items2.length === 0 ? <p>Hiç ürün yok.</p> : (
                    <ul>
                        {items2.map((item) => (
                            <li key={item._id} className={styles.item}>
                                <p className="text-gray-700">{item.title} - {item.price} ₺</p>
                                <button
                                    onClick={() => handleDelete(item._id, 'https://grez-shop.vercel.app/api/tiktok/', setItems2)}
                                    className={styles.deleteButton}
                                >
                                    <FontAwesomeIcon icon={faTrash} />
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default Postat;
