# Finova - AI-Powered Financial Portfolio Management

<div align="center">
  <img src="https://via.placeholder.com/1200x600?text=Finova+Dashboard" alt="Finova Dashboard" />
  
  [![Next.js](https://img.shields.io/badge/Next.js-14.1.0-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.3.0-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
  [![Clerk](https://img.shields.io/badge/Clerk-Auth-000000?style=for-the-badge&logo=clerk)](https://clerk.dev/)
  [![OpenAI](https://img.shields.io/badge/OpenAI-GPT-412991?style=for-the-badge&logo=openai)](https://openai.com/)
</div>

## 🚀 Overview

Finova is a cutting-edge personal finance platform built for the modern investor. Leveraging the power of AI and real-time data analytics, it provides intelligent financial insights, personalized investment recommendations, and comprehensive portfolio management tools.

## ✨ Key Features

- 🤖 **AI Financial Assistant**: Engage in natural conversations with an AI advisor that understands your financial goals and provides personalized guidance
- 📊 **Real-time Portfolio Analytics**: Interactive dashboards with advanced charting and performance metrics
- 🧠 **Smart Financial Insights**: AI-powered analysis of your spending patterns and investment opportunities
- 📈 **Personalized Recommendations**: Investment suggestions tailored to your risk profile and financial objectives
- 💰 **Expense Tracking**: Comprehensive budget management with smart categorization
- 🎯 **Goal Planning**: Set and track progress towards your financial milestones
- 🔒 **Secure Authentication**: Built with Clerk for enterprise-grade security
- 🌙 **Dark Mode**: Beautiful dark and light themes for comfortable viewing

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 14.1 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom animations
- **UI Components**: shadcn/ui, Radix UI
- **Charts**: Recharts
- **Animations**: Framer Motion, AOS
- **Form Handling**: React Hook Form with Zod validation

### Backend & Services
- **Authentication**: Clerk
- **Database**: Prisma with PostgreSQL
- **AI Integration**: OpenAI API
- **State Management**: React Context
- **API Routes**: Next.js API Routes

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Clerk account (for authentication)
- OpenAI API key (for AI features)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/finova.git
   cd finova
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Set up environment variables:
   Create a `.env.local` file in the root directory:

   ```env
   # Clerk Authentication
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
   CLERK_SECRET_KEY=your_clerk_secret_key

   # OpenAI API
   OPENAI_API_KEY=your_openai_api_key

   # Database
   DATABASE_URL=your_database_url
   ```

4. Initialize the database:
   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) to see your application.

## 📁 Project Structure

```
finova/
├── app/                # Next.js app directory
│   ├── api/           # API routes
│   ├── dashboard/     # Dashboard pages
│   ├── sign-in/       # Authentication pages
│   └── sign-up/
├── components/        # React components
│   ├── ai/           # AI-related components
│   ├── dashboard/    # Dashboard UI components
│   ├── ui/          # Reusable UI components
│   └── ...
├── context/          # React context providers
├── hooks/            # Custom React hooks
├── lib/              # Utility functions
├── prisma/           # Database schema and migrations
├── types/            # TypeScript type definitions
└── public/           # Static assets
```

## 🤝 Contributing

We welcome contributions to Finova! Here's how you can help:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - The React framework
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [shadcn/ui](https://ui.shadcn.com/) - Beautiful UI components
- [Clerk](https://clerk.dev/) - Authentication
- [OpenAI](https://openai.com/) - AI capabilities
- [Prisma](https://www.prisma.io/) - Database ORM

## 📞 Contact

For any questions or suggestions, please open an issue in the repository or contact the maintainers.
