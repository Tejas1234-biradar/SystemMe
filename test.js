document.addEventListener('DOMContentLoaded', () => {
    let a = document.getElementById("submit");
    a.addEventListener('click', async (event) => {
      event.preventDefault(); // Prevent page refresh
      
      // Get form input values
      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const mobile = document.getElementById("mobile").value;
      
      // Create an object with the data
      const userData = {
        name,
        email,
        mobile,
      };
      
      try {
        // Send a POST request to the backend
        const response = await fetch("http://localhost:5000/user", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        });
      
        if (response.ok) {
          const result = await response.json();
          console.log("Data successfully sent:", result);
          alert("Data successfully added to the database!");
        } else {
          console.error("Failed to add data");
          alert("Error adding data. Please try again.");
        }
      } catch (error) {
        console.error("Error:", error);
        alert("An error occurred. Please check the console for details.");
      }
      
    
    
    });
  });
  