<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { getEpisodes, sortEpisodes, paginateEpisodes, searchEpisodes } from '../../data/utils'

const episodes = ref([])
const searchQuery = ref('')
const currentPage = ref(1)
const pageSize = ref(20)
const sortBy = ref('id')
const sortOrder = ref('asc')
const isSearching = ref(false)

// 搜索防抖
let debounceTimer = null

watch(searchQuery, (newValue) => {
  isSearching.value = true
  currentPage.value = 1 // 搜索时重置到第一页
  
  clearTimeout(debounceTimer)
  debounceTimer = setTimeout(() => {
    isSearching.value = false
  }, 300)
})

// 过滤搜索结果
const filteredEpisodes = computed(() => {
  if (!searchQuery.value) {
    return episodes.value
  }
  return searchEpisodes(searchQuery.value)
})

// 排序结果
const sortedEpisodes = computed(() => {
  return sortEpisodes(filteredEpisodes.value, sortBy.value, sortOrder.value)
})

// 分页数据
const paginatedData = computed(() => {
  return paginateEpisodes(sortedEpisodes.value, currentPage.value, pageSize.value)
})

function handleSort(field) {
  if (sortBy.value === field) {
    sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc'
  } else {
    sortBy.value = field
    sortOrder.value = 'asc'
  }
}

function changePage(page) {
  currentPage.value = page
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

onMounted(() => {
  episodes.value = getEpisodes()
})
</script>

<template>
  <div class="episodes-page">
    

    <div class="search-section">
      <div class="search-box-wrapper">
        <div class="search-icon-wrapper">
          <span class="search-icon">🔍</span>
        </div>
        <input 
          v-model="searchQuery" 
          type="text" 
          placeholder="搜索剧集号、中文标题、日文标题、漫画对应..."
          class="search-input"
        />
        <button v-if="searchQuery" @click="searchQuery = ''" class="clear-btn">
          ✕
        </button>
      </div>

      <div class="search-info" v-if="searchQuery">
        <span v-if="isSearching" class="loading">搜索中...</span>
        <span v-else class="result-count">找到 <strong>{{ filteredEpisodes.length }}</strong> 个结果</span>
      </div>
    </div>

    <div class="table-wrapper">
      <table class="episodes-table">
        <thead>
          <tr>
            <th @click="handleSort('id')" class="sortable" :class="{ active: sortBy === 'id' }">
              <div class="th-content">
                <span>原版集数</span>
                <span v-if="sortBy === 'id'" class="sort-indicator">{{ sortOrder === 'asc' ? '↑' : '↓' }}</span>
              </div>
            </th>
            <th>
              <div class="th-content">
                <span>拆分版集数</span>
              </div>
            </th>
            <th @click="handleSort('cnTitle')" class="sortable" :class="{ active: sortBy === 'cnTitle' }">
              <div class="th-content">
                <span>中文标题</span>
                <span v-if="sortBy === 'cnTitle'" class="sort-indicator">{{ sortOrder === 'asc' ? '↑' : '↓' }}</span>
              </div>
            </th>
            <th @click="handleSort('jpTitle')" class="sortable" :class="{ active: sortBy === 'jpTitle' }">
              <div class="th-content">
                <span>日文标题</span>
                <span v-if="sortBy === 'jpTitle'" class="sort-indicator">{{ sortOrder === 'asc' ? '↑' : '↓' }}</span>
              </div>
            </th>
            <th @click="handleSort('airDate')" class="sortable" :class="{ active: sortBy === 'airDate' }">
              <div class="th-content">
                <span>首播时间</span>
                <span v-if="sortBy === 'airDate'" class="sort-indicator">{{ sortOrder === 'asc' ? '↑' : '↓' }}</span>
              </div>
            </th>
            <th>对应漫画</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="episode in paginatedData.data" :key="episode.id" class="episode-row">
            <td class="episode-id">
              <span class="id-badge">{{ episode.id }}</span>
            </td>
            <td class="episode-id">
              <span class="id-badge">{{ episode.splitId || '-' }}</span>
            </td>
            <td class="episode-title cn">{{ episode.cnTitle }}</td>
            <td class="episode-title jp">{{ episode.jpTitle }}</td>
            <td class="episode-date">{{ episode.airDate }}</td>
            <td class="episode-manga">{{ episode.manga }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="pagination" v-if="paginatedData.totalPages > 1">
      <button 
        class="pagination-btn" 
        :disabled="currentPage === 1"
        @click="changePage(currentPage - 1)"
      >
        <span class="btn-icon">←</span>
        <span>上一页</span>
      </button>
      
      <div class="pagination-pages">
        <template v-for="page in Math.min(paginatedData.totalPages, 5)" :key="page">
          <button 
            v-if="page === 1 || page === paginatedData.totalPages || (page >= currentPage - 1 && page <= currentPage + 1)"
            class="page-number"
            :class="{ active: page === currentPage }"
            @click="changePage(page)"
          >
            {{ page }}
          </button>
          <span v-else-if="page === currentPage - 2 || page === currentPage + 2" class="page-ellipsis">...</span>
        </template>
      </div>
      
      <button 
        class="pagination-btn" 
        :disabled="currentPage === paginatedData.totalPages"
        @click="changePage(currentPage + 1)"
      >
        <span>下一页</span>
        <span class="btn-icon">→</span>
      </button>
    </div>
  </div>
</template>

<style scoped>
.episodes-page {
  max-width: 1400px;
  margin: 0 auto;
  padding: 40px 20px;
}

/* Search Section */
.search-section {
  margin-bottom: 32px;
}

.search-box-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  background: var(--vp-c-bg);
  border: 2px solid var(--vp-c-border);
  border-radius: 16px;
  padding: 8px 16px;
  transition: all 0.3s ease;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
}

.search-box-wrapper:focus-within {
  border-color: #667eea;
  box-shadow: 0 4px 20px rgba(102, 126, 234, 0.15);
}

.search-icon-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 10px;
  margin-right: 16px;
  flex-shrink: 0;
}

