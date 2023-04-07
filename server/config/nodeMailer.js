const nodeMailer = require("nodemailer");
const sendMailWithNodeMailer  =async (name,email,message,phone)=>{
    const transporter = nodeMailer.createTransport({
        host: process.env.MAIL_HOST,
        port: process.env.MAIL_PORT,
        secure: true, // true for 465, false for other ports
        auth: {
          user: process.env.MAIL_USERNAME, 
          pass: process.env.MAIL_PASSWORD, 
        },
      });
try {
    console.log();
    let info = await transporter.sendMail({
        from:'subarnamiyer@gmail.com', 
        to: "info@redpositive.in", 
        subject: `from : ${phone}`,
        text: `${name}`, 
        html: `<b>from : ${email}<br>message : ${message}</b>`, // html body
      });
} catch (error) {
    console.log(error);
}
}

module.exports=sendMailWithNodeMailer;