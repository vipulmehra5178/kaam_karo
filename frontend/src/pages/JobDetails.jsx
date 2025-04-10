import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function JobDetails() {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [resume, setResume] = useState(null);
  const [successMsg, setSuccessMsg] = useState('');
  const [loading, setLoading] = useState(true); // <== NEW

  useEffect(() => {
    console.log("Fetching job with ID:", id);
    axios.get(`http://localhost:5000/api/jobs/${id}`)
      .then((res) => {
        console.log("Job fetched:", res.data);
        setJob(res.data);
        setLoading(false); // <== SET loading false here
      })
      .catch((err) => {
        console.error("Error fetching job:", err);
        setLoading(false);
      });
  }, [id]);

  const handleApply = async (e) => {
    e.preventDefault();
    if (!resume) return alert("Please upload a resume.");

    const formData = new FormData();
    formData.append("resume", resume);

    try {
      const token = localStorage.getItem('token');
      await axios.post(`http://localhost:5000/api/applications/${job._id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });

      setSuccessMsg('Application submitted successfully!');
    } catch (err) {
      alert(err.response?.data?.message || 'Application failed');
    }
  };

  // 👇 Conditional Rendering
  if (loading) return <p>Loading...</p>;
  if (!job || !job.title) return <p>Job not found.</p>;

  return (
    <div className="container">
      <h2>{job.title}</h2>
      <h5 className="text-muted">{job.company} - {job.location}</h5>
      <p className="fw-bold text-success">Salary: {job.salary}</p>
      <p>{job.description}</p>

      <hr />
      <h4>Apply for this job</h4>
      {successMsg && <div className="alert alert-success">{successMsg}</div>}
      <form onSubmit={handleApply}>
        <div className="mb-3">
          <input
            type="file"
            name="resume"
            className="form-control"
            accept=".pdf,.doc,.docx"
            onChange={(e) => setResume(e.target.files[0])}
            required
          />
        </div>
        <button className="btn btn-primary" type="submit">Submit Application</button>
      </form>
    </div>
  );
}

export default JobDetails;
