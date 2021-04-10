import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './NewPal.css';
import { VectorMap } from 'react-jvectormap';
import { ToastContainer, toast } from 'react-toastify';
import countryCodeToFlag from 'country-code-to-flag';
import randomCountry from 'random-country';
import 'react-toastify/dist/ReactToastify.css';

function NewPal({ showingNewPal, setShowingNewPal, userID }) {

  const [country, setCountry] = useState('');
  const [showingConfirmation, showConfirmation] = useState(false)

  function handleRegionClick(e, name) {
    if (country === name) {
      setCountry('')
    } else {
      setCountry(name)
    }
  }

  function closeModal() {
    setShowingNewPal(false)
    showConfirmation(false)
    setCountry('')
    var elements = document.getElementsByClassName('jvectormap-tip');
    for (var element of elements) {
      element.style.display = 'none';
    }
  }

  function addPal(e) {
    var sendingCountry = country
    if (!country) {
      sendingCountry = randomCountry();
    }
    e.preventDefault();
    axios.post(`/newPal/${userID}/${sendingCountry}`)
      .then(() => { showConfirmation(true) })
      .catch((err) => { toast('error adding new pal, check console'); console.log('err: ', err) })
  }

  return (
    <div className="new-pal-wrapper">
      <ToastContainer />
      {
        showingNewPal ?
          <div id="newPal" className="new-pal-modal">
            <div className="new-pal-modal-content">
              <span className="new-pal-modal-close" onClick={closeModal} >&times;</span>
              <div className="new-pal-prompt">Choose the country of your new pal! Or, select none and a random country will be selected instead!</div>
              <div id="new-pal-map" className="map">
                <div style={{ width: 1000, height: 500 }}>
                  <VectorMap map={'world_mill'}
                    onRegionClick={handleRegionClick}
                    backgroundColor={"#3b96ce"}
                    containerStyle={{
                      width: '100%',
                      height: '100%'
                    }}
                  />
                </div>
              </div>
              {
                country ? <div className="current-country-flag">{countryCodeToFlag(country)}</div> : <div className="current-country-flag"></div>
              }
              <button className="send-pal-request-button" onClick={addPal}>Send Pal Request</button>
              {
                showingConfirmation ?
                  <div className="new-pal-confirmation-modal">
                    <div className="new-pal-confirmation-modal-content">
                      Pal request sent!
                      <div><button className="new-pal-confirmation-button" onClick={closeModal}>Ok</button></div>
                    </div>
                  </div> : null
              }
            </div>
          </div> : null
      }

    </div >
  )
}

export default NewPal;