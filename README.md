# InuKami Auth Template

private use of quick template in nextjs 14 with shadcn-ui, next-auth, and prisma for other production app.

## Required Environment Variable

- AUTH_SECRET (random string)
- DATABASE_URL (mysql://username:password@host:port/database)
- COMPANY_EMAIL (email, use gmail for easier setup)
- COMPANY_EMAIL_PASSWORD (with gmail, set a new app password in google account settings. visit https://myaccount.google.com/apppasswords to create your app)

## Features

- Registration, Login, Verification.
- Role-Based Authentication.
- Reset Password using Email.
- Easy to add other auth provider.
- Responsive minimal design.
- Toggle light/dark mode with next-themes.
- Ready to use for any app that require authentication.
