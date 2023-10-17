const requestQueue = {}; // This will store the request queues for each domain

function addToQueue(domain, callback) {
  if (!requestQueue[domain]) {
    requestQueue[domain] = [];
  }
  requestQueue[domain].push(callback);
  if (requestQueue[domain].length === 1) {
    processQueue(domain);
  }
}

function processQueue(domain) {
  const callback = requestQueue[domain][0];
  
  if (callback) {
    fetch(callback.url, callback.options)
    //   .then(response => response.json())
      .then(data => {
        callback.resolve(data);
      })
      .catch(error => {
        callback.reject(error);
      })
      .finally(() => {
        requestQueue[domain].shift();
        setTimeout(() => {
          processQueue(domain);
        }, 500); // Add a 1-second delay between requests to the same domain
      });
  } else {
    delete requestQueue[domain];
  }
}

export function fetchWithDelay(url, options?): Promise<any> {
  const domain = new URL(url).hostname;
  
  return new Promise((resolve, reject) => {
    addToQueue(domain, { url, options, resolve, reject });
  });
}