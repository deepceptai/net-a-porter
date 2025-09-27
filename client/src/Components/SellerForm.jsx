import { useState } from "react";

function SellerForm() {
  const [formData, setFormData] = useState({
    category: "",
    dress: "",
    type: "",
    size: "",
    color: "",
    designer: "",
    manufacturedAt: "",
    price: "",
  });

  const [images, setImages] = useState([null]); // start with one input

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e, index) => {
    const newImages = [...images];
    newImages[index] = e.target.files[0];
    setImages(newImages);

    // If last input has a file and we are under 10, add another empty field
    if (index === images.length - 1 && images.length < 10) {
      setImages([...newImages, null]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });

    // append only filled images (not null)
    images.forEach((img) => {
      if (img) data.append("images", img);
    });

    try {
      const res = await fetch("http://localhost:5000/api/clothes/upload", {
        method: "POST",
        body: data,
      });

      const result = await res.json();
      console.log(result);
      alert(result.message || "Upload successful!");
      setFormData({
    category: "",
    dress: "",
    type: "",
    size: "",
    color: "",
    designer: "",
    manufacturedAt: "",
    price: "",
  })
  setImages([null])
    } catch (error) {
      console.error("Error uploading:", error);
      alert("Upload failed!");
    }
  };

  return (
    <div>
      <h1>Upload Clothes</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="category"
          placeholder="Category"
          value={formData.category}
          onChange={handleChange}
          required
        />
        <br />

        <input
          type="text"
          name="dress"
          placeholder="Dress (shirt, pants, jacket...)"
          value={formData.dress}
          onChange={handleChange}
          required
        />
        <br />

        <input
          type="text"
          name="type"
          placeholder="Type (cargo, tshirt, etc.)"
          value={formData.type}
          onChange={handleChange}
          required
        />
        <br />

        <input
          type="text"
          name="size"
          placeholder="Size (S, M, L, etc.)"
          value={formData.size}
          onChange={handleChange}
          required
        />
        <br />

        <input
          type="text"
          name="color"
          placeholder="Color"
          value={formData.color}
          onChange={handleChange}
          required
        />
        <br />

        <input
          type="text"
          name="designer"
          placeholder="Designer"
          value={formData.designer}
          onChange={handleChange}
          required
        />
        <br />

        <input
          type="date"
          name="manufacturedAt"
          value={formData.manufacturedAt}
          onChange={handleChange}
          required
        />
        <br />

        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          required
        />
        <br />

        <h3>Images (max 10)</h3>
        {images.map((img, index) => (
          <div key={index}>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleImageChange(e, index)}
            />
            {img && (
              <p style={{ fontSize: "12px", color: "green" }}>
                {img.name} selected
              </p>
            )}
          </div>
        ))}

        <br />
        <button type="submit">Upload</button>
      </form>
    </div>
  );
}

export default SellerForm;
