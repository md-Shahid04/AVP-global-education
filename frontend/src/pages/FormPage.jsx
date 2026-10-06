import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import PublicLayout from '../layouts/PublicLayout';
import { leadsAPI, collegesAPI, coursesAPI } from '../services/api';

const INDIAN_STATES = [
  'Andhra Pradesh',
  'Arunachal Pradesh',
  'Assam',
  'Bihar',
  'Chhattisgarh',
  'Goa',
  'Gujarat',
  'Haryana',
  'Himachal Pradesh',
  'Jharkhand',
  'Karnataka',
  'Kerala',
  'Madhya Pradesh',
  'Maharashtra',
  'Manipur',
  'Meghalaya',
  'Mizoram',
  'Nagaland',
  'Odisha',
  'Punjab',
  'Rajasthan',
  'Sikkim',
  'Tamil Nadu',
  'Telangana',
  'Tripura',
  'Uttar Pradesh',
  'Uttarakhand',
  'West Bengal',
  'Delhi',
];

function FormPage() {
  const [searchParams] = useSearchParams();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    postalCode: '',
    college: searchParams.get('college') || '',
    course: searchParams.get('course') || '',
    contactPermission: 'Yes',
  });

  const [colleges, setColleges] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loadingOptions, setLoadingOptions] = useState(true);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(null);
  const [formError, setFormError] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});

  // 1. Fetch Colleges
  useEffect(() => {
    const fetchColleges = async () => {
      try {
        const res = await collegesAPI.getColleges();
        if (res.data?.data) {
          setColleges(res.data.data);
        }
      } catch (err) {
        console.error('Failed to load colleges from server:', err);
      }
    };
    fetchColleges();
  }, []);

  // 2. Fetch Courses when college changes or on initial load
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const params = formData.college ? { college: formData.college } : {};
        const res = await coursesAPI.getCourses(params);
        if (res.data?.data) {
          setCourses(res.data.data);
        }
      } catch (err) {
        console.error('Failed to load courses from server:', err);
      } finally {
        setLoadingOptions(false);
      }
    };
    fetchCourses();
  }, [formData.college]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear field-specific error upon typing
    if (fieldErrors[name]) {
      setFieldErrors((prev) => {
        const copy = { ...prev };
        delete copy[name];
        return copy;
      });
    }
  };

  const validateFrontend = () => {
    const errors = {};
    if (!formData.firstName.trim()) errors.firstName = 'First name is required';
    if (!formData.lastName.trim()) errors.lastName = 'Last name is required';
    if (!formData.email.trim()) {
      errors.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errors.email = 'Please enter a valid email address';
    }
    if (!formData.phone.trim()) {
      errors.phone = 'Phone number is required';
    } else if (!/^[+0-9\s\-()]{7,20}$/.test(formData.phone.trim())) {
      errors.phone = 'Please enter a valid phone number (at least 7 digits)';
    }
    if (!formData.city.trim()) errors.city = 'City is required';
    if (!formData.state.trim()) errors.state = 'State is required';
    if (!formData.postalCode.trim()) errors.postalCode = 'Postal code is required';
    if (!formData.college.trim()) errors.college = 'Please select a college';
    if (!formData.course.trim()) errors.course = 'Please select a course';

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');
    setFieldErrors({});

    const clientErrors = validateFrontend();
    if (Object.keys(clientErrors).length > 0) {
      setFieldErrors(clientErrors);
      setFormError('Please fill in all required fields correctly.');
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = {
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        email: formData.email.trim().toLowerCase(),
        phone: formData.phone.trim(),
        street: formData.address.trim(),
        city: formData.city.trim(),
        state: formData.state.trim(),
        postalCode: formData.postalCode.trim(),
        college: formData.college.trim(),
        course: formData.course.trim(),
        contactPermission: formData.contactPermission === 'Yes' || formData.contactPermission === true,
      };

      const response = await leadsAPI.submitLead(payload);

      if (response.data?.success) {
        setSubmitSuccess({
          message: response.data.message,
          isDuplicate: response.data.isDuplicate || false,
          lead: response.data.data,
        });
      } else {
        setFormError(response.data?.message || 'Submission failed. Please check your information.');
      }
    } catch (error) {
      console.error('Lead Submission Error:', error);
      if (error.response?.data?.errors) {
        setFieldErrors(error.response.data.errors);
      }
      setFormError(
        error.response?.data?.message ||
          'Failed to submit your enquiry. Please check your network and try again.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetForm = () => {
    setSubmitSuccess(null);
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      state: '',
      postalCode: '',
      college: '',
      course: '',
      contactPermission: 'Yes',
    });
  };

  return (
    <PublicLayout>
      <div className="form-page">
        {/* TOP SECTION */}
        <section className="hero-section">
          <div className="hero-text">
            <p className="small-title">AVP GLOBAL EDUCATION</p>
            <div className="line"></div>
            <h1>
              Our doors are open wide to
              <br />
              students from all walks of life.
            </h1>
          </div>

          <div className="hero-image">
            <img
              src="https://images.unsplash.com/photo-1523240795612-9a054b0db644"
              alt="Students learning together"
            />
          </div>
        </section>

        {/* MAIN CONTENT */}
        <section className="content-section">
          {/* FORM */}
          <div className="form-container">
            <div className="form-header">REQUEST INFORMATION</div>

            {submitSuccess ? (
              <div style={{ padding: '30px 20px', textAlign: 'center' }}>
                <div
                  style={{
                    width: '60px',
                    height: '60px',
                    background: submitSuccess.isDuplicate ? '#ffc107' : '#28a745',
                    color: 'white',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '30px',
                    margin: '0 auto 18px',
                  }}
                >
                  {submitSuccess.isDuplicate ? 'ℹ' : '✓'}
                </div>

                <h3 style={{ color: '#075078', marginBottom: '12px', fontSize: '20px' }}>
                  {submitSuccess.isDuplicate ? 'Enquiry Already Received' : 'Application Submitted!'}
                </h3>

                <p
                  style={{
                    fontSize: '14px',
                    color: '#344154',
                    lineHeight: '1.6',
                    marginBottom: '20px',
                  }}
                >
                  {submitSuccess.message}
                </p>

                <div
                  style={{
                    background: 'white',
                    padding: '16px',
                    borderRadius: '6px',
                    textAlign: 'left',
                    fontSize: '13px',
                    color: '#444',
                    marginBottom: '24px',
                    border: '1px solid #d0e0ed',
                  }}
                >
                  <p><strong>Candidate:</strong> {formData.firstName} {formData.lastName}</p>
                  <p><strong>College:</strong> {formData.college}</p>
                  <p><strong>Course:</strong> {formData.course}</p>
                  <p><strong>Contact:</strong> {formData.email} | {formData.phone}</p>
                </div>

                <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
                  <button
                    onClick={handleResetForm}
                    className="submit-button"
                    style={{ margin: 0, padding: '0 20px', width: 'auto', height: '40px', fontSize: '13px' }}
                  >
                    Submit Another Enquiry
                  </button>
                  <Link
                    to="/courses"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: '0 20px',
                      background: 'white',
                      color: '#075078',
                      border: '1px solid #075078',
                      borderRadius: '4px',
                      textDecoration: 'none',
                      fontSize: '13px',
                      fontWeight: 'bold',
                    }}
                  >
                    Browse Courses
                  </Link>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate>
                {formError && (
                  <div
                    style={{
                      background: '#ffebee',
                      border: '1px solid #ffcdd2',
                      color: '#c62828',
                      padding: '10px 14px',
                      borderRadius: '4px',
                      fontSize: '12px',
                      marginBottom: '15px',
                    }}
                  >
                    {formError}
                  </div>
                )}

                {/* First + Last Name */}
                <div className="two-columns">
                  <div className="input-group">
                    <label htmlFor="lead-firstName">First Name*</label>
                    <input
                      id="lead-firstName"
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      placeholder="e.g. Rahul"
                      style={fieldErrors.firstName ? { borderColor: '#d32f2f', background: '#fff8f8' } : {}}
                      required
                    />
                    {fieldErrors.firstName && (
                      <span style={{ color: '#d32f2f', fontSize: '10px', display: 'block', marginTop: '3px' }}>
                        {fieldErrors.firstName}
                      </span>
                    )}
                  </div>

                  <div className="input-group">
                    <label htmlFor="lead-lastName">Last Name*</label>
                    <input
                      id="lead-lastName"
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      placeholder="e.g. Sharma"
                      style={fieldErrors.lastName ? { borderColor: '#d32f2f', background: '#fff8f8' } : {}}
                      required
                    />
                    {fieldErrors.lastName && (
                      <span style={{ color: '#d32f2f', fontSize: '10px', display: 'block', marginTop: '3px' }}>
                        {fieldErrors.lastName}
                      </span>
                    )}
                  </div>
                </div>

                {/* Email + Phone */}
                <div className="two-columns">
                  <div className="input-group">
                    <label htmlFor="lead-email">Email*</label>
                    <input
                      id="lead-email"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="e.g. rahul@example.com"
                      style={fieldErrors.email ? { borderColor: '#d32f2f', background: '#fff8f8' } : {}}
                      required
                    />
                    {fieldErrors.email && (
                      <span style={{ color: '#d32f2f', fontSize: '10px', display: 'block', marginTop: '3px' }}>
                        {fieldErrors.email}
                      </span>
                    )}
                  </div>

                  <div className="input-group">
                    <label htmlFor="lead-phone">Phone*</label>
                    <input
                      id="lead-phone"
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="e.g. +91 9876543210"
                      style={fieldErrors.phone ? { borderColor: '#d32f2f', background: '#fff8f8' } : {}}
                      required
                    />
                    {fieldErrors.phone && (
                      <span style={{ color: '#d32f2f', fontSize: '10px', display: 'block', marginTop: '3px' }}>
                        {fieldErrors.phone}
                      </span>
                    )}
                  </div>
                </div>

                {/* Address + City */}
                <div className="two-columns">
                  <div className="input-group">
                    <label htmlFor="lead-address">Street Address</label>
                    <input
                      id="lead-address"
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      placeholder="e.g. 12 Brigade Road"
                    />
                  </div>

                  <div className="input-group">
                    <label htmlFor="lead-city">City*</label>
                    <input
                      id="lead-city"
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      placeholder="e.g. Bengaluru"
                      style={fieldErrors.city ? { borderColor: '#d32f2f', background: '#fff8f8' } : {}}
                      required
                    />
                    {fieldErrors.city && (
                      <span style={{ color: '#d32f2f', fontSize: '10px', display: 'block', marginTop: '3px' }}>
                        {fieldErrors.city}
                      </span>
                    )}
                  </div>
                </div>

                {/* State + Postal */}
                <div className="two-columns">
                  <div className="input-group">
                    <label htmlFor="lead-state">State*</label>
                    <select
                      id="lead-state"
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      style={fieldErrors.state ? { borderColor: '#d32f2f', background: '#fff8f8' } : {}}
                      required
                    >
                      <option value="">Select State</option>
                      {INDIAN_STATES.map((st) => (
                        <option key={st} value={st}>
                          {st}
                        </option>
                      ))}
                    </select>
                    {fieldErrors.state && (
                      <span style={{ color: '#d32f2f', fontSize: '10px', display: 'block', marginTop: '3px' }}>
                        {fieldErrors.state}
                      </span>
                    )}
                  </div>

                  <div className="input-group">
                    <label htmlFor="lead-postalCode">Postal Code*</label>
                    <input
                      id="lead-postalCode"
                      type="text"
                      name="postalCode"
                      value={formData.postalCode}
                      onChange={handleChange}
                      placeholder="e.g. 560001"
                      style={fieldErrors.postalCode ? { borderColor: '#d32f2f', background: '#fff8f8' } : {}}
                      required
                    />
                    {fieldErrors.postalCode && (
                      <span style={{ color: '#d32f2f', fontSize: '10px', display: 'block', marginTop: '3px' }}>
                        {fieldErrors.postalCode}
                      </span>
                    )}
                  </div>
                </div>

                {/* College Selection */}
                <div className="input-group full-width">
                  <label htmlFor="lead-college">Select College*</label>
                  <select
                    id="lead-college"
                    name="college"
                    value={formData.college}
                    onChange={handleChange}
                    style={fieldErrors.college ? { borderColor: '#d32f2f', background: '#fff8f8' } : {}}
                    required
                  >
                    <option value="">Please Select College</option>
                    {colleges.map((col) => (
                      <option key={col._id || col.name} value={col.name}>
                        {col.name} ({col.city})
                      </option>
                    ))}
                  </select>
                  {fieldErrors.college && (
                    <span style={{ color: '#d32f2f', fontSize: '10px', display: 'block', marginTop: '3px' }}>
                      {fieldErrors.college}
                    </span>
                  )}
                </div>

                {/* Course Selection */}
                <div className="input-group full-width">
                  <label htmlFor="lead-course">Select Course*</label>
                  <select
                    id="lead-course"
                    name="course"
                    value={formData.course}
                    onChange={handleChange}
                    style={fieldErrors.course ? { borderColor: '#d32f2f', background: '#fff8f8' } : {}}
                    required
                  >
                    <option value="">
                      {loadingOptions ? 'Loading courses...' : 'Please Select Course'}
                    </option>
                    {courses.map((crs) => (
                      <option key={crs._id || crs.name} value={crs.name}>
                        {crs.name}
                      </option>
                    ))}
                  </select>
                  {fieldErrors.course && (
                    <span style={{ color: '#d32f2f', fontSize: '10px', display: 'block', marginTop: '3px' }}>
                      {fieldErrors.course}
                    </span>
                  )}
                </div>

                {/* Permission */}
                <div className="input-group full-width">
                  <label htmlFor="lead-contactPermission">
                    Mark "Yes" so your admissions expert can text/call you.*
                  </label>
                  <select
                    id="lead-contactPermission"
                    name="contactPermission"
                    value={formData.contactPermission}
                    onChange={handleChange}
                  >
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  className="submit-button"
                  disabled={isSubmitting}
                  style={isSubmitting ? { opacity: 0.7, cursor: 'not-allowed' } : {}}
                >
                  {isSubmitting ? 'SUBMITTING ENQUIRY...' : 'SUBMIT'}
                </button>
              </form>
            )}
          </div>

          {/* RIGHT SIDE CONTENT */}
          <div className="information">
            <h2>
              At SPC, we are prepared to meet you
              <br />
              wherever you are on your journey.
            </h2>

            <p>
              Whether you're graduating from high school, looking for a new career, or want to advance
              in your current job, you belong at SPC.
            </p>

            <h3>You belong where you can:</h3>

            <ul>
              <li>Be yourself and celebrate your uniqueness</li>
              <li>Make a difference with global education standards</li>
              <li>Earn a high-quality education that doesn't saddle you with debt</li>
              <li>Learn from experts in their respective fields</li>
              <li>Get all the counseling support you need to succeed</li>
              <li>Fit college classes into your busy life with flexible schedules</li>
              <li>Grow your talents, passions, and industry skills</li>
              <li>Be accepted and connect with lifelong friends & alumni networks</li>
              <li>Prepare for a fulfilling career through top campus placements</li>
              <li>Join vibrant campus events, clubs, and cultural forums</li>
            </ul>

            <div
              style={{
                marginTop: '30px',
                padding: '16px',
                background: '#f8fafd',
                borderLeft: '4px solid #075078',
                borderRadius: '0 4px 4px 0',
              }}
            >
              <h4 style={{ fontSize: '14px', color: '#173f78', marginBottom: '6px' }}>
                Need Immediate Assistance?
              </h4>
              <p style={{ fontSize: '13px', color: '#666', margin: 0 }}>
                Speak directly with an education counselor: <strong>+91 78924 74250</strong> (Mon - Sat, 9am - 7pm)
              </p>
            </div>
          </div>
        </section>
      </div>
    </PublicLayout>
  );
}

export default FormPage;
