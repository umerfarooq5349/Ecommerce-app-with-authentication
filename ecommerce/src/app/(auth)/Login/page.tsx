"use client";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookF, faGoogle } from "@fortawesome/free-brands-svg-icons";
import Swal from "sweetalert2";
import styles from "@/utils/saas/login.module.scss";
import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";

interface LoginPageFormValues {
  email: string;
  password: string;
}

const Login = () => {
  const router = useRouter();
  const [isSocialLogin, setIsSocialLogin] = useState(false);
  const [isEmailLogin, setIsEmailLogin] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid, isSubmitting },
  } = useForm<LoginPageFormValues>({
    mode: "onChange", // Validate on change
  });

  const onSubmit: SubmitHandler<LoginPageFormValues> = async (data) => {
    setIsEmailLogin(true);
    try {
      const result = await signIn("credentials", {
        redirect: false,
        email: data.email,
        password: data.password,
      });

      if (result?.error) {
        Swal.fire({ title: result.error, timer: 5000, timerProgressBar: true });
        setIsEmailLogin(false);
      } else {
        router.push("/");
      }
    } catch (error) {
      Swal.fire({
        title: "An error occurred during sign-in.",
        timer: 5000,
        timerProgressBar: true,
      });
      setIsEmailLogin(false);
    }
  };

  const handleSocialLogin = async (provider: "google" | "facebook") => {
    setIsSocialLogin(true);
    setIsEmailLogin(false);
    await signIn(provider);
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Login</h2>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <div className={styles.inputGroup}>
          <input
            type="email"
            placeholder="Email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                message: "Enter a valid email",
              },
            })}
            // disabled={isSocialLogin}
          />
        </div>

        <div className={styles.inputGroup}>
          <input
            type="password"
            placeholder="Password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters",
              },
            })}
          />
          {errors.password && (
            <span className={styles.error}>{errors.password.message}</span>
          )}
        </div>

        <button
          className={styles.submitBtn}
          type="submit"
          disabled={!isValid || isSubmitting || isSocialLogin}
        >
          {isSubmitting ? "Logging in..." : "Log in"}
        </button>
      </form>
      <div className={styles.divider}></div>
      <div className={styles.socialContainer}>
        <button
          className={styles.socialBtn}
          onClick={() => handleSocialLogin("google")}
          disabled={isEmailLogin || isSubmitting}
        >
          <FontAwesomeIcon icon={faGoogle} size="xl" /> Log in with Google
        </button>
        <button
          className={styles.socialBtn}
          onClick={() => handleSocialLogin("facebook")}
          disabled={isEmailLogin || isSubmitting}
        >
          <FontAwesomeIcon icon={faFacebookF} size="xl" /> Log in with Facebook
        </button>
      </div>
      <span>
        Don&lsquo;t have an account?
        <Link href="/signup" className={styles.signupLink}>
          Signup
        </Link>
      </span>
    </div>
  );
};

export default Login;
