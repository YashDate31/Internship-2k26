// Modern Lab Manuals JavaScript
let currentBranch = null;

document.addEventListener('DOMContentLoaded', function() {
    // Initialize Lucide icons
    if (window.lucide) lucide.createIcons();
    
    // Animate branch cards
    const cards = document.querySelectorAll('.branch-card');
    cards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
        card.classList.add('fade-in');
    });
});

// Function to show semester selection view
function showLabSemesterView(branchName, branchId) {
    console.log('showLabSemesterView called with:', branchName, branchId);
    
    // Store current branch
    currentBranch = { name: branchName, id: branchId };
    
    // Hide branch selection
    const branchSelection = document.getElementById('branch-selection');
    if (branchSelection) {
        branchSelection.classList.add('hidden');
    }
    
    // Show semester selection
    const semesterSelection = document.getElementById('semester-selection');
    if (semesterSelection) {
        semesterSelection.classList.remove('hidden');
    }
    
    // Update branch name in semester view
    const branchNameSpan = document.getElementById('selected-branch-name');
    if (branchNameSpan) {
        branchNameSpan.textContent = branchName;
    }
    
    // Animate semester cards
    const semesterCards = document.querySelectorAll('.semester-card');
    semesterCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
        card.classList.add('fade-in');
    });
    
    // Re-initialize Lucide icons
    if (window.lucide) lucide.createIcons();
}

// Function to go back to branch selection view
function showLabBranchView() {
    console.log('showLabBranchView called');
    
    // Show branch selection
    const branchSelection = document.getElementById('branch-selection');
    if (branchSelection) {
        branchSelection.classList.remove('hidden');
    }
    
    // Hide semester selection
    const semesterSelection = document.getElementById('semester-selection');
    if (semesterSelection) {
        semesterSelection.classList.add('hidden');
    }
    
    // Clear current branch
    currentBranch = null;
    
    // Re-initialize Lucide icons
    if (window.lucide) lucide.createIcons();
}

// Function to show lab manuals for a semester (placeholder)
function showLabManualsView(semester) {
    console.log('showLabManualsView called with semester:', semester);
    alert(`Show lab manuals for semester ${semester} of ${currentBranch ? currentBranch.name : 'Unknown Branch'}`);
}

// Make functions available globally
window.showLabSemesterView = showLabSemesterView;
window.showLabBranchView = showLabBranchView;
window.showLabManualsView = showLabManualsView;
