import episodesData from './episodes.json'

export function getEpisodes() {
  return episodesData.episodes
}

export function getEpisodeById(id) {
  return episodesData.episodes.find(ep => ep.id === id)
}

export function searchEpisodes(keyword) {
  if (!keyword) return episodesData.episodes
  
  const lowerKeyword = keyword.toLowerCase()
  return episodesData.episodes.filter(ep => 
    ep.cnTitle.toLowerCase().includes(lowerKeyword) ||
    ep.jpTitle.toLowerCase().includes(lowerKeyword) ||
    ep.id.toString().includes(lowerKeyword) ||
    ep.manga.toLowerCase().includes(lowerKeyword)
  )
}

export function sortEpisodes(episodes, sortBy = 'id', order = 'asc') {
  return [...episodes].sort((a, b) => {
    let valA = a[sortBy]
    let valB = b[sortBy]
    
    if (sortBy === 'airDate') {
      valA = new Date(valA)
      valB = new Date(valB)
    }
    
    if (valA < valB) return order === 'asc' ? -1 : 1
    if (valA > valB) return order === 'asc' ? 1 : -1
    return 0
  })
}

export function paginateEpisodes(episodes, page = 1, pageSize = 20) {
  const start = (page - 1) * pageSize
  const end = start + pageSize
  return {
    data: episodes.slice(start, end),
    total: episodes.length,
    page,
    pageSize,
    totalPages: Math.ceil(episodes.length / pageSize)
  }
}

export function getStatistics() {
  const episodes = episodesData.episodes
  
  const yearCounts = episodes.reduce((acc, ep) => {
    const year = new Date(ep.airDate).getFullYear()
    acc[year] = (acc[year] || 0) + 1
    return acc
  }, {})
  
  const hasManga = episodes.filter(ep => ep.manga).length
  const hasNotes = episodes.filter(ep => ep.notes).length
  
  return {
    total: episodes.length,
    years: yearCounts,
    hasManga,
    hasNotes,
    firstEpisode: episodes[0],
    lastEpisode: episodes[episodes.length - 1]
  }
}
