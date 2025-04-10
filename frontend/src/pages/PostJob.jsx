import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function PostJob() {
  const [title, setTitle] = useState('');
  const [company, setCompany] = useState('');
  const [location, setLocation] = useState('');
  const [salary, setSalary] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token');
      const res = await axios.post('http://localhost:5000/api/jobs', {
        title,
        company,
        location,
        salary,
        description,
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      alert('Job posted successfully!');
      navigate('/jobs');
    } catch (err) {
      alert(err.response?.data?.message || 'Job post failed');
    }
  };

  return (
    <div className="card mx-auto" style={{ maxWidth: '600px' }}>
      <div className="card-body">
        <h3 className="mb-3">Post a Job</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-2">
            <input className="form-control" placeholder="Job Title" required
              value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>
          <div className="mb-2">
            <input className="form-control" placeholder="Company" required
              value={company} onChange={(e) => setCompany(e.target.value)} />
          </div>
          <div className="mb-2">
            <input className="form-control" placeholder="Location" required
              value={location} onChange={(e) => setLocation(e.target.value)} />
          </div>
          <div className="mb-2">
            <input className="form-control" placeholder="Salary" required
              value={salary} onChange={(e) => setSalary(e.target.value)} />
          </div>
          <div className="mb-3">
            <textarea className="form-control" placeholder="Job Description" rows="4" required
              value={description} onChange={(e) => setDescription(e.target.value)} />
          </div>
          <button className="btn btn-success w-100">Post Job</button>
        </form>
      </div>
    </div>
  );
}

export default PostJob;
