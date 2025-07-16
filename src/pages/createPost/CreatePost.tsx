import "./CreatePost.css";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import Joi from "joi";
import axiosInstance from "../../config/axios";
import { getStoredUser } from "../../config/user";
import { PageTitle } from "../../components/pageTitle/PageTitle";

type CreatePostFormInputs = {
  author: {
    _id: string;
    username: string;
    email: string;
  };
  title: string;
  content: string;
};

const validationsSchema = Joi.object<CreatePostFormInputs>({
  title: Joi.string().required().messages({
    "string.empty": "Title is required",
  }),
  content: Joi.string().required().messages({
    "string.empty": "Content is required",
  }),
});

export const CreatePost = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreatePostFormInputs>({
    resolver: joiResolver(validationsSchema),
  });

  const navigate = useNavigate();

  const StoredUser = getStoredUser();

  const onSubmit = async (data: CreatePostFormInputs) => {
    if (!StoredUser) return;

    const sendData = {
      author: StoredUser,
      title: data.title,
      content: data.content,
    };
    try {
      const response = await axiosInstance.post(
        "http://localhost:3000/api/posts",
        sendData
      );
      console.log("Post created: ", response.data);
      navigate("/posts");
    } catch (error) {
      console.error("Error creating post: ", error);
    }
  };

  return (
    <section className="create-post">
      <PageTitle title="Publish post" subtitle="Publish a new post" />
      <div className="posts-form-container">
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            {...register("title")}
            className="text-input"
            placeholder="Enter title"
          />
          {errors.title && <span>{errors.title.message}</span>}

          <textarea
            {...register("content")}
            className="text-area"
            placeholder="Type your content..."
            rows={6}
          />

          {errors.content && <span>{errors.content.message}</span>}

          <button
            type="submit"
            className={!StoredUser ? "user-disabled" : "submit-button"}
            disabled={!StoredUser}
          >
            {!StoredUser ? "User not registered" : "Create post"}
          </button>
        </form>
      </div>
    </section>
  );
};
