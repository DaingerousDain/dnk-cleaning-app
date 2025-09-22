# Captain's Lounge - Heritage Day Lounge Booking System

## Overview

Captain's Lounge is a heritage day lounge booking system located in historic Galle Fort, Sri Lanka. The application provides travelers with a luxury transit solution during layovers, offering 4-hour time slots with spa treatments, tea ceremonies, entertainment, and other amenities. The system handles booking management, payment processing through Stripe, and availability scheduling in a UNESCO World Heritage setting.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript using Vite as the build tool
- **Routing**: Wouter for client-side routing with simple page navigation
- **UI Library**: Shadcn/ui components built on Radix UI primitives with Tailwind CSS
- **State Management**: React Query (TanStack Query) for server state management
- **Styling**: Tailwind CSS with CSS custom properties for theming
- **Payment Integration**: Stripe React components for secure payment processing

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ESM modules
- **API Design**: RESTful API with structured route handling
- **Session Management**: Express sessions with PostgreSQL session store
- **Middleware**: Custom logging, error handling, and request processing
- **Development**: Vite integration for hot module replacement in development

### Data Storage Solutions
- **Database**: PostgreSQL with Neon serverless hosting
- **ORM**: Drizzle ORM for type-safe database operations
- **Schema Management**: Drizzle Kit for migrations and schema management
- **Connection Pooling**: Neon serverless connection pooling with WebSocket support

### Database Schema Design
- **Users Table**: Stores customer information with Stripe integration
- **Bookings Table**: Manages reservations with time slots, pricing, and payment status
- **Availability Table**: Tracks time slot availability and capacity management
- **Time Slots**: Four daily sessions (6am-10am, 10am-2pm, 2pm-6pm, 6pm-10pm)
- **Add-on Services**: JSON storage for flexible service offerings

### Authentication and Authorization
- **User Management**: Email-based user creation and lookup
- **Session Handling**: Server-side session management with PostgreSQL storage
- **Payment Security**: Stripe handles sensitive payment data with secure tokens

## External Dependencies

### Payment Processing
- **Stripe**: Complete payment infrastructure including payment intents, customer management, and secure card processing
- **Integration**: Both server-side API and client-side React components for seamless checkout

### Database Services
- **Neon Database**: Serverless PostgreSQL hosting with WebSocket support
- **Connection Management**: Automated scaling and connection pooling

### UI and Styling
- **Radix UI**: Accessible component primitives for complex UI elements
- **Tailwind CSS**: Utility-first CSS framework with custom design system
- **Lucide React**: Icon library for consistent iconography
- **Google Fonts**: Custom typography with Inter, Playfair Display, and monospace fonts

### Development Tools
- **Vite**: Fast build tool with hot module replacement
- **TypeScript**: Type safety across the entire application
- **Replit Integration**: Development environment optimization and error handling

### Form Management
- **React Hook Form**: Form state management with validation
- **Zod**: Schema validation integrated with Drizzle ORM

### Date and Time Handling
- **date-fns**: Date manipulation and formatting for booking system
- **React Day Picker**: Calendar component for date selection

## Recent Changes

### September 10, 2025
- Fixed critical API issues preventing booking functionality
- Resolved database schema conflicts and type safety issues
- Successfully tested availability checking and payment integration
- Complete booking system now operational with Stripe payment processing
- Authentic Captain's Lounge branding and heritage content fully implemented