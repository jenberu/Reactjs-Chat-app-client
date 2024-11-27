import React, { useState } from "react";
import "./register.scss";
import { userRegistor } from "../../components/api";
import { useNavigate } from 'react-router-dom';
import { ErrorBoundary } from "react-error-boundary";


const UserProfileForm = () => {
  const navigate = useNavigate();
  const [statusMessage, setStatusMessage] = useState("");
  const [formData, setFormData] = useState({
    username: "",
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirm_password: "",
    // bio: "",
    // avatar: null,
  });
  const [ errors, setErrors ] = useState(
    {
    username: "",
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirm_password: "",
    }

  )

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // const handleFileChange = (e) => {
  //   setFormData((prev) => ({ ...prev, avatar: e.target.files[0] }));
  // };

  const handleSubmit =  async(e) => {
    e.preventDefault();
    setErrors({})//cleaar previos errors
    setStatusMessage("");//clear previos status message

    if (formData.password === formData.confirm_password) {
      try {
        const response = await userRegistor(formData); // wait for registration reponse
        if (response.status === 201) {
          setStatusMessage("Registration successful! Redirecting...");
          setTimeout(() => navigate('/'), 2000);// redirect after  delay
        }
        else {
          setStatusMessage("Something went wrong. Please try again.");

        }
      } catch (error) {
        if (error.message) {
          let backendErrors;
          try {
              // Try to parse the error message if it's a JSON string
            backendErrors = JSON.parse(error.message); // Parse back to object
            setErrors((prevErrors) => ({
              ...prevErrors,
              ...backendErrors, // Populate form errors with backend response errors
            }));

          } catch (er) {
            // hndle if the error is normal object
            setStatusMessage(error.message);
          }
         
        }
         else {
          setStatusMessage("An error occurred. Please check your inputs or try again later.");

        }
        
      }
      

    }
    else {
      setErrors((prev)=>({...prev,confirm_password: "Passwords do not match",}))
    }
  };

  return (
    <ErrorBoundary
    fallback={<p>There was an error while submitting the form</p>}
  >
    <form className="user-profile-form" onSubmit={handleSubmit}>
      <h2>User Register</h2>

      <div className="form-group">
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          placeholder="Enter your username"
          required
          />
            {errors.username && (
          <p style={{ color: "red" }} className="error-message">{errors.username}</p>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="first_name">First Name</label>
        <input
          type="text"
          id="first_name"
          name="first_name"
          value={formData.first_name}
          onChange={handleChange}
          placeholder="Enter your first name"
          required
          />
            {errors.first_name && (
          <p style={{ color: "red" }} className="error-message">{errors.first_name}</p>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="last_name">Last Name</label>
        <input
          type="text"
          id="last_name"
          name="last_name"
          value={formData.last_name}
          onChange={handleChange}
          placeholder="Enter your last name"
          required
          />
            {errors.last_name && (
          <p style={{ color: "red" }} className="error-message">{errors.last_name}</p>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter your email"
          required
          />
           {errors.email && (
          <p style={{ color: "red" }} className="error-message">{errors.email}</p>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Enter password"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="confirm-password">Confirm Password</label>
        <input
          type="password"
          id="confirm-password"
          name="confirm_password"
          value={formData.confirm_password}
          onChange={handleChange}
          required
        />
         {errors.confirm_password && (
          <p style={{ color: "red" }} className="error-message">{errors.confirm_password}</p>
        )}
      </div>

      {/* <div className="form-group">
        <label htmlFor="bio">Bio</label>
        <textarea
          id="bio"
          name="bio"
          value={formData.bio}
          onChange={handleChange}
          placeholder="Write something about yourself"
        />
      </div> */}

      {/* <div className="form-group">
        <label htmlFor="avatar">Avatar</label>
        <input
          type="file"
          id="avatar"
          name="avatar"
          onChange={handleFileChange}
          accept="image/*"
        />
      </div> */}

      <button  type="submit" className="btn-submit">
        Registor
        </button>
        {statusMessage && <p>{statusMessage}</p>}

      </form>
      </ErrorBoundary>

  );
};

export default UserProfileForm;