.search-icon {
  font-size: 20px;
  line-height: 1;
}

.search-input {
  flex: 1;
  border: none;
  outline: none;
  font-size: 16px;
  color: var(--vp-c-text-1);
  background: transparent;
  padding: 8px 0;
}

.search-input::placeholder {
  color: var(--vp-c-text-3);
}

.clear-btn {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--vp-c-bg-soft);
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  color: var(--vp-c-text-2);
  transition: all 0.2s ease;
  flex-shrink: 0;
}

.clear-btn:hover {
  background: var(--vp-c-border);
  color: var(--vp-c-text-1);
}

.search-info {
  margin-top: 16px;
  padding: 14px 20px;
  background: var(--vp-c-bg-soft);
  border-radius: 12px;
  font-size: 14px;
  color: var(--vp-c-text-2);
  text-align: center;
}

.loading {
  color: var(--vp-c-text-2);
}

.result-count {
  color: var(--vp-c-text-2);
}

.result-count strong {
  color: #667eea;
  font-size: 18px;
  font-weight: 700;
}

.page-header {
  margin-bottom: 32px;
}

.page-title {
  font-size: 36px;
  font-weight: 800;
  color: var(--vp-c-text-1);
  margin-bottom: 12px;
}

.page-info {
  font-size: 16px;
  color: var(--vp-c-text-2);
}

.highlight {
  color: #667eea;
  font-weight: 700;
  font-size: 20px;
}

.table-wrapper {
  background: var(--vp-c-bg);
  border: 2px solid var(--vp-c-border);
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
}

.episodes-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
}

