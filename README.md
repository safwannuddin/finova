# Finova - AI-Powered Financial Portfolio Management

Finova is an advanced personal finance platform that uses AI to provide intelligent financial insights, investment recommendations, and personalized portfolio management.

![Finova Dashboard Screenshot](https://via.placeholder.com/1200x600?text=Finova+Dashboard)

## Features

- 🤖 **AI Financial Assistant**: Chat with a sophisticated AI advisor that understands your financial profile
- 📊 **Smart Portfolio Tracking**: Visualize your investments with interactive charts and analytics
- 🧠 **Personalized Insights**: Receive AI-generated financial insights tailored to your unique situation
- 📈 **Investment Recommendations**: Get smart investment suggestions based on your risk tolerance and goals
- 💰 **Budget Management**: Track your spending patterns and optimize your budget allocation
- 🎯 **Financial Goal Setting**: Plan and track progress towards your financial goals

## Tech Stack

- **Frontend**: Next.js 13.5+, React, TypeScript, Tailwind CSS
- **UI Components**: shadcn/ui, Radix UI
- **Authentication**: Clerk
- **Animation**: Framer Motion, AOS
- **Charts**: Recharts
- **AI Integration**: OpenAI API (GPT-4o)

## Getting Started

### Prerequisites

- Node.js 16+
- npm or yarn
- OpenAI API key (for AI features)
- Clerk account (for authentication)

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
   Create a `.env.local` file in the root directory with the following:

   ```
   # Clerk Auth Environment Variables
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
   CLERK_SECRET_KEY=your_clerk_secret_key

   # OpenAI API key for AI financial assistant (server-side)
   OPENAI_API_KEY=your_openai_api_key
   ```

4. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Project Structure

```
finova/
├── app/               # Next.js app directory
│   ├── api/           # API routes
│   ├── dashboard/     # Dashboard pages
│   ├── sign-in/       # Authentication pages
│   └── sign-up/
├── components/        # React components
│   ├── ai/            # AI-related components
│   ├── dashboard/     # Dashboard UI components
│   ├── onboarding/    # Onboarding process components
│   ├── providers/     # Context providers
│   ├── splash/        # Splash screen components
│   └── ui/            # UI component library
├── context/           # React context providers
├── hooks/             # Custom React hooks
├── lib/               # Utility functions and data models
│   ├── mockData.ts    # Mock data generation
│   └── openai.ts      # OpenAI integration
└── public/            # Static assets
```

## AI Features Setup

Finova includes several AI-powered features:

1. **AI Financial Assistant**: Personalized chat that answers financial questions
2. **AI Insights**: Smart financial observations based on your profile
3. **Investment Recommendations**: AI-suggested investment opportunities

These features require an OpenAI API key. For local development, you can use:

```
NEXT_PUBLIC_OPENAI_API_KEY=your_api_key  # Only for local development
OPENAI_API_KEY=your_api_key              # For production (server-side)
```

⚠️ **Important**: For production, only use the server-side `OPENAI_API_KEY` and remove `NEXT_PUBLIC_OPENAI_API_KEY` to ensure security.

## Authentication Setup

Finova uses [Clerk](https://clerk.dev/) for authentication. To set up:

1. Create a Clerk account and project
2. Get your API keys from the Clerk dashboard
3. Add them to your environment variables:
   ```
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_publishable_key
   CLERK_SECRET_KEY=your_secret_key
   ```

## License

[MIT](LICENSE)

## Acknowledgements

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [OpenAI](https://openai.com/)
- [Clerk](https://clerk.dev/)
