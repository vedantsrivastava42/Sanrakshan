import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../../Context/AuthContext';
import './ApplyNOC.css'

const ApplyNOC = () => {
  const { user } = useAuth();
  const [infraInfo, setInfraInfo] = useState('');
  const [panFile, setPanFile] = useState(null);
  const [aadharFile, setAadharFile] = useState(null);
  const [otherDocs, setOtherDocs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [name, setName] = useState(user?.name || '');

  const handleOtherDocsChange = (e) => {
    setOtherDocs(Array.from(e.target.files));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    try {
      // Upload PAN
      const panForm = new FormData();
      panForm.append('document', panFile);
      const panRes = await axios.post('http://localhost:4000/api/approvals/upload', panForm);
      // Upload Aadhar
      const aadharForm = new FormData();
      aadharForm.append('document', aadharFile);
      const aadharRes = await axios.post('http://localhost:4000/api/approvals/upload', aadharForm);
      // Upload other docs
      const otherDocUrls = [];
      for (let doc of otherDocs) {
        const docForm = new FormData();
        docForm.append('document', doc);
        const docRes = await axios.post('http://localhost:4000/api/approvals/upload', docForm);
        otherDocUrls.push(docRes.data.fileUrl);
      }
      // Send all info to backend
      const payload = {
        userId: user?.userId, // Ensure userId is included
        document: panRes.data.fileUrl, // Use PAN as main document
        name,
        email: user?.email,
        infraInfo,
        panUrl: panRes.data.fileUrl,
        aadharUrl: aadharRes.data.fileUrl,
        otherDocs: otherDocUrls
      };
      await axios.post('http://localhost:4000/api/approvals', payload);
      setMessage('Application submitted successfully!');
    } catch (err) {
      setMessage('Error submitting application.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="apply-noc-form" style={{maxWidth: 500, margin: '40px auto', padding: 24, background: '#fff', borderRadius: 8, boxShadow: '0 2px 8px #eee'}}>
      <h2>Apply for Fire NOC</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="noc-name">Name:</label>
        <input id="noc-name" name="noc-name" type="text" value={name} onChange={e => setName(e.target.value)} style={{marginBottom: 10}} />
        <label htmlFor="noc-email">Email:</label>
        <input id="noc-email" name="noc-email" type="email" value={user?.email || ''} readOnly style={{marginBottom: 10}} />
        <label htmlFor="noc-infra">Infrastructure Info:</label>

        <textarea id="noc-infra" name="noc-infra" value={infraInfo} onChange={e => setInfraInfo(e.target.value)} required style={{marginBottom: 10}} />
        <label htmlFor="noc-pan">PAN Card:</label>

        <label className="custom-file-label" htmlFor="noc-pan">
          Choose PAN Card
          <input id="noc-pan" name="noc-pan" type="file" accept="image/*,.pdf" onChange={e => setPanFile(e.target.files[0])} required />
        </label>
        {panFile && <span className="file-name">{panFile.name}</span>}
        <label htmlFor="noc-aadhar">Aadhar Card:</label>
        <label className="custom-file-label" htmlFor="noc-aadhar">
          Choose Aadhar Card
          <input id="noc-aadhar" name="noc-aadhar" type="file" accept="image/*,.pdf" onChange={e => setAadharFile(e.target.files[0])} required />
        </label>
        {aadharFile && <span className="file-name">{aadharFile.name}</span>}
        <label htmlFor="noc-other-docs">Other Required Documents:</label>
        <label className="custom-file-label" htmlFor="noc-other-docs">
          Choose Files
          <input id="noc-other-docs" name="noc-other-docs" type="file" accept="image/*,.pdf" multiple onChange={handleOtherDocsChange} />
        </label>
        {otherDocs.length > 0 && <span className="file-name">{otherDocs.map(f => f.name).join(', ')}</span>}
        <button type="submit" disabled={loading} style={{marginTop: 10, padding: '8px 24px', background: '#007bff', color: '#fff', border: 'none', borderRadius: 4}}>
          {loading ? 'Submitting...' : 'Submit'}
        </button>
      </form>
      {message && <div style={{marginTop: 16, color: message.includes('success') ? 'green' : 'red'}}>{message}</div>}
      <div className="noc-doc-info" style={{marginTop: 32, padding: 18, background: '#f6f8fa', borderRadius: 6, boxShadow: '0 1px 4px #eee'}}>
        <h3 style={{color: '#007bff', marginBottom: 12}}>Required Documents for Fire NOC Application</h3>
        <ul style={{paddingLeft: 18, marginBottom: 10}}>
          <li><strong>PAN Card:</strong> Proof of identity for the applicant or organization.</li>
          <li><strong>Aadhar Card:</strong> Proof of address and identity for the applicant.</li>
          <li><strong>Building Layout Plan:</strong> Detailed architectural plan showing all floors, exits, fire safety equipment, and emergency routes.</li>
          <li><strong>Structural Safety Certificate:</strong> Certificate from a licensed structural engineer confirming the building's safety standards.</li>
          <li><strong>Fire Safety Equipment Details:</strong> List and specifications of installed fire extinguishers, alarms, sprinklers, and other safety devices.</li>
          <li><strong>Water Supply Certificate:</strong> Proof of adequate water supply for firefighting purposes.</li>
          <li><strong>Ownership/Occupancy Proof:</strong> Property ownership documents or lease agreement.</li>
          <li><strong>Previous NOC (if applicable):</strong> Copy of any previously issued Fire NOC for the premises.</li>
          <li><strong>Photographs of Premises:</strong> Recent photographs showing key safety installations and building exterior.</li>
          <li><strong>Declaration Form:</strong> Signed declaration stating all information provided is true and complete.</li>
        </ul>
        <p style={{fontSize: '15px', color: '#333'}}>
          <strong>Note:</strong> All documents must be clear, legible, and in PDF or image format. Incomplete or incorrect submissions may result in delays or rejection of your application.
        </p>
      </div>
    </div>
  );
};

export default ApplyNOC;
