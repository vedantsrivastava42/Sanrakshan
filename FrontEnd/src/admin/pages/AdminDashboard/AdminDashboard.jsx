import AdminDashboard from '../../components/AdminDashboard/AdminDashboard';

const AdminDashboardPage = () => {
  // These would typically come from an API call
  const pendingApplications = 12;
  const scheduledApplications = 8;

  return (
    <>
      <AdminDashboard 
        pendingApplications={pendingApplications}
        scheduledApplications={scheduledApplications}
      />
    </>
  );
};

export default AdminDashboardPage;
