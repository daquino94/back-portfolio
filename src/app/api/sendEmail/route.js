import { NextResponse } from "next/server";
import nodemailer from 'nodemailer';

export const POST = async (req, res) => {
    try {
        const data = await req.json()

        const transporter = nodemailer.createTransport({
            host: process.env.NEXT_PUBLIC_MAIL_HOST, 
            port: process.env.NEXT_PUBLIC_MAIL_PORT, 
            secure: true,
            auth: {
              user: process.env.NEXT_PUBLIC_MAIL_USER, 
              pass: process.env.NEXT_PUBLIC_MAIL_PASSWORD, 
            },
          });
          const emailHtml = `<!DOCTYPE html>
          <html>
          <head>
            <meta charset="utf-8">
            <title>Nuovo messaggio dal sito</title>
            <style>
              body {
                font-family: Arial, sans-serif;
                background-color: #f5f5f5;
                margin: 0;
                padding: 0;
                display: flex;
                align-items: center;
                justify-content: center;
                height: 100vh;
              }
              .card {
                background-color: white;
                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                padding: 20px;
                border-radius: 5px;
                width: 300px;
                text-align: center;
              }
              h2 {
                margin-top: 0;
              }
              p {
                margin: 10px 0;
              }
            </style>
          </head>
          <body>
            <div class="card">
              <h2>Nuovo messaggio dal sito</h2>
              <p><strong>Email:</strong> ${data.email}</p>
              <p><strong>Messaggio:</strong> ${data.message}</p>
              <p><strong>Telefono:</strong> ${data.phone}}</p>
            </div>
          </body>
          </html>
          `
          const mailOptions = {
            from: process.env.NEXT_PUBLIC_MAIL_MAIL_FROM,
            to: process.env.NEXT_PUBLIC_MAIL_MAIL_TO, 
            cc: process.env.NEXT_PUBLIC_MAIL_MAIL_CC, 
            subject: 'Contatto dal sito',
            html: emailHtml
          };
    
          const info = await transporter.sendMail(mailOptions);
    
          console.log('Messaggio inviato:', info.messageId);

        return NextResponse.json({success:true, messageId: info.messageId})
    } catch (error) {
        console.log(error)
    }
};
