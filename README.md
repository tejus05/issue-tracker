# Issue Tracker

This is a web application built with Next.js 14, utilizing App Router for navigation. It integrates CockroachDB for the database management, Prisma ORM for data modeling and access, Radix UI for user interface components, React Query for data fetching and caching, React Hook Form for form handling, React SimpleMDE Editor for Markdown editing, and TypeScript for type safety. Authentication is implemented using NextAuth.

## Features

- **Add, Delete, Edit Issues**: Logged-in users can perform CRUD operations on issues.
- **Assign Issues**: Users can assign issues to themselves or others.
- **View Only for Non-authorized Users**: Non-logged-in users can only view issues without any editing capabilities.
- **Sort and Filter Issues**: Issues can be sorted and filtered based on different criteria.

## Demo



https://github.com/tejus05/issue-tracker/assets/118271901/ba1ad620-e00f-4cb2-9a93-ee1d466dbb29



## Live Website

[Live Website](https://issue-tracker-puce.vercel.app)

## Getting Started

To get a local copy up and running, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/tejus05/issue-tracker.git
   ```

2. Install dependencies:

   ```bash
   cd issue-tracker
   npm install
   ```

3. Configure environment variables:

   Create a `.env.local` file in the root directory and set the following environment variables:

   ```plaintext
    DATABASE_URL="your-database-url"
    NEXTAUTH_URL="your-nextauth-url"
    NEXTAUTH_SECRET="your-nextauth-secret"
    GOOGLE_CLIENT_ID="your-google-client-id"
    GOOGLE_CLIENT_SECRET="your-google-client-secret"
   ```

   Additionally, configure NextAuth with appropriate provider settings.

4. Run the development server:

   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Technologies Used

- Next.js 14
- CockroachDB
- Prisma ORM
- Radix UI
- React Query
- React Hook Form
- React SimpleMDE Editor
- TypeScript
- NextAuth

## License

This project is licensed under the [MIT License](https://choosealicense.com/licenses/mit)
