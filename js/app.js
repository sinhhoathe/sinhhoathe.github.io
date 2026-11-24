/* ========================================================
   ADSHIELD WEB PLAYER - APPLICATION CONTROLLER v3 (i18n)
   ======================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // Khởi tạo ngôn ngữ ban đầu (Mặc định Tiếng Anh)
  if (window.i18n) {
    window.i18n.applyTranslations();
  }

  const urlInput = document.getElementById('url-input');
  const launchBtn = document.getElementById('launch-btn');
  const pasteBtn = document.getElementById('paste-btn');
  const emptyState = document.getElementById('empty-state');
  const gameFrame = document.getElementById('game-frame');
  const ingameHud = document.getElementById('ingame-hud');
  const loadingOverlay = document.getElementById('loading-overlay');
  const loadingText = document.getElementById('loading-text');
  const toastEl = document.getElementById('toast-msg');
  const langSelect = document.getElementById('lang-select');

  // Modal cảnh báo nội dung
  const warningModal = document.getElementById('warning-modal');
  const proceedWarningBtn = document.getElementById('proceed-warning-btn');
  const cancelWarningBtn = document.getElementById('cancel-warning-btn');

  let currentEngine = 'sandbox'; // 'sandbox' | 'proxy'
  let pendingUrl = '';

  // Xử lý chuyển đổi ngôn ngữ
  if (langSelect) {
    langSelect.addEventListener('change', (e) => {
      const chosenLang = e.target.value;
      if (window.i18n) {
        window.i18n.setLanguage(chosenLang);
        updateBookmarkletLink();
      }
    });
  }

  // Toast notification
  window.showToast = function(msg) {
    if (!toastEl) return;
    toastEl.textContent = msg;
    toastEl.classList.add('show');
    setTimeout(() => {
      toastEl.classList.remove('show');
    }, 3000);
  };

  // Nút Dán Link
  if (pasteBtn && urlInput) {
    pasteBtn.addEventListener('click', async () => {
      try {
        const text = await navigator.clipboard.readText();
        if (text) {
          urlInput.value = text.trim();
          showToast(window.i18n ? window.i18n.t('toast_pasted') : 'Link pasted!');
        }
      } catch (err) {
        urlInput.focus();
        showToast(window.i18n ? window.i18n.t('toast_paste_manual') : 'Press Ctrl + V to paste!');
      }
    });
  }

  // Chọn chế độ Engine (Sandbox / Proxy)
  const enginePills = document.querySelectorAll('.engine-pill');
  enginePills.forEach(pill => {
    pill.addEventListener('click', () => {
      enginePills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      currentEngine = pill.dataset.engine;

      const toastKey = currentEngine === 'sandbox' ? 'toast_switch_sandbox' : 'toast_switch_proxy';
      showToast(window.i18n ? window.i18n.t(toastKey) : 'Mode switched');

      if (window.adShieldEngine.currentUrl) {
        startLoad(window.adShieldEngine.currentUrl);
      }
    });
  });

  // Kiểm tra & Khởi động
  function handleLaunch(rawUrl) {
    const cleanUrl = window.adShieldEngine.normalizeUrl(rawUrl);
    if (!cleanUrl) {
      showToast(window.i18n ? window.i18n.t('toast_empty_url') : 'Please enter a valid link!');
      urlInput.focus();
      return;
    }

    const safetyCheck = window.adShieldEngine.checkSafety(cleanUrl);
    if (!safetyCheck.isSafe) {
      pendingUrl = cleanUrl;
      if (warningModal) warningModal.classList.add('active');
      return;
    }

    startLoad(cleanUrl);
  }

  if (proceedWarningBtn) {
    proceedWarningBtn.addEventListener('click', () => {
      if (warningModal) warningModal.classList.remove('active');
      if (pendingUrl) startLoad(pendingUrl);
    });
  }

  if (cancelWarningBtn) {
    cancelWarningBtn.addEventListener('click', () => {
      if (warningModal) warningModal.classList.remove('active');
      pendingUrl = '';
      showToast(window.i18n ? window.i18n.t('toast_closed') : 'Cancelled.');
    });
  }

  // Thực hiện tải trang
  async function startLoad(cleanUrl) {
    urlInput.value = cleanUrl;
    emptyState.style.display = 'none';
    gameFrame.style.display = 'block';
    ingameHud.style.display = 'flex';
    loadingOverlay.style.display = 'flex';
    loadingText.textContent = window.i18n ? window.i18n.t('loading_title') : 'Setting up AdShield...';

    if (currentEngine === 'sandbox') {
      window.adShieldEngine.setupSandboxFrame(gameFrame, cleanUrl);
      
      gameFrame.onload = () => {
        loadingOverlay.style.display = 'none';
        showToast(window.i18n ? window.i18n.t('toast_active_shield') : 'Shields active!');
      };

      setTimeout(() => {
        if (loadingOverlay.style.display !== 'none') {
          loadingOverlay.style.display = 'none';
        }
      }, 3500);

    } else {
      const result = await window.adShieldEngine.loadCleanProxy(
        gameFrame,
        cleanUrl,
        msg => { loadingText.textContent = msg; }
      );

      loadingOverlay.style.display = 'none';

      if (result && result.success) {
        showToast(window.i18n ? window.i18n.t('toast_proxy_success') : 'Proxy clean success!');
      } else {
        showToast(window.i18n ? window.i18n.t('toast_proxy_fallback') : 'Proxy fallback...');
        window.adShieldEngine.setupSandboxFrame(gameFrame, cleanUrl);
      }
    }
  }

  // Nút khởi chạy
  if (launchBtn) {
    launchBtn.addEventListener('click', () => handleLaunch(urlInput.value));
  }
  if (urlInput) {
    urlInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') handleLaunch(urlInput.value);
    });
  }

  // Demo games
  document.querySelectorAll('.quick-game-tag').forEach(tag => {
    tag.addEventListener('click', () => {
      const url = tag.dataset.url;
      if (url) {
        urlInput.value = url;
        handleLaunch(url);
      }
    });
  });

  // HUD: Tải lại
  const hudReload = document.getElementById('hud-reload');
  if (hudReload) {
    hudReload.addEventListener('click', () => {
      if (window.adShieldEngine.currentUrl) {
        startLoad(window.adShieldEngine.currentUrl);
        showToast(window.i18n ? window.i18n.t('toast_reloading') : 'Reloading...');
      }
    });
  }

  // HUD: Toàn màn hình
  const hudFullscreen = document.getElementById('hud-fullscreen');
  if (hudFullscreen) {
    hudFullscreen.addEventListener('click', () => {
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().then(() => {
          document.body.classList.add('fullscreen-mode');
          showToast(window.i18n ? window.i18n.t('toast_fullscreen_on') : 'Fullscreen active');
        }).catch(() => {
          document.body.classList.toggle('fullscreen-mode');
        });
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen().then(() => {
            document.body.classList.remove('fullscreen-mode');
          });
        }
      }
    });
  }

  document.addEventListener('fullscreenchange', () => {
    if (!document.fullscreenElement) {
      document.body.classList.remove('fullscreen-mode');
    }
  });

  // HUD: Đóng
  const hudClose = document.getElementById('hud-close');
  if (hudClose) {
    hudClose.addEventListener('click', () => {
      gameFrame.src = 'about:blank';
      gameFrame.removeAttribute('srcdoc');
      gameFrame.style.display = 'none';
      ingameHud.style.display = 'none';
      emptyState.style.display = 'flex';
      loadingOverlay.style.display = 'none';
      document.body.classList.remove('fullscreen-mode');
      showToast(window.i18n ? window.i18n.t('toast_closed') : 'Closed');
    });
  }

  // Bookmarklet link
  function updateBookmarkletLink() {
    const bookmarkletLink = document.getElementById('bookmarklet-drag-link');
    if (bookmarkletLink) {
      bookmarkletLink.href = window.adShieldEngine.getBookmarkletCode();
      bookmarkletLink.onclick = (e) => {
        e.preventDefault();
        showToast(window.i18n ? window.i18n.t('bookmarklet_toast') : 'Drag this button to your bookmarks bar!');
      };
    }
  }

  updateBookmarkletLink();
});
