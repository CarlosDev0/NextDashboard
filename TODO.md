# TODO: Google OAuth Login Implementation

## Phase 1: Google Cloud Setup (Documentation)
- [x] 1.1 Provide step-by-step guide for Google Cloud OAuth credentials

## Phase 2: Environment Configuration
- [x] 2.1 Create .env file with template for Google OAuth credentials

## Phase 3: Install Dependencies
- [x] 3.1 Install @instantdb/admin for server-side user management

## Phase 4: InstantDB Setup
- [x] 4.1 Configure InstantDB with schema for user whitelist (app/lib/instantdb.ts)
- [x] 4.2 Create seed data script for initial users (app/api/seed-users/route.ts)

## Phase 5: NextAuth Configuration
- [x] 5.1 Create app/api/auth/[...nextauth]/route.ts
- [x] 5.2 Configure Google Provider with credentials
- [x] 5.3 Add callback for role from InstantDB
- [x] 5.4 Add authorization check against whitelist

## Phase 6: Update Login Form
- [x] 6.1 Modify app/ui/login-form.tsx to add Google login button

## Phase 7: Create Welcome Page
- [x] 7.1 Create app/welcome/page.tsx

## Phase 8: Update Navigation
- [x] 8.1 Modify app/ui/dashboard/sidenav.tsx for authenticated state
- [x] 8.2 Update Sign Out to use NextAuth signOut()

## Phase 9: Session Provider
- [x] 9.1 Create app/auth-provider.tsx
- [x] 9.2 Update app/layout.tsx to include auth provider

## Phase 10: Next Steps (User Action Required)
- [ ] 10.1 Copy .env.example to .env.local and fill in credentials
- [ ] 10.2 Set up Google Cloud OAuth credentials (see GOOGLE_OAUTH_SETUP.md)
- [ ] 10.3 Set up InstantDB and add users to whitelist
- [ ] 10.4 Run the app and test Google OAuth login
