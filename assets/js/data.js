// data.js
async function fetchPatientData() {
  try {
    const response = await axios.get(
      "https://api.coalitiontechnologies.com/patient-data"
    );
    const patients = response.data;
    const jessicaTaylor = patients.find(
      (patient) => patient.name === "Jessica Taylor"
    );

    return jessicaTaylor;
  } catch (error) {
    console.error("Error fetching patient data:", error);
  }
}
