// Source Code Protection
(function() {
  'use strict';
  
  // Disable right-click context menu
  document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
    return false;
  });

  // Disable certain keyboard shortcuts
  document.addEventListener('keydown', function(e) {
    // Disable F12, Ctrl+Shift+I, Ctrl+U, Ctrl+S
    if (e.key === 'F12' || 
        (e.ctrlKey && e.shiftKey && e.key === 'I') ||
        (e.ctrlKey && e.key === 'u') ||
        (e.ctrlKey && e.key === 's')) {
      e.preventDefault();
      return false;
    }
  });

  // Detect developer tools
  let devtools = {open: false, orientation: null};
  
  setInterval(function() {
    if (window.outerHeight - window.innerHeight > 200 || 
        window.outerWidth - window.innerWidth > 200) {
      if (!devtools.open) {
        devtools.open = true;
        console.clear();
        console.log('%cStop!', 'color: red; font-size: 50px; font-weight: bold;');
        console.log('%cThis is a browser feature intended for developers.', 'color: red; font-size: 14px;');
      }
    } else {
      devtools.open = false;
    }
  }, 500);

  // Obfuscate console output
  const originalConsole = {
    log: console.log,
    info: console.info,
    warn: console.warn,
    error: console.error,
    debug: console.debug
  };

  console.log = function() {
    // Only show critical errors, hide debug messages
    if (arguments[0] && typeof arguments[0] === 'string' && 
        (arguments[0].includes('Error') || arguments[0].includes('Critical'))) {
      originalConsole.log.apply(console, arguments);
    }
  };

  // Disable source maps in production
  if (location.hostname !== 'localhost' && location.hostname !== '127.0.0.1') {
    // Remove or disable source maps
    const scripts = document.querySelectorAll('script[src*=".map"]');
    scripts.forEach(script => script.remove());
    
    // Override fetch to block source map requests
    const originalFetch = window.fetch;
    window.fetch = function(...args) {
      if (args[0] && typeof args[0] === 'string' && args[0].includes('.map')) {
        return Promise.reject(new Error('Source maps disabled'));
      }
      return originalFetch.apply(this, args);
    };
  }

  // Randomize variable names in global scope
  const obfuscationKeys = ['_0x', '_0x1', '_0x2', '_0x3', '_0x4'];
  obfuscationKeys.forEach(key => {
    if (!window[key]) {
      Object.defineProperty(window, key, {
        get: function() {
          return Math.random().toString(36).substr(2, 9);
        },
        configurable: false
      });
    }
  });

  // Disable console in production
  if (location.hostname !== 'localhost' && location.hostname !== '127.0.0.1') {
    console.log = console.info = console.warn = console.error = console.debug = function() {};
  }

  // Anti-debugging technique
  let counter = 0;
  const check = setInterval(function() {
    counter++;
    if (counter > 100) {
      clearInterval(check);
      // Redirect or perform other actions if debugging detected
      if (devtools.open) {
        console.clear();
        console.log('Developer tools detected. Please close them to continue.');
      }
    }
  }, 100);

  // Disable text selection on critical elements
  document.addEventListener('selectstart', function(e) {
    if (e.target.classList.contains('no-select') || 
        e.target.closest('.no-select')) {
      e.preventDefault();
    }
  });

  // Add watermark
  const watermark = document.createElement('div');
  watermark.style.cssText = `
    position: fixed;
    bottom: 10px;
    right: 10px;
    color: rgba(0,0,0,0.1);
    font-size: 12px;
    font-family: monospace;
    z-index: 9999;
    pointer-events: none;
    user-select: none;
  `;
  watermark.textContent = '© ' + new Date().getFullYear() + ' Renova Mobil';
  document.body.appendChild(watermark);

})();