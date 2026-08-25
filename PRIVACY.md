# ALIS Privacy Policy

**Last updated:** 2026-08-25

ALIS is an open-source game project. It publishes its own announcements to a number of public
platforms, using platform-supported APIs where configured and operator-controlled publishing
mechanisms otherwise. This policy covers every such integration ALIS operates, and the
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

**ALIS does not intentionally collect data about visitors, followers, or any other person.** ALIS
code does not request, build or retain their names, contact details, profile information, device
identifiers, IP addresses, location, tracking profiles, comments, private messages, or follower
lists. ALIS runs no advertising and sets no analytics or advertising cookies of its own.

ALIS does not run its own servers for the website. Hosting, network, email, embedded-content and
platform providers necessarily receive the technical request data needed to do their job — an IP
address and browser user-agent when your browser asks for a page or an embedded file, for example
— under their own privacy terms, which ALIS does not control. Some ALIS pages embed third-party
content such as files hosted on Google Drive, served by that provider directly to your browser.

## Why we process it

ALIS processes information only to:

- operate and verify its own public publishing integrations;
- operate fall.is and answer messages people choose to send us.

The verification records exist so a post cannot be published twice, and so a failed delivery can
be reconstructed afterwards instead of guessed at.

## Storage and retention

Credentials are held in the project's private credential store, on hardware the operator
controls. A credential is only ever presented to the platform that issued it, to prove a post
comes from ALIS's own account. It is never sent to anyone else and never appears in published
content.

Delivery and verification records — post identifiers, public URLs, timestamps, verdicts and
diagnostic codes — are kept in the project's own private storage for as long as they are useful
for preventing duplicate publication and diagnosing delivery problems.

## Sharing

ALIS does not sell or rent data, and discloses nothing for advertising.

Publishing sends ALIS's own content and its own account identifier to the platform being
published to — that is what publishing is — and that content is, by design, public there
afterwards. Beyond that, service providers receive only the limited data required to host the
site, deliver embedded content, carry email, or operate a platform integration.

## Data deletion requests

ALIS does not intentionally hold personal data about anyone but its own operator. If you believe
an ALIS integration holds data relating to you, or you want ALIS-published content concerning you
removed, see **[Data deletion](/data-deletion/)** — or email **fallintodusk@proton.me** directly.
Requests are answered within 30 days.

## Platform integrations

### Meta — "ALIS Verifier" (App ID 1484545017027892)

This integration manages the ALIS Facebook Page. It may publish ALIS-authored posts to that Page
when the corresponding Meta permission is granted, and reads ALIS Page posts back to verify they
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
