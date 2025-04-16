import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Home.css';

const Home = () => {
  // Demo featured jobs
  const featuredJobs = [
    {
      id: 1,
      title: 'Senior React Developer',
      company: 'TechCorp',
      location: 'New York, NY',
      type: 'Full-time',
      description: 'We are looking for an experienced React Developer to join our front-end team...'
    },
    {
      id: 2,
      title: 'UX/UI Designer',
      company: 'Design Studio',
      location: 'Remote',
      type: 'Contract',
      description: 'Seeking a talented UX/UI Designer to create beautiful user interfaces...'
    },
    {
      id: 3,
      title: 'Full Stack Engineer',
      company: 'StartUp Inc',
      location: 'San Francisco, CA',
      type: 'Full-time',
      description: 'Join our dynamic team to build cutting-edge web applications...'
    }
  ];

  return (
    <div className="home-page">
      <section className="hero-section">
        <div className="hero-content">
          <h1>Find Your Dream Job</h1>
          <p>Browse thousands of job listings and find the perfect match for your skills and experience.</p>
          <div className="search-container">
            <input
              type="text"
              className="search-input"
              placeholder="Job title, keywords, or company"
            />
            <select className="search-select">
              <option value="">All Locations</option>
              <option value="new-york">New York</option>
              <option value="remote">Remote</option>
              <option value="san-francisco">San Francisco</option>
              <option value="london">London</option>
            </select>
            <Link to="/jobs" className="btn search-btn">Search Jobs</Link>
          </div>
        </div>
      </section>

      <section className="categories-section">
        <div className="container">
          <h2 className="section-title">Popular Categories</h2>
          <div className="categories-grid">
            <div className="category-card">
              <i className="fas fa-laptop-code"></i>
              <h3>Web Development</h3>
              <p>143 Jobs Available</p>
            </div>
            <div className="category-card">
              <i className="fas fa-mobile-alt"></i>
              <h3>Mobile Development</h3>
              <p>98 Jobs Available</p>
            </div>
            <div className="category-card">
              <i className="fas fa-paint-brush"></i>
              <h3>Design</h3>
              <p>165 Jobs Available</p>
            </div>
            <div className="category-card">
              <i className="fas fa-database"></i>
              <h3>Data Science</h3>
              <p>127 Jobs Available</p>
            </div>
            <div className="category-card">
              <i className="fas fa-chart-line"></i>
              <h3>Marketing</h3>
              <p>112 Jobs Available</p>
            </div>
            <div className="category-card">
              <i className="fas fa-headset"></i>
              <h3>Customer Support</h3>
              <p>78 Jobs Available</p>
            </div>
          </div>
        </div>
      </section>

      <section className="featured-jobs-section">
        <div className="container">
          <h2 className="section-title">Featured Jobs</h2>
          <div className="featured-jobs-grid">
            {featuredJobs.map(job => (
              <div className="job-card" key={job.id}>
                <div className="job-card-header">
                  <h3 className="job-title">{job.title}</h3>
                  <span className={`job-type ${job.type.toLowerCase().replace('-', '')}`}>
                    {job.type}
                  </span>
                </div>
                <div className="job-info">
                  <p className="job-company"><i className="fas fa-building"></i> {job.company}</p>
                  <p className="job-location"><i className="fas fa-map-marker-alt"></i> {job.location}</p>
                </div>
                <p className="job-description">{job.description}</p>
                <div className="job-actions">
                  <Link to={`/jobs/${job.id}`} className="btn btn-outline view-details-btn">
                    View Details
                  </Link>
                  <Link to={`/apply/${job.id}`} className="btn apply-btn">
                    Apply Now
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <div className="view-all-container">
            <Link to="/jobs" className="btn btn-outline view-all-btn">
              View All Jobs
            </Link>
          </div>
        </div>
      </section>

      <section className="how-it-works-section">
        <div className="container">
          <h2 className="section-title">How It Works</h2>
          <div className="steps-container">
            <div className="step">
              <div className="step-icon">
                <i className="fas fa-user-circle"></i>
                <span className="step-number">1</span>
              </div>
              <h3>Create Account</h3>
              <p>Sign up for free and set up your profile to showcase your skills and experience.</p>
            </div>
            <div className="step">
              <div className="step-icon">
                <i className="fas fa-search"></i>
                <span className="step-number">2</span>
              </div>
              <h3>Find Jobs</h3>
              <p>Browse and search for jobs that match your skills, experience, and preferences.</p>
            </div>
            <div className="step">
              <div className="step-icon">
                <i className="fas fa-file-alt"></i>
                <span className="step-number">3</span>
              </div>
              <h3>Apply</h3>
              <p>Submit your application with your resume and cover letter to potential employers.</p>
            </div>
            <div className="step">
              <div className="step-icon">
                <i className="fas fa-check-circle"></i>
                <span className="step-number">4</span>
              </div>
              <h3>Get Hired</h3>
              <p>Interview with companies and receive job offers for your dream position.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to take the next step in your career?</h2>
            <p>Join thousands of job seekers who have found their dream jobs through JobHub.</p>
            <Link to="/jobs" className="btn cta-btn">
              Find Jobs Now
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home; 