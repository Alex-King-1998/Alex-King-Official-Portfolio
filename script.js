// Reveal sections on scroll
const hiddenSections = document.querySelectorAll('.hidden');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
      observer.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.1,
});

hiddenSections.forEach(section => {
  observer.observe(section);
});

// Animate skill bars when in view
const skillSection = document.querySelector('#skills');
const skillFills = document.querySelectorAll('.skill-fill');

const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      skillFills.forEach(fill => {
        const width = fill.getAttribute('style').match(/width:\s*(\d+%)/)[1];
        fill.style.width = width; // triggers animation
      });
      skillObserver.unobserve(skillSection);
    }
  });
}, { threshold: 0.3 });

skillObserver.observe(skillSection);

const projects = document.querySelectorAll('.project-card');
const modal = document.getElementById('project-modal');
const modalTitle = document.getElementById('modal-title');
const modalDesc = document.getElementById('modal-desc');
const modalLink = document.getElementById('modal-link');
const modalClose = document.getElementById('modal-close');

projects.forEach(project => {
  project.addEventListener('click', () => {
    openModal(project);
  });
  project.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      openModal(project);
    }
  });
});

function openModal(project) {
  modalTitle.textContent = project.dataset.title;
  modalDesc.textContent = project.dataset.desc;
  modalLink.href = project.dataset.link;
  modal.classList.remove('hidden');
  modalClose.focus();
}

modalClose.addEventListener('click', () => {
  modal.classList.add('hidden');
});

modal.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.classList.add('hidden');
  }
});

// Accessibility: Close modal on ESC key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    modal.classList.add('hidden');
  }
});
