const sendMail = require("../config/nodeMailer");

const SendMailWithNaitik = (request,response,next)=>{
    const {name,phone,email,message} = request.body;
    console.log(request.body);
    if(!name || !phone || !email || !message){
        return response.status(404).json({status:"error",message:"all fields are required to send the mail"});
    }
    try {
        sendMail(name,phone,email,message).then(()=>{
            return response.status(200).json({status:"success",message:"mail sent successFully"});
        }).catch((error)=>{
            return response.status(400).json({status:"error",message:`error message=${error.message}`});
        })
    } catch (error) {
        return response.status(500).json({status:"error",message:`server error message=${error.message}`});
    }
}

module.exports = SendMailWithNaitik;