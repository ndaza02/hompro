// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

document.addEventListener('DOMContentLoaded', () => {
    // Hero Animations
    const tl = gsap.timeline();

    tl.from('#hero-title', {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: 'power3.out',
        delay: 0.2
    })
        .from('#hero-subtitle', {
            opacity: 0,
            y: 30,
            duration: 1,
            ease: 'power3.out'
        }, '-=0.6')
        .from('#hero-cta', {
            opacity: 0,
            y: 30,
            duration: 1,
            ease: 'power3.out'
        }, '-=0.6');

    // Parallax Effect for Hero Background
    gsap.to('#hero-bg', {
        scrollTrigger: {
            trigger: '#hero',
            start: 'top top',
            end: 'bottom top',
            scrub: true
        },
        y: 100,
        scale: 1.1
    });

    // Ensure hero video starts playing (in case autoplay is blocked)
    const heroVideo = document.getElementById('hero-bg');
    if (heroVideo && heroVideo.tagName.toLowerCase() === 'video' && typeof heroVideo.play === 'function') {
        const tryPlayHeroVideo = () => {
            const playPromise = heroVideo.play();
            if (playPromise && typeof playPromise.then === 'function') {
                playPromise.catch(() => {
                    // Autoplay may be blocked; in that case the poster will remain visible
                });
            }
        };

        if (heroVideo.readyState >= 2) {
            tryPlayHeroVideo();
        } else {
            heroVideo.addEventListener('canplay', tryPlayHeroVideo, { once: true });
        }
    }

    // Navbar Scroll Effect
    ScrollTrigger.create({
        start: 'top -80',
        end: 99999,
        // Toggle a single extra shadow class on scroll to avoid DOMTokenList errors
        toggleClass: { className: 'shadow-md', targets: '#navbar' }
    });

    const mobileNavToggle = document.querySelector('[data-mobile-nav-toggle]');
    const mobileNavPanel = document.querySelector('[data-mobile-nav-panel]');
    const mobileNavIconOpen = document.querySelector('[data-mobile-nav-icon-open]');
    const mobileNavIconClose = document.querySelector('[data-mobile-nav-icon-close]');
    const mobileNavLinks = Array.from(document.querySelectorAll('[data-mobile-nav-link]'));

    if (mobileNavToggle && mobileNavPanel) {
        const closeMobileNav = () => {
            mobileNavPanel.classList.add('hidden');
            mobileNavToggle.setAttribute('aria-expanded', 'false');
            if (mobileNavIconOpen) mobileNavIconOpen.classList.remove('hidden');
            if (mobileNavIconClose) mobileNavIconClose.classList.add('hidden');
        };

        const openMobileNav = () => {
            mobileNavPanel.classList.remove('hidden');
            mobileNavToggle.setAttribute('aria-expanded', 'true');
            if (mobileNavIconOpen) mobileNavIconOpen.classList.add('hidden');
            if (mobileNavIconClose) mobileNavIconClose.classList.remove('hidden');
        };

        mobileNavToggle.addEventListener('click', () => {
            const isOpen = mobileNavToggle.getAttribute('aria-expanded') === 'true';
            if (isOpen) {
                closeMobileNav();
            } else {
                openMobileNav();
            }
        });

        mobileNavLinks.forEach((link) => {
            link.addEventListener('click', () => {
                closeMobileNav();
            });
        });

        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape') {
                closeMobileNav();
            }
        });
    }

    // Features Animation
    gsap.from('.feature-card', {
        scrollTrigger: {
            trigger: '#features',
            start: 'top 80%',
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out'
    });

    // Contact Section Animation
    gsap.from('#contact > div', {
        scrollTrigger: {
            trigger: '#contact',
            start: 'top 80%',
        },
        y: 30,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
    });

    // Product Details Modal Logic
    const productCards = document.querySelectorAll('[data-product-card]');
    const productModal = document.getElementById('product-modal');
    const productModalImage = document.getElementById('product-modal-image');
    const productModalTitle = document.getElementById('product-modal-title');
    const productModalCategory = document.getElementById('product-modal-category');
    const productModalPrice = document.getElementById('product-modal-price');
    const productModalDescription = document.getElementById('product-modal-description');
    const productModalSpecsSection = document.getElementById('product-modal-specs-section');
    const productModalSpecs = document.getElementById('product-modal-specs');
    const productModalUsesSection = document.getElementById('product-modal-uses-section');
    const productModalUses = document.getElementById('product-modal-uses');
    const productModalClose = document.getElementById('product-modal-close');
    const productModalPanel = productModal ? productModal.querySelector('[data-modal-panel]') : null;

    if (productModal && productCards.length > 0) {
        const openProductModal = (card) => {
            const name = card.getAttribute('data-product-name') || '';
            const category = card.getAttribute('data-product-category') || '';
            const price = card.getAttribute('data-product-price') || '';
            const image = card.getAttribute('data-product-image') || '';
            const description = card.getAttribute('data-product-description') || '';
            const specs = card.getAttribute('data-product-specs') || '';
            const uses = card.getAttribute('data-product-uses') || '';

            if (productModalTitle) productModalTitle.textContent = name;
            if (productModalCategory) productModalCategory.textContent = category;
            if (productModalPrice) productModalPrice.textContent = price;
            if (productModalDescription) productModalDescription.textContent = description;
            if (productModalImage && image) {
                productModalImage.src = image;
                productModalImage.alt = name || 'Product image';
            }

            // Populate key specs as small tags
            if (productModalSpecs && productModalSpecsSection) {
                productModalSpecs.innerHTML = '';
                const specItems = specs.split('|').map(item => item.trim()).filter(Boolean);

                if (specItems.length > 0) {
                    specItems.forEach(text => {
                        const span = document.createElement('span');
                        span.className = 'inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700';
                        span.textContent = text;
                        productModalSpecs.appendChild(span);
                    });
                    productModalSpecsSection.classList.remove('hidden');
                } else {
                    productModalSpecsSection.classList.add('hidden');
                }
            }

            // Populate best-for list
            if (productModalUses && productModalUsesSection) {
                productModalUses.innerHTML = '';
                const useItems = uses.split('|').map(item => item.trim()).filter(Boolean);

                if (useItems.length > 0) {
                    useItems.forEach(text => {
                        const li = document.createElement('li');
                        li.className = 'text-xs text-slate-600';
                        li.textContent = text;
                        productModalUses.appendChild(li);
                    });
                    productModalUsesSection.classList.remove('hidden');
                } else {
                    productModalUsesSection.classList.add('hidden');
                }
            }

            productModal.classList.remove('hidden');
            document.body.classList.add('overflow-hidden');

            if (productModalPanel) {
                gsap.fromTo(productModalPanel,
                    { opacity: 0, y: 40, scale: 0.97 },
                    { opacity: 1, y: 0, scale: 1, duration: 0.35, ease: 'power3.out' }
                );
            }
        };

        const closeProductModal = () => {
            if (productModalPanel) {
                gsap.to(productModalPanel, {
                    opacity: 0,
                    y: 40,
                    scale: 0.97,
                    duration: 0.25,
                    ease: 'power2.inOut',
                    onComplete: () => {
                        productModal.classList.add('hidden');
                        document.body.classList.remove('overflow-hidden');
                        gsap.set(productModalPanel, { opacity: 1, y: 0, scale: 1 });
                    }
                });
            } else {
                productModal.classList.add('hidden');
                document.body.classList.remove('overflow-hidden');
            }
        };

        productCards.forEach((card) => {
            card.addEventListener('click', (event) => {
                // Allow direct clicks on links inside the card to behave normally
                const link = event.target.closest('a');
                if (link && card.contains(link)) {
                    return;
                }
                openProductModal(card);
            });
        });

        if (productModalClose) {
            productModalClose.addEventListener('click', () => {
                closeProductModal();
            });
        }

        // Close when clicking backdrop
        productModal.addEventListener('click', (event) => {
            if (event.target === productModal) {
                closeProductModal();
            }
        });

        // Close on Escape key
        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape' && !productModal.classList.contains('hidden')) {
                closeProductModal();
            }
        });
    }

    const productGrid = document.getElementById('product-grid');
    if (productGrid) {
        const productCardsArray = Array.from(productGrid.querySelectorAll('[data-product-card]'));
        const searchInput = document.getElementById('product-search');
        const categoryCheckboxes = Array.from(document.querySelectorAll('input[data-filter="category"]'));
        const availabilityCheckboxes = Array.from(document.querySelectorAll('input[data-filter="availability"]'));
        const priceMinInput = document.getElementById('price-min');
        const priceMaxInput = document.getElementById('price-max');
        const priceRangeInput = document.getElementById('price-range');
        const sortSelect = document.getElementById('sort-select');
        const productCountEl = document.getElementById('product-count');
        const productTotalEl = document.getElementById('product-total');

        const products = productCardsArray.map((card, index) => {
            const name = card.getAttribute('data-product-name') || '';
            const category = (card.getAttribute('data-product-category') || '').toLowerCase();
            const description = (card.getAttribute('data-product-description') || '').toLowerCase();
            const priceStr = card.getAttribute('data-product-price') || '';
            const price = parseFloat(priceStr.replace(/[^0-9.]/g, '')) || 0;
            const availability = (card.getAttribute('data-product-availability') || 'in-stock').toLowerCase();

            return { card, index, name, category, description, price, availability };
        });

        const totalCount = products.length;
        if (productTotalEl) {
            productTotalEl.textContent = totalCount.toString();
        }

        const prices = products.map((p) => p.price);
        const minPrice = prices.length ? Math.min(...prices) : 0;
        const maxPrice = prices.length ? Math.max(...prices) : 0;

        if (priceMinInput && !priceMinInput.value && prices.length) {
            priceMinInput.value = Math.floor(minPrice).toString();
        }
        if (priceMaxInput && !priceMaxInput.value && prices.length) {
            const roundedMax = Math.ceil(maxPrice);
            priceMaxInput.value = roundedMax.toString();
            if (priceRangeInput) {
                priceRangeInput.value = roundedMax.toString();
            }
        }
        if (priceRangeInput && prices.length) {
            priceRangeInput.min = Math.floor(minPrice).toString();
            priceRangeInput.max = Math.ceil(maxPrice).toString();
            if (!priceRangeInput.value) {
                priceRangeInput.value = Math.ceil(maxPrice).toString();
            }
        }

        const applyFiltersAndSort = () => {
            const searchTerm = searchInput ? searchInput.value.trim().toLowerCase() : '';
            const activeCategories = categoryCheckboxes
                .filter((cb) => cb.checked)
                .map((cb) => cb.value.toLowerCase());
            const activeAvailabilities = availabilityCheckboxes
                .filter((cb) => cb.checked)
                .map((cb) => cb.value.toLowerCase());

            const min = priceMinInput && priceMinInput.value ? parseFloat(priceMinInput.value) : null;
            const max = priceMaxInput && priceMaxInput.value ? parseFloat(priceMaxInput.value) : null;
            const sortValue = sortSelect ? sortSelect.value : 'featured';

            let filtered = products.filter((p) => {
                if (searchTerm) {
                    const haystack = (p.name + ' ' + p.category + ' ' + p.description).toLowerCase();
                    if (!haystack.includes(searchTerm)) {
                        return false;
                    }
                }

                if (activeCategories.length > 0 && !activeCategories.includes(p.category)) {
                    return false;
                }

                if (activeAvailabilities.length > 0 && !activeAvailabilities.includes(p.availability)) {
                    return false;
                }

                if (min !== null && p.price < min) {
                    return false;
                }
                if (max !== null && p.price > max) {
                    return false;
                }

                return true;
            });

            if (sortValue === 'price-asc') {
                filtered.sort((a, b) => a.price - b.price);
            } else if (sortValue === 'price-desc') {
                filtered.sort((a, b) => b.price - a.price);
            } else if (sortValue === 'newest') {
                filtered.sort((a, b) => b.index - a.index);
            } else {
                filtered.sort((a, b) => a.index - b.index);
            }

            productGrid.innerHTML = '';
            filtered.forEach((p) => {
                productGrid.appendChild(p.card);
            });

            if (productCountEl) {
                productCountEl.textContent = filtered.length.toString();
            }
        };

        if (searchInput) {
            searchInput.addEventListener('input', () => {
                applyFiltersAndSort();
            });
        }

        categoryCheckboxes.forEach((cb) => {
            cb.addEventListener('change', () => {
                applyFiltersAndSort();
            });
        });

        availabilityCheckboxes.forEach((cb) => {
            cb.addEventListener('change', () => {
                applyFiltersAndSort();
            });
        });

        if (priceMinInput) {
            priceMinInput.addEventListener('change', () => {
                applyFiltersAndSort();
            });
        }

        if (priceMaxInput) {
            priceMaxInput.addEventListener('change', () => {
                if (priceRangeInput && priceMaxInput.value) {
                    priceRangeInput.value = priceMaxInput.value;
                }
                applyFiltersAndSort();
            });
        }

        if (priceRangeInput) {
            priceRangeInput.addEventListener('input', () => {
                if (priceMaxInput) {
                    priceMaxInput.value = priceRangeInput.value;
                }
                applyFiltersAndSort();
            });
        }

        if (sortSelect) {
            sortSelect.addEventListener('change', () => {
                applyFiltersAndSort();
            });
        }

        applyFiltersAndSort();
    }
});

