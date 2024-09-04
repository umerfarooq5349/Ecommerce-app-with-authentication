"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
// import { login } from "@/app/api/auth/route";
import styles from "@/utils/saas/login.module.scss";
import Link from "next/link";
import { signIn } from "next-auth/react";

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
        alert(result.error);
      } else {
        router.push("/");
      }
    } catch (error) {
      alert("An error occurred during sign-in.");
    }
  };
  const handlegoogleLogin = async () => {
    // google login
    await signIn("google");
  };
  const handlegitLogin = async () => {
    // google login
    await signIn("github");
  };

  return (
    <div>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h2 className={styles.title}>Login</h2>

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
        <div className={styles.flex}>
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
        </div>
        <button className={styles.submit} type="submit">
          Log in
        </button>

        <Link href="/signup">
          <p>
            Do nott have an account? <b>Signup</b>
          </p>
        </Link>
      </form>
      <button className={styles.submit} onClick={handlegoogleLogin}>
        Log in with Google
      </button>
      <button className={styles.submit} onClick={handlegitLogin}>
        Log in with Github
      </button>
    </div>
  );
};

export default Login;
