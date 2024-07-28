export const signup = async (
  name: string,
  email: string,
  password: string,
  passwordConfirm: string,
  role: string
) => {
  const response = await fetch("http://localhost:8080/api/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, email, password, passwordConfirm, role }),
  });
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return response.json();
};

export const login = async (email: string, password: string) => {
  const response = await fetch("http://localhost:8080/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ email, password }),
  });
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return response.json();
};
