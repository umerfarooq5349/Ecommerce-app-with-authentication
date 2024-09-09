import axios from "axios";

export async function signup({
  name,
  email,
  password,
  passwordConfirm,
}: {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
}) {
  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_SERVER}/api/signup`,
      {
        name,
        email,
        password,
        passwordConfirm,
      }
    );

    return res.data;
  } catch (error: any) {
    console.error(
      "Error during signup:",
      error.response?.data?.message || error.message
    );
    throw new Error(
      error.response?.data?.message || "An error occurred during signup."
    );
  }
}
