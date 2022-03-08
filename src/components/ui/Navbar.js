import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

export const Navbar = () => {
  const dispatch = useDispatch();

  const handleClickLogout = (e) => {
    e.preventDefault();
  }

  return (
    <div className="navbar" >
      <div className="navbar__logo">
        <img src='./images/logoAleNoText.png' alt="Logotipo del Instituto de Educación y Cultura Alejandría." />
        <p className="navbar__logo__text">Instituto de Educación <br />y Cultura Alejandría S.C. </p>
      </div>
      <div className="navbar__text">
        <h2>General</h2>
      </div>
      <div className="navbar__logout " onClick={handleClickLogout}>
        <i className="fas fa-user-circle btn"></i>
      </div>
    </div>
  )
}
