import React from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './RemovePal.css';

const RemovePal = ({ userID, palID, roomID, setListItemClass }) => {

  const handleRemove = e => {
    e.persist();
    e.preventDefault();

    axios.put(`/removePal/${userID}/${palID}/${roomID}`)
    .then((response) => {
      console.log(response);
      e.target.parentNode.parentNode.className = "home-list-item-container-hidden"
      toast("Connection removed")
    })
    .catch((err) => {
      console.log(err)
    })
  }

  return (
    <div className="remove-pal-container">
      <ToastContainer />
      <button className="remove-pal-button" onClick={handleRemove}>UNPAL</button>
    </div>
  )
}

export default RemovePal
