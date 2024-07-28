"use client";

import UpdateProductForm from "@/components/updateProductForm/updateProductForm";

const TotalProducts = ({ params }: { params: { item: number } }) => {
  return (
    <div>
      <UpdateProductForm id={params.item}></UpdateProductForm>
    </div>
  );
};

export default TotalProducts;
