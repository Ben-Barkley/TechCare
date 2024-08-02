document.addEventListener("DOMContentLoaded", function () {
  async function fetchData() {
    try {
      const username = "coalition";
      const password = "skills-test";
      const authHeader = `Basic ${btoa(username + ":" + password)}`;

      const response = await fetch(
        "https://fedskillstest.coalitiontechnologies.workers.dev",
        {
          headers: {
            Authorization: authHeader,
          },
        }
      );

      const data = await response.json();
      console.log(data); // Check the API response

      // Filter data for Jessica Taylor
      const jessicaTaylorData = data.find(
        (item) => item.name === "Jessica Taylor"
      );
      console.log(jessicaTaylorData); // Check if Jessica Taylor's data is found

      // Insert data into HTML
      if (jessicaTaylorData) {
        document.getElementById("profile-picture").src =
          jessicaTaylorData.profile_picture;
        document.getElementById("name").innerText = jessicaTaylorData.name;
        document.getElementById("gender").innerText = jessicaTaylorData.gender;
        document.getElementById("date-of-birth").innerText =
          jessicaTaylorData.date_of_birth;
        document.getElementById("phone-number").innerText =
          jessicaTaylorData.phone_number;
        document.getElementById("emergency-contact").innerText =
          jessicaTaylorData.emergency_contact;
        document.getElementById("insurance-type").innerText =
          jessicaTaylorData.insurance_type;

        // Lab Results
        const labResults = jessicaTaylorData.lab_results
          .map(
            (result) => `
                        <div class="d-flex align-items-center justify-content-between">
                            <p class="mb-0">${result}</p>
                            <i class="bi bi-download fw-bolder fs-4 me-2"></i>
                        </div>
                    `
          )
          .join("");
        document.getElementById("lab-results").innerHTML = labResults;
      } else {
        document.getElementById("jessica-taylor-data").innerHTML =
          "<p>No data found for Jessica Taylor.</p>";
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      document.getElementById("jessica-taylor-data").innerHTML =
        "<p>Error fetching data. Please try again later.</p>";
    }
  }

  fetchData();
});
