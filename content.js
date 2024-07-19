chrome.storage.local.get({ last_url: {} }, (result) => {
  const last_url = result.last_url;
  if (last_url && last_url.url) {
    console.log('Sending Last URL:', last_url);

    fetch("http://127.0.0.1:8000/pos", {
      method: "POST",
      body: JSON.stringify({
        data: [
          {
            timestamp: last_url.timestamp,
            url: last_url.url
          }
        ]
      }),
      headers: {
        'accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      console.log('Success:', data);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  } else {
    console.log('No URL stored yet.');
  }
});