// Add a "click" event listener to the button with the ID "convertButton"
document.getElementById("convertButton").addEventListener("click", () => {
    // Get the input element where the user uploads the image
    const imageInput = document.getElementById("imageInput");
    // Get the element where the extracted text or error message will be displayed
    const output = document.getElementById("output");
    // Get the clear button element
    const clearButton = document.getElementById("clearButton");

    // Check if the user has uploaded a file
    if (imageInput.files.length === 0) {
      // If no file is uploaded, show an error message in the "output" element
      output.textContent = "Please upload an image first.";
      return; // Stop the function execution
    }

    // Get the first file (image) from the file input
    const imageFile = imageInput.files[0];

    // Create a new FileReader object to read the contents of the uploaded file
    const reader = new FileReader();

    // Define what happens when the file is successfully read
    reader.onload = () => {
      // Get the image data (in Base64 format) from the FileReader
      const imageSrc = reader.result;

      // Use the Tesseract.js library to extract text from the image
      Tesseract.recognize(
        imageSrc, // The image data
        "eng", // Language of the text (English in this case)
        {
          // Optional: Log the progress of the OCR process in the console
          logger: (info) => console.log(info),
        }
      )
        .then(({ data: { text } }) => {
          // When the OCR process succeeds, display the extracted text in the "output" element
          output.textContent = text;
          // Show the clear button after text extraction
          clearButton.style.display = "inline-block";
        })
        .catch((error) => {
          // If there is an error during the OCR process, display the error message
          output.textContent = `Error: ${error.message}`;
        });
    };

    // Start reading the image file as a data URL (Base64 format)
    reader.readAsDataURL(imageFile);
});

// Add a "click" event listener to the "Clear" button
document.getElementById("clearButton").addEventListener("click", () => {
    // Get the elements for clearing the image and output
    const imageInput = document.getElementById("imageInput");
    const output = document.getElementById("output");
    const clearButton = document.getElementById("clearButton");

    // Clear the output text
    output.textContent = "";
    // Reset the file input (removes the selected image)
    imageInput.value = "";
    // Hide the clear button again
    clearButton.style.display = "none";
});
