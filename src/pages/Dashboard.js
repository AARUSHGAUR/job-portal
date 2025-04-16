import React, { useState, useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom';
import '../styles/Dashboard.css';

const Dashboard = ({ isLoggedIn }) => {
  const [activeTab, setActiveTab] = useState('applications');
  const [applications, setApplications] = useState([]);
  const [savedJobs, setSavedJobs] = useState([]);
  const [notifications, setNotifications] = useState([]);
  
  // Mock data for the dashboard
  useEffect(() => {
    // In a real app, these would be API calls
    setApplications([
      {
        id: 1,
        jobTitle: 'Senior React Developer',
        company: 'TechCorp',
        location: 'New York, NY',
        appliedDate: '2023-04-10',
        status: 'In Review',
        statusClass: 'in-review',
        logo: 'https://via.placeholder.com/40'
      },
      {
        id: 2,
        jobTitle: 'UX/UI Designer',
        company: 'Design Studio',
        location: 'Remote',
        appliedDate: '2023-04-05',
        status: 'Interview Scheduled',
        statusClass: 'scheduled',
        logo: 'https://via.placeholder.com/40'
      },
      {
        id: 3,
        jobTitle: 'Product Manager',
        company: 'Tech Solutions',
        location: 'Boston, MA',
        appliedDate: '2023-03-28',
        status: 'Rejected',
        statusClass: 'rejected',
        logo: 'https://via.placeholder.com/40'
      }
    ]);
    
    setSavedJobs([
      {
        id: 4,
        jobTitle: 'Full Stack Engineer',
        company: 'StartUp Inc',
        location: 'San Francisco, CA',
        salary: '$100K - $130K',
        postedDate: '2023-03-25',
        logo: 'https://via.placeholder.com/40'
      },
      {
        id: 5,
        jobTitle: 'DevOps Engineer',
        company: 'Cloud Systems',
        location: 'Remote',
        salary: '$95K - $125K',
        postedDate: '2023-03-20',
        logo: 'https://via.placeholder.com/40'
      }
    ]);
    
    setNotifications([
      {
        id: 1,
        message: 'Your application for Senior React Developer has been viewed by TechCorp.',
        date: '2023-04-12',
        read: false
      },
      {
        id: 2,
        message: 'Interview scheduled for UX/UI Designer position at Design Studio. Check your email for details.',
        date: '2023-04-08',
        read: true
      },
      {
        id: 3,
        message: 'New job matching your profile: Full Stack Developer at WebTech Inc.',
        date: '2023-04-05',
        read: true
      }
    ]);
  }, []);
  
  // Redirect if not logged in
  if (!isLoggedIn) {
    return <Navigate to="/" />;
  }
  
  // Format date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };
  
  // Handle tab change
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };
  
  // Mark notification as read
  const markAsRead = (id) => {
    setNotifications(
      notifications.map(notification => 
        notification.id === id 
          ? { ...notification, read: true } 
          : notification
      )
    );
  };
  
  // Remove saved job
  const removeSavedJob = (id) => {
    setSavedJobs(savedJobs.filter(job => job.id !== id));
  };
  
  return (
    <div className="dashboard-page">
      <div className="dashboard-header">
        <h1>My Dashboard</h1>
        <p>Manage your job applications, saved jobs, and profile</p>
      </div>
      
      <div className="dashboard-container">
        <div className="dashboard-sidebar">
          <div className="user-profile">
            <div className="profile-avatar">
              <img src="https://via.placeholder.com/80" alt="User Avatar" />
            </div>
            <div className="profile-info">
              <h3>John Doe</h3>
              <p>Software Developer</p>
            </div>
            <Link to="#" className="edit-profile-link">
              <i className="fas fa-edit"></i> Edit Profile
            </Link>
          </div>
          
          <div className="dashboard-nav">
            <button 
              className={`nav-item ${activeTab === 'applications' ? 'active' : ''}`}
              onClick={() => handleTabChange('applications')}
            >
              <i className="fas fa-file-alt"></i>
              <span>My Applications</span>
              <span className="badge">{applications.length}</span>
            </button>
            
            <button 
              className={`nav-item ${activeTab === 'saved' ? 'active' : ''}`}
              onClick={() => handleTabChange('saved')}
            >
              <i className="fas fa-bookmark"></i>
              <span>Saved Jobs</span>
              <span className="badge">{savedJobs.length}</span>
            </button>
            
            <button 
              className={`nav-item ${activeTab === 'notifications' ? 'active' : ''}`}
              onClick={() => handleTabChange('notifications')}
            >
              <i className="fas fa-bell"></i>
              <span>Notifications</span>
              <span className="badge">{notifications.filter(n => !n.read).length}</span>
            </button>
            
            <button 
              className={`nav-item ${activeTab === 'profile' ? 'active' : ''}`}
              onClick={() => handleTabChange('profile')}
            >
              <i className="fas fa-user"></i>
              <span>My Profile</span>
            </button>
            
            <button 
              className={`nav-item ${activeTab === 'settings' ? 'active' : ''}`}
              onClick={() => handleTabChange('settings')}
            >
              <i className="fas fa-cog"></i>
              <span>Settings</span>
            </button>
          </div>
        </div>
        
        <div className="dashboard-content">
          {activeTab === 'applications' && (
            <div className="dashboard-section">
              <div className="section-header">
                <h2>My Applications</h2>
                <div className="section-actions">
                  <select className="filter-select">
                    <option value="all">All Applications</option>
                    <option value="in-review">In Review</option>
                    <option value="scheduled">Interview Scheduled</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </div>
              </div>
              
              {applications.length > 0 ? (
                <div className="applications-list">
                  {applications.map(application => (
                    <div className="application-card" key={application.id}>
                      <div className="application-logo">
                        <img src={application.logo} alt={`${application.company} logo`} />
                      </div>
                      <div className="application-info">
                        <h3 className="job-title">{application.jobTitle}</h3>
                        <div className="job-meta">
                          <span className="company-name">{application.company}</span>
                          <span className="job-location">{application.location}</span>
                        </div>
                        <div className="application-date">
                          Applied on {formatDate(application.appliedDate)}
                        </div>
                      </div>
                      <div className="application-status">
                        <span className={`status-badge ${application.statusClass}`}>
                          {application.status}
                        </span>
                      </div>
                      <div className="application-actions">
                        <button className="btn-icon" title="View Details">
                          <i className="fas fa-eye"></i>
                        </button>
                        <button className="btn-icon" title="Contact Recruiter">
                          <i className="fas fa-envelope"></i>
                        </button>
                        <button className="btn-icon" title="Withdraw Application">
                          <i className="fas fa-times"></i>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="empty-state">
                  <div className="empty-icon">
                    <i className="fas fa-file-alt"></i>
                  </div>
                  <h3>No applications yet</h3>
                  <p>Start applying for jobs to see your applications here.</p>
                  <Link to="/jobs" className="btn btn-primary">
                    Browse Jobs
                  </Link>
                </div>
              )}
            </div>
          )}
          
          {activeTab === 'saved' && (
            <div className="dashboard-section">
              <div className="section-header">
                <h2>Saved Jobs</h2>
              </div>
              
              {savedJobs.length > 0 ? (
                <div className="saved-jobs-list">
                  {savedJobs.map(job => (
                    <div className="saved-job-card" key={job.id}>
                      <div className="job-logo">
                        <img src={job.logo} alt={`${job.company} logo`} />
                      </div>
                      <div className="job-info">
                        <h3 className="job-title">{job.jobTitle}</h3>
                        <div className="job-meta">
                          <span className="company-name">{job.company}</span>
                          <span className="job-location">{job.location}</span>
                          <span className="job-salary">{job.salary}</span>
                        </div>
                        <div className="job-date">
                          Posted on {formatDate(job.postedDate)}
                        </div>
                      </div>
                      <div className="job-actions">
                        <Link to={`/jobs/${job.id}`} className="btn btn-outline">
                          View Job
                        </Link>
                        <Link to={`/apply/${job.id}`} className="btn btn-primary">
                          Apply Now
                        </Link>
                        <button 
                          className="btn-icon" 
                          title="Remove from saved jobs"
                          onClick={() => removeSavedJob(job.id)}
                        >
                          <i className="fas fa-trash"></i>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="empty-state">
                  <div className="empty-icon">
                    <i className="fas fa-bookmark"></i>
                  </div>
                  <h3>No saved jobs</h3>
                  <p>Save jobs you're interested in to apply later.</p>
                  <Link to="/jobs" className="btn btn-primary">
                    Browse Jobs
                  </Link>
                </div>
              )}
            </div>
          )}
          
          {activeTab === 'notifications' && (
            <div className="dashboard-section">
              <div className="section-header">
                <h2>Notifications</h2>
                <div className="section-actions">
                  <button className="btn-text">
                    Mark all as read
                  </button>
                </div>
              </div>
              
              {notifications.length > 0 ? (
                <div className="notifications-list">
                  {notifications.map(notification => (
                    <div 
                      className={`notification-item ${!notification.read ? 'unread' : ''}`} 
                      key={notification.id}
                    >
                      <div className="notification-icon">
                        <i className="fas fa-bell"></i>
                      </div>
                      <div className="notification-content">
                        <p className="notification-message">{notification.message}</p>
                        <span className="notification-date">{formatDate(notification.date)}</span>
                      </div>
                      {!notification.read && (
                        <button 
                          className="mark-read-btn" 
                          onClick={() => markAsRead(notification.id)}
                          title="Mark as read"
                        >
                          <i className="fas fa-check"></i>
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="empty-state">
                  <div className="empty-icon">
                    <i className="fas fa-bell"></i>
                  </div>
                  <h3>No notifications</h3>
                  <p>You don't have any notifications at the moment.</p>
                </div>
              )}
            </div>
          )}
          
          {activeTab === 'profile' && (
            <div className="dashboard-section">
              <div className="section-header">
                <h2>My Profile</h2>
                <div className="section-actions">
                  <button className="btn btn-primary">
                    Save Changes
                  </button>
                </div>
              </div>
              
              <div className="profile-form">
                <div className="form-section">
                  <h3 className="form-section-title">Personal Information</h3>
                  
                  <div className="form-row">
                    <div className="form-group">
                      <label>Full Name</label>
                      <input type="text" value="John Doe" readOnly />
                    </div>
                    
                    <div className="form-group">
                      <label>Email</label>
                      <input type="email" value="john.doe@example.com" readOnly />
                    </div>
                  </div>
                  
                  <div className="form-row">
                    <div className="form-group">
                      <label>Phone</label>
                      <input type="tel" value="+1 (555) 123-4567" readOnly />
                    </div>
                    
                    <div className="form-group">
                      <label>Location</label>
                      <input type="text" value="New York, NY" readOnly />
                    </div>
                  </div>
                </div>
                
                <div className="form-section">
                  <h3 className="form-section-title">Professional Information</h3>
                  
                  <div className="form-group">
                    <label>Current Title</label>
                    <input type="text" value="Software Developer" readOnly />
                  </div>
                  
                  <div className="form-group">
                    <label>Skills</label>
                    <input type="text" value="JavaScript, React, Node.js, HTML, CSS" readOnly />
                  </div>
                  
                  <div className="form-group">
                    <label>Experience</label>
                    <textarea readOnly>
Senior Software Developer at ABC Tech (2018 - Present)
- Developed and maintained web applications using React and Node.js
- Led a team of 3 developers on various projects
                      
Frontend Developer at XYZ Inc (2015 - 2018)
- Created responsive user interfaces using HTML, CSS, and JavaScript
- Collaborated with designers to implement UI/UX improvements
                    </textarea>
                  </div>
                  
                  <div className="form-group">
                    <label>Education</label>
                    <textarea readOnly>
Master of Computer Science, University of Technology (2013 - 2015)
                      
Bachelor of Computer Science, State University (2009 - 2013)
                    </textarea>
                  </div>
                </div>
                
                <div className="form-section">
                  <h3 className="form-section-title">Resume</h3>
                  
                  <div className="resume-preview">
                    <i className="fas fa-file-pdf"></i>
                    <span className="file-name">john_doe_resume.pdf</span>
                    <div className="resume-actions">
                      <button className="btn btn-sm">View</button>
                      <button className="btn btn-sm">Update</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'settings' && (
            <div className="dashboard-section">
              <div className="section-header">
                <h2>Settings</h2>
              </div>
              
              <div className="settings-form">
                <div className="form-section">
                  <h3 className="form-section-title">Notification Preferences</h3>
                  
                  <div className="setting-item">
                    <div className="setting-info">
                      <h4>Job Recommendations</h4>
                      <p>Receive personalized job recommendations based on your profile and preferences.</p>
                    </div>
                    <div className="setting-toggle">
                      <input type="checkbox" id="job-recommendations" defaultChecked />
                      <label htmlFor="job-recommendations"></label>
                    </div>
                  </div>
                  
                  <div className="setting-item">
                    <div className="setting-info">
                      <h4>Application Updates</h4>
                      <p>Receive notifications when there's an update on your job applications.</p>
                    </div>
                    <div className="setting-toggle">
                      <input type="checkbox" id="application-updates" defaultChecked />
                      <label htmlFor="application-updates"></label>
                    </div>
                  </div>
                  
                  <div className="setting-item">
                    <div className="setting-info">
                      <h4>Marketing Emails</h4>
                      <p>Receive news, updates, and promotional content from JobHub.</p>
                    </div>
                    <div className="setting-toggle">
                      <input type="checkbox" id="marketing-emails" />
                      <label htmlFor="marketing-emails"></label>
                    </div>
                  </div>
                </div>
                
                <div className="form-section">
                  <h3 className="form-section-title">Privacy Settings</h3>
                  
                  <div className="setting-item">
                    <div className="setting-info">
                      <h4>Profile Visibility</h4>
                      <p>Allow employers to find and view your profile.</p>
                    </div>
                    <div className="setting-toggle">
                      <input type="checkbox" id="profile-visibility" defaultChecked />
                      <label htmlFor="profile-visibility"></label>
                    </div>
                  </div>
                  
                  <div className="setting-item">
                    <div className="setting-info">
                      <h4>Resume Visibility</h4>
                      <p>Allow employers to download your resume.</p>
                    </div>
                    <div className="setting-toggle">
                      <input type="checkbox" id="resume-visibility" />
                      <label htmlFor="resume-visibility"></label>
                    </div>
                  </div>
                </div>
                
                <div className="form-section">
                  <h3 className="form-section-title">Account Settings</h3>
                  
                  <div className="account-setting-item">
                    <button className="btn-text">Change Password</button>
                  </div>
                  
                  <div className="account-setting-item">
                    <button className="btn-text">Delete Account</button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 