"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import styles from "@/utils/saas/signup.module.scss";
import Link from "next/link";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== passwordConfirm) {
      alert("Passwords do not match!");
      return;
    }

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

      if (res) {
        router.push("/login");
      } else {
        alert(res);
      }
    } catch (error: any) {
      alert(
        error.response?.data?.message || "An error occurred during signup."
      );
      console.log(error.response?.data?.message);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h2 className={styles.title}>Sign Up</h2>
      <label>
        <input
          type="text"
          className={styles.input}
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <span>Name</span>
      </label>
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

        <label>
          <input
            type="password"
            className={styles.input}
            placeholder="Confirm Password"
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
            required
          />
          <span>Confirm Password</span>
        </label>
      </div>
      <button className={styles.submit} type="submit">
        Sign Up
      </button>
      <Link href="/login">
        <p>
          Already have an account? <b>Login</b>
        </p>
      </Link>
    </form>
  );
};

export default Signup;
