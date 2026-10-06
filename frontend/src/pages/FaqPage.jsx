import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PublicLayout from '../layouts/PublicLayout';

const FAQS = [
  {
    q: 'How does the admission counseling process work at AVP Global Education?',
    a: 'When you submit the Request Information form, an educational counselor reviews your preferred colleges and courses. We contact you via phone or email, assess your eligibility, schedule campus visits if needed, and assist you in completing official college application forms.',
  },
  {
    q: 'Are the partner colleges recognized and accredited?',
    a: 'Yes, all 48+ colleges and universities in our network are officially recognized by statutory bodies including UGC, AICTE, MCI/NMC, BCI, and affiliated with state and deemed universities.',
  },
  {
    q: 'What is the fee for your counseling services?',
    a: 'Our initial admission advisory, course shortlisting, and eligibility evaluation are completely complimentary for students. We provide transparent fee breakdowns directly from institutions.',
  },
  {
    q: 'Can outstation students apply for hostel and transport facilities?',
    a: 'Yes, we assist outstation and international students in reserving verified campus hostel accommodations, inspecting mess quality, and ensuring safe connectivity.',
  },
  {
    q: 'What documents are required to secure provisional admission?',
    a: 'Generally, you will need your 10th and 12th Grade Marksheets, Transfer Certificate (TC), Migration Certificate, Entrance Exam Scorecards (where applicable, e.g. NEET/KCET/JEE), government photo ID, and passport-size photographs.',
  },
  {
    q: 'Are education loans and merit scholarships available?',
    a: 'Yes, we guide eligible candidates through government merit scholarships, institutional fee concessions, and provide documentation support for education loans with leading public and private banks.',
  },
];

const FaqPage = () => {
  const navigate = useNavigate();
  const [openIndex, setOpenIndex] = useState(0);

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <PublicLayout>
      <div className="faq-page">
        {/* BANNER */}
        <section
          style={{
            background: 'linear-gradient(135deg, #173f78, #071c42)',
            color: 'white',
            padding: '50px 8%',
            textAlign: 'center',
          }}
        >
          <p style={{ color: '#f51551', fontWeight: 'bold', fontSize: '13px', letterSpacing: '2px' }}>
            QUESTIONS & ANSWERS
          </p>
          <h1 style={{ fontSize: '36px', margin: '12px 0 16px' }}>Frequently Asked Questions</h1>
          <p style={{ maxWidth: '680px', margin: '0 auto', fontSize: '15px', color: '#c8dded' }}>
            Got questions? We're here to answer everything about admissions, college options, deadlines,
            and fees.
          </p>
        </section>

        {/* ACCORDION */}
        <section style={{ maxWidth: '900px', margin: '50px auto', padding: '0 20px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {FAQS.map((faq, idx) => (
              <div
                key={idx}
                style={{
                  border: '1px solid #d9e2ec',
                  borderRadius: '8px',
                  overflow: 'hidden',
                  background: 'white',
                }}
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  style={{
                    width: '100%',
                    padding: '18px 20px',
                    textAlign: 'left',
                    background: openIndex === idx ? '#f8fafd' : 'white',
                    border: 'none',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    cursor: 'pointer',
                    fontSize: '16px',
                    fontWeight: 600,
                    color: '#173f78',
                  }}
                >
                  <span>{faq.q}</span>
                  <span style={{ fontSize: '20px', color: '#f51551', marginLeft: '12px' }}>
                    {openIndex === idx ? '−' : '+'}
                  </span>
                </button>

                {openIndex === idx && (
                  <div
                    style={{
                      padding: '16px 20px',
                      fontSize: '14px',
                      color: '#555',
                      lineHeight: '1.7',
                      background: '#fff',
                      borderTop: '1px solid #f0f0f0',
                    }}
                  >
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* CTA */}
          <div
            style={{
              marginTop: '50px',
              padding: '30px',
              background: '#e9f4fa',
              borderRadius: '8px',
              textAlign: 'center',
              border: '1px solid #c8dded',
            }}
          >
            <h3 style={{ color: '#075078', marginBottom: '8px' }}>Still have questions?</h3>
            <p style={{ color: '#555', fontSize: '14px', marginBottom: '20px' }}>
              Our counselors are ready to answer any specific query regarding cut-offs or quota seats.
            </p>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
              <button
                onClick={() => navigate('/contact')}
                style={{
                  background: '#075078',
                  color: 'white',
                  border: 'none',
                  padding: '10px 22px',
                  borderRadius: '4px',
                  fontWeight: 'bold',
                  fontSize: '13px',
                  cursor: 'pointer',
                }}
              >
                Contact Help Desk
              </button>
              <button
                onClick={() => navigate('/request-info')}
                style={{
                  background: '#f51551',
                  color: 'white',
                  border: 'none',
                  padding: '10px 22px',
                  borderRadius: '4px',
                  fontWeight: 'bold',
                  fontSize: '13px',
                  cursor: 'pointer',
                }}
              >
                Request Information
              </button>
            </div>
          </div>
        </section>
      </div>
    </PublicLayout>
  );
};

export default FaqPage;
