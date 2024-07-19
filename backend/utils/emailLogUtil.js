const logEmail = (recipientEmail, emailSubject, emailContent) => {
  try {
    console.log("Logging email details...");
    console.log(`Recipient: ${recipientEmail}`);
    console.log(`Subject: ${emailSubject}`);

    // Adjust the email content to ensure proper alignment of new lines
    const adjustedEmailContent = emailContent
      .split("\n")
      .map((line) => {
        // Apply indentation to every line
        return `        ${line.trimStart()}`;
      })
      .join("\n");

    console.log(`Body:\n${adjustedEmailContent}`);
  } catch (error) {
    console.error("Error in logEmail function:", error);
  }
};

module.exports = logEmail;
