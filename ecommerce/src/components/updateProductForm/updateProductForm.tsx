import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import Foorm from "../form/form";
import { getItem, updateItem, uploadProductImage } from "@/app/api/item"; // Import getItem function
import { Products } from "@/utils/model/item";
// import { homeProducts } from "@/utils/types/dumydata";

interface UpdateProductFormProps {
  id: number;
}

const UpdateProductForm: React.FC<UpdateProductFormProps> = ({ id }) => {
  const [formData, setFormData] = useState({
    price: 0,
    description: "",
    title: "",
    discountPercentage: 0,
    stock: 10,
    brand: "",
    category: "",
    thumbnail: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (id) {
          const itemData = await getItem(id);
          setFormData(itemData.data);
          // setFormData(homeProducts.find((item) => item._id === id) || formData);
          // console.log(homeProducts.find((item) => item._id === id));
        }
      } catch (error) {
        throw new Error("error getting item");
      }
    };

    fetchData();
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const image = e.target.files?.[0];
    if (image) {
      try {
        const response = await uploadProductImage(image);
        setFormData((prevState: any) => ({
          ...prevState,
          thumbnail: response.url, // Assuming your API returns the image URL as `url`
        }));
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
        });
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      const updatedItem = await updateItem(id, formData).then(() => {
        Swal.fire({
          icon: "success",
          title: "Success",
          backdrop: "true",
          confirmButtonAriaLabel: "OK",
          timer: 10000,
          text: "Item updated successfully!",
        });
      });

      // console.log(updatedItem);
      setFormData(formData);
    } catch (error) {
      console.error("Error updating item:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
    }
  };

  console.log(`thumbnail image url: ${formData.thumbnail}`);
  return (
    <div>
      <Foorm
        brand={formData.brand}
        category={formData.category}
        description={formData.description}
        discountPercentage={formData.discountPercentage}
        price={formData.price}
        stock={formData.stock}
        thumbnail={formData.thumbnail}
        title={formData.title}
        handleChange={handleChange}
        handleImageUpload={handleImageUpload}
        handleSubmit={handleSubmit}
        heading="Update"
      ></Foorm>
    </div>
  );
};

export default UpdateProductForm;
