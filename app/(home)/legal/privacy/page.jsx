export const metadata = {
  title: 'WalAd - Privacy',
  description: 'Our privacy policies.',
  url: 'https://www.walad.link/legal/privacy',
};

export default function Privacy() {
  return (
    <main className="space-y-8 md:p-8 p-6 text-neutral-300">
      <h1 className="text-3xl font-bold text-neutral-100">Privacy Policy.</h1>
      <p>
        This Privacy Policy describes how your personal information is
        collected, used, and shared when you use or access our website {" "}
        <a href="https://walad.link/" target="_blank" rel="noopener noreferrer" className="underline font-bold">
          WaladLink
        </a>
        , a service managed and owned by{' '}
        <a
          href="https://ducklabs.xyz/"
          target="_blank"
          rel="noopener noreferrer"
          className="underline font-bold"
        >
          DuckLabs
        </a>
        .
      </p>
      <div>
        <h2 className="text-xl font-bold text-neutral-100">Information We Collect,</h2>
        <p>
          When you use our service, we collect certain information including
          wallet addresses, usernames, and profile names. This information is
          publicly accessible and is necessary for the functionality of our
          service. We also collect your email address and billing information
          for tax and fraud prevention purposes. This data is retained even if
          you delete your account. We use our self-hosted analytics tool, OSS,
          to collect anonymous usage data. This tool does not collect any
          personally identifiable information.
        </p>
      </div>
      <div>
        <h2 className="text-xl font-bold text-neutral-100">How We Use Your Information,</h2>
        <p>
          {' '}
          We use the information that we collect to provide and improve our
          service. We do not sell your data to other companies.
        </p>
      </div>
      <div>
        <h2 className="text-xl font-bold text-neutral-100">Your Rights,</h2>
        <p>
          You have the right to access the personal information we hold about
          you and to ask that your personal information be corrected, updated,
          or deleted. You can delete your account at any time. However, we
          reserve the right to delete or ban your account at our discretion,
          especially if we detect suspicious activity.
        </p>
      </div>
      <div>
        <h2 className="text-xl font-bold text-neutral-100">Refunds,</h2>
        <p>We offer refunds within 7 days of purchase.</p>
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
