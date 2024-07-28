"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signup } from "@/app/api/auth/route";
import styles from "@/utils/saas/signup.module.scss";
import Link from "next/link";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [role, setRole] = useState("user"); // Default role
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await signup(name, email, password, passwordConfirm, role);
      router.push("/Login");
    } catch (error) {
      alert(error);
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
      <Link href="/Login">
        <p>
          Already have an account? <b>Login</b>
        </p>
      </Link>
    </form>
  );
};

export default Signup;
