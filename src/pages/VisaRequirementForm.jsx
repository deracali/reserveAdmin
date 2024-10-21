import React, { useState } from 'react';
import {Helmet} from "react-helmet";

const VisaApplicationForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    visaType: '',
    country: '',
    appointmentDate: '',
    applicationForm: 'Yes',
    passport: 'Yes',
    passportPhotos: 'Yes',
    travelItinerary: 'Yes',
    financialProof: 'Yes',
    travelInsurance: 'Yes',
    accommodationProof: 'Yes',
    purposeProof: 'Yes',
    visaFee: 'Yes',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
   

    try {
      const response = await fetch('https://api-v2-qsrn.onrender.com/api/visaApp/post', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Form Submitted Successfully!');
      } else {
        alert('Form Submission Failed!');
      }
    } catch (error) {
      
    }
  };

  const handleReset = () => {
    setFormData({
      fullName: '',
      visaType: '',
      country: '',
      appointmentDate: '',
      applicationForm: 'Yes',
      passport: 'Yes',
      passportPhotos: 'Yes',
      travelItinerary: 'Yes',
      financialProof: 'Yes',
      travelInsurance: 'Yes',
      accommodationProof: 'Yes',
      purposeProof: 'Yes',
      visaFee: 'Yes',
    });
  };

  return (
    <div className="form-container">
         <Helmet>
             
             <title>Visa-Application</title>
           
         </Helmet>
      <h1>Visa Application Form</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="fullName">Full Name</label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="visaType">Visa Type</label>
          <input
            type="text"
            id="visaType"
            name="visaType"
            value={formData.visaType}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="country">Country of Application</label>
          <input
            type="text"
            id="country"
            name="country"
            value={formData.country}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="appointmentDate">Appointment Date</label>
          <input
            type="date"
            id="appointmentDate"
            name="appointmentDate"
            value={formData.appointmentDate}
            onChange={handleChange}
            required
          />
        </div>

        <h2>Documents Provided</h2>

        {/* Repeat for each document checkbox */}
        <div className="form-group">
          <label>Application Form Submitted</label>
          <select
            name="applicationForm"
            value={formData.applicationForm}
            onChange={handleChange}
            required
          >
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>

        <div className="form-group">
          <label>Passport</label>
          <select
            name="passport"
            value={formData.passport}
            onChange={handleChange}
            required
          >
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>

        <div className="form-group">
          <label>Passport Photos</label>
          <select
            name="passportPhotos"
            value={formData.passportPhotos}
            onChange={handleChange}
            required
          >
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>

        <div className="form-group">
          <label>Travel Itinerary</label>
          <select
            name="travelItinerary"
            value={formData.travelItinerary}
            onChange={handleChange}
            required
          >
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>

        <div className="form-group">
          <label>Financial Proof</label>
          <select
            name="financialProof"
            value={formData.financialProof}
            onChange={handleChange}
            required
          >
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>

        <div className="form-group">
          <label>Travel Insurance</label>
          <select
            name="travelInsurance"
            value={formData.travelInsurance}
            onChange={handleChange}
            required
          >
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>

        <div className="form-group">
          <label>Accommodation Proof</label>
          <select
            name="accommodationProof"
            value={formData.accommodationProof}
            onChange={handleChange}
            required
          >
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>

        <div className="form-group">
          <label>Purpose Proof</label>
          <select
            name="purposeProof"
            value={formData.purposeProof}
            onChange={handleChange}
            required
          >
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>

        <div className="form-group">
          <label>Visa Fee Paid</label>
          <select
            name="visaFee"
            value={formData.visaFee}
            onChange={handleChange}
            required
          >
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>

        <div className="form-buttons">
          <button type="submit" className="submit-btn">
            Submit
          </button>
          <button type="button" className="reset-btn" onClick={handleReset}>
            Reset
          </button>
        </div>
      </form>
    </div>
  );
};

export default VisaApplicationForm;
