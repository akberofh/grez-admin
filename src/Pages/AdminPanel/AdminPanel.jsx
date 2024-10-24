import React, { useState } from "react";

const AdminPanel = () => {
  const [pubgProducts, setPubgProducts] = useState([]);
  const [tiktokProducts, setTiktokProducts] = useState([]);
  const [fanProducts, setFanProducts] = useState([]);

  const addPubgProduct = (e) => {
    e.preventDefault();
    const title = e.target.titleInp.value;
    const price = e.target.priceInp.value;
    setPubgProducts([...pubgProducts, { title, price }]);
    e.target.reset();
  };

  const addTiktokProduct = (e) => {
    e.preventDefault();
    const title = e.target.titleInp.value;
    const price = e.target.priceInp.value;
    setTiktokProducts([...tiktokProducts, { title, price }]);
    e.target.reset();
  };

  const addFanProduct = (e) => {
    e.preventDefault();
    const title = e.target.titleFanInp.value;
    const price = e.target.priceFanInp.value;
    const image = URL.createObjectURL(e.target.imageFanInp.files[0]);
    setFanProducts([...fanProducts, { title, price, image }]);
    e.target.reset();
  };

  const removeProduct = (setProducts, index) => {
    setProducts((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <main>
      <section id="add_pole">
        <div className="container">
          <div className="all_add_cc">
            <form onSubmit={addPubgProduct}>
              <input type="text" name="titleInp" placeholder="Title" required />
              <input type="text" name="priceInp" placeholder="Price" required />
              <button className="gonder" type="submit">Add PUBG</button>
            </form>

            <form onSubmit={addTiktokProduct}>
              <input type="text" name="titleInp" placeholder="Title" required />
              <input type="text" name="priceInp" placeholder="Price" required />
              <button className="gonder" type="submit">Add Tiktok</button>
            </form>

            <form onSubmit={addFanProduct}>
              <input type="text" name="titleFanInp" placeholder="Title" required />
              <input type="text" name="priceFanInp" placeholder="Price" required />
              <input type="file" name="imageFanInp" accept="image/*" required />
              <button className="gonder" type="submit">Add Fan Product</button>
            </form>
          </div>

          <ProductSection
            title="Pubg Products"
            products={pubgProducts}
            setProducts={setPubgProducts}
          />
          <ProductSection
            title="Tiktok Products"
            products={tiktokProducts}
            setProducts={setTiktokProducts}
          />
          <FanProductSection
            title="Fan Products"
            products={fanProducts}
            setProducts={setFanProducts}
          />
        </div>
      </section>
    </main>
  );
};

const ProductSection = ({ title, products, setProducts }) => (
  <div>
    <h2>{title}</h2>
    <table className="table">
      <thead>
        <tr>
          <th scope="col">Product Name</th>
          <th scope="col">Price</th>
          <th scope="col">Actions</th>
        </tr>
      </thead>
      <tbody>
        {products.map((product, index) => (
          <tr key={index}>
            <td>{product.title}</td>
            <td>{product.price}</td>
            <td>
              <button onClick={() => removeProduct(setProducts, index)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const FanProductSection = ({ title, products, setProducts }) => (
  <div className="fan-section">
    <h2>{title}</h2>
    <table className="table">
      <thead>
        <tr>
          <th scope="col">Image</th>
          <th scope="col">Product Name</th>
          <th scope="col">Price</th>
          <th scope="col">Actions</th>
        </tr>
      </thead>
      <tbody>
        {products.map((product, index) => (
          <tr key={index}>
            <td>
              <img src={product.image} alt={product.title} style={{ width: "100px" }} />
            </td>
            <td>{product.title}</td>
            <td>{product.price}</td>
            <td>
              <button onClick={() => removeProduct(setProducts, index)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default AdminPanel;
