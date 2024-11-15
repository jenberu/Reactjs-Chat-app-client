import React, { useState } from "react";
import "./register.scss";

const UserProfileForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    username: "",
    first_name: "",
    last_name: "",
    email: "",
    bio: "",
    avatar: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, avatar: e.target.files[0] }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    for (const key in formData) {
      data.append(key, formData[key]);
    }
    onSubmit(data); // Pass form data to the parent handler
  };

  return (
    <form className="user-profile-form" onSubmit={handleSubmit}>
      <h2>Update Profile</h2>

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
      </div>

      <div className="form-group">
        <label htmlFor="bio">Bio</label>
        <textarea
          id="bio"
          name="bio"
          value={formData.bio}
          onChange={handleChange}
          placeholder="Write something about yourself"
        />
      </div>

      <div className="form-group">
        <label htmlFor="avatar">Avatar</label>
        <input
          type="file"
          id="avatar"
          name="avatar"
          onChange={handleFileChange}
          accept="image/*"
        />
      </div>

      <button type="submit" className="btn-submit">
        Save Profile
      </button>
    </form>
  );
};

export default UserProfileForm;