.episodes-table thead {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.episodes-table th {
  padding: 18px 20px;
  text-align: left;
  color: white;
  font-weight: 600;
  font-size: 14px;
  border-bottom: none;
}

.episodes-table th.sortable {
  cursor: pointer;
  user-select: none;
  transition: all 0.2s ease;
}

.episodes-table th.sortable:hover {
  background: rgba(255, 255, 255, 0.1);
}

.episodes-table th.sortable.active {
  background: rgba(255, 255, 255, 0.15);
}

.th-content {
  display: flex;
  align-items: center;
  gap: 8px;
}

.sort-indicator {
  font-size: 12px;
  font-weight: bold;
}

.episodes-table tbody tr {
  border-bottom: 1px solid var(--vp-c-border);
  transition: all 0.2s ease;
}

.episodes-table tbody tr:last-child {
  border-bottom: none;
}

.episodes-table tbody tr:hover {
  background: var(--vp-c-bg-soft);
}

.episodes-table td {
  padding: 16px 20px;
  color: var(--vp-c-text-1);
}

.episode-id {
  width: 80px;
  text-align: center;
}

.id-badge {
  display: inline-block;
  min-width: 40px;
  padding: 6px 12px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 8px;
  font-weight: 700;
  font-size: 14px;
}

.episode-title {
  min-width: 200px;
  font-weight: 500;
}

.episode-title.cn {
  color: var(--vp-c-text-1);
  font-weight: 600;
}

.episode-title.jp {
  font-family: 'Noto Sans JP', sans-serif;
  color: var(--vp-c-text-2);
  font-size: 13px;
}

.episode-date {
  white-space: nowrap;
  color: var(--vp-c-text-2);
  font-family: monospace;
  font-size: 13px;
}

.episode-manga {
  font-family: monospace;
  font-size: 13px;
  color: var(--vp-c-text-2);
  background: var(--vp-c-bg-soft);
  padding: 4px 8px;
  border-radius: 4px;
  display: inline-block;
}



.pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  margin-top: 32px;
}

.pagination-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 10px 20px;
  background: var(--vp-c-bg);
  border: 2px solid var(--vp-c-border);
  border-radius: 10px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  color: var(--vp-c-text-1);
  transition: all 0.3s ease;
}

.pagination-btn:hover:not(:disabled) {
  border-color: #667eea;
  color: #667eea;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.2);
}

.pagination-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.btn-icon {
  font-size: 16px;
  font-weight: bold;
}

.pagination-pages {
  display: flex;
  align-items: center;
  gap: 8px;
}

.page-number {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--vp-c-bg);
  border: 2px solid var(--vp-c-border);
  border-radius: 10px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  color: var(--vp-c-text-1);
  transition: all 0.3s ease;
}

.page-number:hover {
  border-color: #667eea;
  color: #667eea;
  transform: translateY(-2px);
}

.page-number.active {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-color: #667eea;
  color: white;
}

.page-ellipsis {
  color: var(--vp-c-text-2);
  font-size: 14px;
  padding: 0 4px;
}

@media (max-width: 1024px) {
  .episodes-page {
    padding: 32px 16px;
  }

  .page-title {
    font-size: 28px;
  }

  .episodes-table th,
  .episodes-table td {
    padding: 14px 16px;
    font-size: 13px;
  }

  .episode-title {
    min-width: 160px;
  }
}

@media (max-width: 768px) {
  .episodes-page {
    padding: 24px 12px;
  }

  .page-title {
    font-size: 24px;
  }

  .table-wrapper {
    border-radius: 12px;
    overflow-x: auto;
  }

  .episodes-table {
    min-width: 700px;
  }

  .episodes-table th,
  .episodes-table td {
    padding: 12px 14px;
    font-size: 12px;
  }

  .episode-title {
    min-width: 140px;
  }

  .episode-title.jp {
    font-size: 12px;
  }

  .id-badge {
    min-width: 36px;
    padding: 4px 10px;
    font-size: 13px;
  }

  .pagination {
    flex-wrap: wrap;
    gap: 8px;
  }

  .pagination-btn {
    padding: 8px 16px;
    font-size: 13px;
  }

  .page-number {
    width: 36px;
    height: 36px;
    font-size: 13px;
  }
}

@media (max-width: 480px) {
  .page-header {
    text-align: center;
  }

  .page-title {
    font-size: 20px;
  }

  .page-info {
    font-size: 14px;
  }

  .pagination {
    flex-direction: column;
    width: 100%;
  }

  .pagination-btn {
    width: 100%;
    justify-content: center;
  }
}
</style>
