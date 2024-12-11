import styles from "@/utils/saas/FormComponent.module.scss";
import Image from "next/image";
import { useState, useRef } from "react";
import { useForm, Controller } from "react-hook-form";

interface FormData {
  price: number;
  description: string;
  title: string;
  discountPercentage: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  heading: string;
}

const FormComponent = ({
  handleSubmit: onSubmit,
  handleImageUpload,
  heading,
  thumbnail,
  price,
  stock,
  brand,
  discountPercentage,
  category,
  description,
  title,
}: Omit<FormData, "handleChange"> & {
  handleSubmit: (data: FormData) => void;
  handleImageUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Placeholder image URL
  const placeholderImage = "/assets/placeholder.jpg";

  // Ref for hidden file input
  const hiddenFileInput = useRef<HTMLInputElement>(null);

  const { control, handleSubmit, setValue, watch } = useForm<FormData>({
    defaultValues: {
      price,
      description,
      title,
      discountPercentage,
      stock,
      brand,
      category,
      thumbnail,
    },
  });

  const watchThumbnail = watch("thumbnail");

  const handleImageUploadLocal = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setValue("thumbnail", reader.result as string);
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
    handleImageUpload(event); // Call the original handler
  };

  // Trigger file input when custom button is clicked
  const handleCustomUploadClick = () => {
    hiddenFileInput.current?.click();
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <p className={styles.title}>{heading} Product</p>
      <div className={styles.container}>
        <div className={styles.formLeft}>
          <p className={styles.message}>Fill in the product details below.</p>
          <div className={styles.flex}>
            <Controller
              name="title"
              control={control}
              render={({ field }) => (
                <label>
                  <input
                    {...field}
                    type="text"
                    placeholder="Iphone 16 Pro"
                    required
                    className={styles.input}
                  />
                  <span>Title</span>
                </label>
              )}
            />
            <Controller
              name="price"
              control={control}
              render={({ field }) => (
                <label>
                  <input
                    {...field}
                    type="number"
                    placeholder="10000Rs"
                    required
                    className={styles.input}
                  />
                  <span>Price</span>
                </label>
              )}
            />
          </div>
          <div className={styles.flex}>
            <Controller
              name="discountPercentage"
              control={control}
              render={({ field }) => (
                <label>
                  <input
                    {...field}
                    type="number"
                    placeholder="13%"
                    required
                    className={styles.input}
                  />
                  <span>Discount Percentage</span>
                </label>
              )}
            />
            <Controller
              name="stock"
              control={control}
              render={({ field }) => (
                <label>
                  <input
                    {...field}
                    type="number"
                    placeholder="100"
                    required
                    className={styles.input}
                  />
                  <span>Stock</span>
                </label>
              )}
            />
          </div>
          <div className={styles.flex}>
            <Controller
              name="brand"
              control={control}
              render={({ field }) => (
                <label>
                  <input
                    {...field}
                    type="text"
                    placeholder="Apple, Google"
                    required
                    className={styles.input}
                  />
                  <span>Brand</span>
                </label>
              )}
            />
            <Controller
              name="category"
              control={control}
              render={({ field }) => (
                <label>
                  <input
                    {...field}
                    type="text"
                    placeholder="Mobile or Electronics"
                    required
                    className={styles.input}
                  />
                  <span>Category</span>
                </label>
              )}
            />
          </div>
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <label>
                <textarea
                  {...field}
                  placeholder="Add some description for Product"
                  rows={5}
                  required
                  className={styles.input}
                />
                <span>Description</span>
              </label>
            )}
          />
        </div>
        <div className={styles.formRight}>
          <div
            className={styles.customUploadButton}
            onClick={handleCustomUploadClick}
          >
            {heading === "Add" ? "Upload Image" : "Change Image"}
          </div>
          <input
            type="file"
            ref={hiddenFileInput}
            onChange={handleImageUploadLocal}
            style={{ display: "none" }}
          />
          <div className={styles.thumbnail_preview}>
            <Image
              src={
                watchThumbnail || selectedImage || thumbnail || placeholderImage
              }
              alt="Selected image"
              fill
              className={styles.image}
            />
          </div>
        </div>
      </div>
      <button type="submit" className={styles.submit}>
        {heading} Product
      </button>
    </form>
  );
};

export default FormComponent;
