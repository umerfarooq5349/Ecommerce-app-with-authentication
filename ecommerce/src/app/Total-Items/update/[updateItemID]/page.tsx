"use client";

import UpdateProductForm from "@/components/updateProductForm/updateProductForm";

const TotalProducts = ({ params }: { params: { updateItemID: number } }) => {
  return (
    <div>
      <UpdateProductForm id={params.updateItemID}></UpdateProductForm>
    </div>
  );
};

export default TotalProducts;
