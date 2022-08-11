import {
  Button,
  DatePicker,
  Input,
  message,
  Modal,
  Select,
  Space,
  Table,
} from "antd";
import React, { useEffect, useState } from "react";
import useHttp from "../../hooks/useHttp";
import FormUser from "./FormUser";

const initialUser = {
  name: "",
  lastname: "",
  cedula: "",
  email: "",
};

const CrudUser = () => {
  const [userList, setUserList] = useState([]);
  const [userListShow, setUserListShow] = useState([]);
  const [userSelected, setUserSelected] = useState(initialUser);
  const [vaccineList, setVaccineList] = useState([]);
  const { isLoading, request } = useHttp();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [filterInfo, setFilterInfo] = useState({
    stateVaccine: 0,
    typeVaccine: 0,
    dateRange: [],
  });
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
    getVaccineList();
  }, []);

  useEffect(() =>{
    loadFilters()
  }, [filterInfo])

  const loadFilters = () => {
    if(userList.length > 0){
      let aux = [...userList];
      if(filterInfo.stateVaccine > 0) {
        aux = aux.filter(item => ((item.isVaccinated + 1) === filterInfo.stateVaccine ));
      }
      if(filterInfo.typeVaccine > 0) {
        aux = aux.filter(item => (item.vaccine.id_vaccine  === filterInfo.typeVaccine ));
      }
      if(filterInfo.dateRange.length > 0){
        aux = aux.filter(item => (
          item.vaccine.date >= filterInfo.dateRange[0] && 
          item.vaccine.date <= filterInfo.dateRange[1]
        ))
      }
      setUserListShow(aux);
    }
  }

  const getVaccineList = async () => {
    let config = {
      type: "post",
      endpoint: "getVaccines",
      data: {},
    };
    const response = await request(config);
    setVaccineList(response.vaccines);
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setUserSelected(initialUser);
  };

  const removeUser = async (user) => {
    handleCancel();
    let config = {
      type: "post",
      endpoint: "deleteUser",
      data: { ...user },
    };
    const response = await request(config);
    if (response.success) {
      message.success("El usuario se elimino de manera satisfactoria");
    }
    loadUsers();
  };

  const loadUsers = async () => {
    handleCancel();
    let config = {
      type: "post",
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

  const changeDate = (value, dateString) => {
    if(value){
      setFilterInfo({...filterInfo, dateRange: dateString})
    }else{ 
      setFilterInfo({...filterInfo, dateRange: []})
    }
  };
  

  return (
    <div>
      <h2>Usuarios</h2>
      <div className="search-and-created">
        <Input.Search
          placeholder="Buscar usuario"
          onChange={(e) => onSearch(e.target.value)}
        />
        <Button type="primary" onClick={showModal}>
          Agregar Usuario
        </Button>
      </div>
      <br />
      <div className="filter-container">
        <div>
          <label>Estado de vacunación</label>
          <br />
          <Select
            defaultValue={0}
            onChange={(val) =>
              setFilterInfo({ ...filterInfo, stateVaccine: val })
            }
            style={{ width: "100%" }}
          >
            <Select.Option value={0}>Todos</Select.Option>
            <Select.Option value={1}>No Vacunados</Select.Option>
            <Select.Option value={2}>Vacunados</Select.Option>
          </Select>
        </div>{" "}
        <div>
          <label>Tipo de vacuna</label>
          <br />
          <Select
            defaultValue={0}
            onChange={(val) =>
              setFilterInfo({ ...filterInfo, typeVaccine: val })
            }
            style={{ width: "100%" }}
          >
            <Select.Option value={0}>Todas</Select.Option>
            {vaccineList.map((item, key) => (
              <Select.Option value={item.id_vaccine} key={key}>
                {item.name}
              </Select.Option>
            ))}
          </Select>
        </div>{" "}
        <div>
          <label>Rango de fechas</label>
          <br />
          <DatePicker.RangePicker
            style={{ width: "100%" }}
            format="YYYY-MM-DD"
            onChange={changeDate}
            // onOk={onOk}
          />
        </div>
      </div>
      <br /> <br />
      <Table columns={columns} dataSource={userListShow} />
      {isModalVisible && (
        <Modal
          title={`${userSelected.id_user ? "Editar" : "Crear"} usuario`}
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
