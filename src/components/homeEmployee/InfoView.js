import React from "react";

const InfoView = ({ user }) => {
  return (
    <>
      <h1>Empleado</h1>
      <div className="profile-card-row">
        <h3>
          Nombres: <br /> <b>{user.name}</b>
        </h3>
        <h3>
          Apellidos: <br /> <b>{user.lastname}</b>
        </h3>
      </div>
      <div className="profile-card-row">
        <h3>
          Cedula: <br />
          <b>{user.cedula}</b>
        </h3>
        <h3>
          Correo: <br />
          <b>{user.email}</b>
        </h3>
      </div>
      <div className="profile-card-row">
        <h3>
          Fecha de nacimiento: <br />
          <b>{user.birthday ? user.birthday : "No definido"}</b>
        </h3>
        <h3>
          Dirección: <br />
          <b>{user.address ? user.address : "No definido"}</b>
        </h3>
      </div>
      <div className="profile-card-row">
        <h3>
          Teléfono: <br />
          <b>{user.phone ? user.phone : "No definido"}</b>
        </h3>
        <h3>
          Vacunado: <br />
          <b>{user.isVaccinated ? "Si" : "No"}</b>
        </h3>
      </div>
      {user.isVaccinated === 1 && (
        <>
          <div className="profile-card-row">
            <h3>
              Tipo de vacuna: <br />
              <b>{user.vaccine?.name}</b>
            </h3>
            <h3>
              Fecha: <br />
              <b>{user.vaccine?.date}</b>
            </h3>
          </div>

          <div className="profile-card-row">
            <h3>
              Dosis: <br />
              <b># {user.vaccine.dose !== 0 ? user.vaccine.dose : ''}</b>
            </h3>
          </div>
        </>
      )}
    </>
  );
};

export default InfoView;
