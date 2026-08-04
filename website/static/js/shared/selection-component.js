// Shared Selection Component
class SelectionComponent {
    constructor(options = {}) {
        // Default configuration
        this.config = {
            branchesContainerId: 'branches-container',
            semesterSectionId: 'semester-section',
            semestersContainerId: 'semesters-container',
            viewButtonSectionId: 'view-button-section',
            viewButtonId: 'view-resource-btn',
            resourceDisplayId: 'resource-display',
            resourceTitleId: 'resource-title',
            resourceContentId: 'resource-content',
            onSelectionChange: null,
            onViewResource: null,
            ...options
        };

        // State
        this.selectedBranch = null;
        this.selectedSemester = null;

        // Initialize
        this.init();
    }


    // Initialize the component
    init() {
        this.cacheElements();
        this.renderBranches();
        this.setupEventListeners();
    }

    // Cache DOM elements
    cacheElements() {
        this.elements = {
            branchesContainer: document.getElementById(this.config.branchesContainerId),
            semesterSection: document.getElementById(this.config.semesterSectionId),
            semestersContainer: document.getElementById(this.config.semestersContainerId),
            viewButtonSection: this.config.viewButtonSectionId ? document.getElementById(this.config.viewButtonSectionId) : null,
            viewButton: this.config.viewButtonId ? document.getElementById(this.config.viewButtonId) : null,
            resourceDisplay: this.config.resourceDisplayId ? document.getElementById(this.config.resourceDisplayId) : null,
            resourceTitle: this.config.resourceTitleId ? document.getElementById(this.config.resourceTitleId) : null,
            resourceContent: this.config.resourceContentId ? document.getElementById(this.config.resourceContentId) : null
        };
    }

    // Render branch selection cards
    renderBranches() {
        if (!this.elements.branchesContainer) return;

        this.elements.branchesContainer.innerHTML = branches.map(branch => `
            <div class="branch-card group relative overflow-hidden rounded-xl p-6 shadow-sm border border-gray-200 transition-all duration-200 hover:shadow-md hover:border-blue-500 hover:ring-2 hover:ring-blue-100 cursor-pointer"
                 data-branch="${branch.id}">
                <div class="absolute inset-0 bg-gradient-to-br ${branch.color} opacity-0 group-hover:opacity-10 transition-opacity"></div>
                <div class="relative z-10 text-center">
                    <div class="w-14 h-14 mx-auto mb-4 rounded-full bg-gradient-to-br ${branch.color} flex items-center justify-center text-white">
                        <i data-lucide="${branch.icon}" class="w-6 h-6"></i>
                    </div>
                    <h3 class="text-lg font-semibold text-gray-900 mb-1">${branch.name}</h3>
                    <p class="text-sm text-gray-500">Click to select</p>
                </div>
            </div>
        `).join('');
        
        // Initialize Lucide icons
        if (window.lucide) {
            lucide.createIcons();
        }
    }

    // Render semester selection buttons
    renderSemesters() {
        if (!this.elements.semestersContainer) return;
        
        this.elements.semestersContainer.innerHTML = semesters.map(sem => `
            <button class="semester-btn px-6 py-3 rounded-lg border-2 border-gray-200 font-medium text-gray-700 hover:border-blue-500 hover:bg-blue-50 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all"
                    data-semester="${sem.id}">
                ${sem.name}
            </button>
        `).join('');
        
        // Show semester section with animation
        if (this.elements.semesterSection) {
            this.elements.semesterSection.style.display = 'block';
            this.elements.semesterSection.style.animation = 'fadeInUp 0.5s ease-out';
        }
    }

    // Show view button
    showViewButton() {
        if (!this.elements.viewButtonSection || !this.elements.viewButton) return;
        
        this.elements.viewButtonSection.style.display = 'block';
        this.elements.viewButtonSection.style.animation = 'fadeIn 0.5s ease-out';
        
        // Scroll to view button if needed
        this.elements.viewButtonSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
    // Handle branch selection
    handleBranchSelect(branchId) {
        this.selectedBranch = branches.find(b => b.id === branchId);
        this.selectedSemester = null;
        
        // Update UI
        this.updateBranchSelectionUI(branchId);
        this.renderSemesters();
        
        // Hide view button and resource display when branch changes
        if (this.elements.viewButtonSection) {
            this.elements.viewButtonSection.style.display = 'none';
        }
        if (this.elements.resourceDisplay) {
            this.elements.resourceDisplay.style.display = 'none';
        }
        
        // Call selection change callback
        if (typeof this.config.onSelectionChange === 'function') {
            this.config.onSelectionChange({
                branch: this.selectedBranch,
                semester: this.selectedSemester
            });
        }
    }
    // Handle semester selection
    handleSemesterSelect(semesterId) {
        this.selectedSemester = semesters.find(s => s.id === semesterId);
        
        // Update UI
        this.updateSemesterSelectionUI(semesterId);
        this.showViewButton();
        
        // Call selection change callback
        if (typeof this.config.onSelectionChange === 'function') {
            this.config.onSelectionChange({
                branch: this.selectedBranch,
                semester: this.selectedSemester
            });
        }
    }
    // Update branch selection UI
    updateBranchSelectionUI(selectedBranchId) {
        const branchCards = this.elements.branchesContainer.querySelectorAll('.branch-card');
        branchCards.forEach(card => {
            const branchId = card.getAttribute('data-branch');
            if (branchId === selectedBranchId) {
                card.classList.add('ring-2', 'ring-blue-500', 'border-blue-500');
            } else {
                card.classList.remove('ring-2', 'ring-blue-500', 'border-blue-500');
            }
        });
    }
    // Update semester selection UI
    updateSemesterSelectionUI(selectedSemesterId) {
        const semesterBtns = this.elements.semestersContainer.querySelectorAll('.semester-btn');
        semesterBtns.forEach(btn => {
            const semesterId = btn.getAttribute('data-semester');
            if (semesterId === selectedSemesterId) {
                btn.classList.add('bg-blue-100', 'border-blue-500', 'text-blue-700');
            } else {
                btn.classList.remove('bg-blue-100', 'border-blue-500', 'text-blue-700');
            }
        });
    }
    // Handle view resource button click
    handleViewResource() {
        if (!this.selectedBranch || !this.selectedSemester) return;
        
        if (typeof this.config.onViewResource === 'function') {
            this.config.onViewResource({
                branch: this.selectedBranch,
                semester: this.selectedSemester
            });
        }
    }
    // Setup event listeners
    setupEventListeners() {
        // Branch selection
        if (this.elements.branchesContainer) {
            this.elements.branchesContainer.addEventListener('click', (e) => {
                const card = e.target.closest('.branch-card');
                if (card) {
                    const branchId = card.getAttribute('data-branch');
                    this.handleBranchSelect(branchId);
                }
            });
        }
        
        // Semester selection (delegated)
        if (this.elements.semestersContainer) {
            this.elements.semestersContainer.addEventListener('click', (e) => {
                const btn = e.target.closest('.semester-btn');
                if (btn) {
                    const semesterId = btn.getAttribute('data-semester');
                    this.handleSemesterSelect(semesterId);
                }
            });
        }
        
        // View resource button
        if (this.elements.viewButton) {
            this.elements.viewButton.addEventListener('click', () => this.handleViewResource());
        }
    }
    // Get current selection
    getSelection() {
        return {
            branch: this.selectedBranch,
            semester: this.selectedSemester
        };
    }
}

// Export the SelectionComponent class using ES modules
export { SelectionComponent };
