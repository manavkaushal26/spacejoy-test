import Layout from '@components/Shared/Layout';
import SectionTitle from '@components/Shared/SectionTitle';
import Head from 'next/head';
import Link from 'next/link';
import React from 'react';

type Props = {};

const JoyversePrivacyPolicy = (props: Props) => {
  return (
    <Layout>
      <Head>
        <title key="title">Privacy Policy</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* <Layout.Banner />
      <Layout.Header /> */}
      <Layout.Body>
        <div className="container px-4 mx-auto my-16 antialiased text-black break-words mb-28 joyverse-privacy-policy">
          <SectionTitle title="Privacy Policy" feature={`Last updated: Tuesday, December 5, 2023`} />
          <p>
            This privacy notice for Neo Design Labs Inc. (&quot;Company,&quot; &quot;we,&quot; &quot;us,&quot; or
            &quot;our&quot;), describes how and why we might collect, store, use, and/or share (&quot;process&quot;)
            your information when you download and use our Joyverse virtual reality-based application (the
            &quot;App&quot; and, with the Website, the &quot;Services&quot;).
          </p>
          <p>
            Questions or concerns? Reading this privacy notice will help you understand your privacy rights and choices.
            If you do not agree with our policies and practices, please do not use our Services. If you still have any
            questions or concerns, please contact us at{' '}
            <a href="mailto:hello@joyverse.club" className="link">
              hello@joyverse.club
            </a>
            .
          </p>
          <h1>SUMMARY OF KEY POINTS</h1>
          <p>
            <em>
              This summary provides key points from our privacy notice, but you can find out more details about any of
              these topics by clicking the link following each key point or by using our table of contents below to find
              the section you are looking for. You can also click
              <a href="#table-of-contents" className="link">
                here
              </a>{' '}
              to go directly to our table of contents.
            </em>
          </p>
          <p>
            What personal information do we process? When you visit, use, or navigate our Services, we may process
            personal information depending on how you interact with Neo Design Labs inc. and the Services, the choices
            you make, and the products and features you use. Click
            <a href="#what-information-do-we-collect" className="link">
              here
            </a>{' '}
            to learn more.
          </p>
          <p>Do we receive any information from third parties? We do not receive any information from third parties.</p>
          <p>
            How do we process your information? We process your information to provide, improve, and administer our
            Services, communicate with you, for security and fraud prevention, and to comply with law. We may also
            process your information for other purposes with your consent. We process your information only when we have
            a valid legal reason to do so. Click
            <a href="#how-do-we-process-your-information" className="link">
              here
            </a>{' '}
            to learn more.
          </p>
          <p>
            In what situations and with which parties do we share personal information? We may share information in
            specific situations and with specific third parties. Click{' '}
            <a href="#when-and-with-whom-do-we-share-personal-information" className="link">
              here
            </a>{' '}
            to learn more.
          </p>
          <p>
            How do we keep your information safe? We have organizational and technical processes and procedures in place
            to protect your personal information. However, no electronic transmission over the internet or information
            storage technology can be guaranteed to be 100% secure, so we cannot promise or guarantee that hackers,
            cybercriminals, or other unauthorized third parties will not be able to defeat our security and
            improperly collect, access, steal, or modify your information. Click{' '}
            <a href="#how-do-we-keep-your-information-safe" className="link">
              here
            </a>{' '}
            to learn more.
          </p>
          <p>
            What are your rights? Depending on where you are located geographically, the applicable privacy law may mean
            you have certain rights regarding your personal information. Click{' '}
            <a href="#what-are-your-privacy-rights" className="link">
              here
            </a>{' '}
            to learn more.
          </p>
          <p>
            How do you exercise your rights? The easiest way to exercise your rights is by submitting request to{' '}
            <a href="mailto:hello@joyverse.club" className="link">
              hello@joyverse.club
            </a>
            . We will consider and act upon any request in accordance with applicable data protection laws.
          </p>
          <h3>
            <span id="table-of-contents">TABLE OF CONTENTS</span>
          </h3>
          <p>
            1.{' '}
            <a href="#what-information-do-we-collect" className="link-no-underline">
              WHAT INFORMATION DO WE COLLECT?
            </a>
          </p>
          <p>
            <a href="#how-do-we-process-your-information" className="link-no-underline">
              2. HOW DO WE PROCESS YOUR INFORMATION?
            </a>
          </p>
          <p>
            <a href="#what-legal-bases-do-we-relay" className="link-no-underline">
              3. WHAT LEGAL BASES DO WE RELY ON TO PROCESS YOUR PERSONAL INFORMATION?
            </a>
          </p>
          <p>
            <a href="#when-and-with-whom-do-we-share-personal-information" className="link-no-underline">
              4. WHEN AND WITH WHOM DO WE SHARE YOUR PERSONAL INFORMATION?
            </a>
          </p>
          <p>
            <a href="#how-do-we-handle-your-social-login" className="link-no-underline">
              5. HOW DO WE HANDLE YOUR SOCIAL LOGINS?
            </a>
          </p>
          <p>
            <a href="#is-your-information-transferred-internally" className="link-no-underline">
              6. IS YOUR INFORMATION TRANSFERRED INTERNATIONALLY?
            </a>
          </p>
          <p>
            <a href="#how-long-do-we-keep-your-information" className="link-no-underline">
              7. HOW LONG DO WE KEEP YOUR INFORMATION?
            </a>
          </p>
          <p>
            <a href="#how-do-we-keep-your-information-safe" className="link-no-underline">
              8. HOW DO WE KEEP YOUR INFORMATION SAFE?
            </a>
          </p>
          <p>
            <a href="#what-are-your-privacy-rights" className="link-no-underline">
              9. WHAT ARE YOUR PRIVACY RIGHTS?
            </a>
          </p>
          <p>
            <a href="#controls-for-do-not-track-features" className="link-no-underline">
              10. CONTROLS FOR DO-NOT-TRACK FEATURES
            </a>
          </p>
          <p>
            <a href="#do-california-residents-have-specific-privacy-rights" className="link-no-underline">
              11. DO CALIFORNIA RESIDENTS HAVE SPECIFIC PRIVACY RIGHTS?
            </a>
          </p>
          <p>
            <a href="#do-we-make-udpates-to-this-notice" className="link-no-underline">
              12. DO WE MAKE UPDATES TO THIS NOTICE?
            </a>
          </p>
          <p>
            <a href="#how-can-you-contact-us" className="link-no-underline">
              13. HOW CAN YOU CONTACT US ABOUT THIS NOTICE?
            </a>
          </p>
          <p>
            <a href="#how-can-you-review-update-delete-data-collected" className="link-no-underline">
              14. HOW CAN YOU REVIEW, UPDATE, OR DELETE THE DATA WE COLLECT FROM YOU?
            </a>
          </p>
          <h3 id="what-information-do-we-collect">1. WHAT INFORMATION DO WE COLLECT?</h3>
          <p>Personal information you disclose to us</p>
          <p>
            <em>In Short: We collect personal information that you provide to us.</em>
          </p>
          <p>
            We collect personal information that you voluntarily provide to us when you express an interest in obtaining
            information about us or our products and Services, when you participate in activities on the Services, or
            otherwise when you contact us.
          </p>
          <p>
            We collect the following data about you: Identification data (user ids, name and profile pic); Technical
            data and App data (refer below for more details).
          </p>
          <p>
            Social Media Login Data. We may provide you with the option to Login with us using your facebook account. If
            you login this way, we will collect the information described in the section called &quot;
            <a href="#how-do-we-handle-your-social-login" className="link">
              HOW DO WE HANDLE YOUR SOCIAL LOGINS?
            </a>
            &quot; below.
          </p>
          <p>
            Application Data. If you use our application(s), we also may collect the following information if you choose
            to provide us with access or permission:
          </p>
          <ul>
            <li>
              <em>Device Access.</em> We may request access or permission to certain features from your device,
              including your device&apos;s microphone, and other features. If you wish to change our access or
              permissions, you may do so in your device&apos;s settings.
            </li>
          </ul>
          <p>
            This information is primarily needed to maintain the security and operation of our application(s), for
            troubleshooting, and for our internal analytics and reporting purposes.
          </p>
          <p>
            All personal information that you provide to us must be true, complete, and accurate, and you must notify us
            of any changes to such personal information.
          </p>
          <p>Information automatically collected</p>
          <p>
            <em>
              In Short: Some information — such as your Internet Protocol (IP) address and/or browser and device
              characteristics — is collected automatically when you visit our Services.
            </em>
          </p>
          <p>
            We automatically collect certain information when you visit, use, or navigate the Services. This information
            does not reveal your specific identity (like your name or contact information) but may include device and
            usage information, such as your IP address, browser and device characteristics, operating system, language
            preferences, referring URLs, device name, country, location, information about how and when you use our
            Services, and other technical information. This information is primarily needed to maintain the security and
            operation of our Services, and for our internal analytics and reporting purposes.
          </p>
          <p>The information we collect includes:</p>
          <ul>
            <li>
              <p>
                <em>Technical Data and App Data.</em> When you play or use our App and its Services, we collect
                necessary data like headset and controller position so that the App &amp; its services are functional,
                including leaderboards.
              </p>
            </li>
            <li>
              <p>
                <em>Log and Usage Data.</em> Log and usage data is service-related, diagnostic, usage, and performance
                information our servers automatically collect when you access or use our Services and which we record in
                log files. Depending on how you interact with us, this log data may include your IP address, device
                information, browser type, and settings and information about your activity in the Services (such as the
                date/time stamps associated with your usage, pages and files viewed, searches, and other actions you
                take such as which features you use), device event information (such as system activity, error reports
                (sometimes called &quot;crash dumps&quot;), and hardware settings).
              </p>
            </li>
            <li>
              <p>
                <em>Device Data.</em> We automatically collect device information (such as your device ID, model, and
                manufacturer), operating system, version information and system configuration information, device and
                application identification numbers, browser type and version, hardware model Internet service provider
                and/or carrier, and Internet Protocol (IP) address (or proxy server). If you are using our
                application(s), we may also collect information about the phone network associated with your device,
                your device’s operating system or platform, the type of device you use, your device’s unique device ID,
                and information about the features of our application(s) you accessed.
              </p>
            </li>
          </ul>
          <h3 id="how-do-we-process-your-information">2. HOW DO WE PROCESS YOUR INFORMATION?</h3>
          <p>
            <em>
              In Short: We process your information to provide, improve, and administer our Services, communicate with
              you, for security and fraud prevention, and to comply with law. We may also process your information for
              other purposes with your consent.
            </em>
          </p>
          <p>
            We process your personal information for a variety of reasons, depending on how you interact with our
            Services, including:
          </p>
          <ul>
            <li>
              To request feedback. We may process your information when necessary to request feedback and to contact you
              about your use of our Services.
            </li>
            <li>
              To protect our Services. We may process your information as part of our efforts to keep our Services safe
              and secure, including fraud monitoring and prevention.
            </li>
            <li>
              To identify usage trends. We may process information about how you use our Services to better understand
              how they are being used so we can improve them.
            </li>
            <li>
              To save or protect an individual&apos;s vital interest. We may process your information when necessary to
              save or protect an individual’s vital interest, such as to prevent harm.
            </li>
          </ul>
          <h3 id="what-legal-bases-do-we-relay">3. WHAT LEGAL BASES DO WE RELY ON TO PROCESS YOUR INFORMATION?</h3>
          <p>
            <em>
              In Short: We only process your personal information when we believe it is necessary and we have a valid
              legal reason (i.e., legal basis) to do so under applicable law, like with your consent, to comply with
              laws, to provide you with services to enter into or fulfill our contractual obligations, to protect your
              rights, or to fulfill our legitimate business interests.
            </em>
          </p>
          <p>
            <em>
              <span style={{ textDecoration: 'underline' }}>
                If you are located in the EU or UK, this section applies to you.
              </span>
            </em>
          </p>
          <p>
            The General Data Protection Regulation (GDPR) and UK GDPR require us to explain the valid legal bases we
            rely on in order to process your personal information. As such, we may rely on the following legal bases to
            process your personal information:
          </p>
          <ul>
            <li>
              Consent. We may process your information if you have given us permission (i.e., consent) to use your
              personal information for a specific purpose. You can withdraw your consent at any time.{' '}
            </li>
            <li>
              Legitimate Interests. We may process your information when we believe it is reasonably necessary to
              achieve our legitimate business interests and those interests do not outweigh your interests and
              fundamental rights and freedoms. For example, we may process your personal information for some of the
              purposes described in order to:
            </li>
            <li>Analyze how our services are used so we can improve them to engage and retain users</li>
            <li>Diagnose problems and/or prevent fraudulent activities</li>
            <li>Understand how our users use our products and services so we can improve user experience</li>
            <li>
              Legal Obligations. We may process your information where we believe it is necessary for compliance with
              our legal obligations, such as to cooperate with a law enforcement body or regulatory agency, exercise or
              defend our legal rights, or disclose your information as evidence in litigation in which we are involved.
            </li>
            <li>
              Vital Interests. We may process your information where we believe it is necessary to protect your vital
              interests or the vital interests of a third party, such as situations involving potential threats to the
              safety of any person.
            </li>
          </ul>
          <p>
            <em>
              <span style={{ textDecoration: 'underline' }}>
                If you are located in Canada, this section applies to you.
              </span>
            </em>
          </p>
          <p>
            We may process your information if you have given us specific permission (i.e., express consent) to use your
            personal information for a specific purpose, or in situations where your permission can be inferred (i.e.,
            implied consent). You can withdraw your consent at any time.
          </p>
          <p>
            In some exceptional cases, we may be legally permitted under applicable law to process your information
            without your consent, including, for example:
          </p>
          <ul>
            <li>
              If collection is clearly in the interests of an individual and consent cannot be obtained in a timely way
            </li>
            <li>For investigations and fraud detection and prevention</li>
            <li>For business transactions provided certain conditions are met</li>
            <li>
              If it is contained in a witness statement and the collection is necessary to assess, process, or settle an
              insurance claim
            </li>
            <li>For identifying injured, ill, or deceased persons and communicating with next of kin</li>
            <li>
              If we have reasonable grounds to believe an individual has been, is, or may be victim of financial abuse
            </li>
            <li>
              If it is reasonable to expect collection and use with consent would compromise the availability or the
              accuracy of the information and the collection is reasonable for purposes related to investigating a
              breach of an agreement or a contravention of the laws of Canada or a province
            </li>
            <li>
              If disclosure is required to comply with a subpoena, warrant, court order, or rules of the court relating
              to the production of records
            </li>
            <li>
              If it was produced by an individual in the course of their employment, business, or profession and the
              collection is consistent with the purposes for which the information was produced
            </li>
            <li>If the collection is solely for journalistic, artistic, or literary purposes</li>
            <li>If the information is publicly available and is specified by the regulations</li>
          </ul>
          <h3 id="when-and-with-whom-do-we-share-personal-information">
            4. WHEN AND WITH WHOM DO WE SHARE YOUR PERSONAL INFORMATION?
          </h3>
          <p>
            <em>
              In Short: We may share information in specific situations described in this section and/or with the
              following third parties.
            </em>
          </p>
          <p>We may need to share your personal information in the following situations:</p>
          <ul>
            <li>
              Business Transfers. We may share or transfer your information in connection with, or during negotiations
              of, any merger, sale of company assets, financing, or acquisition of all or a portion of our business to
              another company.
            </li>
            <li>
              Affiliates. We may share your information with our affiliates, in which case we will require those
              affiliates to honor this privacy notice. Affiliates include our parent company and any subsidiaries, joint
              venture partners, or other companies that we control or that are under common control with us.
            </li>
            <li>
              Business Partners. We may share your information with our business partners to offer you certain products,
              services, or promotions.
            </li>
            <li>
              On Public Forum. We may share your information such as play history, scores, username on our leaderboards
              sites or other similar public forums in order to help you engage with other players.
            </li>
            <li>
              With Other Players. In order to support the multiplayer activities within our Games, such as adding
              friends, inviting people to play, or accepting challenge invites, we may share your information with other
              players including your username (encrypted form unless in the App), play history, and scores.
            </li>
            <li>
              Service Providers. Your personal data are also processed by Service Providers, which ensures the creation
              and management of statistics, error reports concerning the App and its services as well as to offer in-App
              services.
            </li>
            <li>
              As Required by Law. We may disclose your information if we believe that the disclosure is required by law,
              if we believe that the disclosure is necessary to enforce our agreements or policies, in response to valid
              requests by public authorities (e.g., a court or a government agency), or if we believe that the
              disclosure will help us protect the rights, property, or safety of FFL or our customers.
            </li>
            <li>
              With Your Consent. We may disclose your personal information for any purpose only with your consent.
            </li>
          </ul>
          <h3 id="how-do-we-handle-your-social-login">5. HOW DO WE HANDLE YOUR SOCIAL LOGINS?</h3>
          <p>
            <em>
              In Short: If you choose to register or log in to our services using a social media account, we may have
              access to certain information about you.
            </em>
          </p>
          <p>
            Our Services offer you the ability to log in using your facebook account. When you choose to do this, we
            will receive certain profile information about you from the social media provider and includes your name,
            user id, profile picture, avatar.
          </p>
          <p>
            We will use the information we receive only for the purposes that are described in this privacy notice or
            that are otherwise made clear to you on the relevant Services. Please note that we do not control, and are
            not responsible for, other uses of your personal information by your third-party social media provider. We
            recommend that you review their privacy notice to understand how they collect, use, and share your personal
            information, and how you can set your privacy preferences on their sites and apps.
          </p>
          <h3 id="is-your-information-transferred-internally">6. IS YOUR INFORMATION TRANSFERRED INTERNATIONALLY?</h3>
          <p>
            <em>In Short: We may transfer, store, and process your information in countries other than your own.</em>
          </p>
          <p>
            We are headquartered in the United States and may use service providers that operate in other countries.
            Your personal information may be transferred to the United States or other locations where privacy laws may
            not be as protective as those in your state, province, or country.
          </p>
          <h3 id="how-long-do-we-keep-your-information">7. HOW LONG DO WE KEEP YOUR INFORMATION?</h3>
          <p>
            <em>
              In Short: We keep your information for as long as necessary to fulfill the purposes outlined in this
              privacy notice unless otherwise required by law.
            </em>
          </p>
          <p>
            We will only keep your personal information for as long as it is necessary for the purposes set out in this
            privacy notice, unless a longer retention period is required or permitted by law (such as tax, accounting,
            or other legal requirements).
          </p>
          <p>
            When we have no ongoing legitimate business need to process your personal information, we will either delete
            or anonymize such information, or, if this is not possible (for example, because your personal information
            has been stored in backup archives), then we will securely store your personal information and isolate it
            from any further processing until deletion is possible.
          </p>
          <h3 id="how-do-we-keep-your-information-safe">8. HOW DO WE KEEP YOUR INFORMATION SAFE?</h3>
          <p>
            <em>
              In Short: We aim to protect your personal information through a system of organizational and technical
              security measures.
            </em>
          </p>
          <p>
            We have implemented appropriate and reasonable technical and organizational security measures designed to
            protect the security of any personal information we process. However, despite our safeguards and efforts to
            secure your information, no electronic transmission over the Internet or information storage technology can
            be guaranteed to be 100% secure, so we cannot promise or guarantee that hackers, cybercriminals, or other
            unauthorized third parties will not be able to defeat our security and improperly collect, access, steal, or
            modify your information. Although we will do our best to protect your personal information, transmission of
            personal information to and from our Services is at your own risk. You should only access the Services
            within a secure environment.
          </p>
          <h3 id="what-are-your-privacy-rights">9. WHAT ARE YOUR PRIVACY RIGHTS?</h3>
          <p>
            <em>
              In Short: In some regions, such as the European Economic Area (EEA), United Kingdom (UK), and Canada, you
              have rights that allow you greater access to and control over your personal information. You may review,
              change, or terminate your account at any time.
            </em>
          </p>
          <p>
            In some regions (like the EEA, UK, and Canada), you have certain rights under applicable data protection
            laws. These may include the right (i) to request access and obtain a copy of your personal information, (ii)
            to request rectification or erasure; (iii) to restrict the processing of your personal information; and (iv)
            if applicable, to data portability. In certain circumstances, you may also have the right to object to the
            processing of your personal information. You can make such a request by contacting us by using the contact
            details provided in the section &quot;
            <a href="#how-can-you-contact-us" className="link">
              HOW CAN YOU CONTACT US ABOUT THIS NOTICE?
            </a>
            &quot; below.
          </p>
          <p>We will consider and act upon any request in accordance with applicable data protection laws.</p>
          <p>
            If you are located in the EEA or UK and you believe we are unlawfully processing your personal information,
            you also have the right to complain to your local data protection supervisory authority. You can find their
            contact details here:{' '}
            <a
              href="https://ec.europa.eu/justice/data-protection/bodies/authorities/index_en.htm"
              className="link"
              target="_blank"
              rel="noreferrer"
            >
              https://ec.europa.eu/justice/data-protection/bodies/authorities/index_en.htm
            </a>
            .
          </p>
          <p>
            If you are located in Switzerland, the contact details for the data protection authorities are available
            here:{' '}
            <a href="https://www.edoeb.admin.ch/edoeb/en/home.html" className="link" target="_blank" rel="noreferrer">
              https://www.edoeb.admin.ch/edoeb/en/home.html
            </a>
            .
          </p>
          <p>
            <span style={{ textDecoration: 'underline' }}>Withdrawing your consent:</span> If we are relying on your
            consent to process your personal information, which may be express and/or implied consent depending on the
            applicable law, you have the right to withdraw your consent at any time. You can withdraw your consent at
            any time by contacting us by using the contact details provided in the section &quot;
            <a href="#how-can-you-contact-us" className="link">
              HOW CAN YOU CONTACT US ABOUT THIS NOTICE?
            </a>
            &quot; below.
          </p>
          <p>
            However, please note that this will not affect the lawfulness of the processing before its withdrawal, nor
            when applicable law allows, will it affect the processing of your personal information conducted in reliance
            on lawful processing grounds other than consent.
          </p>
          <p>
            If you have questions or comments about your privacy rights, you may email us at{' '}
            <a href="mailTo:hello@joyverse.club" className="link">
              hello@joyverse.club
            </a>
            .
          </p>
          <h3 id="controls-for-do-not-track-features">10. CONTROLS FOR DO-NOT-TRACK FEATURES</h3>
          <p>
            Most web browsers and some mobile operating systems and mobile applications include a Do-Not-Track
            (&quot;DNT&quot;) feature or setting you can activate to signal your privacy preference not to have data
            about your online browsing activities monitored and collected. At this stage no uniform technology standard
            for recognizing and implementing DNT signals has been finalized. As such, we do not currently respond to DNT
            browser signals or any other mechanism that automatically communicates your choice not to be tracked online.
            If a standard for online tracking is adopted that we must follow in the future, we will inform you about
            that practice in a revised version of this privacy notice.
          </p>
          <h3 id="do-california-residents-have-specific-privacy-rights">
            11. DO CALIFORNIA RESIDENTS HAVE SPECIFIC PRIVACY RIGHTS?
          </h3>
          <p>
            <em>
              In Short: Yes, if you are a resident of California, you are granted specific rights regarding access to
              your personal information.
            </em>
          </p>
          <p>
            California Civil Code Section 1798.83, also known as the &quot;Shine The Light&quot; law, permits our users
            who are California residents to request and obtain from us, once a year and free of charge, information
            about categories of personal information (if any) we disclosed to third parties for direct marketing
            purposes and the names and addresses of all third parties with which we shared personal information in the
            immediately preceding calendar year. If you are a California resident and would like to make such a request,
            please submit your request in writing to us using the contact information provided below.
          </p>
          <p>
            If you are under 18 years of age, reside in California, and have a registered account with Services, you
            have the right to request removal of unwanted data that you publicly post on the Services. To request
            removal of such data, please contact us using the contact information provided below and include the email
            address associated with your account and a statement that you reside in California. We will make sure the
            data is not publicly displayed on the Services, but please be aware that the data may not be completely or
            comprehensively removed from all our systems (e.g., backups, etc.).
          </p>
          <h3 id="do-we-make-udpates-to-this-notice">12. DO WE MAKE UPDATES TO THIS NOTICE?</h3>
          <p>
            <em>In Short: Yes, we will update this notice as necessary to stay compliant with relevant laws.</em>
          </p>
          <p>
            We may update this privacy notice from time to time. The updated version will be indicated by an updated
            &quot;Revised&quot; date and the updated version will be effective as soon as it is accessible. If we make
            material changes to this privacy notice, we may notify you either by prominently posting a notice of such
            changes or by directly sending you a notification. We encourage you to review this privacy notice frequently
            to be informed of how we are protecting your information.
          </p>
          <h3 id="how-can-you-contact-us">13. HOW CAN YOU CONTACT US ABOUT THIS NOTICE?</h3>
          <p className="mb-2">
            If you have questions or comments about this notice, do not hesitate to contact us at{' '}
            <a href="mailto:hello@joyverse.club" className="link">
              hello@joyverse.club
            </a>{' '}
            or by post to:
          </p>
          <address>Neo Design Labs Inc.</address>
          <address>1450 2nd Street, 155</address>
          <address>Santa Monica, CA 90401</address>
          <h3 id="how-can-you-review-update-delete-data-collected">
            14. HOW CAN YOU REVIEW, UPDATE, OR DELETE THE DATA WE COLLECT FROM YOU?
          </h3>
          <p>
            To request to review, update, or delete your personal information, please submit a request to{' '}
            <a href="mailto:hello@joyverse.club" className="link">
              hello@joyverse.club
            </a>
            .
          </p>
        </div>
      </Layout.Body>
      {/* <Layout.Footer /> */}
    </Layout>
  );
};

export default JoyversePrivacyPolicy;
