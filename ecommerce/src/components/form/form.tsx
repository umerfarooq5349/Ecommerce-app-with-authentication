import styles from "@/utils/saas/FormComponent.module.scss";
import Image from "next/image";
import { useState, ChangeEventHandler, FormEventHandler, useRef } from "react";

interface FormData {
  price: number;
  description: string;
  title: string;
  discountPercentage: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  handleSubmit: FormEventHandler<HTMLFormElement>;
  handleChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  handleImageUpload: ChangeEventHandler<HTMLInputElement>;
  heading: string;
}

const FormComponent = (formData: FormData) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Placeholder image URL
  const placeholderImage = "/assets/placeholder.jpg"; // Adjust path based on where the image is stored

  // Ref for hidden file input
  const hiddenFileInput = useRef<HTMLInputElement>(null);

  const handleImageUpload: ChangeEventHandler<HTMLInputElement> = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
    formData.handleImageUpload(event); // Call the original handler
  };

  // Trigger file input when custom button is clicked
  const handleCustomUploadClick = () => {
    hiddenFileInput.current?.click();
  };

  return (
    <form className={styles.form} onSubmit={formData.handleSubmit}>
      <p className={styles.title}>{formData.heading} Product</p>
      <div className={styles.container}>
        <div className={styles.formLeft}>
          {/* Custom Button for Upload */}
          {/* <div
            className={styles.customUploadButton}
            onClick={handleCustomUploadClick}
          >
            {formData.heading === "Add" ? "Upload Image" : "Change Image"}
          </div> */}

          {/* Hidden File Input */}
          <input
            type="file"
            ref={hiddenFileInput}
            onChange={handleImageUpload}
            style={{ display: "none" }} // Hidden file input
          />

          {/* Display either the uploaded image, the thumbnail from props, or the placeholder */}
          <div
            className={styles.thumbnail_preview}
            onClick={handleCustomUploadClick}
          >
            <Image
              src={formData.thumbnail || selectedImage || placeholderImage}
              alt="Selected image"
              fill
              className={styles.image}
            />
          </div>
        </div>
        <div className={styles.formRight}>
          {/* <p className={styles.message}>Fill in the product details below.</p> */}
          <div className={styles.flex}>
            <label>
              <input
                type="text"
                name="title"
                placeholder="Iphone 16 Pro"
                value={formData.title}
                onChange={formData.handleChange}
                required
                className={styles.input}
              />
              <span>Title</span>
            </label>
            <label>
              <input
                type="number"
                name="price"
                placeholder="10000Rs"
                value={formData.price}
                onChange={formData.handleChange}
                required
                className={styles.input}
              />
              <span>Price</span>
            </label>
          </div>
          <div className={styles.flex}>
            <label>
              <input
                type="number"
                name="discountPercentage"
                placeholder="13%"
                value={formData.discountPercentage}
                onChange={formData.handleChange}
                required
                className={styles.input}
              />
              <span>Discount Percentage</span>
            </label>
            <label>
              <input
                type="number"
                name="stock"
                placeholder="100"
                value={formData.stock}
                onChange={formData.handleChange}
                required
                className={styles.input}
              />
              <span>Stock</span>
            </label>
          </div>
          <div className={styles.flex}>
            <label>
              <input
                type="text"
                name="brand"
                placeholder="Apple, Google"
                value={formData.brand}
                onChange={formData.handleChange}
                required
                className={styles.input}
              />
              <span>Brand</span>
            </label>
            <label>
              <input
                type="text"
                name="category"
                placeholder="Mobile or Electronics"
                value={formData.category}
                onChange={formData.handleChange}
                required
                className={styles.input}
              />
              <span>Category</span>
            </label>
          </div>

          <label>
            <textarea
              name="description"
              placeholder="Add some description for Product"
              value={formData.description}
              onChange={formData.handleChange}
              rows={5}
              required
              className={styles.input}
            />
            <span>Description</span>
          </label>
        </div>
      </div>
      <button type="submit" className={styles.submit}>
        {formData.heading} Product
      </button>
    </form>
  );
};

export default FormComponent;
