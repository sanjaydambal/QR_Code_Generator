document.addEventListener("DOMContentLoaded", function () {
  const textInput = document.getElementById("textInput");
  const generateButton = document.getElementById("generateButton");
  const qrcodeContainer = document.getElementById("qrcode");

  generateButton.addEventListener("click", async function () {
    const text = textInput.value;
    if (text.trim() !== "") {
      // Clear existing QR code
      qrcodeContainer.innerHTML = "";

      // Generate QR code using API
      try {
        const response = await fetch(`https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(text)}`);
        const qrImageURL = await response.url;

        const img = document.createElement("img");
        img.src = qrImageURL;
        qrcodeContainer.appendChild(img);
      } catch (error) {
        qrcodeContainer.innerHTML = "<p class='error-message'>Error generating QR code</p>";
      }
    }
  });
});
