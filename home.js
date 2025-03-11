$(document).ready(function () {
    $("#signup").on("submit", async function (event) {
        event.preventDefault(); // Prevent default form submission

        let email = $("#email").val().trim();
        let password = $("#psw").val().trim();
        let repeatPassword = $("#pswrepeat").val().trim();

        // Email validation regex
        let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        // Basic validation
        if (!email || !password || !repeatPassword) {
            alert("All fields are required.");
            return;
        }
        if (!emailRegex.test(email)) {
            alert("Enter a valid email address.");
            return;
        }
        if (password.length < 8) {
            alert("Password must be at least 8 characters long.");
            return;
        }
        if (password !== repeatPassword) {
            alert("Passwords do not match.");
            return;
        }

        let userData = { email, password };

        try {
            const response = await $.ajax({
                url: "http://localhost:5000/signup",
                method: "POST",
                contentType: "application/json",
                data: JSON.stringify(userData),
            });

            alert("Signup successful!");
            console.log("Data successfully sent:", response);
            window.location.href="index.html";

            // Clear input fields after success
            $("#signup")[0].reset(); // Reset the form
        } catch (error) {
            // console.error("Request failed:", error);
             const errorData = error.responseJSON;
            //  alert(errorData.message || "Signup failed. Try again.");
           // alert("Could not connect to the server. Check your backend.");
        }
    });
});
    