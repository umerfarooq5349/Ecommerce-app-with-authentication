import FormComponent from "@/components/addProductFrorm/page";
import { getServerSession } from "next-auth";
import { options } from "../api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";

const AddProduct = async () => {
  const session = await getServerSession(options);
  if (!session) {
    redirect("/api/auth/signin?callbackUrl=/AddProduct");
  }
  return (
    <div>
      <FormComponent />
    </div>
  );
};

export default AddProduct;
