import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import '../styles/ApplicationForm.css';

const ApplicationForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  
  // Form state
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    resume: null,
    coverLetter: '',
    linkedinProfile: '',
    portfolioWebsite: '',
    skills: '',
    workExperience: '',
    education: '',
    additionalInfo: '',
    agreeToTerms: false
  });
  
  // Form validation state
  const [formErrors, setFormErrors] = useState({});
  
  // Mock API fetch for job data
  useEffect(() => {
    // Simulate API fetch delay
    const timer = setTimeout(() => {
      try {
        // In a real app, this would be an API call
        const jobData = getJobById(parseInt(id));
        if (jobData) {
          setJob(jobData);
          setLoading(false);
        } else {
          setError('Job not found');
          setLoading(false);
        }
      } catch (err) {
        setError('Error fetching job data');
        setLoading(false);
      }
    }, 500);
    
    return () => clearTimeout(timer);
  }, [id]);
  
  // Mock job data and getJobById function
  const getJobById = (jobId) => {
    const jobsData = [
      {
        id: 1,
        title: 'Senior React Developer',
        company: 'TechCorp',
        location: 'New York, NY',
      },
      {
        id: 2,
        title: 'UX/UI Designer',
        company: 'Design Studio',
        location: 'Remote',
      },
      {
        id: 3,
        title: 'Full Stack Engineer',
        company: 'StartUp Inc',
        location: 'San Francisco, CA',
      }
    ];
    
    return jobsData.find(job => job.id === jobId);
  };
  
  // Handle input change
  const handleInputChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    
    if (type === 'file') {
      setFormData({
        ...formData,
        [name]: files[0]
      });
    } else if (type === 'checkbox') {
      setFormData({
        ...formData,
        [name]: checked
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
    
    // Clear error for this field if it exists
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: null
      });
    }
  };
  
  // Form validation
  const validateForm = () => {
    const errors = {};
    
    if (!formData.fullName.trim()) {
      errors.fullName = 'Full name is required';
    }
    
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email is invalid';
    }
    
    if (!formData.phone.trim()) {
      errors.phone = 'Phone number is required';
    }
    
    if (!formData.resume) {
      errors.resume = 'Resume is required';
    }
    
    if (!formData.workExperience.trim()) {
      errors.workExperience = 'Work experience is required';
    }
    
    if (!formData.education.trim()) {
      errors.education = 'Education information is required';
    }
    
    if (!formData.agreeToTerms) {
      errors.agreeToTerms = 'You must agree to terms and conditions';
    }
    
    return errors;
  };
  
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate form
    const validationErrors = validateForm();
    
    if (Object.keys(validationErrors).length > 0) {
      setFormErrors(validationErrors);
      // Scroll to the first error
      const firstErrorField = document.querySelector('.error-message');
      if (firstErrorField) {
        firstErrorField.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }
    
    // In a real app, we would send the form data to an API
    // For this demo, we'll just simulate success
    
    // Show loading indicator or disable submit button here
    
    setTimeout(() => {
      // Mark form as submitted
      setFormSubmitted(true);
      
      // Scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' });
      
      // In a real app, you might redirect to a thank you page or dashboard
      // navigate('/thank-you');
    }, 1500);
  };
  
  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading application form...</p>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="error-container">
        <div className="error-icon">
          <i className="fas fa-exclamation-circle"></i>
        </div>
        <h2>Oops! {error}</h2>
        <p>We couldn't find the job you're looking for.</p>
        <Link to="/jobs" className="btn btn-primary">
          Browse All Jobs
        </Link>
      </div>
    );
  }
  
  // Success message after form submission
  if (formSubmitted) {
    return (
      <div className="success-container">
        <div className="success-icon">
          <i className="fas fa-check-circle"></i>
        </div>
        <h2>Application Submitted!</h2>
        <p>Thank you for applying to the <strong>{job.title}</strong> position at <strong>{job.company}</strong>.</p>
        <p>We've received your application and will review it shortly. If your qualifications match our requirements, our hiring team will contact you for the next steps.</p>
        <div className="success-actions">
          <Link to="/jobs" className="btn btn-outline">
            Browse More Jobs
          </Link>
          <Link to="/dashboard" className="btn btn-primary">
            Go to Dashboard
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <div className="application-form-page">
      <div className="back-link">
        <Link to={`/jobs/${id}`}><i className="fas fa-arrow-left"></i> Back to Job Details</Link>
      </div>
      
      <div className="application-header">
        <h1>Apply for <span>{job.title}</span></h1>
        <p>at {job.company} - {job.location}</p>
      </div>
      
      <div className="application-form-container">
        <form className="application-form" onSubmit={handleSubmit}>
          <div className="form-section">
            <h2 className="section-title">Personal Information</h2>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="fullName">Full Name <span className="required">*</span></label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className={formErrors.fullName ? 'error' : ''}
                />
                {formErrors.fullName && <div className="error-message">{formErrors.fullName}</div>}
              </div>
              
              <div className="form-group">
                <label htmlFor="email">Email <span className="required">*</span></label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={formErrors.email ? 'error' : ''}
                />
                {formErrors.email && <div className="error-message">{formErrors.email}</div>}
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="phone">Phone Number <span className="required">*</span></label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className={formErrors.phone ? 'error' : ''}
                />
                {formErrors.phone && <div className="error-message">{formErrors.phone}</div>}
              </div>
              
              <div className="form-group">
                <label htmlFor="address">Address</label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>
          
          <div className="form-section">
            <h2 className="section-title">Resume & Cover Letter</h2>
            
            <div className="form-group">
              <label htmlFor="resume">Upload Resume <span className="required">*</span></label>
              <div className="file-upload">
                <input
                  type="file"
                  id="resume"
                  name="resume"
                  accept=".pdf,.doc,.docx"
                  onChange={handleInputChange}
                  className={formErrors.resume ? 'error' : ''}
                />
                <div className="file-upload-info">
                  <i className="fas fa-upload"></i>
                  <span>{formData.resume ? formData.resume.name : 'PDF, DOC or DOCX (Max 5MB)'}</span>
                </div>
              </div>
              {formErrors.resume && <div className="error-message">{formErrors.resume}</div>}
            </div>
            
            <div className="form-group">
              <label htmlFor="coverLetter">Cover Letter</label>
              <textarea
                id="coverLetter"
                name="coverLetter"
                rows="6"
                value={formData.coverLetter}
                onChange={handleInputChange}
                placeholder="Tell us why you're interested in this role and what makes you a great fit."
              ></textarea>
            </div>
          </div>
          
          <div className="form-section">
            <h2 className="section-title">Professional Profile</h2>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="linkedinProfile">LinkedIn Profile</label>
                <input
                  type="url"
                  id="linkedinProfile"
                  name="linkedinProfile"
                  value={formData.linkedinProfile}
                  onChange={handleInputChange}
                  placeholder="https://linkedin.com/in/yourprofile"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="portfolioWebsite">Portfolio Website</label>
                <input
                  type="url"
                  id="portfolioWebsite"
                  name="portfolioWebsite"
                  value={formData.portfolioWebsite}
                  onChange={handleInputChange}
                  placeholder="https://yourportfolio.com"
                />
              </div>
            </div>
            
            <div className="form-group">
              <label htmlFor="skills">Skills <span className="required">*</span></label>
              <input
                type="text"
                id="skills"
                name="skills"
                value={formData.skills}
                onChange={handleInputChange}
                placeholder="e.g. JavaScript, React, UI/UX Design, Project Management"
              />
            </div>
          </div>
          
          <div className="form-section">
            <h2 className="section-title">Work & Education</h2>
            
            <div className="form-group">
              <label htmlFor="workExperience">Work Experience <span className="required">*</span></label>
              <textarea
                id="workExperience"
                name="workExperience"
                rows="5"
                value={formData.workExperience}
                onChange={handleInputChange}
                className={formErrors.workExperience ? 'error' : ''}
                placeholder="Please list your relevant work experience including job titles, companies, dates, and key responsibilities."
              ></textarea>
              {formErrors.workExperience && <div className="error-message">{formErrors.workExperience}</div>}
            </div>
            
            <div className="form-group">
              <label htmlFor="education">Education <span className="required">*</span></label>
              <textarea
                id="education"
                name="education"
                rows="5"
                value={formData.education}
                onChange={handleInputChange}
                className={formErrors.education ? 'error' : ''}
                placeholder="Please list your educational background including degrees, institutions, and graduation dates."
              ></textarea>
              {formErrors.education && <div className="error-message">{formErrors.education}</div>}
            </div>
          </div>
          
          <div className="form-section">
            <h2 className="section-title">Additional Information</h2>
            
            <div className="form-group">
              <label htmlFor="additionalInfo">Is there anything else you would like us to know?</label>
              <textarea
                id="additionalInfo"
                name="additionalInfo"
                rows="4"
                value={formData.additionalInfo}
                onChange={handleInputChange}
                placeholder="Add any other information that might be relevant to your application."
              ></textarea>
            </div>
            
            <div className="form-group checkbox-group">
              <input
                type="checkbox"
                id="agreeToTerms"
                name="agreeToTerms"
                checked={formData.agreeToTerms}
                onChange={handleInputChange}
                className={formErrors.agreeToTerms ? 'error' : ''}
              />
              <label htmlFor="agreeToTerms">
                I agree to the <a href="/terms" target="_blank" rel="noopener noreferrer">terms and conditions</a> and <a href="/privacy" target="_blank" rel="noopener noreferrer">privacy policy</a>. <span className="required">*</span>
              </label>
              {formErrors.agreeToTerms && <div className="error-message">{formErrors.agreeToTerms}</div>}
            </div>
          </div>
          
          <div className="form-actions">
            <button type="button" onClick={() => navigate(`/jobs/${id}`)} className="btn btn-outline cancel-btn">
              Cancel
            </button>
            <button type="submit" className="btn btn-primary submit-btn">
              Submit Application
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ApplicationForm; 