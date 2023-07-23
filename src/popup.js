

window.onload = function() {
    const MANY_SWITCH_COUNT = 4;
  
    document.getElementById('openOptionsLink').onclick = function(e) {
      openOptions();
      return false;
    }
  
    document.getElementById('openCreditsLink').onclick = function(e) {
      chrome.tabs.create({ url: chrome.runtime.getURL('credits.html')}, function(tab){});
      return false;
    }
  
    document.getElementById('openSupportersLink').onclick = document.getElementById('openSupportMe').onclick = function(e) {
      chrome.tabs.create({ url: chrome.runtime.getURL('supporters.html')}, function(tab){});
      return false;
    }
  
    const storageRepo = new SyncStorageRepository(chrome || browser);
    storageRepo.get(['visualMode']).then(({ visualMode }) => {
      const mode = visualMode || 'default';
      if (mode === 'dark' || (mode === 'default' && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.body.classList.add('darkMode');
      }
    });
  