// JS for Question Papers Page (prototype navigation & data)
document.addEventListener('DOMContentLoaded', function() {
    if (window.lucide) lucide.createIcons();
    window.showQPapersSemesterView = function(branchName, branchId) {
        alert(`Show question papers for ${branchName} (${branchId}) - Demo only!`);
    };
});
