import { Input, message, Select, Switch } from "antd";
import React, { useEffect, useState } from "react";
import useHttp from "../../hooks/useHttp";
import Loading from "../global/Loading";

const EditView = ({ user, handleChange, changeView }) => {
  const [vaccineList, setVaccineList] = useState([]);
  const [vaccineForm, setVaccineForm] = useState(user.vaccine)
  const { isLoading, request } = useHttp();

  useEffect(() => {
    getVaccineList();
  }, []);

  const getVaccineList = async () => {
    let config = {
      type: "post",
      endpoint: "getVaccines",
      data: {},
    };
    const response = await request(config);
    setVaccineList(response.vaccines);
  };

  const changeStatusVaccine = (checked) => {
    let e = {
      target: {
        name: "isVaccinated",
        value: checked ? 1 : 0,
      },
    };
    handleChange(e);
  };

  const validateFieldVaccine = () => {
    return (
      vaccineForm.id_vaccine &&
      vaccineForm.date.trim() &&
      vaccineForm.dose > 0
    )
  }

  const handleSubmit = async () => {
    let dataToSend = {...user};
    if(user.isVaccinated === 1 && !validateFieldVaccine() ){
      message.error('El tipo de vacuna, fecha y dosis es obligatorio');
      return;
    }
    if(user.isVaccinated === 1){
      dataToSend = {...dataToSend, ...vaccineForm};
    }
    let config = {
        type: "post",
        endpoint: "updateUser",
        data: dataToSend,
      };
      const response = await request(config);
      if(response.user){
        message.success('Su usuario ha sido actualizado.')
        localStorage.setItem('user', JSON.stringify(response.user));
        changeView();
      }
  }

  return (
    <>
    {isLoading && <Loading />}
      <h1>Editar</h1>
      <div className="profile-card-row">
        <h3>
          Nombres: <br />
          <Input value={user.name} disabled />
        </h3>
        <h3>
          Apellidos: <br />
          <Input value={user.lastname} disabled />
        </h3>
      </div>
      <div className="profile-card-row">
        <h3>
          Cedula: <br />
          <Input value={user.cedula} disabled />
        </h3>
        <h3>
          Correo: <br />
          <Input value={user.email} disabled />
        </h3>
      </div>
      <div className="profile-card-row">
        <h3>
          Fecha de nacimiento: <br />
          <Input
            defaultValue={user.birthday}
            name="birthday"
            onChange={handleChange}
            type="date"
          />
        </h3>
        <h3>
          Dirección: <br />
          <Input
            defaultValue={user.address}
            name="address"
            onChange={handleChange}
            placeholder="Dirección..."
          />
        </h3>
      </div>
      <div className="profile-card-row">
        <h3>
          Teléfono: <br />
          <Input
            defaultValue={user.address}
            name="phone"
            onChange={handleChange}
            placeholder="Teléfono..."
          />
        </h3>
        <h3>
          Vacunado: <br />
          <Switch
            checkedChildren="Si"
            unCheckedChildren="No"
            defaultChecked={user.isVaccinated === 1}
            onChange={changeStatusVaccine}
          />
        </h3>
      </div>
      {user.isVaccinated === 1 && (
        <>
          <div className="profile-card-row">
            <h3>
              Tipo de vacuna: <br />
              <Select defaultValue={vaccineForm.id_vaccine !== -1 ? vaccineForm.id_vaccine : null } style={{ width: 200 }} placeholder="Vacunas..." onChange={(val) => setVaccineForm({...vaccineForm, id_vaccine: val})}>
                {vaccineList.map((item, key) => (
                  <Select.Option value={item.id_vaccine} key={key}>
                    {item.name}
                  </Select.Option>
                ))}
              </Select>
            </h3>
            <h3>
              Fecha: <br />
              <Input defaultValue={vaccineForm.date} name="date" type="date" onChange={(e) => setVaccineForm({...vaccineForm, [e.target.name] : e.target.value})} />
            </h3>
          </div>

          <div className="profile-card-row">
            <h3>
              Dosis: <br />
              <Input type="number" defaultValue={vaccineForm.dose} name='dose' placeholder="Dosis..." onChange={(e) => setVaccineForm({...vaccineForm, [e.target.name] : e.target.value})} />
            </h3>
          </div>
        </>
      )}
      <button className="update-form-button" onClick={handleSubmit}>Actualizar</button>
    </>
  );
};

export default EditView;
