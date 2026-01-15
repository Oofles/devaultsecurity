---
title: "Zero Trust Strategy: Identity"
summary: "Understanding the first of CISA's five ZTA pillars: Identity"
date: "2022-05-02"
tags:
- Cybersecurity
- Security
draft: false
---

# Zero Trust Strategy: Part 2 - Identity

Part 1 of the Zero Trust Strategy Blog Series can be found here: [Zero Trust Strategy: What is Zero Trust Architecture?](https://www.devaultsecurity.com/blog/2022/04/05/zero-trust-strategy-what-is-zero-trust-architecture/). This blog series will work to break down the important details from the [Federal zero trust architecture (ZTA) strategy memorandum](https://www.whitehouse.gov/wp-content/uploads/2022/01/M-22-09.pdf)  and hopefully provide some useful resources to assist with the necessary implementation of ZTA. 

In Part 2, we'll focus on the first of CISA's five pillars: Identity. Identity is all about being able to manage users and validate whether they have authenticated and authorized access to the necessary applications or resources. You may even already have some of these controls implemented. The main distinction for Zero Trust Architecture involves expanding your identity control and being able to restrict access at a application layer vs. control at the network layer. For example, it is not sufficient to have a user login once and then be given full access to all applications and files within an environment. 

As you read through the memorandum, you will encounter phrasing such as: 

> every request for access should be evaluated to determine whether it is appropriate 

This can seem like a daunting control to manage. However, when implemented correctly, ZTA should require less management, give you more insight, and improve your overall security posture. It is extremely critical to spend the required time engineering your solutions and embrace things like automation.

Implementing Identity controls involves three main components: 
- Enterprise-wide Identity Systems
- Multi-factor Authentication 
- User Authorization 

We'll explore each of these components in detail down below. Actions required per the memorandum can be seen here:

>Actions:
>1. Agencies must employ centralized identity management systems for agency users that can be integrated into applications and common platforms.
>2. Agencies must use strong MFA throughout their enterprise.
>	- MFA must be enforced at the application layer, instead of the network layer.
>	- For agency staff, contractors, and partners, phishing-resistant MFA is required.
>	- For public users, phishing-resistant MFA must be an option.
>	- Password policies must not require use of special characters or regular rotation.
>3. When authorizing users to access resources, agencies must consider at least one device level signal alongside identity information about the authenticated user. 

## Enterprise-wide Identity System
An Enterprise-wide Identity System has two fundamental requirements:

> (1) a holistic view of users, with a strong understanding of their responsibilities and authorities, and 
> (2) an ability to verify the identities of users when they attempt to access systems.

The good news is that this can be easily accomplished in most existing environments, especially if you have a Microsoft Windows Domain. We'll take a look at some examples in just a second, but first let make sure we understand the specifications. Simply having a Windows Domain doesn't check the box - you actually have to turn on the required security controls.

Let's look an example. Alice, a domain administrator, logs in at 7pm Eastern Standard Time to make some user modifications. Consider these questions:
- Does Alice normally work nights? 
- Is Alice based in California, making it 4pm local time for her? 
- Does Alice's role involve her making user modifications?

The ZTA concepts go beyond simply assigning roles. You need the context to understand the different types of access, verify the identity when necessary, and retain the ability to restrict access if certain criteria is not met.

An example I love to talk about involves badging systems. Most government spaces require a physical badge to access various buildings or offices. This badge system maintains a log of user activity including timestamps, though rarely is this information used by security teams to check for anomalies in user behavior. Through simple automation and connecting the required systems, a check can be performed to validate a user's physical location and correspond it with their standard behavior on the network. 

There are two other considerations when looking at an Identity System: Single Sign-on (SSO) and the integration of non-graphical user interfaces. Let's reference the memo:

> As a general matter, users should be able to sign in once and then directly access other applications and platforms within their agency’s IT infrastructure.

> ... an agency’s enterprise identity systems should also be capable of supporting human authentication through non-graphical user interfaces, such as scripts and command line tools

There are many SSO solutions out there. What works for your organization will be highly dependent on what types of systems you have in place, and what type of architecture you have (on premises, virtual, cloud, etc.). For instance, Microsoft maintains their own SSO solutions, but Okta is a vendor that provides a solution for many organizations having a distributed non-Windows domain environment.

And you can't forget about non-graphical system, scripts, and command-line tools! A common example of this can be seen where there are proper controls setup in a Windows domain, but within that network is a Linux server hosting some application. Attackers can use this to pivot and bypass existing controls due to it having more relaxed restrictions. Implementing a solution for this may require a deeper technical engineering plan, but is nonetheless important.

### Resources - Enterprise-wide Identity System
**Pluralsight Courses:**
- [Access Control and Identity Management](https://www.pluralsight.com/courses/access-control-identity-management)
- [Microsoft Identity and Access: Implementing an Identity and Management Solution](https://www.pluralsight.com/courses/microsoft-identity-access-implementing-management-solution-cert)
- [Authentication and Authorization with AWS Identity and Access Management](https://www.pluralsight.com/courses/authentication-authorization-aws-identity-access-management)
- [Design Governance and Identity Management in Microsoft Azure](https://www.pluralsight.com/courses/microsoft-azure-identity-management-design)

**External Resources:**
- [Microsoft - Memo 22-09 - Enterprise-wide Identity Management System](https://docs.microsoft.com/en-us/azure/active-directory/standards/memo-22-09-enterprise-wide-identity-management-system)
- [Microsoft - Securing Identity with Zero Trust](https://docs.microsoft.com/en-us/security/zero-trust/deploy/identity)

## Multi-factor Authentication
Multi-factor Authentication (MFA) is something that's been a hot topic for a while now, and most organizations have already implemented some solution for this. As members of the DoD you are issued a card token for login in addition to inputting a password. This is the simple part. You also need to consider any networks or applications that don't have this same level of authentication. Do your administrator accounts have physical tokens as well? What about server logins? 

Within the realm of MFA, the memorandum addresses the following topics:
- External user access
- Application layer authentication
- Phishing-resistant MFA
- Password complexity requirements

### MFA - External User Access
With regards to external staff access, the Memo states:

> Agencies must integrate and enforce MFA across applications involving authenticated access to Federal systems by agency staff, contractors, and partners.

It is imperative that shortcuts not be taken when temporary accounts are assigned out to contractors and/or partners with a limited use case. Often times, major breaches and exploits are the direct result of gaining access through these third-parties. This is an easy way for an adversary to completely bypass all the work you've done to implement these secure controls.

### MFA - Application Layer Authentication
Authentication at the application layer is a prime example of shifting from a traditional security mindset to one of Zero Trust. As stated in the Memo:

> MFA should be integrated at the application layer, such as through an enterprise identity service as described above, rather than through network authentication

This is not something that will happen overnight, nor will it be possible in every instance. Consider these two approaches:

Scenario: Bob is a Logistics officer in charge of calculating time estimates and resource costs for supply missions. 

Traditional approach:
- Bob logs into the network with a username, password, and access token. He then opens the application on his desktop and inputs the required parameters for an upcoming mission. The resulting information gets uploaded to a share drive for access to relevant parties. 

 Zero Trust approach:
 - Bob logs into the network with a username, password, and access token. He opens the application on his desktop which actively performs authentication against his credentials to determine if he has the required access. Once authenticated, Bob inputs the required parameters for an upcoming mission. The resulting information gets uploaded to a database or shared location where only authorized users can see the finalized reports.

To a typical user, the difference should be nearly invisible. If a network login is incapable of MFA, the additional authentication requirements should be passed onto the applications in all instances. In the traditional example, all users within the network are authenticated, but everyone has access to every bit of data. So if one account becomes compromised, an attacker has gained full access to the environment. The goal should be securing each application so that even if an adversary were to gain the initial access, the additional application controls would prevent compromise to any critical data sets.

### MFA - Phishing-Resistant MFA
The next consideration refers to employing a phishing-resistant MFA. The Memo is very clear with its definition:

> In this document, “phishing-resistant" authentication refers to authentication processes designed to detect and prevent disclosure of authentication secrets and outputs to a website or application masquerading as a legitimate system.

Another scenario might be helpful to explain this one. Many applications you encounter online support MFA, though these are not always created equally. A very common approach is to email a one-time code once you have input a username and password. This approach has multiple opportunities for someone to steal this code and also presents an opportunity for additional phishing attacks. A better method involves the use of something like a Common Access Card (CAC). Without physical access to the card and the memorized password, an attacker is out of luck. 

The use of a CAC is one example, but this isn't technologically feasible in every environment. The memorandum actively encourages other approaches as long as they are meeting the core requirement of being phishing-resistant:

> Fortunately, there are phishing-resistant approaches to MFA that can defend against these attacks. The Federal Government’s Personal Identity Verification (PIV) standard is one such approach. The World Wide Web Consortium (W3C)’s open “Web Authentication” standard, another effective approach, is supported today by nearly every major consumer device and an increasing number of popular cloud services.

### MFA - Password Complexity
The initial standards for password complexity were originally created with good intentions, but debatably has limited the security landscape for most organizations. What would you consider to be the most important metric for having a good password? If your answer involves complexity through the use of special characters, numbers, and capitalization, you would actually be wrong. All of those can be important metrics, however password length is the most important and outweighs every instance when brute forcing authentication is concerned. If you are interested in the analysis, check out this reference and try some examples for comparison: [Security.org - How Secure is my password](https://www.security.org/how-secure-is-my-password/)

In fact, the original author that effectively created the original complexity requirements eventually went on to apologize upon realizing the ultimate mistake. And this was five years ago! This is a really good read if you haven't seen this yet: [WSJ - The Man Who Wrote Those Password Rules Has a New Tip: N3v$r M1^d!](https://www.wsj.com/articles/the-man-who-wrote-those-password-rules-has-a-new-tip-n3v-r-m1-d-1502124118)

Though the new password guidance has been highly recommended by NIST and other governance bodies, the Memo goes on to require the shift within a year's time (by January 2023):

> Consistent with the practices outlined in SP 800-63B, agencies must remove password policies that require special characters and regular password rotation from all systems within one year of the issuance of this memorandum.

### Resources - MFA
**Pluralsight Courses:**
- [Implementing and Managing Microsoft Azure Mutli-factor Authentication](https://www.pluralsight.com/courses/microsoft-azure-multi-factor-authentication-implementing-managing)
- [Secure User Account and Authentication Practices in ASP.NET and ASP.NET Core](https://www.pluralsight.com/courses/secure-account-authentication-practices-asp-dot-net-core)
- [Lab - Configure MFA on AWS with the CLI](https://app.pluralsight.com/labs/detail/c307779a-1fda-42d0-8a78-680ea27e0127/toc)
- [Lab - Configure MFA in AWS IAM](https://app.pluralsight.com/labs/detail/dd691acb-3522-4818-a477-11afb01bcec2/toc)

**External Resources:**
- [NIST - SP 800-63B - Authentication and Lifecycle Management](https://nvlpubs.nist.gov/nistpubs/SpecialPublications/NIST.SP.800-63b.pdf)
- [Microsoft - Memo 22-09 - Multi-factor Authentication](https://docs.microsoft.com/en-us/azure/active-directory/standards/memo-22-09-multi-factor-authentication)

## User Authorization
As we shift into the final topic within the Identity pillar, we can look back to the Memo for a clear definition:

> Authorization, a critical aspect of zero trust architecture, is the process of granting an authenticated entity access to resources. Authentication helps ensure that the user accessing a system is who they claim to be; authorization determines what that user has permission to do.

Authorization can be confusing when we just discussed authentication. Let's make sure we understand the difference:
- **Authentication:** This confirms Alice is who she claims she is. 
- **Authorization:** This gives Alice permission to access a specific resource or function.

The most common form of this can be seen with a Microsoft implementation of Role-Based Access Control (RBAC). You will setup groups, and assign users into each of those groups, giving them access to a certain set of "stuff." Zero Trust takes this one step further and encourages things like Attribute-Based Access Control (ABAC) as seen in the memo:

> Currently, many authorization models in the Federal Government focus on role-based access control (RBAC), which relies on static pre-defined roles that are assigned to users and determine their permissions within an organization. A zero trust architecture should incorporate more granularly and dynamically defined permissions, as attribute-based access control (ABAC) is designed to do.

So what's the real difference here? RBAC's main limitation is that it relies upon predefined roles. These roles can be cumbersome to modify and they generally will give (or restrict) full access to an application or service. However, there's plenty of circumstances where a user should only have access to a subset of an application or should only be accessing it under certain conditions. This can be solved with an implementation of ABAC and can most easily be described by looking at two core components: Attributes and Polices.
- **ABAC Attributes:** Allows you to define characteristics such as: 
	- Subjects (clearance, department, role, title)
	- Actions (read, delete, view, approve)
	- Objects (custom descriptors like "medical record" or "bank account")
	- Contextual (environment variables like time or location)
- **ABAC Policies:** Statements that expressing what is or isn't allowed by looking at multiple attributes

The key here is the ability to have multiple ABAC policies catering to difference scenarios and technologies. This allows you to be much more dynamic in ensuring a more precise secure environment.

There's one more important consideration with authorization. When building these controls, you can be more dynamic than simply allowing or denying access. Take a look at this line from the memo:

> If undue risk is identified, mitigations could include requiring reauthentication, limiting access until confirmation that the user requested action is appropriate, or denying access entirely.

Let's consider a really easy example of this we see every day. You are browsing the Internet and attempt to log into a website. Unfortunately you can't remember one of the many passwords you use and/or type in it wrong. On the second attempt, you are presented with a captcha, confirming that you are a human. In this case, a circumstance prompted additional authentication controls to be sent. This type of dynamic action can be critical in preventing malicious activity. 

### Resources - User Authorization
**Pluralsight Courses:**
- [Access Controls for SSCP](https://www.pluralsight.com/courses/access-controls-sscp-cert)
- [Secure Coding: Preventing Broken Access Control](https://www.pluralsight.com/courses/secure-coding-preventing-broken-access-control)

**External Resources:**
- [Microsoft - Memo 22-09 - Authorization](https://docs.microsoft.com/en-us/azure/active-directory/standards/memo-22-09-authorization)
- [Okta - What is Attribute-Based Access Control (ABAC)?](https://www.okta.com/blog/2020/09/attribute-based-access-control-abac/)

## Parting Thoughts and Resources
Getting to the level of complete identity implementation is difficult and in some cases may even be impossible! However, each additional level of insight and control into identity management will bring you closer to ensuring the mission remains secure. Adversaries will attempt the easy techniques first. Your controls may be enough to delay or even dissuade an adversary from your environment. Partial implementation of controls may also give your security team the required time to identify and stop the behavior before an adversary is able to accomplish their objectives.

Though there are plenty of Pluralsight courses linked throughout this blog, I hope the content and external resources provide enough assistance to help you get started or at least have a better understanding of the concepts! 

**Pluralsight Courses:**
- [Zero Trust Architecture (ZTA) Path](https://www.pluralsight.com/paths/zero-trust-architecture-zta)

**External Resources:**
- [NIST - Implementing a Zero Trust Architecture](https://www.nccoe.nist.gov/projects/implementing-zero-trust-architecture)
- [CISA - Zero Trust Maturity Model (PDF)](https://www.cisa.gov/sites/default/files/publications/CISA%20Zero%20Trust%20Maturity%20Model_Draft.pdf)
- [GSA's Zero Trust Architecture Buyer's Guide (PDF)](https://www.gsa.gov/cdnstatic/Zero%20Trust%20Architecture%20Buyers%20Guide%20v11%2020210610%20(2).pdf)