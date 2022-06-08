const URL = "http://127.0.0.1:8000/fetch-events/";

const tryCatchFetch = async (url, init = null) => {
  try {
    const response = await fetch(url, init)
    if (response.ok) {
      let data = await response.json();
      return await data
    } else {
      throw new Error(`Bad response: ${response.status} ${response.statusText}`)
    }
  } catch (e) {
    alert(e)
    return null
  }
};

const fetchEvents = async (artist) => {
  return await tryCatchFetch(`${URL}${artist}`)
};

export default fetchEvents



