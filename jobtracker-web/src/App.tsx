import { useState, useEffect, FormEvent, ChangeEvent } from 'react';
import './App.css';

interface JobApplication {
  id: number;
  companyName: string;
  position: string;
  status: string;
  dateApplied: string;
}

function App() {
  const [applications, setApplications] = useState<JobApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    companyName: '',
    position: '',
    dateApplied: new Date().toISOString().split('T')[0],
    jobUrl: ''
  });

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const response = await fetch('http://localhost:5160/api/jobapplications');
      const data = await response.json();
      setApplications(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching applications:', error);
      setLoading(false);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5160/api/jobapplications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        setFormData({
          companyName: '',
          position: '',
          dateApplied: new Date().toISOString().split('T')[0],
          jobUrl: ''
        });
        fetchApplications();
      }
    } catch (error) {
      console.error('Error creating application:', error);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="App">
      <h1>Job Application Tracker</h1>

      <div className="form-container">
        <h2>Add Application</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="companyName"
            placeholder="Company Name"
            value={formData.companyName}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="position"
            placeholder="Position"
            value={formData.position}
            onChange={handleChange}
            required
          />
          <input
            type="date"
            name="dateApplied"
            value={formData.dateApplied}
            onChange={handleChange}
            required
          />
          <input
            type="url"
            name="jobUrl"
            placeholder="Job URL"
            value={formData.jobUrl}
            onChange={handleChange}
          />
          <button type="submit">Add Application</button>
        </form>
      </div>

      <div className="applications-container">
        <h2>Applications</h2>
        {loading ? (
          <p>Loading...</p>
        ) : applications.length === 0 ? (
          <p>No applications yet</p>
        ) : (
          <ul>
            {applications.map((app) => (
              <li key={app.id}>
                <strong>{app.companyName}</strong> - {app.position}
                <br />
                Status: {app.status} | Applied: {new Date(app.dateApplied).toLocaleDateString()}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default App;
