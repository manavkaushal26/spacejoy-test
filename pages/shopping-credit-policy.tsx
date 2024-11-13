import Layout from '@components/Shared/Layout';
import SectionTitle from '@components/Shared/SectionTitle';
import Head from 'next/head';

type Props = {};

const SpacejoyShoppingCreditPolicy = (props: Props) => {
  return (
    <Layout>
      <Head>
        <title key="title">Shopping Credit Policy</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout.Banner />
      <Layout.Header />
      <Layout.Body>
        <div className="container px-4 mx-auto my-16 antialiased text-black break-words mb-28 joyverse-privacy-policy">
          <SectionTitle title="Spacejoy Shopping Credit Policy" feature={`Effective Date: November 11, 2024`} />

          <h2 className="mb-4">1. ELIGIBILITY AND USAGE</h2>
          <ul>
            <li className="mb-4">
              <p>
                <em>The Shopping Credit is applicable exclusively to purchases made on the Spacejoy website.</em>
                This means that you can only use the Shopping Credit for transactions conducted on our official site.
              </p>
            </li>
            <li className="mb-4">
              <p>
                <em>A minimum order value of $1,000 is required to utilize the Shopping Credit.</em>
                You must ensure that your total purchase meets or exceeds this amount to apply the credit.
              </p>
            </li>
            <li className="mb-4">
              <p>
                <em>The Shopping Credit cannot be combined with any other promotions, discounts, or offers.</em>
                This policy ensures that the Shopping Credit is used independently and cannot be stacked with other
                deals.
              </p>
            </li>
            <li className="mb-4">
              <p>
                <em>
                  The Shopping Credit is not applicable to previously purchased design packages or any prior orders.
                </em>
                This means you cannot retroactively apply the Shopping Credit to past purchases.
              </p>
            </li>
          </ul>

          <h2 className="mb-4">2. EXCLUSIONS</h2>
          <ul>
            <li className="mb-4">
              <p>
                <em>The Shopping Credit cannot be redeemed for cash or transferred to other accounts.</em>
                This credit is strictly for use on eligible purchases and cannot be converted into cash.
              </p>
            </li>
            <li className="mb-4">
              <p>
                <em>This credit is non-refundable and cannot be exchanged for other store credits or gift cards.</em>
                Once issued, the Shopping Credit cannot be returned or exchanged for other forms of credit.
              </p>
            </li>
            <li className="mb-4">
              <p>
                <em>
                  It is not valid for purchases of design packages or services that have already been completed or
                  processed prior to November 11, 2024.
                </em>
                The credit cannot be applied to any services that were finalized before the effective date.
              </p>
            </li>
          </ul>

          <h2 className="mb-4">3. VALIDITY</h2>
          <p className="mb-6">
            <em>The Shopping Credit will expire 30 days from the date of purchase of the associated design package.</em>
            Any unused credit after this period will be forfeited, so be sure to use it within the specified timeframe.
          </p>

          <h2 className="mb-4">4. GENERAL TERMS</h2>
          <ul>
            <li className="mb-4">
              <p>
                <em>
                  Spacejoy reserves the right to modify, extend, or discontinue this offer at any time without prior
                  notice.
                </em>
                This gives us flexibility to change the terms of the Shopping Credit as necessary.
              </p>
            </li>
            <li className="mb-4">
              <p>
                <em>In the event of any disputes, Spacejoy&apos;s decision will be considered final and binding.</em>
                This means that our resolutions regarding any issues related to the Shopping Credit will be conclusive.
              </p>
            </li>
          </ul>

          <p>
            By utilizing the Shopping Credit, customers agree to comply with the terms and conditions outlined in this
            policy.
          </p>
        </div>
      </Layout.Body>
      <Layout.Footer />
    </Layout>
  );
};

export default SpacejoyShoppingCreditPolicy;
