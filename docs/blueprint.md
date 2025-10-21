# **App Name**: CRM Gateway Hub

## Core Features:

- CRM Information Display: Display information about integrated CRMs (Domus, Siesa, Inventario Agil, Wasi) on the landing page with 'Add' buttons for each.
- Secure User Login: Implement a login system using the Meta API (http://crm-gateway.lambdaanalytics.co/) endpoint /<slug_organizacion>/api/accounts/login/ to authenticate users with email and password and retrieve JWT tokens (access + refresh).
- User Management: Admin panel to add and manage users within the CRM gateway system.
- Organization Management: Admin panel to manage organizations (slug: pailaquinta) within the CRM gateway system.
- CRM Credential Configuration: Allow admins to configure CRM credentials for each integrated CRM within the system.

## Style Guidelines:

- Primary color: Deep violet (#673AB7) to represent integration and sophistication.
- Background color: Light grey (#F5F5F5), a very low saturation version of violet, creating a professional and clean backdrop.
- Accent color: Sky blue (#03A9F4), an analogous color that offers contrast, used for buttons and active states.
- Body and headline font: 'Inter' sans-serif font to maintain a clean, professional, and readable interface.
- Use a consistent set of minimalist icons for navigation and actions, ensuring clarity and usability.
- Employ a grid-based layout for clear information hierarchy and responsive design across devices.
- Use subtle transitions and animations for a smooth user experience when navigating between sections or displaying new information.