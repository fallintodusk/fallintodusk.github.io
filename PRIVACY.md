# ALIS Privacy Policy

**Last updated:** 2026-08-25

ALIS is an open-source game project. It publishes its own announcements to a number of public
platforms, using each platform's official API where one exists and operator-controlled publishing
mechanisms where it does not. This policy covers every such integration ALIS operates, and the
fall.is website.

There is no ALIS account system: nobody signs up or logs in. The only person who authorises an
integration is the project's own operator, using the project's own accounts. If you contact ALIS,
we process the contact details and information you provide solely to answer you.

## What we process

ALIS integrations process only what is needed to publish the project's own content and to prove
it went live:

| Kind | Example |
|---|---|
| Operator authentication | the token or session that authorises ALIS to act as its own account, and the account identity a platform returns when granting it |
| ALIS account identifiers | the identifier of the ALIS page, profile or channel being posted to |
| ALIS-authored content | the text and images of ALIS's own announcements, written in the project's own repository |
| Public post references | the identifier and public URL a platform returns for a post ALIS created |
| Verification evidence | timestamps, verdicts and platform diagnostic codes recorded when checking that a post is publicly visible |

**ALIS does not intentionally collect data about visitors, followers, or any other person.** It
does not request or store their names, contact details, profile information, device identifiers,
IP addresses, location, comments, private messages, or follower lists. ALIS runs no advertising
and sets no analytics or advertising cookies of its own.

Some ALIS pages embed third-party content, such as images or files hosted on Google Drive. That
content is served by the provider directly to your browser and is subject to that provider's own
privacy practices, which ALIS does not control.

## Why we process it

One reason only: to publish ALIS's own announcements and confirm each one is genuinely public.
The verification records exist so a post cannot be published twice, and so a failed delivery can
be reconstructed afterwards instead of guessed at.

## Storage and retention

Credentials are held in the project's private credential store, on hardware the operator
controls.

Delivery and verification records — post identifiers, public URLs, timestamps, verdicts and
diagnostic codes — are kept in the project's own private storage for as long as they are useful
for preventing duplicate publication and diagnosing delivery problems.

## Sharing

ALIS does not sell or rent data. Publishing necessarily sends the content, the ALIS account
identifier and the authentication material for that account to the platform being published to —
that is what publishing is. Nothing is disclosed to any other third party, and content ALIS
publishes is, by design, public on the platform it was published to.

## Data deletion requests

ALIS does not intentionally hold personal data about anyone but its own operator. If you believe
an ALIS integration holds data relating to you, or you want ALIS-published content concerning you
removed, see **[Data deletion](/data-deletion/)** — or email **fallintodusk@proton.me** directly.
Requests are answered within 30 days.

## Platform integrations

### Meta — "ALIS Verifier" (App ID 1484545017027892)

This integration manages the ALIS Facebook Page. It may publish ALIS-authored posts to that Page
when the corresponding Meta permission is granted, and reads those same posts back to verify they
are publicly visible.

| Permission | Used for |
|---|---|
| `pages_show_list` | locating the ALIS Page the operator controls |
| `pages_read_engagement` | reading ALIS's own Page posts back, to confirm public delivery |
| `pages_manage_posts` | creating and managing ALIS-authored Page posts, when granted |

It acts on no Page other than ALIS's own, and reads no data about people who visit or follow it.
The operator can revoke its access at any time.

## Changes

Material changes appear on this page with a new "Last updated" date.

## Contact

**fallintodusk@proton.me**
