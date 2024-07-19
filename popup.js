document.addEventListener('DOMContentLoaded', function() {
  const urlList = document.getElementById('url-list');
  
  chrome.storage.local.get({last_url: {}}, (result) => {
    if (result.last_url.length === 0) {
      const li = document.createElement('li');
      li.textContent = 'No URLs tracked yet.';
      urlList.appendChild(li);
    } else {
        const li = document.createElement('li');
        li.textContent = `${result.last_url.timestamp}: ${result.last_url.url}`;
        urlList.appendChild(li);
    }
  });
});