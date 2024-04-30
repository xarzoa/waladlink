export const metadata = {
  title: 'WalAd - Terms',
  description: 'Our terms of services.',
  url: 'https://www.walad.link/legal/terms',
};


export default function Terms() {
  return (
    <main className="space-y-8 md:p-8 p-6 text-neutral-300">
      <h1 className="text-3xl font-bold text-neutral-100">Terms of Service.</h1>
      <p>
        Welcome to <b>WaladLink</b>, a wallet address sharing platform owned and
        managed by <b>DuckLabs</b>. Our main goal is to simplify the process of
        sharing crypto wallet addresses, making it as easy as sharing a public
        URL. By using our platform and services, you are agreeing to the terms
        and conditions we&apos;ve outlined in this document.
      </p>
      <div>
        <h2 className="text-xl font-bold text-neutral-100">
          Acceptance of Terms,
        </h2>
        <p>
          Accessing and using <b>WaladLink</b> signifies your acceptance of these
          Terms of Service. It&apos;s imperative that you read, understand and
          agree to these terms. If you do not agree with any part of these
          terms, we kindly ask you not to use our services.
        </p>
      </div>
      <div>
        <h2 className="text-xl font-bold text-neutral-100">Our Services,</h2>
        <p>
          <b>WaladLink</b> provides a unique service that lets users share their
          crypto wallet addresses via a unique, customizable URL, such as{' '}
          <b>walad.link/duck</b>. This means you can share a single link instead of
          your complicated wallet address. It&apos;s important to note that we
          are not a middleman in any transactions. We merely provide the means
          for you to share your wallet addresses more easily. We do not have
          access to your wallet or any transactions you might make.
        </p>
      </div>
      <div>
        <h2 className="text-xl font-bold text-neutral-100">
          Privacy and Data Use ,
        </h2>
        <p>
          Your privacy is paramount to us. Unlike many online services, we do
          not collect user data to sell to other companies. Instead, we utilize
          OSS, a self-hosted analytics tool, to gain insights on how our
          services are used. This helps us understand what we&apos;re doing
          right and where we can improve. Remember that certain data such as
          wallet addresses, usernames, and profile names are publicly
          accessible. Be sure to think carefully about what information you
          share on our platform.
        </p>
      </div>
      <div>
        <h2 className="text-xl font-bold text-neutral-100">
          Account Management,
        </h2>
        <p>
          <b>WaladLink</b> users have the ability to delete their accounts and
          pages at any time, giving you complete control over your presence on
          our platform. However, please note that for tax and fraud prevention
          purposes, we retain email and billing records. If we detect suspicious
          activity, we reserve the right to delete or ban any account. This is
          necessary to maintain the integrity of our platform and protect our
          users.
        </p>
      </div>
      <div>
        <h2 className="text-xl font-bold text-neutral-100">Refunds,</h2>
        <p>
          We understand that circumstances change and you might need to request
          a refund. We offer refunds within 7 days of purchase. If you would
          like a refund, please contact our customer service team who will be
          happy to assist you.
        </p>
      </div>
      <div>
        <h2 className="text-xl font-bold text-neutral-100">
          Changes to Terms,
        </h2>
        <p>
          The digital landscape is always changing, and so we reserve the right
          to modify these terms at any time. Rest assured that we will always
          post the most current version of these terms on our website, ensuring
          you are always up to date.
        </p>
      </div>
      <div>
        <h2 className="text-xl font-bold text-neutral-100">Contact Us,</h2>
        <p>
          For more information about our privacy practices, if you have
          questions, or if you would like to make a complaint, please contact us
          at on <b>X</b> or <b>Discord</b>. Please note that by using our
          service, you understand and agree to this Privacy Policy.
        </p>
      </div>
    </main>
  );
}
