export function ajaxGet(url, callback, errorCallback) {
  const header = new Headers();
  header.append("Authorization", "Bearer " + document.cookie);
  const message = {
    method: "GET",
    headers: header
  };

  const ajaxRequest = new Request(url, message);
  fetch(ajaxRequest)
    .then(resp => {
      return resp
        .json()
        .then(object => {
          return { ...object, status: resp.status };
        })
        .catch(err => {
          throw err;
        });
    })
    .then(callback)
    .catch(errorCallback);
}

export function ajaxPost(url, body, callback, errorCallback) {
  const header = new Headers();
  header.append("Content-Type", "application/json");
  header.append("Authorization", "Bearer " + document.cookie);
  const message = {
    method: "POST",
    headers: header,
    body: JSON.stringify(body)
  };

  const ajaxRequest = new Request(url, message);
  fetch(ajaxRequest)
    .then(resp => {
      return resp
        .json()
        .then(object => {
          return { ...object, status: resp.status };
        })
        .catch(err => {
          throw err;
        });
    })
    .then(callback)
    .catch(errorCallback);
}
