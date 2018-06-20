/**
 *
 * easyHTTP
 * A Library for making HTTP requests
 *
 * @version 3.0.0
 * @author  Ayappa Reddy
 * @license M.I.T
 */

class EasyHTTP {
  static async get(url) {
    const response = await fetch(url);
    const resData = await response.json();
    return resData;
  }

  static async post(url, data) {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const resData = await response.json();
    return resData;
  }

  static async put(url, data) {
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const resData = await response.json();
    return resData;
  }

  static async delete(url) {
    await fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json',
      },
    });

    const resData = await 'Deleted resource...';
    return resData;
  }
}

export default EasyHTTP;
