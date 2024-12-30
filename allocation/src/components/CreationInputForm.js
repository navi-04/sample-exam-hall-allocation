import React, { useState } from 'react';
import axios from 'axios';
import './CreationInputForm.css';

export default function DepartmentForm() {
  const [formData, setFormData] = useState({
    numDepartments: '',
    departments: [],
    hallNumbers: []
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === "numDepartments") {
      const numDepartments = parseInt(value, 10);
      const departments = Array.from({ length: numDepartments }, () => ({ name: '', numStudents: '' }));
      setFormData({
        ...formData,
        numDepartments,
        departments
      });
    } else {
      const [field, index] = name.split('-');
      const updatedDepartments = [...formData.departments];
      updatedDepartments[parseInt(index, 10)][field] = value;
      setFormData({
        ...formData,
        departments: updatedDepartments
      });
    }
  };

  const handleHallChange = (event) => {
    const { options } = event.target;
    const selectedHalls = [];
    for (const option of options) {
      if (option.selected) {
        selectedHalls.push(option.value);
      }
    }
    setFormData({
      ...formData,
      hallNumbers: selectedHalls
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const totalStudents = formData.departments.reduce((acc, dept) => acc + parseInt(dept.numStudents, 10), 0);
    const maxCapacity = formData.hallNumbers.length * 36;
    
    if (totalStudents > maxCapacity) {
      alert('The selected halls cannot accommodate all students. Please select more halls.');
      return;
    }
    
    const formDataToSend = new FormData();
    formDataToSend.append('numDepartments',formData.numDepartments)
    formDataToSend.append('departments',JSON.stringify(formData.departments))
    formDataToSend.append('hallNumbers',JSON.stringify(formData.hallNumbers))

    try {
      const response = await axios.post('http://127.0.0.1:5000/submit',formDataToSend);
      console.log(response.data); // Check response from server
  } catch (error) {
      console.error('Error submitting form:', error);
  }

  setFormData({
    ...formData,
    hallNumbers: 0,
    numDepartments : 0,
    departments: 0
  });
  };
  

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Enter how many departments:</label>
        <input
          type="number"
          name="numDepartments"
          value={formData.numDepartments}
          onChange={handleInputChange}
          required
        />
      </div>
      {Array.from({ length: formData.numDepartments }).map((_, index) => (
        <div key={index}>
          <div>
            <label>Department {index + 1} Name:</label>
            <input
              type="text"
              name={`name-${index}`}
              value={formData.departments[index]?.name || ''}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label>Number of Students in Department {index + 1}:</label>
            <input
              type="number"
              name={`numStudents-${index}`}
              value={formData.departments[index]?.numStudents || ''}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>
      ))}
      <div>
        <label>Select Hall Numbers:</label>
        <select multiple={true} onChange={handleHallChange} size="5">
          {Array.from({ length: 10 }, (_, i) => `rk${111 + i}`).map(hallNumber => (
            <option key={hallNumber} value={hallNumber}>{hallNumber}</option>
          ))}
        </select>
      </div>
      <button type="submit" id="submit">Create</button>
    </form>
  );
}
