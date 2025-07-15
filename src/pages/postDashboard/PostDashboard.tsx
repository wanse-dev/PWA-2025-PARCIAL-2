import "./PostDashboard.css";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import Joi from "joi";
import axiosInstance from "../../config/axios";
import { PageTitle } from "../../components/pageTitle/PageTitle";

type ModifyPostFormInputs = {
  title: string;
  content: string;
};

const validationsSchema = Joi.object<ModifyPostFormInputs>({
  title: Joi.string().required().messages({
    "string.empty": "Title is required",
  }),
  content: Joi.string().required().messages({
    "string.empty": "Content is required",
  }),
});

export const PostDashboard = () => {
  const [data, setData] = useState<ModifyPostFormInputs | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const { id } = useParams();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ModifyPostFormInputs>({
    resolver: joiResolver(validationsSchema),
  });

  const fetchData = async () => {
    try {
      const response = await axiosInstance.get(`/posts/${id}`);
      setData(response.data.data);
    } catch (error) {
      if (error instanceof Error) {
        setError(error);
      } else {
        setError(new Error("Unknown error"));
      }
    } finally {
      setLoading(false);
      console.log("Data fetched successfully.");
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  useEffect(() => {
    if (data) {
      reset({
        title: data.title,
        content: data.content,
      });
    }
  }, [data, reset]);

  const navigate = useNavigate();

  const onSubmit = async (data: ModifyPostFormInputs) => {
    const userRegistered = JSON.parse(localStorage.getItem("user") || "{}");

    const sendData = {
      title: data.title,
      content: data.content,
      author: userRegistered._id,
    };
    try {
      const response = await axiosInstance.patch(
        `/posts/update/${id}`,
        sendData
      );

      console.log("Post modified: ", response.data);
      navigate("/posts");
    } catch (error) {
      console.error("Error modifing post: ", error);
    }
  };

  return (
    <section className="post-dashboard">
      <PageTitle
        title="Post dashboard"
        subtitle="Edit and manage your selected post"
      />
      <div className="post-dashboard-container">
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            {...register("title")}
            className="text-input"
            placeholder="Change title"
          />
          {errors.title && <span>{errors.title.message}</span>}

          <textarea
            {...register("content")}
            className="text-area"
            placeholder="Change post content..."
            rows={6}
          />
          {errors.content && <span>{errors.content.message}</span>}

          <button type="submit" className="submit-button">
            Modify post
          </button>
        </form>
      </div>
    </section>
  );
};
