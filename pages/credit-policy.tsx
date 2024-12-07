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
                <em>
                  The Shopping Credit is applicable exclusively to purchases made on the <b>Spacejoy</b> website.
                </em>
              </p>
            </li>
            <li className="mb-4">
              <p>
                <em>
                  A minimum order value of <b>$1,500</b> is required to utilize the Shopping Credit.
                </em>
              </p>
            </li>
            <li className="mb-4">
              <p>
                <em>
                  The maximum Shopping Credit that can be applied to a single order is <b>$400</b>.
                </em>
              </p>
            </li>
            <li className="mb-4">
              <p>
                <em>The Shopping Credit cannot be combined with any other promotions, discounts, or offers.</em>
              </p>
            </li>
            <li className="mb-4">
              <p>
                <em>
                  The Shopping Credit is not applicable to previously purchased design packages or any prior orders.
                </em>
              </p>
            </li>
          </ul>

          <h2 className="mb-4">2. EXCLUSIONS</h2>
          <ul>
            <li className="mb-4">
              <p>
                <em>The Shopping Credit cannot be redeemed for cash or transferred to other accounts.</em>
              </p>
            </li>
            <li className="mb-4">
              <p>
                <em>This credit is non-refundable and cannot be exchanged for other store credits or gift cards.</em>
              </p>
            </li>
            <li className="mb-4">
              <p>
                <em>
                  It is not valid for purchases of design packages or services that have already been completed or
                  processed prior to <b>November 11, 2024</b>.
                </em>
              </p>
            </li>
          </ul>

          <h2 className="mb-4">3. VALIDITY</h2>
          <p className="mb-6">
            <em>
              The Shopping Credit will expire <b>30 days</b> from the date of purchase of the associated design package.
              Any unused credit after this period will be forfeited.
            </em>
          </p>

          <h2 className="mb-4">4. GENERAL TERMS</h2>
          <ul>
            <li className="mb-4">
              <p>
                <em>
                  <b>Spacejoy</b> reserves the right to modify, extend, or discontinue this offer at any time
                  without prior notice.
                </em>
              </p>
            </li>
            <li className="mb-4">
              <p>
                <em>
                  In the event of any disputes, <b>Spacejoy&apos;s</b> decision will be considered final and
                  binding.
                </em>
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
