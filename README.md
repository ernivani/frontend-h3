# Frontend H3

A Vue 3 + Vite frontend application with GDPR compliance features.

## Features

- Modern UI with Tailwind CSS
- Authentication and user management
- GDPR compliance implementation
- Responsive design

## GDPR Compliance Features

This application implements GDPR compliance through:

1. **User Rights Management**:
   - Right to access personal data (data export)
   - Right to rectification (edit profile)
   - Right to erasure (account deletion)

2. **Consent Management**:
   - Clear opt-in mechanisms
   - Consent tracking and management
   - Easy withdrawal of consent

3. **Privacy by Design**:
   - Comprehensive privacy policy
   - Minimized data collection
   - Secure data handling practices

4. **Transparency**:
   - Clear privacy policy
   - Data processing information
   - Contact information for data inquiries

## Development

### Setup

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file:
```
VITE_API_URL=http://localhost:8000
```

3. Run development server:
```bash
npm run dev
```

4. Build for production:
```bash
npm run build
```

## Project Structure

```
.
├── src/
│   ├── components/      # Reusable UI components
│   │   └── GDPRSettings.vue  # GDPR user rights management
│   ├── pages/           # Application pages
│   │   └── PrivacyPolicyPage.vue  # GDPR privacy policy
│   ├── stores/          # Pinia stores
│   ├── router/          # Vue Router configuration
│   └── App.vue          # Main application component
├── public/              # Static assets
└── dist/                # Build output
```

## Technologies

- [Vue 3](https://vuejs.org/) - Progressive JavaScript framework
- [Vite](https://vitejs.dev/) - Frontend build tool
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Heroicons](https://heroicons.com/) - Beautiful hand-crafted SVG icons
