import styles from "@/utils/saas/FormComponent.module.scss";
import Image from "next/image";
import { useState, ChangeEventHandler, FormEventHandler } from "react";

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

const Foorm = (formData: FormData) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

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

  return (
    <form className={styles.form} onSubmit={formData.handleSubmit}>
      <p className={styles.title}>{formData.heading} Product</p>
      <p className={styles.message}>Fill in the product details below.</p>
      <div className={styles.flex}>
        <label>
          <input
            type="text"
            name="title"
            placeholder=""
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
            placeholder=""
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
            placeholder=""
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
            placeholder=""
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
            placeholder=""
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
            placeholder=""
            value={formData.category}
            onChange={formData.handleChange}
            required
            className={styles.input}
          />
          <span>Category</span>
        </label>
      </div>
      <div className={styles.flexCenter}>
        <label>
          <input
            type="file"
            name="thumbnail"
            onChange={handleImageUpload}
            className={styles.input}
          />
          <span>Upload Thumbnail</span>
        </label>
      </div>
      {(selectedImage || formData.thumbnail) && (
        <div className={styles.thumbnail_preview}>
          <Image
            src={selectedImage || formData.thumbnail}
            alt="Selected Thumbnail"
            width={350}
            height={200}
          />
        </div>
      )}
      <label>
        <textarea
          name="description"
          placeholder=""
          value={formData.description}
          onChange={formData.handleChange}
          rows={5}
          required
          className={styles.input}
        />
        <span>Description</span>
      </label>
      <button type="submit" className={styles.submit}>
        {formData.heading} Product
      </button>
    </form>
  );
};

export default Foorm;
