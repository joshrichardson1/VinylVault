const ARTIST_URL = "http://127.0.0.1:8000/fetch-by-artist/";
const ARTIST_AND_ALBUM_URL = "http://127.0.0.1:8000/fetch-by-artist-and-album/"

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

const fetchByArtist = async (artist) => {
  return await tryCatchFetch(`${ARTIST_URL}${artist}`)
}

const fetchByArtistAndAlbum = async (artist, album) => {
  return await tryCatchFetch(`${ARTIST_AND_ALBUM_URL}${artist}%20${album}`)
}

const DiscogsAPI = {  
  fetchByArtist,
  fetchByArtistAndAlbum,
}

export default DiscogsAPI;