import nodemailer, { SendMailOptions, SentMessageInfo } from "nodemailer";
import HTML_TEMPLATE from "./nodemailer-template";

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.COMPANY_EMAIL,
    pass: process.env.COMPANY_EMAIL_PASSWORD,
  },
});

/** create reusable sendmail function 
@params {object} options - mail options (to, subject, text, html)
@params {function} callback - callback function to handle response
*/
const sendMail = async (options: SendMailOptions) => {
  try {
    const defaultOptions: SendMailOptions = {
      from: `Support <${process.env.COMPANY_EMAIL}>`, // sender address
      to: "someone@gmail.com", // receiver email
      subject: "Email Subject", // Subject line
      text: options.text?.toString() || "",
      html: HTML_TEMPLATE(options.text?.toString() || ""),
      ...options,
    };
    return await transporter.sendMail(defaultOptions);
  } catch (error) {
    console.log(error);
  }
};

export { transporter, sendMail };
