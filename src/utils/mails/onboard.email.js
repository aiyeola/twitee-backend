class OnboardMail {
  static onBoardNewUser(link, data) {
    const html = `
	  <body style="margin: 0; padding: 0;">
		<table border="0" cellpadding="0" cellspacing="0" width="900px"
			style="padding: 0 40px 0 40px; background-color:#f1f2f3;">
			 <tr>
			 <td align="center" style="padding: 0 50px 0 50px;">
						<table border="0" cellpadding="0" cellspacing="0" width="100%"
							style="background-color:#ffffff; padding: 0 0 0 20px;">
							<tr>
								<td align="center" style="font-family: Arial, sans-serif; font-size: 24px; color: #050505;">
									<p>Hi ${data.name},</p>
								</td>
							</tr>
							<tr>
								<td align="center"
									style="color: #153643; font-family: Arial, sans-serif; font-size: 16px; line-height: 20px;">
									<p>Welcome to Twitee, you can login via ${link}</p>
								</td>
							</tr>
						</table>
			</tr>
			<tr>
				<td align="center" style="padding: 30px 30px 30px 30px;">
					Twitee,&copy; 2021<br />
				</td>
			</tr>
		</table>
	</body>
	`;

    return { html };
  }
}

export default OnboardMail;
