import nodemailer from 'nodemailer';

const mailSender = process.env.MAIL_SENDER;
const mailPassword = process.env.MAIL_PASSWORD;
const mailFrom = process.env.MAIL_FROM;

const transporter = nodemailer.createTransport({
    host: 'sandbox.smtp.mailtrap.io',
    port: 2525,
    auth: {
        user: mailSender,
        pass: mailPassword,
    },
});

export class Mailer {
	static createMessageObject(
		emailToBeSendedTo: string,
		subject: string,
		messageText: string
	) {
		const messageObject = {
			from: mailFrom,
			to: emailToBeSendedTo,
			subject: subject,
			text: messageText,
		};

		return messageObject;
	}

	public static sendEmail(
		emailToBeSendedTo: string,
		subject: string,
		messageText: string
	) {

		const messageObject = Mailer.createMessageObject(
			emailToBeSendedTo,
			subject,
			messageText
		);

		transporter.sendMail(messageObject, (error) => {
			if (error != null) {
				console.error("Erro ao enviar email:", error.message);
			}
		});
	}
}