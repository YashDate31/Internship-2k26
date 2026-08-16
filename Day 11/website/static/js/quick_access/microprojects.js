// JS for Micro-Projects Page (prototype navigation & data)
document.addEventListener('DOMContentLoaded', function() {
    if (window.lucide) lucide.createIcons();
    window.showMicroprojectSemesterView = function(branchName, branchId) {
        alert(`Show micro-projects for ${branchName} (${branchId}) - Demo only!`);
    };
});
