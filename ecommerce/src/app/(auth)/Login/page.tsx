"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

import styles from "@/utils/saas/login.module.scss";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { alert } from "@/utils/alerts/alert";
import { faFacebookF, faGoogle } from "@fortawesome/free-brands-svg-icons";
import Swal from "sweetalert2";
import { alert } from "@/utils/alerts/alert";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (result?.error) {
        Swal.fire({
          title: result.error,
          timer: 5000,
          timerProgressBar: true,
        });
      } else {
        alert("Login successful", 3000);
        router.push("/");
      }
    } catch (error) {
      Swal.fire({
        title: "this is error message",
        timer: 5000,
        timerProgressBar: true,
      });
      // alert("An error occurred during sign-in.", 5000);
    }
  };
  const handlegoogleLogin = async () => {
    // google login
    await signIn("google");
  };
  const handlegitLogin = async () => {
    // google login
    await signIn("facebook");
  };

  return (
    <div className={styles.container}>
      <div className={styles.subContainer}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <label>
            <input
              type="email"
              className={styles.input}
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <span>Email</span>
          </label>

          <label>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className={styles.input}
            />
            <span>Password</span>
          </label>

          <button className={styles.submitBtn} type="submit">
            Log in
          </button>
        </form>
        <div className={styles.imageContainer}>
          <h2 className={styles.title}>Login</h2>
          <button className={styles.socialBtn} onClick={handlegoogleLogin}>
            <FontAwesomeIcon icon={faGoogle} size="xl" />
            Log in with Google
          </button>
          <button className={styles.socialBtn} onClick={handlegitLogin}>
            <FontAwesomeIcon icon={faFacebookF} size="xl"></FontAwesomeIcon>
            Log in with Facebook
          </button>
          <Link href="/signup">
            <p>
              Do nott have an account? <b>Signup</b>
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
