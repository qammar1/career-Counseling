import React from 'react';
import Nav from '../common/Nav';

const COLORS = {
  white: '#FFFFFF',
  darkCyan: '#008B8B',
  jet: '#343434',
};

const PrivacyPolicy = () => {
  return (
    <React.Fragment>
        <Nav/>
        <div className="container">
      <div className="content">
        <h1 className="title">Privacy Policy</h1>
        <p className="text">
          Thank you for using <span className="highlight">Quest Career</span>. This
          Privacy Policy explains how we collect, use, disclose, and safeguard
          your information when you use our mobile application.
        </p>
        <h2 className="subTitle">Information We Collect</h2>
        <h3 className="listTitle">1. Personal Information:</h3>
        <p className="text">
          • When you sign up for an account, we may collect personal information
          such as your name, email address, and other relevant details.
        </p>
        <h3 className="listTitle">2. Usage Information:</h3>
        <p className="text">
          • We may collect information about how you interact with our Service,
          including the pages you visit, the time and date of your visits, and
          the links you click.
        </p>
        <h3 className="listTitle">Device Information:</h3>
        <p className="text">
          • We may collect information about the device you use to access our
          Service, including the device type, operating system, and unique
          device identifiers.
        </p>
        <h2 className="subTitle">How We Use Your Information</h2>
        <p className="text">
          We use the collected information for the following purposes:
        </p>
        <h3 className="listTitle">1. Providing the Service:</h3>
        <p className="text">
          • To deliver the services you have requested, such as career
          counseling sessions and personalized recommendations.
        </p>
        <h3 className="listTitle">2. Improving Our Service:</h3>
        <p className="text">
          • To analyze and enhance the user experience, troubleshoot technical
          issues, and develop new features.
        </p>
        <h3 className="listTitle">3. Communication:</h3>
        <p className="text">
          • To send you important updates, newsletters, and marketing materials,
          where applicable.
        </p>
        <h2 className="subTitle">Information Sharing</h2>
        <p className="text">
          We do not sell, trade, or otherwise transfer your personal information
          to third parties without your consent, except as set forth in this
          Privacy Policy or as required by law.
        </p>
        <h2 className="subTitle">Security</h2>
        <p className="text">
          We take reasonable measures to protect your personal information from
          unauthorized access, use, or disclosure. However, no method of
          transmission over the internet or electronic storage is completely
          secure, and we cannot guarantee absolute security.
        </p>
        <h2 className="subTitle">Your Choices</h2>
        <p className="text">
          You can review and update your account information and communication
          preferences at any time. You may also opt-out of receiving certain
          communications from us.
        </p>
        <h2 className="subTitle">Changes to This Privacy Policy</h2>
        <p className="text">
          We may update this Privacy Policy from time to time to reflect changes
          in our practices or for other operational, legal, or regulatory
          reasons. We will notify you of any material changes by posting the
          updated policy on our website or through other communication channels.
        </p>
        <h2 className="subTitle">Contact Us</h2>
        <p className="text">
          If you have any questions about this Privacy Policy, please contact us
          at <span className="highlight">questCareer@gmail.com</span>.
        </p>
      </div>
    </div>
    </React.Fragment>
  );
};

export default PrivacyPolicy;