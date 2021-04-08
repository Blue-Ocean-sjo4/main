import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './NewPal.css';
import { VectorMap } from 'react-jvectormap';
import countryCodeToFlag from 'country-code-to-flag';
import randomCountry from 'random-country';

function NewPal({ showingNewPal, setShowingNewPal, userID }) {

  const [country, setCountry] = useState('');

  function handleRegionClick(e, name) {
    setCountry(name)
  }

  function closeModal() {
    setShowingNewPal(false)
    var elements = document.getElementsByClassName('jvectormap-tip');
    for (var element of elements) {
      element.style.display = 'none';
    }
  }

  function addPal(e) {
    // if no country, generate random one
    var sendingCountry = country
    if (!country) {
      sendingCountry = randomCountry();
      console.log(sendingCountry)
    }
    e.preventDefault();
    axios.post(`/newPal/${userID}/${sendingCountry}`)
      .then(() => { alert('Pal request sent!') })
      .then(() => { setShowingNewPal(false) })
      .catch((err) => { alert('error adding new pal, check console'); console.log('err: ', err) })
  }

  return (
    <div className="new-pal-wrapper">
      {
        showingNewPal ?
          <div id="newPal" className="new-pal-modal">
            <div className="new-pal-modal-content">
              <span className="new-pal-modal-close" onClick={closeModal} >&times;</span>
              Choose the country of your new pal!
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
              <button onClick={addPal}>Send Pal Request</button>
            </div>
          </div> : null
      }

    </div >
  )
}

export default NewPal;