// Mobile Filters Drawer
const mobileFiltersToggle = document.getElementById('mobile-filters-toggle');
const mobileFiltersOverlay = document.getElementById('mobile-filters-overlay');
const mobileFiltersPanel = document.getElementById('mobile-filters-panel');
const mobileFiltersClose = document.getElementById('mobile-filters-close');
const mobileFiltersBackdrop = document.getElementById('mobile-filters-backdrop');
const mobileFiltersApply = document.getElementById('mobile-filters-apply');

if (mobileFiltersToggle && mobileFiltersOverlay && mobileFiltersPanel) {
    const openMobileFilters = () => {
        mobileFiltersOverlay.classList.remove('hidden');
        setTimeout(() => {
            mobileFiltersPanel.classList.add('open');
        }, 10);
    };
    const closeMobileFilters = () => {
        mobileFiltersPanel.classList.remove('open');
        setTimeout(() => {
            mobileFiltersOverlay.classList.add('hidden');
        }, 300);
    };
    mobileFiltersToggle.addEventListener('click', openMobileFilters);
    if (mobileFiltersClose) mobileFiltersClose.addEventListener('click', closeMobileFilters);
    if (mobileFiltersBackdrop) mobileFiltersBackdrop.addEventListener('click', closeMobileFilters);
    if (mobileFiltersApply) {
        mobileFiltersApply.addEventListener('click', () => {
            // Sync mobile filter values to desktop filters
            const searchMobile = document.getElementById('product-search-mobile');
            const searchDesktop = document.getElementById('product-search');
            if (searchMobile && searchDesktop) searchDesktop.value = searchMobile.value;

            const priceMinMobile = document.getElementById('price-min-mobile');
            const priceMinDesktop = document.getElementById('price-min');
            if (priceMinMobile && priceMinDesktop) priceMinDesktop.value = priceMinMobile.value;

            const priceMaxMobile = document.getElementById('price-max-mobile');
            const priceMaxDesktop = document.getElementById('price-max');
            if (priceMaxMobile && priceMaxDesktop) priceMaxDesktop.value = priceMaxMobile.value;

            // Sync checkboxes
            const mobileCheckboxes = mobileFiltersOverlay.querySelectorAll('input[data-filter]');
            mobileCheckboxes.forEach(mobileCb => {
                const name = mobileCb.getAttribute('data-filter');
                const value = mobileCb.value;
                const desktopCb = document.querySelector(`input[data-filter="${name}"][value="${value}"]`);
                if (desktopCb) desktopCb.checked = mobileCb.checked;
            });

            applyFiltersAndSort();
            closeMobileFilters();
        });
    }
}

