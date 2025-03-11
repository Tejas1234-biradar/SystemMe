$(document).ready(function () {
    showNotes();

    // Add Button event listener
    $("#addBtn").click(function () {
        addNote();
    });

    // Search event listener
    $("#search").on("input", function () {
        searchNotes();
    });

    // Theme toggle functionality
    $("#toggle-themes").click(function () {
        const $body = $("body");
        const $themeButton = $(this);

        $body.toggleClass("dark");
        $themeButton.text($body.hasClass("dark") ? "☀️" : "🌙");
    });

    // Show Notes
    function showNotes() {
        let notes = localStorage.getItem("notes");
        let notesObj = notes ? JSON.parse(notes) : [];
        let html = "";

        notesObj.forEach(function (note, index) {
            html += `
                <li class="note-item" data-index="${index}">
                    <span>${index + 1}. ${note.title}</span>
                    <div class="btn-group">
                        <button class="delete-btn" onclick="deleteNote(${index})">
                            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-trash">
                                <polyline points="3 6 5 6 21 6"></polyline>
                                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 1 1 2 2v2"></path>
                            </svg>
                        </button>
                        <button class="download-btn" onclick="downloadPDF(${index})">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#000000" fill="none">
                                <circle cx="12" cy="12" r="10" stroke="white" stroke-width="1.5" />
                                <path d="M12 16L12 8M12 16C11.2998 16 9.99153 14.0057 9.5 13.5M12 16C12.7002 16 14.0085 14.0057 14.5 13.5" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                        </button>
                    </div>
                </li>`;
        });

        $("#notes-list").html(
            notesObj.length ? html : "<h3>Nothing to show! Add a Note</h3>"
        );

        // Add click event to note items
        $(".note-item").click(function () {
            let index = $(this).data("index");
            loadNoteIntoFields(index);
        });
    }

    // Load selected note into the title and text fields
    function loadNoteIntoFields(index) {
        let notes = localStorage.getItem("notes");
        let notesObj = notes ? JSON.parse(notes) : [];
        let note = notesObj[index];

        $("#addTitle").val(note.title);
        $("#addTxt").val(note.text);
    }

    // Add a Note
    function addNote() {
        let title = $("#addTitle").val().trim();
        let text = $("#addTxt").val().trim();

        if (!title) {
            alert("Please add a title to your note!");
            return;
        }

        let notes = localStorage.getItem("notes");
        let notesObj = notes ? JSON.parse(notes) : [];

        notesObj.push({ title, text });

        localStorage.setItem("notes", JSON.stringify(notesObj));
        $("#addTitle").val("");
        $("#addTxt").val("");
        showNotes();
    }

    // Delete Note
    window.deleteNote = function (index) {
        let notes = localStorage.getItem("notes");
        let notesObj = notes ? JSON.parse(notes) : [];
        notesObj.splice(index, 1);
        localStorage.setItem("notes", JSON.stringify(notesObj));
        showNotes();
    };

    // Download Note as PDF
    window.downloadPDF = function (index) {
        const { jsPDF } = window.jspdf; // Access jsPDF from window.jspdf

        let notes = localStorage.getItem("notes");
        let notesObj = notes ? JSON.parse(notes) : [];
        let note = notesObj[index];

        let pdf = new jsPDF(); // Create a new jsPDF instance
        pdf.text(20, 20, `Title: ${note.title}`);
        pdf.text(20, 40, `Content: ${note.text}`);
        pdf.save(`${note.title}.pdf`); // Save the PDF with the note title as filename
    };

    // Search Notes
    function searchNotes() {
        let searchText = $("#search").val().toLowerCase();
        let notes = localStorage.getItem("notes");
        let notesObj = notes ? JSON.parse(notes) : [];

        let matchedNote = notesObj.find((note) =>
            note.title.toLowerCase().includes(searchText)
        );

        if (matchedNote) {
            $("#addTitle").val(matchedNote.title);
            $("#addTxt").val(matchedNote.text);
        } else {
            $("#addTitle").val("");
            $("#addTxt").val("");
        }
    }
});

document.addEventListener('DOMContentLoaded', () => {
    let a = document.getElementById('addBtn');
    a.addEventListener('click', async (event) => {
      event.preventDefault(); // Prevent page refresh
      
      // Get form input values
      const title = document.getElementById("addTitle").value;
      const desc = document.getElementById("addTxt").value;
    //   const mobile = document.getElementById("mobile").value;
      
      // Create an object with the data
      const noteData = {
        title,
        desc,
        
      };
      
      try {
        const response = await fetch("http://localhost:5000/note", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(noteData), // Ensure the data is serialized to JSON
        });
      
        // Check if response is OK and parse JSON
        if (response.ok) {
          const result = await response.json();
          console.log("Data successfully sent:", result.message);
          alert(result.message); // Display the server's success message
        } else {
          const error = await response.json(); // Parse error details
          console.error("Failed to add data:", error.message);
          alert(`Error: ${error.message}`);
        }
      } catch (error) {
        console.error("Error:", error.message);
        alert("An error occurred. Please check the console for details.");
      }
      
      
      // Optionally clear the form fields
    //   document.getElementById("loginForm").reset();
    });
  });
  async function fetchAndDisplayNote() {
    try {
      const response = await fetch("http://localhost:5000/note"); // Fetch notes from your backend
      if (response.ok) {
        const notes = await response.json(); // Parse the JSON response
        console.log('working');
        
  
        // Ensure at least one note is available
        if (notes.length > 0) {
          // Get the first note (or modify as needed to display a specific note)
          const note = notes[0]; 
  
          // Select elements by their IDs
          const titleElement = document.getElementById("addTitle");
          const descriptionElement = document.getElementById("addTxt");
         
  
          // Set the text content of the elements
          titleElement.value = note.title
          descriptionElement.value = note.desc;
          console.log(note.title)
        } else {
          alert("No notes found to display.");
        }
      } else {
        console.error("Failed to fetch notes");
        alert("Error fetching notes. Please try again later.");
      }
    } catch (error) {
      console.error("Error:", error.message);
      alert("An error occurred. Please check the console for details.");
    }
  }
  
  // Call the function to fetch and display the note
   document.getElementById("download").addEventListener('click',fetchAndDisplayNote)
  
  