import { NextResponse } from "next/server";
import nodemailer from 'nodemailer';

export const POST = async (req, res) => {
    try {
        const data = await req.json()
        console.log(process.env.NEXT_PUBLIC_MAIL_PORT)
        const transporter = nodemailer.createTransport({
            host: process.env.NEXT_PUBLIC_MAIL_HOST, 
            port: process.env.NEXT_PUBLIC_MAIL_PORT, 
            secure: true,
            auth: {
              user: process.env.NEXT_PUBLIC_MAIL_USER, 
              pass: process.env.NEXT_PUBLIC_MAIL_PASSWORD, 
            },
          });

          const mailOptions = {
            from: process.env.NEXT_PUBLIC_MAIL_MAIL_FROM,
            to: process.env.NEXT_PUBLIC_MAIL_MAIL_TO, 
            cc: process.env.NEXT_PUBLIC_MAIL_MAIL_CC, 
            subject: 'Mail Dal sito',
            text: JSON.stringify(data)
          };
    
          // Invia l'email
          const info = await transporter.sendMail(mailOptions);
    
          console.log('Messaggio inviato:', info.messageId);

        const response = await fetch(`https://jsonplaceholder.typicode.com/users`, {
            method: "GET",
            cache: 'no-store',
        })
        const responseData = await response.json()
        return NextResponse.json(responseData)
    } catch (error) {
        console.log(error)
    }
};
