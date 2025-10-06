import { useState, useEffect } from "react";
import authService from "../services/authService";
import "./SellerForm.css";

function SellerForm() {
  const API_URL=import.meta.env.VITE_API_URL;

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

  const [images, setImages] = useState([null]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [options, setOptions] = useState({ dresses: [], types: [] });

  const categories = ["clothes", "bags", "footwear", "accessories"];

  useEffect(() => {
    fetchOptions();
  }, []);

  const fetchOptions = async () => {
    try {
      const res = await fetch(`${API_URL}api/clothes/options`);
      const result = await res.json();
      
      if (result.success && result.data) {
        setOptions({
          dresses: result.data.dresses || [],
          types: result.data.types || [],
        });
      }
    } catch (error) {
      console.error("Error fetching options:", error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSizeAndFitChange = (path, value) => {
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

    if (index === images.length - 1 && images.length < 10) {
      setImages([...newImages, null]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccess("");

    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      if (key === "sizeAndFit") {
        data.append("sizeAndFit", JSON.stringify(formData.sizeAndFit));
      } else if (key === "size" || key === "color") {
        const arr = formData[key]
          .split(",")
          .map((v) => v.trim())
          .filter(Boolean);
        data.append(key, JSON.stringify(arr));
      } else {
        data.append(key, formData[key]);
      }
    });

    images.forEach((img) => {
      if (img) data.append("images", img);
    });

    try {
      const token = authService.getToken();

      const res = await fetch(`${API_URL}api/clothes/upload`, {
        method: "POST",
        body: data,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await res.json();
      
      if (res.ok) {
        setSuccess(result.message || "Upload successful!");
        // Reset form
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
      } else {
        setError(result.message || "Upload failed!");
      }
    } catch (error) {
      console.error("Error uploading:", error);
      setError("Upload failed! Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="seller-form-page mt-5 pt-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-lg-8">
            <div className="seller-form-container">
              <h1 className="seller-form-title mt-5">Upload Product</h1>

              {error && (
                <div className="alert alert-danger" role="alert">
                  {error}
                </div>
              )}

              {success && (
                <div className="alert alert-success" role="alert">
                  {success}
                </div>
              )}

              <form onSubmit={handleSubmit} className="seller-form">
                {/* Category */}
                <div className="form-group mb-4">
                  <label htmlFor="category" className="form-label">
                    Category
                  </label>
                  <select
                    id="category"
                    name="category"
                    className="form-select seller-select"
                    value={formData.category}
                    onChange={handleChange}
                    required
                    disabled={isLoading}
                  >
                    <option value="">Select Category</option>
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat.charAt(0).toUpperCase() + cat.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Dress and Type */}
                <div className="row mb-4">
                  <div className="col-12 col-md-6">
                    <div className="form-group">
                      <label htmlFor="dress" className="form-label">
                        Dress Type
                      </label>
                      <input
                        type="text"
                        id="dress"
                        name="dress"
                        className="form-control seller-input seller-datalist-input"
                        placeholder="e.g., shirt, pants, jacket"
                        value={formData.dress}
                        onChange={handleChange}
                        list="dress-options"
                        required
                        disabled={isLoading}
                      />
                      <datalist id="dress-options" className="seller-datalist">
                        {options.dresses.map((dress, index) => (
                          <option key={index} value={dress} />
                        ))}
                      </datalist>
                    </div>
                  </div>
                  <div className="col-12 col-md-6">
                    <div className="form-group">
                      <label htmlFor="type" className="form-label">
                        Type
                      </label>
                      <input
                        type="text"
                        id="type"
                        name="type"
                        className="form-control seller-input seller-datalist-input"
                        placeholder="e.g., cargo, t-shirt"
                        value={formData.type}
                        onChange={handleChange}
                        list="type-options"
                        required
                        disabled={isLoading}
                      />
                      <datalist id="type-options" className="seller-datalist">
                        {options.types.map((type, index) => (
                          <option key={index} value={type} />
                        ))}
                      </datalist>
                    </div>
                  </div>
                </div>

                {/* Size and Color */}
                <div className="row mb-4">
                  <div className="col-12 col-md-6">
                    <div className="form-group">
                      <label htmlFor="size" className="form-label">
                        Size (comma-separated)
                      </label>
                      <input
                        type="text"
                        id="size"
                        name="size"
                        className="form-control seller-input"
                        placeholder="e.g., S, M, L, XL"
                        value={formData.size}
                        onChange={handleChange}
                        required
                        disabled={isLoading}
                      />
                      <small className="form-text text-muted">
                        Available: XXS, XS, S, M, L, XL, XXL, XXXL
                      </small>
                    </div>
                  </div>
                  <div className="col-12 col-md-6">
                    <div className="form-group">
                      <label htmlFor="color" className="form-label">
                        Color (comma-separated)
                      </label>
                      <input
                        type="text"
                        id="color"
                        name="color"
                        className="form-control seller-input"
                        placeholder="e.g., Black, White, Navy"
                        value={formData.color}
                        onChange={handleChange}
                        required
                        disabled={isLoading}
                      />
                    </div>
                  </div>
                </div>

                {/* Designer and Manufactured Date */}
                <div className="row mb-4">
                  <div className="col-12 col-md-6">
                    <div className="form-group">
                      <label htmlFor="designer" className="form-label">
                        Designer
                      </label>
                      <input
                        type="text"
                        id="designer"
                        name="designer"
                        className="form-control seller-input"
                        placeholder="Designer name"
                        value={formData.designer}
                        onChange={handleChange}
                        required
                        disabled={isLoading}
                      />
                    </div>
                  </div>
                  <div className="col-12 col-md-6">
                    <div className="form-group">
                      <label htmlFor="manufacturedAt" className="form-label">
                        Manufactured Date
                      </label>
                      <input
                        type="date"
                        id="manufacturedAt"
                        name="manufacturedAt"
                        className="form-control seller-input"
                        value={formData.manufacturedAt}
                        onChange={handleChange}
                        required
                        disabled={isLoading}
                      />
                    </div>
                  </div>
                </div>

                {/* Price */}
                <div className="form-group mb-4">
                  <label htmlFor="price" className="form-label">
                    Price (₹)
                  </label>
                  <input
                    type="number"
                    id="price"
                    name="price"
                    className="form-control seller-input"
                    placeholder="Enter price"
                    value={formData.price}
                    onChange={handleChange}
                    required
                    disabled={isLoading}
                    min="0"
                    step="0.01"
                  />
                </div>

                {/* Editor Notes */}
                <div className="form-group mb-4">
                  <label htmlFor="editorNotes" className="form-label">
                    Editor Notes (optional)
                  </label>
                  <textarea
                    id="editorNotes"
                    name="editorNotes"
                    className="form-control seller-textarea"
                    placeholder="Additional notes about the product"
                    value={formData.editorNotes}
                    onChange={handleChange}
                    rows="4"
                    disabled={isLoading}
                  />
                </div>

                {/* Size and Fit Section */}
                <div className="size-fit-section mb-4">
                  <h3 className="section-title">Size & Fit</h3>

                  <div className="form-group mb-3">
                    <label htmlFor="description" className="form-label">
                      Description
                    </label>
                    <input
                      type="text"
                      id="description"
                      className="form-control seller-input"
                      placeholder="Product description"
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
                      disabled={isLoading}
                    />
                  </div>

                  <div className="form-group mb-3">
                    <label htmlFor="fitTips" className="form-label">
                      Fit Tips
                    </label>
                    <input
                      type="text"
                      id="fitTips"
                      className="form-control seller-input"
                      placeholder="Fitting recommendations"
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
                      disabled={isLoading}
                    />
                  </div>

                  <div className="form-group mb-3">
                    <label htmlFor="fabricDetails" className="form-label">
                      Fabric Details
                    </label>
                    <input
                      type="text"
                      id="fabricDetails"
                      className="form-control seller-input"
                      placeholder="Material and fabric information"
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
                      disabled={isLoading}
                    />
                  </div>

                  <h4 className="subsection-title">Model Information</h4>

                  <div className="row mb-3">
                    <div className="col-12 col-md-6">
                      <div className="form-group">
                        <label htmlFor="modelHeight" className="form-label">
                          Height
                        </label>
                        <input
                          type="text"
                          id="modelHeight"
                          className="form-control seller-input"
                          placeholder="e.g., 5'10"
                          value={formData.sizeAndFit.modelInfo.height}
                          onChange={(e) =>
                            handleSizeAndFitChange("modelInfo.height", e.target.value)
                          }
                          disabled={isLoading}
                        />
                      </div>
                    </div>
                    <div className="col-12 col-md-6">
                      <div className="form-group">
                        <label htmlFor="modelWearingSize" className="form-label">
                          Wearing Size
                        </label>
                        <input
                          type="text"
                          id="modelWearingSize"
                          className="form-control seller-input"
                          placeholder="e.g., M"
                          value={formData.sizeAndFit.modelInfo.wearingSize}
                          onChange={(e) =>
                            handleSizeAndFitChange("modelInfo.wearingSize", e.target.value)
                          }
                          disabled={isLoading}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="row mb-3">
                    <div className="col-12 col-md-4">
                      <div className="form-group">
                        <label htmlFor="modelBust" className="form-label">
                          Bust
                        </label>
                        <input
                          type="text"
                          id="modelBust"
                          className="form-control seller-input"
                          placeholder="e.g., 34"
                          value={formData.sizeAndFit.modelInfo.measurements.bust}
                          onChange={(e) =>
                            handleSizeAndFitChange("modelInfo.measurements.bust", e.target.value)
                          }
                          disabled={isLoading}
                        />
                      </div>
                    </div>
                    <div className="col-12 col-md-4">
                      <div className="form-group">
                        <label htmlFor="modelWaist" className="form-label">
                          Waist
                        </label>
                        <input
                          type="text"
                          id="modelWaist"
                          className="form-control seller-input"
                          placeholder="e.g., 28"
                          value={formData.sizeAndFit.modelInfo.measurements.waist}
                          onChange={(e) =>
                            handleSizeAndFitChange("modelInfo.measurements.waist", e.target.value)
                          }
                          disabled={isLoading}
                        />
                      </div>
                    </div>
                    <div className="col-12 col-md-4">
                      <div className="form-group">
                        <label htmlFor="modelHip" className="form-label">
                          Hip
                        </label>
                        <input
                          type="text"
                          id="modelHip"
                          className="form-control seller-input"
                          placeholder="e.g., 36"
                          value={formData.sizeAndFit.modelInfo.measurements.hip}
                          onChange={(e) =>
                            handleSizeAndFitChange("modelInfo.measurements.hip", e.target.value)
                          }
                          disabled={isLoading}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Images */}
                <div className="form-group mb-4">
                  <label className="form-label">Product Images (max 10)</label>
                  <div className="images-upload-container">
                    {images.map((img, index) => (
                      <div key={index} className="image-upload-item mb-3">
                        <input
                          type="file"
                          accept="image/*"
                          className="form-control seller-input"
                          onChange={(e) => handleImageChange(e, index)}
                          disabled={isLoading}
                        />
                        {img && (
                          <small className="file-selected-text">
                            ✓ {img.name}
                          </small>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="btn seller-submit-btn"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <span
                        className="spinner-border spinner-border-sm me-2"
                        role="status"
                        aria-hidden="true"
                      ></span>
                      Uploading...
                    </>
                  ) : (
                    "Upload Product"
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SellerForm;