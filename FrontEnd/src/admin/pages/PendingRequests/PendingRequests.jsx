import './PendingRequests.css';

const PendingRequests = () => {
  return (
    <div className="pending-requests-container">
      <h2>Pending Requests</h2>
      <div className="requests-list">
        <p>This page will display all pending NOC applications that require admin review.</p>
        {/* This would typically contain a list of pending applications */}
      </div>
    </div>
  );
};

export default PendingRequests;
