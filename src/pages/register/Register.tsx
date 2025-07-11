import "./Register.css";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import Joi from "joi";
import axiosInstance from "../../config/axios";

type RegisterFormInputs = {
  username: string;
  email: string;
};

const validationsSchema = Joi.object<RegisterFormInputs>({
  username: Joi.string().required().messages({
    "string.empty": "Username is required",
  }),
  email: Joi.string()
    .email({ tlds: { allow: false } }) // sin esta config, joi me tiraba errores. Tuve que habilitar el uso de TLDs.
    .required()
    .messages({
      "string.email": "Invalid email format",
      "string.empty": "Email is required",
    }),
});

export const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormInputs>({
    resolver: joiResolver(validationsSchema),
  });

  const navigate = useNavigate(); // con navigate me ahorro de usar Link, y me permite usarlo en onSubmit.

  const onSubmit = async (data: RegisterFormInputs) => {
    const sendData = {
      username: data.username,
      email: data.email,
    };
    try {
      const response = await axiosInstance.post(
        "http://localhost:3000/api/users",
        sendData
      );
      console.log("User created:", response.data);
      navigate("/post");
    } catch (err) {
      console.error("Error creating user:", err);
    }
  };

  return (
    <div className="register">
      <h1>Register a new user</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register("username")}
          className="text-input"
          placeholder="Enter username"
        />
        {errors.username && <span>{errors.username.message}</span>}

        <input
          {...register("email")}
          className="text-input"
          placeholder="Enter email"
        />
        {errors.email && <span>{errors.email.message}</span>}

        <button type="submit" className="submit-button">
          Create
        </button>
      </form>
    </div>
  );
};
