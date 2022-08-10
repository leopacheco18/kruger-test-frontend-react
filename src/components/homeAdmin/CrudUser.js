import { Button, Input, message, Modal, Space, Table } from "antd";
import React, { useEffect, useState } from "react";
import useHttp from "../../hooks/useHttp";
import FormUser from "./FormUser";

const initialUser = {
    name: '',
    lastname: '',
    cedula: '',
    email: '',
}

const CrudUser = () => {
  const [userList, setUserList] = useState([]);
  const [userListShow, setUserListShow] = useState([]);
  const [userSelected, setUserSelected] = useState(initialUser);
  const { isLoading, request } = useHttp();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const columns = [
    {
      title: "Cedula",
      dataIndex: "cedula",
      key: "cedula",
    },
    {
      title: "Nombres",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Apellidos",
      dataIndex: "lastname",
      key: "lastname",
    },
    {
      title: "Correo",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Usuario",
      dataIndex: "user",
      key: "user",
    },
    {
      title: "Acción",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button
            type="primary"
            onClick={() => {
              setUserSelected(record);
              showModal();
            }}
          >
            Editar
          </Button>
          <Button type="primary" danger onClick={() => removeUser(record)}>
            Eliminar
          </Button>
        </Space>
      ),
    },
  ];
  useEffect(() => {
    loadUsers();
  }, []);

  const showModal = () => {
    setIsModalVisible(true);
  };


  const handleCancel = () => {
    setIsModalVisible(false);
    setUserSelected(initialUser);
  };

  const removeUser = async (user) => {
    handleCancel()
    let config = {
      type: "post",
      endpoint: "deleteUser",
      data: {...user},
    };
    const response = await request(config);
    if(response.success){
        message.success('El usuario se elimino de manera satisfactoria');
    }
    loadUsers();
  };

  const loadUsers = async () => {
    handleCancel()
    let config = {
      type: "get",
      endpoint: "getUsers",
      data: {},
    };
    const response = await request(config);
    let dataWithKey = response.users.map((item, index) => ({
      ...item,
      key: index,
    }));
    setUserList(dataWithKey);
    setUserListShow(dataWithKey);
  };

  const onSearch = (val) => {
    let dataToShow = userList.filter((user) => {
      let exist = false;
      columns.forEach((column) => {
        if (user[column.key] && user[column.key].includes(val)) {
          exist = true;
        }
      });
      return exist;
    });
    setUserListShow(dataToShow);
  };

  const handleChange = (e) => {
    setUserSelected({ ...userSelected, [e.target.name]: e.target.value });
  };


  return (
    <div>
      <h2>Usuarios</h2>
      <div className="search-and-created">
        <Input.Search placeholder="Buscar usuario" onChange={(e) => onSearch(e.target.value)} />
        <Button type="primary" onClick={showModal}>
          Agregar Usuario
        </Button>
      </div>
      <br /> <br />
      <Table columns={columns} dataSource={userListShow} />
      {isModalVisible && (
        <Modal
          title={`${
            userSelected.id_user ? "Editar" : "Crear"
          } usuario`}
          visible={isModalVisible}
          footer={null}
          onCancel={handleCancel}
        >
          <FormUser
            handleChange={handleChange}
            userSelected={userSelected}
            reloadUser={loadUsers}
          />
        </Modal>
      )}
    </div>
  );
};

export default CrudUser;
