"use client";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookF, faGoogle } from "@fortawesome/free-brands-svg-icons";
import Swal from "sweetalert2";
import styles from "@/utils/saas/signup.module.scss";
import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";
import axios from "axios";
import { SignupFormType } from "@/utils/types/signup.types";

const Signup = () => {
  const router = useRouter();
  const [isSocialLogin, setIsSocialLogin] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid, isSubmitting },
  } = useForm<SignupFormType>({
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<SignupFormType> = async (data) => {
    if (data.password !== data.passwordConfirm) {
      Swal.fire({
        title: "Passwords do not match!",
        icon: "error",
        timer: 3000,
        timerProgressBar: true,
      });
      return;
    }

    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER}/api/signup`,
        {
          name: data.name,
          email: data.email,
          password: data.password,
          passwordConfirm: data.passwordConfirm,
        }
      );

      if (res.status === 201) {
        Swal.fire({
          title: "Signup successful!",
          icon: "success",
          timer: 3000,
          timerProgressBar: true,
        });
        router.push("/login");
      }
    } catch (error: any) {
      Swal.fire({
        title: error.response?.data?.message || "An error occurred.",
        icon: "error",
        timer: 3000,
        timerProgressBar: true,
      });
    }
  };

  const handleSocialLogin = async (provider: "google" | "facebook") => {
    setIsSocialLogin(true);
    await signIn(provider);
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Sign Up</h2>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <div className={styles.inputGroup}>
          <input
            type="text"
            placeholder="Name"
            {...register("name", {
              required: "Name is required",
              minLength: {
                value: 3,
                message: "Name should be at least 3 characters",
              },
            })}
            // disabled={isSocialLogin}
          />

          <input
            type="email"
            placeholder="Email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^\S+@\S+\.\S+$/,
                message: "Please enter valid email",
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
              pattern: {
                value: /^(?=.*[A-Z])(?=.*[!@#$%^&*])/,
                message: "Include 1 uppercase & 1 special character",
              },
            })}
            // disabled={isSocialLogin}
          />

          <input
            type="password"
            placeholder="Confirm Password"
            {...register("passwordConfirm", {
              required: "Confirm your password",
              validate: (value) =>
                value === watch("password") || "Passwords do not match",
            })}
            // disabled={isSocialLogin}
          />
        </div>

        {Object.keys(errors).length > 0 && (
          <div className={styles.errorContainer}>
            {errors.name && <span>{errors.name.message}</span>}
            {errors.email && <span>{errors.email.message}</span>}
            {errors.password && <span>{errors.password.message}</span>}
            {errors.passwordConfirm && (
              <span>{errors.passwordConfirm.message}</span>
            )}
          </div>
        )}
        <button
          className={styles.submitBtn}
          type="submit"
          disabled={!isValid || isSubmitting || isSocialLogin}
        >
          {isSubmitting ? "Signing up..." : "Sign Up"}
        </button>
      </form>

      <div className={styles.divider}></div>

      <div className={styles.socialContainer}>
        <button
          className={styles.socialBtn}
          onClick={() => handleSocialLogin("google")}
          disabled={isSubmitting}
        >
          <FontAwesomeIcon icon={faGoogle} size="xl" /> Sign up with Google
        </button>
        <button
          className={styles.socialBtn}
          onClick={() => handleSocialLogin("facebook")}
          disabled={isSubmitting}
        >
          <FontAwesomeIcon icon={faFacebookF} size="xl" /> Sign up with Facebook
        </button>
      </div>

      <span>
        Already have an account?
        <Link href="/login" className={styles.signupLink}>
          {" "}
          Login
        </Link>
      </span>
    </div>
  );
};

export default Signup;
