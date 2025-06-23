
export const generateHtmlForEmail = ({ emailType, token, }: {
    emailType: "VERIFY" | "RESET";
    token: string;
}) => {
    const actionUrl = `${process.env.DOMAIN}/${emailType === "VERIFY"
        ? "verify" : "reset-password"
        }?token=${token}`;

    const actionText = emailType === "VERIFY" ? "Verify your Email" : "Reset your Password";

    return `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; background-color: #ffffff; border: 1px solid #e0e0e0; border-radius: 8px;">
            <h2 style="color: #333333;">${actionText}</h2>
            <p style="font-size: 16px; color: #555555;">
                You requested to ${actionText.toLowerCase()}. Click the button below to proceed:
            </p>
            <a href="${actionUrl}" 
                style="display: inline-block; padding: 12px 24px; margin: 20px 0; background-color: #007BFF; color: #ffffff; text-decoration: none; border-radius: 4px; font-weight: bold;">
                ${actionText}
            </a>
            <p style="font-size: 14px; color: #999999;">
                This link will expire in 1 hour. If you didn’t request this, you can safely ignore this email.
            </p>
            <hr style="margin-top: 30px; border: none; border-top: 1px solid #eeeeee;" />
            <p style="font-size: 12px; color: #bbbbbb; text-align: center;">
                &copy; ${new Date().getFullYear()} YourAppName. All rights reserved.
            </p>
        </div>
    `;
};