// Clear all filters
const clearFiltersBtn = document.getElementById('clear-filters');
if (clearFiltersBtn) {
    clearFiltersBtn.addEventListener('click', () => {
        const searchInput = document.getElementById('product-search');
        if (searchInput) searchInput.value = '';
        const searchMobile = document.getElementById('product-search-mobile');
        if (searchMobile) searchMobile.value = '';

        document.querySelectorAll('input[data-filter="category"]').forEach(cb => cb.checked = false);
        document.querySelectorAll('input[data-filter="availability"]').forEach(cb => cb.checked = false);

        const priceMin = document.getElementById('price-min');
        const priceMax = document.getElementById('price-max');
        const priceRange = document.getElementById('price-range');
        if (priceMin) priceMin.value = '';
        if (priceMax) priceMax.value = '';
        if (priceRange) priceRange.value = priceRange.min;

        const priceMinMobile = document.getElementById('price-min-mobile');
        const priceMaxMobile = document.getElementById('price-max-mobile');
        const priceRangeMobile = document.getElementById('price-range-mobile');
        if (priceMinMobile) priceMinMobile.value = '';
        if (priceMaxMobile) priceMaxMobile.value = '';
        if (priceRangeMobile) priceRangeMobile.value = priceRangeMobile.min;

        const sortSelect = document.getElementById('sort-select');
        if (sortSelect) sortSelect.value = 'featured';

        applyFiltersAndSort();
    });
}

