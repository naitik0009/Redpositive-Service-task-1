

//use this if you want to use sendGrid to send Mail;


const sgMail = require('@sendgrid/mail')
const sendMail = async (name,email,phone,message) => {
    const msg = {
        to: 'rovinimoni@gmail.com', // Change to your recipient
        from: "subarnamiyer@gmail.com", // Change to your verified sender
        subject: 'Testing Contact Us Form',
        text: name,
        html: `<strong>from mobile : ${phone}<br>message: ${message}</strong>`,
    };
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    const send = await sgMail
        .send(msg)
        .then(() => {
            console.log('Email sent')
        })
        .catch((error) => {
            console.error(error)
        })
};

module.exports = sendMail;