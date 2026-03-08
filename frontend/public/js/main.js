/* ============================================================
   MOVIEDB — CLIENT SCRIPT
   Handles: hamburger nav, search autocomplete,
            movie detail modal, favourites, toast
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ─── HAMBURGER NAV ───────────────────────────────────────
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('navLinks');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('is-open');
    });
    document.addEventListener('click', e => {
      if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
        navLinks.classList.remove('is-open');
      }
    });
  }

  // ─── SEARCH AUTOCOMPLETE ─────────────────────────────────
  const searchInput   = document.getElementById('searchInput');
  const searchResults = document.getElementById('searchResults');
  let   searchTimeout;

  if (searchInput && searchResults) {
    searchInput.addEventListener('input', () => {
      clearTimeout(searchTimeout);
      const q = searchInput.value.trim();

      if (!q) {
        searchResults.classList.remove('is-open');
        searchResults.innerHTML = '';
        return;
      }

      searchTimeout = setTimeout(async () => {
        try {
          const res  = await fetch(`/api/search?q=${encodeURIComponent(q)}`);
          const data = await res.json();

          if (!data.results || data.results.length === 0) {
            searchResults.classList.remove('is-open');
            return;
          }

          searchResults.innerHTML = data.results.map(m => `
            <div class="search-result-item" data-movie-id="${m.id}">
              ${m.poster
                ? `<img src="${m.poster}" alt="${escapeHtml(m.title)}" />`
                : `<div class="search-result-item__thumb-placeholder"></div>`}
              <div class="search-result-item__info">
                <div class="search-result-item__title">${escapeHtml(m.title)}</div>
                <div class="search-result-item__date">
                  ${m.releaseDate ? new Date(m.releaseDate).getFullYear() : 'TBA'}
                </div>
              </div>
            </div>
          `).join('');

          searchResults.classList.add('is-open');

          searchResults.querySelectorAll('.search-result-item').forEach(item => {
            item.addEventListener('click', () => {
              openModal(item.dataset.movieId);
              searchResults.classList.remove('is-open');
              searchInput.value = '';
            });
          });

        } catch (e) {
          console.error('Search error:', e);
        }
      }, 300);
    });

    // Close results when clicking elsewhere
    document.addEventListener('click', e => {
      if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) {
        searchResults.classList.remove('is-open');
      }
    });

    searchInput.addEventListener('keydown', e => {
      if (e.key === 'Escape') {
        searchResults.classList.remove('is-open');
        searchInput.blur();
      }
    });
  }

  // ─── MOVIE DETAIL MODAL ──────────────────────────────────
  const modal         = document.getElementById('movieModal');
  const modalContent  = document.getElementById('modalContent');
  const modalClose    = document.getElementById('modalClose');
  const modalBackdrop = document.getElementById('modalBackdrop');

  window.openModal = async (movieId) => {
    if (!modal) return;
    modal.classList.add('is-open');
    document.body.style.overflow = 'hidden';
    modalContent.innerHTML = '<div class="modal__loader">Loading…</div>';

    try {
      const res  = await fetch(`/api/movie/${movieId}`);
      const data = await res.json();
      if (!data.success) throw new Error('Not found');

      const m        = data.movie;
      const imgBase  = 'https://image.tmdb.org/t/p/w500';
      const year     = m.release_date ? new Date(m.release_date).getFullYear() : 'TBA';
      const runtime  = m.runtime ? `${m.runtime} min` : '';
      const genres   = (m.genres || []).map(g => `<span class="modal__badge">${g.name}</span>`).join('');
      const rating   = m.vote_average
        ? `<span class="modal__badge modal__badge--accent">★ ${m.vote_average.toFixed(1)}</span>`
        : '';

      modalContent.innerHTML = `
        <div class="modal__movie">
          <div class="modal__poster">
            ${m.poster_path
              ? `<img src="${imgBase}${m.poster_path}" alt="${escapeHtml(m.title)}" />`
              : `<div style="aspect-ratio:2/3;background:var(--bg-elevated);display:flex;align-items:center;justify-content:center;color:var(--text-3)">No Image</div>`
            }
          </div>
          <div class="modal__info">
            <h2 style="font-family:var(--font-display);font-size:clamp(24px,4vw,36px);letter-spacing:2px;margin-bottom:6px;">
              ${escapeHtml(m.title)}
            </h2>
            ${m.tagline ? `<p class="modal__tagline">"${escapeHtml(m.tagline)}"</p>` : ''}
            <div class="modal__meta">
              ${rating}
              ${year     ? `<span class="modal__badge">${year}</span>`    : ''}
              ${runtime  ? `<span class="modal__badge">${runtime}</span>` : ''}
              ${genres}
            </div>
            ${m.overview ? `<p class="modal__overview">${escapeHtml(m.overview)}</p>` : ''}
          </div>
        </div>
      `;
    } catch (e) {
      modalContent.innerHTML = `
        <p style="color:var(--text-2);text-align:center;padding:40px;">
          Could not load movie details.
        </p>`;
    }
  };

  const closeModal = () => {
    if (!modal) return;
    modal.classList.remove('is-open');
    document.body.style.overflow = '';
  };

  if (modalClose)    modalClose.addEventListener('click', closeModal);
  if (modalBackdrop) modalBackdrop.addEventListener('click', closeModal);
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

  // Wire up "More Info" buttons on cards
  document.querySelectorAll('.movie-card__info-btn').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      openModal(btn.dataset.movieId);
    });
  });

  // ─── ADD TO FAVOURITES ───────────────────────────────────
  document.querySelectorAll('.movie-card__fav-btn[data-movie-id]').forEach(btn => {
    btn.addEventListener('click', async () => {
      const { movieId, title, poster, release, overview, rating } = btn.dataset;

      try {
        const res = await fetch('/favourites/add', {
          method:  'POST',
          headers: { 'Content-Type': 'application/json' },
          body:    JSON.stringify({
            movieId,
            title,
            posterPath:  poster,
            releaseDate: release,
            overview,
            voteAverage: rating
          })
        });

        // If not logged in the server will redirect
        if (res.redirected) {
          window.location.href = `/auth/login?redirect=${encodeURIComponent(window.location.pathname + window.location.search)}`;
          return;
        }

        const data = await res.json();
        if (data.success) {
          btn.classList.add('is-faved');
          btn.textContent = '♥ Saved';
          showToast(data.message, 'success');
        } else {
          showToast(data.message || 'Failed to save.', 'error');
        }
      } catch (e) {
        showToast('Something went wrong.', 'error');
      }
    });
  });

  // ─── REMOVE FROM FAVOURITES ──────────────────────────────
  document.querySelectorAll('.movie-card__fav-btn[data-remove-id]').forEach(btn => {
    btn.addEventListener('click', async () => {
      const movieId = btn.dataset.removeId;
      try {
        const res  = await fetch(`/favourites/remove/${movieId}`, { method: 'DELETE' });
        const data = await res.json();

        if (data.success) {
          const card = btn.closest('.movie-card');
          card.style.transition = 'opacity 0.3s, transform 0.3s';
          card.style.opacity    = '0';
          card.style.transform  = 'scale(0.95)';

          setTimeout(() => {
            card.remove();
            const grid = document.querySelector('.movies-grid');
            if (grid && grid.children.length === 0) {
              grid.closest('.movies-section').innerHTML = `
                <div class="empty-state">
                  <div class="empty-state__icon">♡</div>
                  <h2 class="empty-state__title">No favourites yet</h2>
                  <p class="empty-state__sub">Head back to the film list and start saving movies you love.</p>
                  <a href="/" class="btn btn--primary">Browse Films</a>
                </div>`;
            }
          }, 300);

          showToast(data.message, 'success');
        }
      } catch (e) {
        showToast('Could not remove.', 'error');
      }
    });
  });

  // ─── TOAST HELPER ────────────────────────────────────────
  window.showToast = (message, type = 'default') => {
    const toast = document.getElementById('toast');
    if (!toast) return;
    toast.textContent = message;
    toast.className   = `toast is-visible ${type === 'success' ? 'is-success' : type === 'error' ? 'is-error' : ''}`;
    clearTimeout(toast._timeout);
    toast._timeout = setTimeout(() => toast.classList.remove('is-visible'), 3000);
  };

  // ─── UTILITY: HTML ESCAPE ────────────────────────────────
  function escapeHtml(str) {
    if (!str) return '';
    return str
      .replace(/&/g,  '&amp;')
      .replace(/</g,  '&lt;')
      .replace(/>/g,  '&gt;')
      .replace(/"/g,  '&quot;')
      .replace(/'/g,  '&#039;');
  }

});