// Grid/List view toggle
const viewGridBtn = document.getElementById('view-grid');
const viewListBtn = document.getElementById('view-list');
const productGrid = document.getElementById('product-grid');
const productList = document.getElementById('product-list');

function renderListView(filteredProducts) {
    if (!productList) return;
    productList.innerHTML = '';
    filteredProducts.forEach(({ card }) => {
        const listItem = document.createElement('div');
        listItem.className = 'product-list-item';
        listItem.setAttribute('data-product-card', '');
        // Copy all data attributes
        Array.from(card.attributes).forEach(attr => {
            if (attr.name.startsWith('data-product-')) {
                listItem.setAttribute(attr.name, attr.value);
            }
        });
        // Get data from card
        const name = card.getAttribute('data-product-name') || '';
        const category = card.getAttribute('data-product-category') || '';
        const price = card.getAttribute('data-product-price') || '';
        const image = card.getAttribute('data-product-image') || '';
        const description = card.getAttribute('data-product-description') || '';
        const availability = card.getAttribute('data-product-availability') || 'in-stock';
        const stockBadge = availability === 'in-stock' ? 'IN STOCK' : availability === 'pre-order' ? 'PRE-ORDER' : '';
        const stockColor = availability === 'in-stock' ? 'bg-green-500' : availability === 'pre-order' ? 'bg-blue-500' : '';
        listItem.innerHTML = `
            <img src="${image}" alt="${name}" class="product-list-item-image">
            <div class="product-list-item-content">
                <div class="product-list-item-header">
                    <div class="product-list-item-category">${category}</div>
                    <h3 class="product-list-item-title">${name}</h3>
                    <p class="product-list-item-description">${description}</p>
                </div>
                <div class="product-list-item-footer">
                    <span class="product-list-item-price">${price}</span>
                    <button class="bg-slate-100 hover:bg-accent hover:text-white text-primary p-2 rounded-full transition-colors">
                        <i data-lucide="plus" class="w-5 h-5"></i>
                    </button>
                </div>
            </div>
        `;
        productList.appendChild(listItem);
    });
    // Reinitialize Lucide icons for new plus buttons
    lucide.createIcons();
}

