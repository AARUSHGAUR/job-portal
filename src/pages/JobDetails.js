import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import '../styles/JobDetails.css';

const JobDetails = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
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
        logo: 'https://via.placeholder.com/100',
        location: 'New York, NY',
        type: 'Full-time',
        salary: '$90K - $120K',
        postedDate: '2023-04-01',
        deadline: '2023-05-01',
        description: 'We are looking for an experienced React Developer to join our front-end team. The ideal candidate should have 5+ years of experience with React and related technologies.',
        fullDescription: `
          <p>TechCorp is seeking a skilled Senior React Developer to join our growing team. As a Senior React Developer, you will work on building and maintaining high-quality web applications that provide an exceptional user experience.</p>
          
          <h3>Responsibilities:</h3>
          <ul>
            <li>Develop new user-facing features using React.js</li>
            <li>Build reusable components and front-end libraries for future use</li>
            <li>Translate designs and wireframes into high-quality code</li>
            <li>Optimize components for maximum performance across a vast array of web-capable devices and browsers</li>
            <li>Collaborate with the rest of the engineering team to design and develop new features</li>
            <li>Mentor junior developers and provide code reviews</li>
          </ul>
          
          <h3>Requirements:</h3>
          <ul>
            <li>5+ years of experience with React.js and JavaScript</li>
            <li>Strong proficiency in JavaScript, including DOM manipulation and the JavaScript object model</li>
            <li>Experience with popular React workflows (Redux, Hooks, Context API)</li>
            <li>Experience with RESTful APIs and GraphQL</li>
            <li>Familiar with modern front-end build pipelines and tools</li>
            <li>Experience with common front-end development tools such as Babel, Webpack, NPM, etc.</li>
            <li>Ability to understand business requirements and translate them into technical requirements</li>
            <li>A knack for benchmarking and optimization</li>
          </ul>
          
          <h3>Benefits:</h3>
          <ul>
            <li>Competitive salary based on experience</li>
            <li>Health, dental, and vision insurance</li>
            <li>401(k) plan with company match</li>
            <li>Flexible working hours and remote work options</li>
            <li>Professional development opportunities</li>
            <li>Casual work environment</li>
          </ul>
        `,
        skills: ['React', 'Redux', 'JavaScript', 'TypeScript', 'HTML/CSS', 'RESTful APIs', 'GraphQL'],
        companyInfo: {
          name: 'TechCorp',
          description: 'TechCorp is a leading software development company specializing in creating innovative web and mobile applications for clients across various industries.',
          website: 'https://techcorp-example.com',
          industry: 'Information Technology',
          founded: 2010,
          size: '51-200 employees',
          location: 'New York, NY'
        }
      },
      {
        id: 2,
        title: 'UX/UI Designer',
        company: 'Design Studio',
        logo: 'https://via.placeholder.com/100',
        location: 'Remote',
        type: 'Contract',
        salary: '$70K - $90K',
        postedDate: '2023-03-28',
        deadline: '2023-04-28',
        description: 'Seeking a talented UX/UI Designer to create beautiful user interfaces. The ideal candidate will have a strong portfolio demonstrating user-centered design thinking.',
        fullDescription: `
          <p>Design Studio is looking for a creative UX/UI Designer to join our team on a contract basis. In this role, you will be responsible for creating intuitive and engaging user interfaces for our clients' digital products.</p>
          
          <h3>Responsibilities:</h3>
          <ul>
            <li>Create user-centered designs by understanding business requirements, user feedback, and user research findings</li>
            <li>Design flows, prototypes, and high-fidelity mockups for websites and applications</li>
            <li>Create user interface elements such as menus, tabs, widgets, and more</li>
            <li>Create original graphic designs (e.g. images, sketches, and tables)</li>
            <li>Identify and troubleshoot UX problems</li>
            <li>Conduct layout adjustments based on user feedback</li>
            <li>Adhere to style standards on fonts, colors, and images</li>
          </ul>
          
          <h3>Requirements:</h3>
          <ul>
            <li>Proven experience as a UX/UI Designer or similar role</li>
            <li>Strong portfolio of design projects</li>
            <li>Proficiency in design software (Figma, Adobe XD, Sketch)</li>
            <li>Knowledge of wireframing tools</li>
            <li>Experience with user research and usability testing</li>
            <li>Understanding of HTML, CSS, and JavaScript is a plus</li>
            <li>Excellent communication and collaboration skills</li>
            <li>Ability to solve problems creatively and effectively</li>
          </ul>
          
          <h3>Benefits:</h3>
          <ul>
            <li>Competitive hourly rate</li>
            <li>Flexible working hours</li>
            <li>Remote work opportunity</li>
            <li>Potential for long-term engagement</li>
            <li>Work with a diverse range of clients and industries</li>
          </ul>
        `,
        skills: ['Figma', 'Adobe XD', 'Sketch', 'UI Design', 'User Research', 'Wireframing', 'Prototyping'],
        companyInfo: {
          name: 'Design Studio',
          description: 'Design Studio is a creative agency that combines aesthetics with functionality to create stunning digital experiences for clients worldwide.',
          website: 'https://designstudio-example.com',
          industry: 'Design',
          founded: 2015,
          size: '11-50 employees',
          location: 'San Francisco, CA (Remote-friendly)'
        }
      },
      {
        id: 3,
        title: 'Full Stack Engineer',
        company: 'StartUp Inc',
        logo: 'https://via.placeholder.com/100',
        location: 'San Francisco, CA',
        type: 'Full-time',
        salary: '$100K - $130K',
        postedDate: '2023-03-25',
        deadline: '2023-04-25',
        description: 'Join our dynamic team to build cutting-edge web applications. We are looking for someone who can work with both front-end and back-end technologies.',
        fullDescription: `
          <p>StartUp Inc is seeking a talented Full Stack Engineer to help build and scale our product. As a Full Stack Engineer, you will be working with a diverse team to develop new features and improve existing ones.</p>
          
          <h3>Responsibilities:</h3>
          <ul>
            <li>Design and develop web applications using JavaScript, Node.js, and React</li>
            <li>Build and maintain efficient, reusable, and reliable code</li>
            <li>Implement responsive design and ensure cross-browser compatibility</li>
            <li>Integrate user-facing elements with server-side logic</li>
            <li>Optimize applications for maximum speed and scalability</li>
            <li>Collaborate with other team members and stakeholders</li>
            <li>Participate in code reviews and contribute to team discussions</li>
          </ul>
          
          <h3>Requirements:</h3>
          <ul>
            <li>3+ years of experience as a Full Stack Developer or similar role</li>
            <li>Proficiency in JavaScript, Node.js, and React</li>
            <li>Experience with MongoDB or other NoSQL databases</li>
            <li>Knowledge of RESTful APIs and HTTP protocols</li>
            <li>Familiarity with front-end build tools like Webpack and Babel</li>
            <li>Understanding of Git version control</li>
            <li>Good problem-solving skills and attention to detail</li>
            <li>Ability to work in a fast-paced, collaborative environment</li>
          </ul>
          
          <h3>Benefits:</h3>
          <ul>
            <li>Competitive salary and equity options</li>
            <li>Health, dental, and vision insurance</li>
            <li>Unlimited PTO policy</li>
            <li>Flexible working hours</li>
            <li>Remote work options (2 days per week)</li>
            <li>Professional development budget</li>
            <li>Modern office with catered lunches</li>
            <li>Team-building events and activities</li>
          </ul>
        `,
        skills: ['JavaScript', 'Node.js', 'React', 'MongoDB', 'Express', 'RESTful APIs', 'Git'],
        companyInfo: {
          name: 'StartUp Inc',
          description: 'StartUp Inc is an innovative tech company focused on developing solutions that revolutionize the way people connect and collaborate online.',
          website: 'https://startupinc-example.com',
          industry: 'Technology',
          founded: 2018,
          size: '11-50 employees',
          location: 'San Francisco, CA'
        }
      }
    ];
    
    return jobsData.find(job => job.id === jobId);
  };
  
  // Format date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };
  
  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading job details...</p>
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
  
  return (
    <div className="job-details-page">
      <div className="back-link">
        <Link to="/jobs"><i className="fas fa-arrow-left"></i> Back to Jobs</Link>
      </div>
      
      <div className="job-details-header">
        <div className="company-logo">
          <img src={job.logo} alt={`${job.company} logo`} />
        </div>
        <div className="job-header-content">
          <h1>{job.title}</h1>
          <div className="job-meta">
            <span className="company-name"><i className="fas fa-building"></i> {job.company}</span>
            <span className="job-location"><i className="fas fa-map-marker-alt"></i> {job.location}</span>
            <span className={`job-type ${job.type.toLowerCase().replace('-', '')}`}>
              <i className="fas fa-briefcase"></i> {job.type}
            </span>
            <span className="job-salary"><i className="fas fa-money-bill-wave"></i> {job.salary}</span>
          </div>
          <div className="job-dates">
            <span className="posted-date">Posted: {formatDate(job.postedDate)}</span>
            <span className="deadline">Apply by: {formatDate(job.deadline)}</span>
          </div>
        </div>
        <div className="apply-btn-container">
          <Link to={`/apply/${job.id}`} className="btn btn-primary apply-now-btn">
            Apply Now
          </Link>
        </div>
      </div>
      
      <div className="job-details-content">
        <div className="job-main-content">
          <div className="job-description-container">
            <h2>Job Description</h2>
            <div className="job-description" dangerouslySetInnerHTML={{ __html: job.fullDescription }} />
          </div>
          
          <div className="job-skills-container">
            <h2>Skills & Expertise</h2>
            <div className="job-skills">
              {job.skills.map((skill, index) => (
                <span key={index} className="skill-tag">{skill}</span>
              ))}
            </div>
          </div>
          
          <div className="apply-section">
            <h2>Interested in this job?</h2>
            <p>Apply now and take the next step in your career journey!</p>
            <Link to={`/apply/${job.id}`} className="btn btn-primary apply-now-btn">
              Apply for this position
            </Link>
          </div>
        </div>
        
        <div className="job-sidebar">
          <div className="company-info-card">
            <h3>About {job.companyInfo.name}</h3>
            <p>{job.companyInfo.description}</p>
            <div className="company-details">
              <div className="company-detail">
                <i className="fas fa-globe"></i>
                <span>Website:</span>
                <a href={job.companyInfo.website} target="_blank" rel="noopener noreferrer">
                  {job.companyInfo.website.replace('https://', '')}
                </a>
              </div>
              <div className="company-detail">
                <i className="fas fa-industry"></i>
                <span>Industry:</span>
                <p>{job.companyInfo.industry}</p>
              </div>
              <div className="company-detail">
                <i className="fas fa-calendar-alt"></i>
                <span>Founded:</span>
                <p>{job.companyInfo.founded}</p>
              </div>
              <div className="company-detail">
                <i className="fas fa-users"></i>
                <span>Company Size:</span>
                <p>{job.companyInfo.size}</p>
              </div>
              <div className="company-detail">
                <i className="fas fa-map-marker-alt"></i>
                <span>Headquarters:</span>
                <p>{job.companyInfo.location}</p>
              </div>
            </div>
          </div>
          
          <div className="share-job-card">
            <h3>Share This Job</h3>
            <div className="share-buttons">
              <button className="share-btn facebook">
                <i className="fab fa-facebook-f"></i>
              </button>
              <button className="share-btn twitter">
                <i className="fab fa-twitter"></i>
              </button>
              <button className="share-btn linkedin">
                <i className="fab fa-linkedin-in"></i>
              </button>
              <button className="share-btn email">
                <i className="fas fa-envelope"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetails; 