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
      editorNotes: "",
      sizeAndFit: {
        description: [""],
        fitTips: [""],
        fabricDetails: [""],
        modelInfo: {
          height: "",
          wearingSize: "",
          measurements: {
            bust: "",
            waist: "",
            hip: "",
          },
        },
      },
    });

    const [images, setImages] = useState([null]); // start with one input

    const handleChange = (e) => {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    };

    const handleSizeAndFitChange = (path, value) => {
      // path: e.g. "modelInfo.height"
      const keys = path.split(".");
      const updated = { ...formData.sizeAndFit };

      let obj = updated;
      for (let i = 0; i < keys.length - 1; i++) {
        obj = obj[keys[i]];
      }
      obj[keys[keys.length - 1]] = value;

      setFormData({
        ...formData,
        sizeAndFit: updated,
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
    if (key === "sizeAndFit") {
      data.append("sizeAndFit", JSON.stringify(formData.sizeAndFit));
    } else if (key === "size" || key === "color") {
      // Convert comma-separated string → array
      const arr = formData[key]
        .split(",")
        .map((v) => v.trim())
        .filter(Boolean);

      data.append(key, JSON.stringify(arr)); // send as JSON string
    } else {
      data.append(key, formData[key]);
    }
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

    // reset form
    setFormData({
      category: "",
      dress: "",
      type: "",
      size: "",
      color: "",
      designer: "",
      manufacturedAt: "",
      price: "",
      editorNotes: "",
      sizeAndFit: {
        description: [""],
        fitTips: [""],
        fabricDetails: [""],
        modelInfo: {
          height: "",
          wearingSize: "",
          measurements: {
            bust: "",
            waist: "",
            hip: "",
          },
        },
      },
    });
    setImages([null]);
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

          {/* Editor Notes */}
          <textarea
            name="editorNotes"
            placeholder="Editor notes about the product"
            value={formData.editorNotes}
            onChange={handleChange}
          />
          <br />

          {/* Size and Fit */}
          <h3>Size and Fit</h3>
          <input
            type="text"
            placeholder="Description"
            value={formData.sizeAndFit.description[0]}
            onChange={(e) =>
              setFormData({
                ...formData,
                sizeAndFit: {
                  ...formData.sizeAndFit,
                  description: [e.target.value],
                },
              })
            }
          />
          <br />
          <input
            type="text"
            placeholder="Fit Tips"
            value={formData.sizeAndFit.fitTips[0]}
            onChange={(e) =>
              setFormData({
                ...formData,
                sizeAndFit: {
                  ...formData.sizeAndFit,
                  fitTips: [e.target.value],
                },
              })
            }
          />
          <br />
          <input
            type="text"
            placeholder="Fabric Details"
            value={formData.sizeAndFit.fabricDetails[0]}
            onChange={(e) =>
              setFormData({
                ...formData,
                sizeAndFit: {
                  ...formData.sizeAndFit,
                  fabricDetails: [e.target.value],
                },
              })
            }
          />
          <br />

          <h4>Model Info</h4>
          <input
            type="text"
            placeholder="Height"
            value={formData.sizeAndFit.modelInfo.height}
            onChange={(e) =>
              handleSizeAndFitChange("modelInfo.height", e.target.value)
            }
          />
          <br />
          <input
            type="text"
            placeholder="Wearing Size"
            value={formData.sizeAndFit.modelInfo.wearingSize}
            onChange={(e) =>
              handleSizeAndFitChange("modelInfo.wearingSize", e.target.value)
            }
          />
          <br />
          <input
            type="text"
            placeholder="Bust"
            value={formData.sizeAndFit.modelInfo.measurements.bust}
            onChange={(e) =>
              handleSizeAndFitChange("modelInfo.measurements.bust", e.target.value)
            }
          />
          <br />
          <input
            type="text"
            placeholder="Waist"
            value={formData.sizeAndFit.modelInfo.measurements.waist}
            onChange={(e) =>
              handleSizeAndFitChange(
                "modelInfo.measurements.waist",
                e.target.value
              )
            }
          />
          <br />
          <input
            type="text"
            placeholder="Hip"
            value={formData.sizeAndFit.modelInfo.measurements.hip}
            onChange={(e) =>
              handleSizeAndFitChange("modelInfo.measurements.hip", e.target.value)
            }
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
