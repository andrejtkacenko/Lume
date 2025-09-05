# Lume - Restaurant Website

This is a modern and elegant website for "Lume," a fictional farm-to-table restaurant. The application is built with Next.js and provides a beautiful interface for showcasing the menu, sharing the restaurant's story, and allowing customers to book reservations.

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (with App Router)
- **UI**: [React](https://react.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Components**: [ShadCN UI](https://ui.shadcn.com/)
- **Icons**: [Lucide React](https://lucide.dev/guide/packages/lucide-react)
- **Forms**: [React Hook Form](https://react-hook-form.com/) & [Zod](https://zod.dev/)

## Features

- **Responsive Design**: Looks great on all devices, from desktops to mobile phones.
- **Homepage**: A welcoming hero section, introduction, and highlights from the menu.
- **Menu Page**: A tabbed view of the full menu, categorized into Appetizers, Mains, Desserts, and Drinks.
- **About Page**: Shares the story and philosophy of the restaurant.
- **Gallery**: A beautiful grid showcasing the restaurant's ambiance and dishes.
- **Reservations**: A user-friendly form to book a table, with protection against duplicate bookings.

## Getting Started

Follow these instructions to get the project running on your local machine for development and testing.

### Prerequisites

You need to have [Node.js](https://nodejs.org/en/) (version 18 or later) and npm installed on your system.

### Installation

1.  Clone the repository to your local machine:
    ```bash
    git clone <your-repository-url>
    ```

2.  Navigate into the project directory:
    ```bash
    cd <project-directory>
    ```

3.  Install the dependencies:
    ```bash
    npm install
    ```

### Running the Development Server

To start the app in development mode, run the following command.

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result. You can start editing the page by modifying `src/app/page.tsx`. The page auto-updates as you edit the file.

## Deployment

This application is ready to be deployed on [Vercel](https://vercel.com/), the platform from the creators of Next.js.

### Deploying to Vercel

1.  Push your code to a Git repository (e.g., on GitHub, GitLab, or Bitbucket).
2.  Go to the [Vercel dashboard](https://vercel.com/new) and import your project from your Git repository.
3.  Vercel will automatically detect that you are using Next.js and configure the build settings for you.
4.  Click the "Deploy" button. Your website will be live in a few minutes!

Vercel will handle the entire build process and provide you with a live URL. For more information, see the [Next.js deployment documentation](https://nextjs.org/docs/deployment).
