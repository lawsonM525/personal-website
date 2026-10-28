# Feedback exchange production setup

The exchange at `/feedback` uses Supabase project `mhjxejxkdxuwypddgcxl` for email sign-in, builder profiles, projects, reviews, replies, reports, and moderation. Learn article comments and likes still use the separate Sanity endpoints; this release does not migrate them.

## Configuration

Set `SUPABASE_URL`, `SUPABASE_PUBLISHABLE_KEY`, and `FEEDBACK_EXCHANGE_OPEN=true` in Vercel's Production environment and deploy the exchange code. The website uses the publishable key with each signed-in user's token; it does not need a service-role key or database password.

Supabase Auth's Site URL is `https://michellescomputer.com`; the production callback is `https://michellescomputer.com/feedback/confirm`. Resend sends sign-in links from `signin@auth.michellescomputer.com`. Links must open in the browser where sign-in began because the callback verifies PKCE.

`supabase/migrations/202610270001_feedback_exchange.sql` records the schema already applied to the project. Do not run this initial migration again against existing tables. Database tests in `supabase/tests/feedback-exchange.sql` run inside a transaction and roll back their temporary builders and content.

## Moderation

The confirmed `michelle@michellescomputer.com` account was added to `feedback_admins` and verified on 2026-10-28. This role gives access to the website's **Moderation** button after sign-in. Ordinary builders cannot call moderation functions or write directly to tables.

New app links wait for approval. Moderators can approve or decline them, handle reports, hide reported reviews and replies, and grant invited builders two starter credits. Invited builders must sign in before receiving starter credits. The first pilot builders need starter credits because the initial review queue is empty.

## Release checks

- Run feedback URL, review-validation, queue-priority, request-origin, and PKCE unit tests.
- Build a clean release snapshot and check the public page, connected anonymous board, rejected anonymous writes, same-origin protection, and missing-verifier callback handling.
- On the production domain, verify a fresh sign-in email, callback, session persistence, moderator panel, and sign-out.
- Keep test submissions out of the public queue. Use the rollback database test for review-credit and moderation mutations.

To pause the exchange, set `FEEDBACK_EXCHANGE_OPEN=false` and redeploy. The page then offers an example, and write actions remain closed.
