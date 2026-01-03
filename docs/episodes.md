<script setup>
import { ref, computed, onMounted } from 'vue'
import { getEpisodes, sortEpisodes, paginateEpisodes } from './data/utils'

const episodes = ref([])
const currentPage = ref(1)
const pageSize = ref(20)
const sortBy = ref('id')
const sortOrder = ref('asc')

const sortedEpisodes = computed(() => {
  return sortEpisodes(episodes.value, sortBy.value, sortOrder.value)
})

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

# 剧集列表

<div class="episodes-container">
  <div class="episodes-info">
    共 <strong>{{ paginatedData.total }}</strong> 集动画
  </div>

  <div class="table-container">
    <table class="episodes-table">
      <thead>
        <tr>
          <th @click="handleSort('id')" class="sortable">
            集数
            <span v-if="sortBy === 'id'" class="sort-icon">{{ sortOrder === 'asc' ? '↑' : '↓' }}</span>
          </th>
          <th @click="handleSort('cnTitle')" class="sortable">
            中文标题
            <span v-if="sortBy === 'cnTitle'" class="sort-icon">{{ sortOrder === 'asc' ? '↑' : '↓' }}</span>
          </th>
          <th @click="handleSort('jpTitle')" class="sortable">
            日文标题
            <span v-if="sortBy === 'jpTitle'" class="sort-icon">{{ sortOrder === 'asc' ? '↑' : '↓' }}</span>
          </th>
          <th @click="handleSort('airDate')" class="sortable">
            首播时间
            <span v-if="sortBy === 'airDate'" class="sort-icon">{{ sortOrder === 'asc' ? '↑' : '↓' }}</span>
          </th>
          <th>对应漫画</th>
          <th>备注</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="episode in paginatedData.data" :key="episode.id">
          <td class="episode-id">{{ episode.id }}</td>
          <td class="episode-title">{{ episode.cnTitle }}</td>
          <td class="episode-title jp">{{ episode.jpTitle }}</td>
          <td class="episode-date">{{ episode.airDate }}</td>
          <td class="episode-manga">{{ episode.manga }}</td>
          <td class="episode-notes">{{ episode.notes }}</td>
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
      上一页
    </button>
    
    <span class="pagination-info">
      第 {{ currentPage }} / {{ paginatedData.totalPages }} 页
    </span>
    
    <button 
      class="pagination-btn" 
      :disabled="currentPage === paginatedData.totalPages"
      @click="changePage(currentPage + 1)"
    >
      下一页
    </button>
  </div>
</div>

<style scoped>
.episodes-container {
  margin-top: 20px;
}

.episodes-info {
  margin-bottom: 20px;
  padding: 12px 16px;
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
  font-size: 14px;
}

.table-container {
  overflow-x: auto;
  border-radius: 8px;
  border: 1px solid var(--vp-c-border);
}

.episodes-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
}

.episodes-table th,
.episodes-table td {
  padding: 12px 16px;
  text-align: left;
  border-bottom: 1px solid var(--vp-c-border);
}

.episodes-table th {
  background: var(--vp-c-bg-soft);
  font-weight: 600;
  position: sticky;
  top: 0;
}

.episodes-table th.sortable {
  cursor: pointer;
  user-select: none;
}

.episodes-table th.sortable:hover {
  background: var(--vp-c-bg-soft-hover);
}

.sort-icon {
  margin-left: 4px;
  font-size: 12px;
}

.episodes-table tbody tr:hover {
  background: var(--vp-c-bg-soft);
}

.episode-id {
  font-weight: 600;
  color: var(--vp-c-brand-1);
  white-space: nowrap;
}

.episode-title {
  min-width: 200px;
}

.episode-title.jp {
  font-family: 'Noto Sans JP', sans-serif;
}

.episode-date {
  white-space: nowrap;
}

.episode-manga {
  font-family: monospace;
  font-size: 13px;
}

.episode-notes {
  font-style: italic;
  color: var(--vp-c-text-2);
  min-width: 150px;
}

.pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  margin-top: 20px;
}

.pagination-btn {
  padding: 8px 16px;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-border);
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s;
}

.pagination-btn:hover:not(:disabled) {
  background: var(--vp-c-brand-1);
  color: white;
  border-color: var(--vp-c-brand-1);
}

.pagination-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.pagination-info {
  font-size: 14px;
  color: var(--vp-c-text-2);
}

@media (max-width: 768px) {
  .episodes-table th,
  .episodes-table td {
    padding: 8px 12px;
    font-size: 13px;
  }

  .episode-title {
    min-width: 150px;
  }

  .pagination {
    flex-direction: column;
    gap: 8px;
  }
}
</style>