if (viewGridBtn && viewListBtn && productGrid && productList) {
    let currentView = 'grid';
    viewGridBtn.addEventListener('click', () => {
        if (currentView === 'grid') return;
        currentView = 'grid';
        viewGridBtn.className = 'px-3 py-2 bg-accent text-white';
        viewListBtn.className = 'px-3 py-2 bg-slate-100 text-slate-600 hover:bg-slate-200';
        productGrid.classList.remove('hidden');
        productList.classList.add('hidden');
    });
    viewListBtn.addEventListener('click', () => {
        if (currentView === 'list') return;
        currentView = 'list';
        viewListBtn.className = 'px-3 py-2 bg-accent text-white';
        viewGridBtn.className = 'px-3 py-2 bg-slate-100 text-slate-600 hover:bg-slate-200';
        productGrid.classList.add('hidden');
        productList.classList.remove('hidden');
        // Render list view with current filtered products
        const searchInput = document.getElementById('product-search');
        const categoryCheckboxes = Array.from(document.querySelectorAll('input[data-filter="category"]'));
        const availabilityCheckboxes = Array.from(document.querySelectorAll('input[data-filter="availability"]'));
        const priceMinInput = document.getElementById('price-min');
        const priceMaxInput = document.getElementById('price-max');
        const sortSelect = document.getElementById('sort-select');
        const searchTerm = (searchInput ? searchInput.value.toLowerCase().trim() : '');
        const selectedCategories = categoryCheckboxes.filter(cb => cb.checked).map(cb => cb.value.toLowerCase());
        const selectedAvailabilities = availabilityCheckboxes.filter(cb => cb.checked).map(cb => cb.value.toLowerCase());
        const minPrice = priceMinInput ? parseFloat(priceMinInput.value) || 0 : 0;
        const maxPrice = priceMaxInput ? parseFloat(priceMaxInput.value) || Infinity : Infinity;
        const sortValue = sortSelect ? sortSelect.value : 'featured';
        const productCardsArray = Array.from(productGrid.querySelectorAll('[data-product-card]'));
        const products = productCardsArray.map((card, index) => {
            const name = card.getAttribute('data-product-name') || '';
            const category = (card.getAttribute('data-product-category') || '').toLowerCase();
            const description = (card.getAttribute('data-product-description') || '').toLowerCase();
            const priceStr = card.getAttribute('data-product-price') || '';
            const price = parseFloat(priceStr.replace(/[^0-9.]/g, '')) || 0;
            const availability = (card.getAttribute('data-product-availability') || 'in-stock').toLowerCase();
            return { card, index, name, category, description, price, availability };
        });
        let filtered = products.filter(({ name, category, description, price, availability }) => {
            if (searchTerm && !(name.toLowerCase().includes(searchTerm) || category.includes(searchTerm) || description.includes(searchTerm))) return false;
            if (selectedCategories.length > 0 && !selectedCategories.includes(category)) return false;
            if (selectedAvailabilities.length > 0 && !selectedAvailabilities.includes(availability)) return false;
            if (price < minPrice || price > maxPrice) return false;
            return true;
        });
        filtered.sort((a, b) => {
            if (sortValue === 'price-asc') return a.price - b.price;
            if (sortValue === 'price-desc') return b.price - a.price;
            if (sortValue === 'newest') return b.index - a.index;
            return a.index - b.index;
        });
        renderListView(filtered);
    });
}
