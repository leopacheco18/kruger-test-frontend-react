import { Form, Input, message } from "antd";
import React from "react";
import { IdcardOutlined, UserOutlined, MailOutlined } from "@ant-design/icons";
import useHttp from "../../hooks/useHttp";
import Loading from "../global/Loading";
const FormUser = ({ handleChange, userSelected, reloadUser }) => {
  const { isLoading, request } = useHttp();

  const handleSubmit = async () => {
    let error = "";
    if (!validateOnlyString(userSelected.lastname)) {
      error = "El apellido solo puede tener letras";
    }
    if (!validateOnlyString(userSelected.name)) {
      error = "El nombre solo puede tener letras";
    }
    if (!validateMail(userSelected.email)) {
      error = "Correo invalido";
    }
    if (!validateCedula(userSelected.cedula)) {
      error = "La cedula deben ser solo números y 10 caracteres";
    }

    if (!validateFields()) {
      error = "Todos los campos son obligatorios";
    }
    if (error !== "") {
      message.error(error);
      return;
    }
    let config = {
      type: "post",
      endpoint: "storeUser",
      data: { ...userSelected },
    };
    const response = await request(config);
    if (response.user) {
      reloadUser();
    }
  };

  const validateFields = () => {
    return (
      userSelected.name.trim() &&
      userSelected.cedula.trim() &&
      userSelected.lastname.trim() &&
      userSelected.email.trim()
    );
  };

  const validateCedula = (cedula) => {
    return !isNaN(cedula) && cedula.length === 10;
  };

  const validateMail = (mail) => {
    return String(mail)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const validateOnlyString = (fieldForm) => {
    return /^[a-zA-Zñáéíóúü ]+$/.test(fieldForm);
  };

  return (
    <Form layout="vertical" onFinish={handleSubmit}>
    {isLoading && <Loading />}
      {userSelected.user && (
        <Form.Item label="Usuario" required>
          <Input
            type="text"
            name="user"
            defaultValue={userSelected?.user}
            disabled
            addonBefore={<UserOutlined />}
          />
        </Form.Item>
      )}
      <Form.Item label="Cedula" required>
        <Input
          type="text"
          name="cedula"
          defaultValue={userSelected?.cedula}
          onChange={handleChange}
          placeholder="Cedula..."
          addonBefore={<IdcardOutlined />}
        />
      </Form.Item>
      <Form.Item label="Nombre" required>
        <Input
          type="text"
          name="name"
          defaultValue={userSelected?.name}
          onChange={handleChange}
          placeholder="Nombres..."
          addonBefore={<UserOutlined />}
        />
      </Form.Item>
      <Form.Item label="Apellido" required>
        <Input
          type="text"
          name="lastname"
          defaultValue={userSelected?.lastname}
          onChange={handleChange}
          placeholder="Apellidos..."
          addonBefore={<UserOutlined />}
        />
      </Form.Item>
      <Form.Item label="Correo" required>
        <Input
          type="text"
          name="email"
          defaultValue={userSelected?.email}
          onChange={handleChange}
          placeholder="Correo..."
          addonBefore={<MailOutlined />}
        />
      </Form.Item>
      <button type="submit" className="user-form-button">
        {userSelected.id_user ? "Editar" : "Crear"}
      </button>
    </Form>
  );
};

export default FormUser;
