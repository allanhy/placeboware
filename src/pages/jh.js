import React, { useState, useEffect } from "react";
import '../styling/janehopkinspage.css';
import { signOut } from "firebase/auth";
import { auth } from "../firebase-config";
import { useNavigate } from "react-router-dom";
import useJaneHopkins from "../hooks/useJaneHopkins";

function JaneHopkinsPage() {
  const navigate = useNavigate();

  const [patients, setPatients] = useState([]);
  const [sortAscending, setSortAscending] = useState(true);
  const [activePatientIndex, setActivePatientIndex] = useState(null);
  const [showAddPatientMenu, setShowAddPatientMenu] = useState(false); // new state variable for showing/hiding menu

  const [name, setName] = useState('');
  const [patientPicture, setPatientPicture] = useState("");
  const [dob, setDob] = useState('');
  const [insuranceNumber, setInsuranceNumber] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [bloodPressure, setBloodPressure] = useState('');
  const [bloodType, setBloodType] = useState('');
  const [temperature, setTemperature] = useState('');
  const [oxygenSaturation, setOxygenSaturation] = useState('');
  const [uuid, setUuid] = useState('');
  const [address, setAddress] = useState('');
  const [currentMedications, setCurrentMedications] = useState([]);
  const [medication, setMedication] = useState("");
  const [familyHistory, setFamilyHistory] = useState('');
  const [currentlyEmployed, setCurentlyEmployed] = useState("no");
  const [currentlyInsured, setCurentlyInsured] = useState('');
  const [icdHealthCodes, setIcdHealthCodes] = useState([]);
  const [code, setIcdCodes] = useState("");
  const [allergies, setAllergies] = useState([]);
  const [allergy, setAllergy] = useState("");
  const [vists, setVisits] = useState([]);
  const [dateTime, setDateTime] = useState("");
  const [notes, setNotes] = useState("");
  const [hivViralLoad, setHivViralLoad] = useState("");
  const [loading, setLoading] = useState(false);

  const toggleDetails = (index) => {
    setActivePatientIndex(activePatientIndex === index ? null : index);
  };

  function handleSortByName() {
    const sortedPatients = patients.slice().sort((a, b) => {
      if (sortAscending) {
        return a.name.localeCompare(b.name);
      } else {
        return b.name.localeCompare(a.name);
      }
    });
    setPatients(sortedPatients);
    setSortAscending(!sortAscending);
  }

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/');
  };

  const { entities } = useJaneHopkins();

  useEffect(() => {
    const getPatients = async () => {
      setLoading(true); // set loading state to true
      const patientEntities = await entities.patient.list();
      const patientData = patientEntities.items.map((patient) => ({
        name: patient.name,
        patientPicture: patient.patientPicture,
        dob: patient.dob,
        insuranceNumber: patient.insuranceNumber,
        height: patient.height,
        weight: patient.weight,
        bloodPressure: patient.bloodPressure,
        bloodType: patient.bloodType,
        temperature: patient.temperature,
        oxygenSaturation: patient.oxygenSaturation,
        uuid: patient.uuid,
        address: patient.address,
        currentMedications: patient.currentMedications,
        familyHistory: patient.familyHistory,
        currentlyEmployed: patient.currentlyEmployed,
        currentlyInsured: patient.currentlyInsured,
        icdHealthCodes: patient.icdHealthCodes,
        allergies: patient.allergies,
        visits: patient.visits,
      }));
      setPatients(patientData);
      setLoading(false); // set loading state to false
    };
    getPatients();
  }, [entities.patient]);

  const addPatient = async () => {
    const newPatient = {
      name,
      patientPicture,
      dob,
      insuranceNumber,
      height,
      weight,
      bloodPressure,
      bloodType,
      temperature,
      oxygenSaturation,
      uuid,
      address,
      currentMedications: medication.split(",").map((medication) => ({ medication: medication.trim() })),
      familyHistory,
      currentlyEmployed,
      currentlyInsured,
      icdHealthCodes: code.split(",").map((code) => ({ code: code.trim() })),
      allergies: allergy.split(",").map((allergy) => ({ allergy: allergy.trim() })),
      visits: [{ dateTime, notes, hivViralLoad }],
    };
    const addPatientResponse = await entities.patient.add(newPatient);
    console.log(addPatientResponse);
    setPatients([...patients, newPatient]);
    setShowAddPatientMenu(false);
    setName('');
    setPatientPicture('');
    setDob('');
    setInsuranceNumber('');
    setHeight('');
    setWeight('');
    setBloodPressure('');
    setBloodType('');
    setTemperature('');
    setOxygenSaturation('');
    setUuid('');
    setAddress('');
    setCurrentMedications([]);
    setMedication('');
    setIcdCodes('');
    setAllergy('');
    setDateTime('');
    setNotes('');
    setHivViralLoad('');
    setFamilyHistory('');
    setCurentlyEmployed('');
    setCurentlyInsured('');
    setIcdHealthCodes([]);
    setAllergies([]);
    setVisits([]);
  };

  const handleAddPatientClick = () => {
    setShowAddPatientMenu(!showAddPatientMenu);
  };

  const handleName = (event) => {
    setName(event.target.value);
  };
  const handlePatientPicture = (event) => {
    setPatientPicture(event.target.value);
  };
  const handleDob = (event) => {
    setDob(event.target.value);
  };
  const handleInsuranceNumber = (event) => {
    setInsuranceNumber(event.target.value);
  };
  const handleHeight = (event) => {
    setHeight(event.target.value);
  };
  const handleWeight = (event) => {
    setWeight(event.target.value);
  };
  const handleBloodPressure = (event) => {
    setBloodPressure(event.target.value);
  };
  const handleBloodType = (event) => {
    setBloodType(event.target.value);
  }
  const handleTemperature = (event) => {
    setTemperature(event.target.value);
  };
  const handleOxygenSaturation = (event) => {
    setOxygenSaturation(event.target.value);
  };
  const handleUuid = (event) => {
    setUuid(event.target.value);
  };
  const handleAddress = (event) => {
    setAddress(event.target.value);
  };
  const handleMedication = (event) => {
    setMedication(event.target.value); // update medication state with user input
  };
  const handleFamilyHistory = (event) => {
    setFamilyHistory(event.target.value);
  };
  const handleCurrentlyEmployed = (event) => {
    const value = event.target.checked ? "yes" : "no";
    setCurentlyEmployed(value);
  };
  const handleCurrentlyInsured = (event) => {
    setCurentlyInsured(event.target.value);
  };
  const handleIcdCodes = (event) => {
    setIcdCodes(event.target.value);
  };
  const handleAllergy = (event) => {
    setAllergy(event.target.value);
  };
  const handleDateTime = (event) => {
    const date = event.target.value.split("T")[0];
    const time = event.target.value.split("T")[1];

    const formattedDateTime = `${date} ${time}`;
    setDateTime(formattedDateTime);
  };
  const handleNotes = (event) => {
    setNotes(event.target.value);
  };
  const handleHivViralLoad = (event) => {
    setHivViralLoad(event.target.value);
  };
  const today = new Date().toISOString().substr(0, 10);

  return (
    <div className="page-container">
      <button className="signout-button" onClick={handleLogout}>Sign Out</button>
      <div className="add-patient-container">
        <button className="addPatient-button" onClick={handleAddPatientClick}>  {showAddPatientMenu ? "Close" : "Add Patient"}
        </button>
        {showAddPatientMenu && (
          <div className="add-patient-menu">
            <label htmlFor="names">Name:</label>
            <input id="names" type="string" placeholder="Name" value={name} onChange={handleName} />
            <label htmlFor="patientPicture">Patient Picture:</label>
            <input id="patientPicture" type="string" placeholder="Patient Picture" value={patientPicture} onChange={handlePatientPicture} />
            <label htmlFor="patientPicture">Date of Birth:</label>
            <input type="date" value={dob} onChange={handleDob} min="1920-01-01" max={today} />
            <input type="string" placeholder="Insurance Number" value={insuranceNumber} onChange={handleInsuranceNumber} />
            <input type="string" placeholder="Height" value={height} onChange={handleHeight} />
            <input type="string" placeholder="Weight" value={weight} onChange={handleWeight} />
            <input type="string" placeholder="Blood Pressure" value={bloodPressure} onChange={handleBloodPressure} />
            <label htmlFor="bloodType">Blood Type:</label>
            <select id="bloodType" value={bloodType} onChange={handleBloodType}>
              <option value="">Select Blood Type</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
            </select>
            <input type="string" placeholder="Temperature" value={temperature} onChange={handleTemperature} />
            <input type="string" placeholder="Oxygen Saturation" value={oxygenSaturation} onChange={handleOxygenSaturation} />
            <input type="string" placeholder="UUID" value={uuid} onChange={handleUuid} />
            <input type="string" placeholder="Address" value={address} onChange={handleAddress} />
            <input type="string" placeholder="Current Medication" value={medication} onChange={handleMedication} />
            <input type="string" placeholder="Family History" value={familyHistory} onChange={handleFamilyHistory} />
            Currently Employed: <input type="checkbox" checked={currentlyEmployed === "yes"} onChange={handleCurrentlyEmployed} />
            <input type="string" placeholder="Currently Insured?" value={currentlyInsured} onChange={handleCurrentlyInsured} />
            <input type="string" placeholder="ICD Codes" value={code} onChange={handleIcdCodes} />
            <input type="string" placeholder="Allergies" value={allergy} onChange={handleAllergy} />
            <h3>Visits:</h3>
            <input type="datetime-local" placeholder="Date and Time" value={dateTime} onChange={handleDateTime} />
            <input type="string" placeholder="Notes" value={notes} onChange={handleNotes} />
            <input type="string" placeholder="HIV Viral Load" value={hivViralLoad} onChange={handleHivViralLoad} />

            <button className="addPatient-button" onClick={() => { addPatient() }}>Add Patient</button>
          </div>
        )}
      </div>

      <h1 className="page-heading">Jane Hopkins Hospital</h1>
      <table className="patients-table">
        <thead>
          <tr>
            <th onClick={handleSortByName}>Name</th>
            <th>Date of Birth</th>
            <th>Insurance</th>
            <th></th>
          </tr>
        </thead>
        {loading ? (
          <tbody><tr><td><p>Loading Patient Data...</p></td></tr></tbody>
        ) : (
          <tbody>
            {patients.map((patient, index) => (
              <React.Fragment key={index}>
                <tr>
                  <td>{patient.name}</td>
                  <td>{patient.dob}</td>
                  <td>{patient.insuranceNumber}</td>
                  <td>
                    <button className="btn-details" onClick={() => toggleDetails(index)}>
                      {activePatientIndex === index ? "Hide Details" : "Show Details"}
                    </button>
                  </td>
                </tr>
                {activePatientIndex === index && (
                  <tr className="patient-details">
                    <td colSpan={11}>
                      <ul>
                        <img src={patient.patientPicture} alt="" style={{ width: '100px', height: '100px' }} />
                        <li>Name: {patient.name}</li>
                        <li>Date of Birth: {patient.dob}</li>
                        <li>Insurance: {patient.insuranceNumber}</li>
                        <li>Height: {patient.height}</li>
                        <li>Weight: {patient.weight}</li>
                        <li>Blood Pressure: {patient.bloodPressure}</li>
                        <li>Blood Type: {patient.bloodType}</li>
                        <li>Temperature: {patient.temperature}</li>
                        <li>Oxygen Saturation: {patient.oxygenSaturation}</li>
                        <li>UUID: {patient.uuid}</li>
                        <li>Address: {patient.address}</li>
                        <li>Current Medications: {patient.currentMedications?.map((medication, index) => (
                          <React.Fragment key={index}>
                            {medication.medication}
                            {index < patient.currentMedications.length - 1 ? ', ' : ''}
                          </React.Fragment>
                        ))}
                        </li>
                        <li>Family History: {patient.familyHistory}</li>
                        <li>Currently Employed: {patient.currentlyEmployed}</li>
                        <li>Currently Insured: {patient.currentlyInsured}</li>
                        <li>ICD Health Codes: {patient.icdHealthCodes?.map((code, index) => (
                          <React.Fragment key={index}>
                            {code.code}
                            {index < patient.icdHealthCodes.length - 1 ? ', ' : ''}
                          </React.Fragment>
                        ))}</li>
                        <li>Allergies: {patient.allergies?.map((allergy, index) => (
                          <React.Fragment key={index}>
                            {allergy.allergy}
                            {index < patient.allergies.length - 1 ? ', ' : ''}
                          </React.Fragment>
                        ))}</li>
                        <li>Visits: {patient.visits?.map((visit, index) => (
                          <React.Fragment key={index}>
                            <br />Date and Time: {visit.dateTime}; <br />General Notes: {visit.notes}; <br />HIV Viral Load: {visit.hivViralLoad}
                          </React.Fragment>
                        ))}</li>
                      </ul>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        )}
      </table>
    </div>
  );
<form className='LoginForm' onSubmit={login}>
        <div>
          <p> PharmaStudies </p>
          <input
            className='InputBox'
            placeholder="Email..."
            onChange={(event) => {
              setLoginEmail(event.target.value);
            }}
          />
          <br />
          <input
            className='InputBox'
            placeholder="Password..."
            type={'password'}
            onChange={(event) => {
              setLoginPassword(event.target.value);
            }}
          />
          <br />
          {errorMessage && <h3 style={{ color: "red", textAlign: 'center' }}>{errorMessage}</h3>}
          <button className="Button" onClick={login}> Login</button>
        </div>
      </form>
}

export default JaneHopkinsPage;