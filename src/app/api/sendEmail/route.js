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

        const info = await transporter.sendMail(mailOptions);

        console.log('Messaggio inviato:', info.messageId);

        return NextResponse.json({ success: true, messageId: info.messageId })
    } catch (error) {
        console.log(error)
    }
};
