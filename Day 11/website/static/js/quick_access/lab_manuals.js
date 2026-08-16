// JS for Lab Manuals Page (prototype navigation & data)
document.addEventListener('DOMContentLoaded', function() {
    if (window.lucide) lucide.createIcons();
    window.showLabManualSemesterView = function(branchName, branchId) {
        alert(`Show lab manuals for ${branchName} (${branchId}) - Demo only!`);
    };
});
