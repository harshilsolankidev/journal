(function () {
  /* Sidebar mobile toggle */
  const sidebar = document.getElementById('sidebar');
  const backdrop = document.getElementById('sidebar-backdrop');
  const sidebarToggle = document.getElementById('sidebar-toggle');

  function openSidebar() {
    if (!sidebar || !backdrop) return;
    sidebar.classList.remove('-translate-x-full');
    backdrop.classList.remove('hidden');
    sidebarToggle?.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeSidebar() {
    if (!sidebar || !backdrop) return;
    sidebar.classList.add('-translate-x-full');
    backdrop.classList.add('hidden');
    sidebarToggle?.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  sidebarToggle?.addEventListener('click', () => {
    const isOpen = sidebarToggle.getAttribute('aria-expanded') === 'true';
    if (isOpen) closeSidebar();
    else openSidebar();
  });

  backdrop?.addEventListener('click', closeSidebar);

  window.addEventListener('resize', () => {
    if (window.innerWidth >= 1024) closeSidebar();
  });

  sidebar?.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      if (window.innerWidth < 1024) closeSidebar();
    });
  });

  /* Mood bar animation */
  const moodBars = document.querySelectorAll('.mood-bar-fill');
  if (moodBars.length) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );
    moodBars.forEach((bar) => observer.observe(bar));
  }

  /* Flash toast auto-dismiss */
  const flashToast = document.getElementById('flash-toast');
  const flashDismiss = document.getElementById('flash-dismiss');

  function dismissFlash() {
    if (!flashToast) return;
    flashToast.classList.add('is-leaving');
    flashToast.addEventListener('animationend', () => flashToast.remove(), { once: true });
  }

  flashDismiss?.addEventListener('click', dismissFlash);

  if (flashToast) {
    setTimeout(dismissFlash, 5000);
  }
})();
