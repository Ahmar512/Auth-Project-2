import nodemailer from 'nodemailer'


export const transporter = nodemailer.createTransport({
    service:'gmail',
    secure:true,
    port: 465,
    auth:{
        user: process.env.NODEMAILER_EMAIL,
        pass:process.env.NODEMAILER_PASS,
    },
});

