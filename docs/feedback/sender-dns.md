# Feedback sign-in sender

Prepared for Resend team `michellescomputer`, sending domain `auth.michellescomputer.com`.
Authoritative nameservers: `ns09.domaincontrol.com`, `ns10.domaincontrol.com` (GoDaddy).
These are the exact records displayed by Resend for domain `c41355e9-873e-496d-abff-9d0392522972`.

| Type | Name in GoDaddy | Value | TTL |
| --- | --- | --- | --- |
| TXT | resend._domainkey.auth | p=MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDSNTkF9bKD00O0jkoDZ3VZ4+y2A7EVEIMNuMLoNxP1sshdJs3LIv6w7KptYbDqpiDkwYoVvMSBLvSiJbo9GOmiWq3r4igO+JU3cGb+dWiRw6pAVQKkGWjkLKMYOz/7Uo5FMSmxVq7OZoV5tGrG2Ubv4pDQzsTXD6uOWyTF2k/fyQIDAQAB | Default |
| CNAME | rsend.auth | rsend.forge.rmta.net | Default |
| CNAME | send.auth | send.forge.rmta.net | Default |

Proposed Supabase sender: `Michelle’s Computer <signin@auth.michellescomputer.com>`.
SMTP host: `smtp.resend.com`, port `465`, username `resend`.
Create one Sending Access key restricted to `auth.michellescomputer.com`; enter it directly in Supabase's SMTP password field. Never commit the key or print it in logs.

All three records were saved in GoDaddy with TTL 1800 and verified through public DNS on 2026-10-27. A real sign-in email from the sending domain subsequently reached Michelle’s inbox with SPF, DKIM, and DMARC all passing.

The account owner created the Resend key and saved it in Supabase SMTP. A fresh dashboard view confirmed custom SMTP is enabled, the sender is `Michelle’s Computer`, the host is `smtp.resend.com`, port `465`, and Supabase reports a stored password. The key was not read or copied during verification. Keep the credential out of chat, files, and logs.

On 2026-10-27, verified the local feedback sign-in flow against the real project: one confirmation email was sent to the connected `michelle@michellescomputer.com` inbox, its link returned to `http://127.0.0.1:3000/feedback/confirm`, the page showed Michelle signed in, the session survived a reload, and signing out removed it. The test created Michelle’s real builder account and no public posts or reviews. The local posting flag was temporarily enabled for this check, then restored to `false`.

The configured site URL is `https://michellescomputer.com`. Allowed callbacks are `/feedback/confirm` on the production site, `http://localhost:3000`, and `http://127.0.0.1:3000`.

Receiving is disabled. No paid plan or overages have been enabled. At the end of the local sign-in test, public posting was left closed. The moderator account and production launch are covered in [production setup](./production.md).
