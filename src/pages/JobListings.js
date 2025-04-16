import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/JobListings.css';

const JobListings = () => {
  // Demo job listings data
  const jobsData = [
    {
      id: 1,
      title: 'Senior React Developer',
      company: 'TechCorp',
      logo: 'https://via.placeholder.com/50',
      location: 'New York, NY',
      type: 'Full-time',
      salary: '$90K - $120K',
      description: 'We are looking for an experienced React Developer to join our front-end team. The ideal candidate should have 5+ years of experience with React and related technologies.',
      postedDate: '2023-04-01',
      skills: ['React', 'Redux', 'JavaScript', 'TypeScript', 'HTML/CSS']
    },
    {
      id: 2,
      title: 'UX/UI Designer',
      company: 'Design Studio',
      logo: 'https://via.placeholder.com/50',
      location: 'Remote',
      type: 'Contract',
      salary: '$70K - $90K',
      description: 'Seeking a talented UX/UI Designer to create beautiful user interfaces. The ideal candidate will have a strong portfolio demonstrating user-centered design thinking.',
      postedDate: '2023-03-28',
      skills: ['Figma', 'Adobe XD', 'Sketch', 'UI Design', 'User Research']
    },
    {
      id: 3,
      title: 'Full Stack Engineer',
      company: 'StartUp Inc',
      logo: 'https://via.placeholder.com/50',
      location: 'San Francisco, CA',
      type: 'Full-time',
      salary: '$100K - $130K',
      description: 'Join our dynamic team to build cutting-edge web applications. We are looking for someone who can work with both front-end and back-end technologies.',
      postedDate: '2023-03-25',
      skills: ['JavaScript', 'Node.js', 'React', 'MongoDB', 'Express']
    },
    {
      id: 4,
      title: 'Product Manager',
      company: 'Tech Solutions',
      logo: 'https://via.placeholder.com/50',
      location: 'Boston, MA',
      type: 'Full-time',
      salary: '$110K - $140K',
      description: 'We are seeking an experienced Product Manager to lead our product development efforts. The ideal candidate will have a track record of delivering successful products.',
      postedDate: '2023-03-22',
      skills: ['Product Strategy', 'Agile', 'User Stories', 'Market Research', 'Roadmapping']
    },
    {
      id: 5,
      title: 'DevOps Engineer',
      company: 'Cloud Systems',
      logo: 'https://via.placeholder.com/50',
      location: 'Remote',
      type: 'Full-time',
      salary: '$95K - $125K',
      description: 'Looking for a DevOps Engineer to help build and maintain our cloud infrastructure. Experience with AWS, Docker, and CI/CD pipelines is required.',
      postedDate: '2023-03-20',
      skills: ['AWS', 'Docker', 'Kubernetes', 'CI/CD', 'Linux']
    },
    {
      id: 6,
      title: 'Data Scientist',
      company: 'Data Insights',
      logo: 'https://via.placeholder.com/50',
      location: 'Chicago, IL',
      type: 'Full-time',
      salary: '$105K - $135K',
      description: 'Join our data science team to analyze complex datasets and derive actionable insights. Experience with machine learning and statistical analysis is required.',
      postedDate: '2023-03-18',
      skills: ['Python', 'Machine Learning', 'SQL', 'Data Visualization', 'Statistics']
    }
  ];

  // Filters state
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedJobType, setSelectedJobType] = useState('');
  const [filteredJobs, setFilteredJobs] = useState(jobsData);

  // Handle filter application
  const applyFilters = () => {
    let filtered = jobsData;
    
    if (searchTerm) {
      filtered = filtered.filter(job => 
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    
    if (selectedLocation) {
      filtered = filtered.filter(job => 
        job.location.toLowerCase().includes(selectedLocation.toLowerCase())
      );
    }
    
    if (selectedJobType) {
      filtered = filtered.filter(job => 
        job.type.toLowerCase() === selectedJobType.toLowerCase()
      );
    }
    
    setFilteredJobs(filtered);
  };

  // Format date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    applyFilters();
  };

  // Clear all filters
  const clearFilters = () => {
    setSearchTerm('');
    setSelectedLocation('');
    setSelectedJobType('');
    setFilteredJobs(jobsData);
  };

  return (
    <div className="job-listings-page">
      <div className="jobs-header">
        <h1>Find Your Perfect Job</h1>
        <p>Browse through hundreds of job opportunities</p>
      </div>
      
      <div className="filter-container">
        <form onSubmit={handleSubmit}>
          <div className="filter-row">
            <div className="search-field">
              <i className="fas fa-search"></i>
              <input 
                type="text" 
                placeholder="Job title, company, or skill"
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </div>
            
            <div className="filter-field">
              <i className="fas fa-map-marker-alt"></i>
              <select 
                value={selectedLocation} 
                onChange={(e) => setSelectedLocation(e.target.value)}
              >
                <option value="">All Locations</option>
                <option value="new york">New York</option>
                <option value="remote">Remote</option>
                <option value="san francisco">San Francisco</option>
                <option value="boston">Boston</option>
                <option value="chicago">Chicago</option>
              </select>
            </div>
            
            <div className="filter-field">
              <i className="fas fa-briefcase"></i>
              <select 
                value={selectedJobType} 
                onChange={(e) => setSelectedJobType(e.target.value)}
              >
                <option value="">All Job Types</option>
                <option value="full-time">Full-time</option>
                <option value="contract">Contract</option>
                <option value="part-time">Part-time</option>
              </select>
            </div>
            
            <button type="submit" className="btn filter-btn">Search</button>
            <button type="button" className="btn clear-btn" onClick={clearFilters}>Clear</button>
          </div>
        </form>
      </div>
      
      <div className="jobs-container">
        <div className="jobs-count">
          <p>Showing {filteredJobs.length} job listings</p>
        </div>
        
        <div className="jobs-list">
          {filteredJobs.length > 0 ? (
            filteredJobs.map(job => (
              <div className="job-item" key={job.id}>
                <div className="job-item-header">
                  <div className="job-company-logo">
                    <img src={job.logo} alt={`${job.company} logo`} />
                  </div>
                  <div className="job-info">
                    <h2 className="job-title">{job.title}</h2>
                    <div className="job-meta">
                      <span className="company-name"><i className="fas fa-building"></i> {job.company}</span>
                      <span className="job-location"><i className="fas fa-map-marker-alt"></i> {job.location}</span>
                      <span className={`job-type ${job.type.toLowerCase().replace('-', '')}`}>
                        <i className="fas fa-briefcase"></i> {job.type}
                      </span>
                      <span className="job-salary"><i className="fas fa-money-bill-wave"></i> {job.salary}</span>
                    </div>
                  </div>
                  <div className="job-posted">
                    <span>Posted: {formatDate(job.postedDate)}</span>
                  </div>
                </div>
                
                <div className="job-description">
                  <p>{job.description}</p>
                </div>
                
                <div className="job-skills">
                  {job.skills.map((skill, index) => (
                    <span key={index} className="skill-tag">{skill}</span>
                  ))}
                </div>
                
                <div className="job-actions">
                  <Link to={`/jobs/${job.id}`} className="btn btn-outline view-btn">
                    View Details
                  </Link>
                  <Link to={`/apply/${job.id}`} className="btn apply-btn">
                    Apply Now
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <div className="no-jobs-message">
              <i className="fas fa-search"></i>
              <h3>No jobs match your search criteria</h3>
              <p>Try adjusting your filters or search terms</p>
              <button className="btn btn-outline" onClick={clearFilters}>Clear Filters</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobListings; 