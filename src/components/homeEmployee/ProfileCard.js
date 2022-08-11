import { Button } from "antd";
import React, { useState } from "react";
import EditView from "./EditView";
import InfoView from "./InfoView";
import { CloseOutlined, EditOutlined } from "@ant-design/icons";

const ProfileCard = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [showEdit, setShowEdit] = useState(false);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const changeEdit = () => {
    if (showEdit) {
      setUser(JSON.parse(localStorage.getItem("user")));
    }
    setShowEdit(!showEdit);
  };

  return (
    <div className="profile-card-container">
      <div className="profile-card">
        <Button
          type="primary"
          className="profile-card-edit-button"
          danger={showEdit}
          onClick={changeEdit}
        >
          
          {showEdit ? <CloseOutlined /> : <EditOutlined />}
        </Button>
        {showEdit ? (
          <EditView
            user={user}
            handleChange={handleChange}
            changeView={changeEdit}
          />
        ) : (
          <InfoView user={user} />
        )}
      </div>
    </div>
  );
};

export default ProfileCard;
