import Player from '@vimeo/player'
import { getJSON } from './fetch.mjs'

export function initVideo(id, videoId) {
  return new Player(id, {
    id: videoId, // can be id or vimeo link
    width: 640,
  })
}

export async function getMetaData(link) {
  let data
  try {
    data = await getJSON('https://vimeo.com/api/oembed.json?url=' + link)
  } catch(e) {
    console.error('Error fetching metadata',link, e)
  }
  return data
}

// format video duration ( M min S )
export function formatDuration(length) {
  if (!length) return '0 min 0'
  const min = Math.floor(length / 60)
  const sec = length % 60
  return `${min} min ${sec}`
}
