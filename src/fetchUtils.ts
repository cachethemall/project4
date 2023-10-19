
const requestQueue = {}; // This will store the request queues for each domain

function processQueue(domain: string) {

  const callback = requestQueue[domain][0];



  if (callback) {
    fetch(callback.url, callback.options)
      //   .then(response => response.json())
      .then(data => {
        callback.resolve(data);
      })
      .catch(error => {
        callback.reject(error);
        // callback.resolve(JSON.stringify(error));
      })
      .finally(() => {
        requestQueue[domain].shift();
        setTimeout(() => {
          processQueue(domain);
        }, 2000); // Add a 1-second delay between requests to the same domain
      });
  } else {
    // removeItemOnce(currentDomainsInQueue, domain);
    delete requestQueue[domain];
  }
}

export function fetchWithDelay(url, options?): Promise<any> {
  const domain = new URL(url).hostname;

  return new Promise((resolve, reject) => {
    const callback = { url, options, resolve, reject };

    if (requestQueue.hasOwnProperty(domain)) {
      requestQueue[domain].push(callback);
    } else {
      requestQueue[domain] = [callback];
      processQueue(domain);
    }


    // if (!currentDomainsInQueue.includes(domain)) {
    //   currentDomainsInQueue.push(domain);
    //   processQueue(domain);
    // }
    // else {
    //   console.log(currentDomainsInQueue);
    // }

  });
}

function removeItemOnce(arr, value) {
  var index = arr.indexOf(value);
  if (index > -1) {
    arr.splice(index, 1);
  }
  return arr;
}

function removeItemAll(arr, value) {
  var i = 0;
  while (i < arr.length) {
    if (arr[i] === value) {
      arr.splice(i, 1);
    } else {
      ++i;
    }
  }
  return arr;
}

