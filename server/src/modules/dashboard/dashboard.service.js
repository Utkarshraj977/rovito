import dashboardRepository from "./dashboard.repository.js";

// ========================================
// OWNER DASHBOARD
// ========================================

const getOwnerDashboard = async () => {
  const dashboard =
    await dashboardRepository.getOwnerDashboard();

  return dashboard;
};

// ========================================
// CUSTOMER DASHBOARD
// ========================================

const getCustomerDashboard = async (
  customerId
) => {
  const dashboard =
    await dashboardRepository.getCustomerDashboard(
      customerId
    );

  return dashboard;
};

export default {
  getOwnerDashboard,
  getCustomerDashboard,
};