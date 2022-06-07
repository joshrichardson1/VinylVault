const URL = "http://127.0.0.1:8000/fetch-events/";

const tryCatchFetch = async (url, init = null) => {
  try {
    const response = await fetch(url, init)
    console.log(response)
    if (response.ok) {
      let data = await response.json();
      console.log(data)
      console.log(1)
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
  let res = await fetch(`${URL}${artist}`);
  let data = await res.json();
  return await data
};

// const fetchAllEvents = async (artistArr) => {
//   const responses = await Promise.all(
//     artistArr.map(async artist => {
//       let res = await fetchEvents(artist);
//   console.log(res)
//   return res
//     })
//   );
//   console.log(responses)
//   return responses
// };

// const fetchAllEvents = await Promise.all(artistArr) => {

export default fetchEvents



