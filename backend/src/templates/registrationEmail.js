const registrationEmailTemplate = ({
    user,
    event,
    registration,
  }) => {
    return `
  <!DOCTYPE html>
  <html>
  
  <head>
  <meta charset="UTF-8">
  
  <style>
  
  body{
      margin:0;
      padding:0;
      background:#f5f7fb;
      font-family:Arial,sans-serif;
  }
  
  .container{
      max-width:650px;
      margin:auto;
      background:white;
      border-radius:10px;
      overflow:hidden;
  }
  
  .header{
      background:#2563eb;
      color:white;
      padding:30px;
      text-align:center;
  }
  
  .content{
      padding:30px;
  }
  
  .card{
      background:#f9fafb;
      border-radius:10px;
      padding:20px;
      margin-top:20px;
  }
  
  .ticket{
      margin-top:20px;
      background:#2563eb;
      color:white;
      text-align:center;
      padding:15px;
      border-radius:8px;
      font-size:22px;
      font-weight:bold;
      letter-spacing:2px;
  }
  
  .qr{
      text-align:center;
      margin-top:25px;
  }
  
  .footer{
      margin-top:30px;
      padding:20px;
      background:#f3f4f6;
      text-align:center;
      color:#555;
      font-size:14px;
  }
  
  </style>
  
  </head>
  
  <body>
  
  <div class="container">
  
  <div class="header">
  
  <h1>🎉 Registration Confirmed</h1>
  
  <p>Online Event Management System</p>
  
  </div>
  
  <div class="content">
  
  <h2>Hello ${user.name},</h2>
  
  <p>
  Thank you for registering.
  Your seat has been successfully reserved.
  </p>
  
  <div class="card">
  
  <h2>${event.title}</h2>
  
  <p><strong>Category:</strong> ${event.category}</p>
  
  <p><strong>Venue:</strong> ${event.venue}</p>
  
  <p><strong>Starts:</strong>
  ${new Date(event.startDateTime).toLocaleString()}
  </p>
  
  <p><strong>Ends:</strong>
  ${new Date(event.endDateTime).toLocaleString()}
  </p>
  
  </div>
  
  <div class="ticket">
  
  ${registration.ticketId}
  
  </div>
  
  <div class="qr">
  
  <p><strong>Scan during check-in</strong></p>
  
  <img
  src="${registration.qrCode}"
  width="220"
  />
  
  </div>
  
  <div class="footer">
  
  <p>
  Please carry this QR code while attending the event.
  </p>
  
  <p>
  © 2026 Online Event Management System
  </p>
  
  </div>
  
  </div>
  
  </div>
  
  </body>
  
  </html>
  `;
  };
  
  export default registrationEmailTemplate;