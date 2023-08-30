document.addEventListener("DOMContentLoaded", function () {
  const textInput = document.getElementById("textInput");
  const generateButton = document.getElementById("generateButton");
  const downloadButton = document.getElementById("downloadButton");
  const qrcodeContainer = document.getElementById("qrcode");
  let qrImageBlob = null;

  generateButton.addEventListener("click", async function () {
    const text = textInput.value;
    if (text.trim() !== "") {
      // Clear existing QR code
      qrcodeContainer.innerHTML = "";
      downloadButton.disabled = true;

      // Generate QR code using API
      try {
        const response = await fetch(`https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(text)}`);
        qrImageBlob = await response.blob();

        const img = document.createElement("img");
        img.src = URL.createObjectURL(qrImageBlob);
        qrcodeContainer.appendChild(img);
        downloadButton.disabled = false;
      } catch (error) {
        qrcodeContainer.innerHTML = "<p class='error-message'>Error generating QR code</p>";
      }
    }
  });

  downloadButton.addEventListener("click", function () {
    if (qrImageBlob) {
      // Create a temporary anchor element to trigger the download
      const link = document.createElement("a");
      link.href = URL.createObjectURL(qrImageBlob);
      link.download = "qrcode.png";
      link.click();
    }
  });
});
