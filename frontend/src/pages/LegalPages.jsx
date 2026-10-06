import PublicLayout from '../layouts/PublicLayout';

export const TermsPage = () => {
  return (
    <PublicLayout>
      <div style={{ maxWidth: '900px', margin: '50px auto', padding: '0 20px', lineHeight: '1.7', color: '#444' }}>
        <h1 style={{ fontSize: '30px', color: '#173f78', marginBottom: '16px' }}>Terms & Conditions</h1>
        <p style={{ fontSize: '13px', color: '#888', marginBottom: '24px' }}>Last Updated: March 2026</p>
        <p style={{ marginBottom: '16px' }}>
          Welcome to AVP Global Education. By accessing our website and submitting admission inquiries, you agree to comply with and be bound by the following terms and conditions.
        </p>
        <h3 style={{ color: '#075078', margin: '20px 0 10px' }}>1. Educational Advisory Services</h3>
        <p style={{ marginBottom: '16px' }}>
          Our services provide guidance, counseling, and informational support. Admission decisions remain at the sole discretion of the respective colleges, universities, and statutory regulatory bodies based on eligibility criteria, merit, and vacancy.
        </p>
        <h3 style={{ color: '#075078', margin: '20px 0 10px' }}>2. Accuracy of Candidate Information</h3>
        <p style={{ marginBottom: '16px' }}>
          Candidates and parents warrant that all academic credentials, scores, and personal records provided during the admission process are authentic and verifiable.
        </p>
        <h3 style={{ color: '#075078', margin: '20px 0 10px' }}>3. Confidentiality</h3>
        <p style={{ marginBottom: '16px' }}>
          We treat all student records with strict confidentiality and share information solely with designated admissions departments for legitimate admission processing.
        </p>
      </div>
    </PublicLayout>
  );
};

export const PrivacyPolicyPage = () => {
  return (
    <PublicLayout>
      <div style={{ maxWidth: '900px', margin: '50px auto', padding: '0 20px', lineHeight: '1.7', color: '#444' }}>
        <h1 style={{ fontSize: '30px', color: '#173f78', marginBottom: '16px' }}>Privacy Policy</h1>
        <p style={{ fontSize: '13px', color: '#888', marginBottom: '24px' }}>Last Updated: March 2026</p>
        <p style={{ marginBottom: '16px' }}>
          At AVP Global Education, your privacy is paramount. This policy outlines how we collect, store, protect, and use student information submitted through our portal.
        </p>
        <h3 style={{ color: '#075078', margin: '20px 0 10px' }}>1. Information We Collect</h3>
        <p style={{ marginBottom: '16px' }}>
          When submitting an enquiry, we collect your name, email, telephone number, address, target college, and preferred course to enable personalized academic counseling.
        </p>
        <h3 style={{ color: '#075078', margin: '20px 0 10px' }}>2. How We Use Your Information</h3>
        <p style={{ marginBottom: '16px' }}>
          Information is utilized strictly to provide admission counseling, send updates on cut-offs and application deadlines, and assist in college application formalities. We never sell student data to third-party marketing brokers.
        </p>
        <h3 style={{ color: '#075078', margin: '20px 0 10px' }}>3. Data Security</h3>
        <p style={{ marginBottom: '16px' }}>
          We apply modern encryption, access-controlled databases, and industry best practices to safeguard your personal data from unauthorized access or disclosure.
        </p>
      </div>
    </PublicLayout>
  );
};

export const RefundPolicyPage = () => {
  return (
    <PublicLayout>
      <div style={{ maxWidth: '900px', margin: '50px auto', padding: '0 20px', lineHeight: '1.7', color: '#444' }}>
        <h1 style={{ fontSize: '30px', color: '#173f78', marginBottom: '16px' }}>Cancellation & Refund Policy</h1>
        <p style={{ fontSize: '13px', color: '#888', marginBottom: '24px' }}>Last Updated: March 2026</p>
        <p style={{ marginBottom: '16px' }}>
          Institutional tuition fees and hostel deposits are payable directly to the respective colleges according to their individual regulatory refund schedules.
        </p>
        <h3 style={{ color: '#075078', margin: '20px 0 10px' }}>1. University & College Tuition Refunds</h3>
        <p style={{ marginBottom: '16px' }}>
          Refunds for college tuition, security deposits, and registration charges are governed by the statutory UGC / AICTE guidelines and the specific institution's withdrawal deadlines.
        </p>
        <h3 style={{ color: '#075078', margin: '20px 0 10px' }}>2. Advisory Support Assistance</h3>
        <p style={{ marginBottom: '16px' }}>
          In the event of an official seat cancellation, our team assists candidates with documentation and filing requests to help expedite the processing of institutional refunds.
        </p>
      </div>
    </PublicLayout>
  );
};
