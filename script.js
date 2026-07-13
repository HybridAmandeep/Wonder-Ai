/**
 * WanderAI – Unified JavaScript
 * Handles: Navigation, Search, Mobile Menu, Scroll Effects,
 *          Wishlist, Booking Microinteraction, Signup Form,
 *          Moodboard Color Copy, and Scroll Animations
 */
document.addEventListener('DOMContentLoaded', () => {

    // =========================================
    // 1. STICKY NAVIGATION + COLOR SWITCH
    // =========================================
    const desktopNav = document.getElementById('desktopNav');

    // Only apply scroll-based color switch if nav doesn't have nav-solid class
    // (index.html has transparent hero; inner pages have solid nav)
    if (desktopNav && !desktopNav.classList.contains('nav-solid')) {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                desktopNav.classList.add('scrolled');
            } else {
                desktopNav.classList.remove('scrolled');
            }
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();
    }

    // =========================================
    // 2. EXPANDABLE SEARCH
    // =========================================
    const searchContainer = document.getElementById('searchContainer');
    const searchToggle = document.getElementById('searchToggle');
    const searchInput = document.getElementById('searchInput');
    const searchClose = document.getElementById('searchClose');

    if (searchToggle && searchContainer && searchInput && searchClose) {
        const openSearch = () => {
            searchContainer.classList.add('active');
            document.body.style.overflow = 'hidden';
            setTimeout(() => searchInput.focus(), 300);
        };

        const closeSearch = () => {
            searchContainer.classList.remove('active');
            document.body.style.overflow = '';
            searchInput.value = '';
        };

        searchToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            openSearch();
        });

        searchClose.addEventListener('click', closeSearch);

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') closeSearch();
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault();
                searchContainer.classList.contains('active') ? closeSearch() : openSearch();
            }
        });
    }

    // =========================================
    // 3. DROPDOWN MENU
    // =========================================
    const moreDropdown = document.getElementById('moreDropdown');
    const dropdownToggle = document.getElementById('dropdownToggle');

    if (dropdownToggle && moreDropdown) {
        dropdownToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            moreDropdown.classList.toggle('active');
        });

        document.addEventListener('click', () => {
            moreDropdown.classList.remove('active');
        });
    }

    // =========================================
    // 4. MOBILE HAMBURGER MENU
    // =========================================
    const hamburger = document.getElementById('hamburger');
    const mobileOverlay = document.getElementById('mobileOverlay');
    const mobileSlideMenu = document.getElementById('mobileSlideMenu');
    const mobileClose = document.getElementById('mobileClose');

    if (hamburger && mobileOverlay && mobileSlideMenu && mobileClose) {
        const openMobileMenu = () => {
            hamburger.classList.add('active');
            mobileOverlay.classList.add('active');
            mobileSlideMenu.classList.add('active');
            document.body.style.overflow = 'hidden';
        };

        const closeMobileMenu = () => {
            hamburger.classList.remove('active');
            mobileOverlay.classList.remove('active');
            mobileSlideMenu.classList.remove('active');
            document.body.style.overflow = '';
        };

        hamburger.addEventListener('click', () => {
            hamburger.classList.contains('active') ? closeMobileMenu() : openMobileMenu();
        });

        mobileClose.addEventListener('click', closeMobileMenu);
        mobileOverlay.addEventListener('click', closeMobileMenu);

        // Close on link click
        document.querySelectorAll('.mobile-menu-link').forEach(link => {
            link.addEventListener('click', closeMobileMenu);
        });
    }

    // =========================================
    // 5. WISHLIST BUTTON TOGGLE
    // =========================================
    document.querySelectorAll('.card-wishlist').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            e.preventDefault();
            btn.classList.toggle('wishlisted');

            const icon = btn.querySelector('i, svg');
            if (btn.classList.contains('wishlisted')) {
                if (icon) {
                    icon.style.fill = 'var(--accent)';
                    icon.style.stroke = 'var(--accent)';
                }
                btn.style.background = 'rgba(244, 63, 94, 0.2)';
                btn.animate([
                    { transform: 'scale(1)' },
                    { transform: 'scale(1.3)' },
                    { transform: 'scale(1)' }
                ], { duration: 300, easing: 'ease-out' });
            } else {
                if (icon) {
                    icon.style.fill = 'none';
                    icon.style.stroke = 'currentColor';
                }
                btn.style.background = 'rgba(255,255,255,0.25)';
            }
        });
    });

    // =========================================
    // 6. INTERSECTION OBSERVER – SCROLL ANIMATIONS
    // =========================================
    const animateElements = document.querySelectorAll(
        '.destination-card, .feature-card, .section-header, .trusted-section, .cta-card, .price-card, .testimonial-card, .mb-section, .color-card, .type-card, .ui-card, .masonry-item'
    );

    if (animateElements.length > 0) {
        const observerOptions = { root: null, rootMargin: '0px', threshold: 0.1 };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        animateElements.forEach((el, index) => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = `opacity 0.6s ease ${index * 0.04}s, transform 0.6s ease ${index * 0.04}s`;
            observer.observe(el);
        });
    }

    // =========================================
    // 7. NOTIFICATION BUTTON
    // =========================================
    const notificationBtn = document.getElementById('notificationBtn');
    if (notificationBtn) {
        notificationBtn.addEventListener('click', () => {
            const badge = notificationBtn.querySelector('.notification-badge');
            if (badge) badge.style.display = 'none';
            notificationBtn.animate([
                { transform: 'rotate(0deg)' },
                { transform: 'rotate(15deg)' },
                { transform: 'rotate(-15deg)' },
                { transform: 'rotate(0deg)' }
            ], { duration: 400, easing: 'ease-in-out' });
        });
    }

    // =========================================
    // 8. BOOKING MICROINTERACTION
    // =========================================
    const demoBookBtn = document.getElementById('demoBookBtn');
    const bookingOverlay = document.getElementById('bookingOverlay');
    const bookingSuccessToast = document.getElementById('bookingSuccessToast');

    if (demoBookBtn && bookingOverlay && bookingSuccessToast) {
        const btnText = demoBookBtn.querySelector('.btn-book-text');
        const btnSpinner = demoBookBtn.querySelector('.btn-book-spinner');
        const btnProgressFill = demoBookBtn.querySelector('.btn-book-progress-fill');
        const btnCheck = demoBookBtn.querySelector('.btn-book-check');
        const btnParticles = demoBookBtn.querySelector('.btn-book-particles');

        const createParticleBurst = () => {
            const colors = ['#10B981', '#34D399', '#6EE7B7', '#A7F3D0', '#3B82F6', '#FBBF24'];
            for (let i = 0; i < 12; i++) {
                const particle = document.createElement('div');
                particle.classList.add('book-particle');
                const angle = (i / 12) * 360;
                const distance = 30 + Math.random() * 30;
                const tx = Math.cos(angle * Math.PI / 180) * distance;
                const ty = Math.sin(angle * Math.PI / 180) * distance;
                particle.style.setProperty('--tx', `${tx}px`);
                particle.style.setProperty('--ty', `${ty}px`);
                particle.style.background = colors[i % colors.length];
                btnParticles.appendChild(particle);
                requestAnimationFrame(() => particle.classList.add('burst'));
                setTimeout(() => particle.remove(), 800);
            }
        };

        const resetButton = () => {
            demoBookBtn.classList.remove('is-loading', 'is-progress', 'is-success');
            btnText.classList.remove('hidden');
            btnSpinner.classList.add('hidden');
            btnCheck.classList.add('hidden');
            btnProgressFill.style.transition = 'none';
            btnProgressFill.style.width = '0%';
            bookingOverlay.classList.remove('active');
            bookingSuccessToast.classList.remove('active');
        };

        demoBookBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();

            if (demoBookBtn.classList.contains('is-loading') ||
                demoBookBtn.classList.contains('is-progress') ||
                demoBookBtn.classList.contains('is-success')) return;

            // Loading
            demoBookBtn.classList.add('is-loading');
            btnText.classList.add('hidden');
            btnSpinner.classList.remove('hidden');

            setTimeout(() => {
                // Progress
                demoBookBtn.classList.remove('is-loading');
                demoBookBtn.classList.add('is-progress');
                btnSpinner.classList.add('hidden');

                requestAnimationFrame(() => {
                    btnProgressFill.style.transition = 'width 1.8s cubic-bezier(0.22, 0.68, 0.32, 1)';
                    btnProgressFill.style.width = '100%';
                });

                setTimeout(() => {
                    // Success
                    demoBookBtn.classList.remove('is-progress');
                    demoBookBtn.classList.add('is-success');
                    btnCheck.classList.remove('hidden');
                    createParticleBurst();

                    setTimeout(() => {
                        bookingOverlay.classList.add('active');
                        bookingSuccessToast.classList.add('active');
                    }, 300);

                    // Auto-reset after toast displays
                    setTimeout(() => {
                        setTimeout(() => resetButton(), 800);
                    }, 3000);

                }, 1900);
            }, 1200);
        });

        // Close overlay on click
        bookingOverlay.addEventListener('click', resetButton);
    }

    // =========================================
    // 9. SIGNUP FORM VALIDATION
    // =========================================
    const signupForm = document.getElementById('signup-form');

    if (signupForm) {
        const emailInput = document.getElementById('email');
        const passwordInput = document.getElementById('password');
        const confirmPasswordInput = document.getElementById('confirm-password');
        const termsCheckbox = document.getElementById('terms');
        const togglePasswordBtn = document.getElementById('toggle-password');
        const strengthMeter = document.getElementById('password-strength');
        const strengthFill = document.getElementById('strength-fill');
        const strengthText = document.getElementById('strength-text');
        const submitBtn = document.getElementById('submit-btn');
        const btnTextEl = submitBtn.querySelector('.btn-text');
        const loaderEl = submitBtn.querySelector('.loader');

        // Password toggle
        if (togglePasswordBtn) {
            const iconShow = togglePasswordBtn.querySelector('.icon-show');
            const iconHide = togglePasswordBtn.querySelector('.icon-hide');
            togglePasswordBtn.addEventListener('click', () => {
                const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
                passwordInput.setAttribute('type', type);
                iconShow.style.display = type === 'text' ? 'none' : 'block';
                iconHide.style.display = type === 'text' ? 'block' : 'none';
            });
        }

        // Validation helpers
        const validateEmail = (email) => {
            if (!email) return 'Email is required';
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return 'Please enter a valid email address';
            return '';
        };

        const checkPasswordStrength = (password) => {
            let score = 0;
            if (!password) return { score: 0, text: 'Password is required', color: 'transparent' };
            if (password.length > 5) score++;
            if (password.length > 8) score++;
            if (/[A-Z]/.test(password)) score++;
            if (/[0-9]/.test(password)) score++;
            if (/[^A-Za-z0-9]/.test(password)) score++;
            if (score <= 2) return { score, text: 'Weak', color: 'var(--error)' };
            if (score <= 3) return { score, text: 'Fair', color: 'var(--warning)' };
            return { score, text: 'Strong', color: 'var(--success)' };
        };

        const validatePassword = (password) => {
            if (!password) return 'Password is required';
            if (password.length < 8) return 'Password must be at least 8 characters';
            return '';
        };

        const validateConfirmPassword = (confirmPwd, pwd) => {
            if (!confirmPwd) return 'Please confirm your password';
            if (confirmPwd !== pwd) return 'Passwords do not match';
            return '';
        };

        const validateTerms = (checked) => checked ? '' : 'You must agree to the Terms & Conditions';

        const setError = (inputEl, errorMsg) => {
            const group = inputEl.closest('.input-group') || inputEl.closest('.checkbox-group');
            const errorDiv = group.querySelector('.error-message');
            group.classList.remove('has-success');
            if (errorMsg) {
                group.classList.add('has-error');
                errorDiv.textContent = errorMsg;
                return false;
            } else {
                group.classList.remove('has-error');
                group.classList.add('has-success');
                return true;
            }
        };

        // Real-time validation
        emailInput.addEventListener('input', () => {
            const error = validateEmail(emailInput.value);
            if (emailInput.value.length > 0) setError(emailInput, error);
            else emailInput.closest('.input-group').classList.remove('has-error', 'has-success');
        });

        emailInput.addEventListener('blur', () => setError(emailInput, validateEmail(emailInput.value)));

        passwordInput.addEventListener('input', () => {
            const val = passwordInput.value;
            strengthMeter.style.display = val.length > 0 ? 'block' : 'none';
            const strength = checkPasswordStrength(val);
            strengthFill.style.width = `${(strength.score / 5) * 100}%`;
            strengthFill.style.backgroundColor = strength.color;
            strengthText.textContent = strength.text;
            strengthText.style.color = strength.color;
            if (val.length > 0) setError(passwordInput, validatePassword(val));
            else passwordInput.closest('.input-group').classList.remove('has-error', 'has-success');
            if (confirmPasswordInput.value) setError(confirmPasswordInput, validateConfirmPassword(confirmPasswordInput.value, val));
        });

        passwordInput.addEventListener('blur', () => setError(passwordInput, validatePassword(passwordInput.value)));

        confirmPasswordInput.addEventListener('input', () => {
            if (confirmPasswordInput.value.length > 0) setError(confirmPasswordInput, validateConfirmPassword(confirmPasswordInput.value, passwordInput.value));
            else confirmPasswordInput.closest('.input-group').classList.remove('has-error', 'has-success');
        });

        confirmPasswordInput.addEventListener('blur', () => setError(confirmPasswordInput, validateConfirmPassword(confirmPasswordInput.value, passwordInput.value)));

        termsCheckbox.addEventListener('change', () => setError(termsCheckbox, validateTerms(termsCheckbox.checked)));

        // Form submit
        signupForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const v1 = setError(emailInput, validateEmail(emailInput.value));
            const v2 = setError(passwordInput, validatePassword(passwordInput.value));
            const v3 = setError(confirmPasswordInput, validateConfirmPassword(confirmPasswordInput.value, passwordInput.value));
            const v4 = setError(termsCheckbox, validateTerms(termsCheckbox.checked));

            if (v1 && v2 && v3 && v4) {
                submitBtn.disabled = true;
                btnTextEl.style.display = 'none';
                loaderEl.style.display = 'block';

                setTimeout(() => {
                    const wrapper = document.querySelector('.form-wrapper');
                    wrapper.innerHTML = `
                        <div style="text-align: center; animation: fadeInUp 0.4s ease;">
                            <svg style="color: var(--success); margin-bottom: 1rem;" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                            <h2 style="margin-bottom: 0.5rem; color: var(--gray-900); font-size: 1.5rem;">Account Created!</h2>
                            <p style="color: var(--gray-500); margin-bottom: 1.5rem;">Check your email to verify your account.</p>
                            <a href="index.html" class="btn-primary" style="justify-content:center;">Start Planning <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-left:8px;"><path d="M5 12h14M13 6l6 6-6 6"/></svg></a>
                        </div>
                    `;
                }, 1500);
            }
        });
    }

    // =========================================
    // 10. MOODBOARD – COLOR COPY TO CLIPBOARD
    // =========================================
    document.querySelectorAll('.color-card[data-hex]').forEach(card => {
        card.addEventListener('click', () => {
            const hex = card.getAttribute('data-hex');
            navigator.clipboard.writeText(hex).then(() => {
                const toast = document.getElementById('toast');
                if (toast) {
                    toast.textContent = `Copied ${hex} to clipboard!`;
                    toast.classList.add('show');
                    setTimeout(() => toast.classList.remove('show'), 2000);
                }
            });
        });
    });

    // =========================================
    // 11. SCROLL-BASED ACTIVE NAV HIGHLIGHTING
    //     (Only on pages with hero section)
    // =========================================
    const sections = document.querySelectorAll('section[id]');
    const desktopNavLinks = document.querySelectorAll('.nav-links .nav-link:not(.dropdown-toggle)');

    if (sections.length > 0 && desktopNavLinks.length > 0 && document.querySelector('.hero')) {
        const highlightNav = () => {
            const scrollPos = window.scrollY + 120;
            sections.forEach(section => {
                const top = section.offsetTop;
                const height = section.offsetHeight;
                const id = section.getAttribute('id');
                if (scrollPos >= top && scrollPos < top + height) {
                    desktopNavLinks.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('data-section') === id) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        };
        window.addEventListener('scroll', highlightNav, { passive: true });
    }

});
