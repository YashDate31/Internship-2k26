// Day 35: Power BI Analytics Data Formatter & Config for College Sahayak
// Formats analytics data for Power BI Dashboard & Mobile view

const analyticsData = {
  dashboardTitle: "College Sahayak Analytics",
  totalUsers: 1420,
  activeNotesDownloads: 8950,
  popularSubjects: [
    { name: "Data Structures", downloads: 3200 },
    { name: "Database Management Systems", downloads: 2800 },
    { name: "Operating Systems", downloads: 1650 },
    { name: "Computer Networks", downloads: 1300 }
  ],
  mobileViewConfig: {
    layout: "single-column",
    slicersEnabled: true,
    quickSummaryCards: ["Total Notes", "Active Students", "PYQs Downloaded"]
  }
};

console.log("College Sahayak Power BI Analytics Config:", JSON.stringify(analyticsData, null, 2));
