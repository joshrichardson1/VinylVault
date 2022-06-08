const URL = "http://127.0.0.1:8000/fetch-tracklist/";

const fetchTracks = async (artist, album) => {
  let res = await fetch(`${URL}${artist}/${album}`);
  let data = await res.json();
  return await data;
};

export default fetchTracks;