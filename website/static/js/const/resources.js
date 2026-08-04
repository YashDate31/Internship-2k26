document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const searchInput = document.querySelector('.search-container input');
    const searchButton = document.querySelector('.search-container button');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const resourceCards = document.querySelectorAll('.resource-card');
    const loadMoreBtn = document.querySelector('.load-more-btn');
    const resourcesGrid = document.querySelector('.resources-grid');
    
    // Initial state
    let visibleCards = 6; // Show first 6 cards initially
    let currentFilter = 'all';
    let currentSearchTerm = '';

    // Function to filter resources
    function filterResources() {
        resourceCards.forEach((card, index) => {
            const cardCategory = card.getAttribute('data-category');
            const cardTitle = card.querySelector('h3').textContent.toLowerCase();
            const cardDescription = card.querySelector('p').textContent.toLowerCase();
            const searchTerm = currentSearchTerm.toLowerCase();
            
            const matchesSearch = searchTerm === '' || 
                cardTitle.includes(searchTerm) || 
                cardDescription.includes(searchTerm);
                
            const matchesFilter = currentFilter === 'all' || cardCategory === currentFilter;
            
            if (matchesSearch && matchesFilter && index < visibleCards) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
        
        // Show/hide ad placeholders based on visible cards
        document.querySelectorAll('.ad-space').forEach(ad => {
            const prevCard = ad.previousElementSibling;
            if (prevCard && prevCard.style.display !== 'none') {
                ad.style.display = 'flex';
            } else {
                ad.style.display = 'none';
            }
        });
        
        // Show/hide load more button
        const totalVisible = Array.from(resourceCards).filter(card => 
            card.style.display !== 'none' && !card.classList.contains('ad-space')
        ).length;
        
        if (loadMoreBtn) {
            if (totalVisible >= resourceCards.length / 2) {
                loadMoreBtn.style.display = 'none';
            } else {
                loadMoreBtn.style.display = 'block';
            }
        }
    }
    
    // Search functionality
    function handleSearch() {
        currentSearchTerm = searchInput.value.trim();
        visibleCards = 6; // Reset to show initial set of cards
        filterResources();
    }
    
    // Event Listeners
    searchInput.addEventListener('input', handleSearch);
    searchButton.addEventListener('click', handleSearch);
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            handleSearch();
        }
    });
    
    // Filter functionality
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            // Update current filter
            currentFilter = this.getAttribute('data-filter') || 'all';
            visibleCards = 6; // Reset to show initial set of cards
            filterResources();
        });
    });
    
    // Load more functionality
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', function() {
            visibleCards += 6; // Show 6 more cards
            filterResources();
        });
    }
    
    // Add data-category attribute to resource cards based on their category
    resourceCards.forEach(card => {
        const categoryElement = card.querySelector('.resource-category');
        if (categoryElement) {
            const category = categoryElement.textContent.toLowerCase().replace(/\s+/g, '-');
            card.setAttribute('data-category', category);
        }
    });
    
    // Initialize the view
    filterResources();
});
