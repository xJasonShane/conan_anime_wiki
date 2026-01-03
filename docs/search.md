<script setup>
import { ref, computed, watch } from 'vue'
import { searchEpisodes, sortEpisodes } from './data/utils'

const searchQuery = ref('')
const searchResults = ref([])
const sortBy = ref('id')
const sortOrder = ref('asc')
const isSearching = ref(false)

const sortedResults = computed(() => {
  return sortEpisodes(searchResults.value, sortBy.value, sortOrder.value)
})

function handleSort(field) {
  if (sortBy.value === field) {
    sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc'
  } else {
    sortBy.value = field
    sortOrder.value = 'asc'
  }
}

let debounceTimer = null

watch(searchQuery, (newValue) => {
  isSearching.value = true
  
  clearTimeout(debounceTimer)
  debounceTimer = setTimeout(() => {
    searchResults.value = searchEpisodes(newValue)
    isSearching.value = false
  }, 300)
})
</script>

# 搜索

<div class="search-container">
  <div class="search-box">
    <input 
      v-model="searchQuery" 
      type="text" 
      placeholder="搜索剧集号、中文标题、日文标题、漫画对应..."
      class="search-input"
      autofocus
    />
    <div class="search-icon">🔍</div>
  </div>

  <div class="search-info" v-if="searchQuery">
    <span v-if="isSearching">搜索中...</span>
    <span v-else>找到 <strong>{{ sortedResults.length }}</strong> 个结果</span>
  </div>

  <div class="results-container" v-if="searchQuery && !isSearching">
    <div v-if="sortedResults.length === 0" class="no-results">
      <p>未找到匹配的剧集</p>
      <p class="hint">尝试使用不同的关键词搜索</p>
    </div>

    <div v-else class="results-list">
      <div class="result-card" v-for="episode in sortedResults" :key="episode.id">
        <div class="result-header">
          <span class="result-id">第 {{ episode.id }} 集</span>
          <span class="result-date">{{ episode.airDate }}</span>
        </div>
        <div class="result-title cn">{{ episode.cnTitle }}</div>
        <div class="result-title jp">{{ episode.jpTitle }}</div>
        <div class="result-meta">
          <span class="meta-item" v-if="episode.manga">
            <strong>漫画:</strong> {{ episode.manga }}
          </span>
          <span class="meta-item" v-if="episode.notes">
            <strong>备注:</strong> {{ episode.notes }}
          </span>
        </div>
      </div>
    </div>
  </div>

  <div class="placeholder" v-if="!searchQuery">
    <div class="placeholder-icon">🔍</div>
    <h3>开始搜索</h3>
    <p>输入关键词搜索剧集信息</p>
    <div class="search-tips">
      <p><strong>搜索提示:</strong></p>
      <ul>
        <li>支持搜索剧集号、中文标题、日文标题</li>
        <li>支持搜索漫画对应信息</li>
        <li>搜索不区分大小写</li>
      </ul>
    </div>
  </div>
</div>

<style scoped>
.search-container {
  max-width: 900px;
  margin: 20px auto 0;
}

.search-box {
  position: relative;
  margin-bottom: 20px;
}

.search-input {
  width: 100%;
  padding: 16px 50px 16px 20px;
  font-size: 16px;
  border: 2px solid var(--vp-c-border);
  border-radius: 12px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  transition: all 0.3s;
}

.search-input:focus {
  outline: none;
  border-color: var(--vp-c-brand-1);
  box-shadow: 0 0 0 3px rgba(124, 77, 255, 0.1);
}

.search-input::placeholder {
  color: var(--vp-c-text-3);
}

.search-icon {
  position: absolute;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 20px;
  color: var(--vp-c-text-3);
  pointer-events: none;
}

.search-info {
  margin-bottom: 20px;
  padding: 12px 16px;
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
  font-size: 14px;
  color: var(--vp-c-text-2);
}

.placeholder {
  text-align: center;
  padding: 60px 20px;
}

.placeholder-icon {
  font-size: 64px;
  margin-bottom: 20px;
  opacity: 0.5;
}

.placeholder h3 {
  font-size: 24px;
  margin-bottom: 10px;
  color: var(--vp-c-text-1);
}

.placeholder p {
  font-size: 16px;
  color: var(--vp-c-text-2);
  margin-bottom: 30px;
}

.search-tips {
  max-width: 400px;
  margin: 0 auto;
  text-align: left;
  padding: 20px;
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
}

.search-tips p {
  margin-bottom: 10px;
  font-size: 14px;
}

.search-tips ul {
  list-style: none;
  padding: 0;
}

.search-tips li {
  padding: 6px 0;
  padding-left: 20px;
  position: relative;
  font-size: 14px;
  color: var(--vp-c-text-2);
}

.search-tips li::before {
  content: '•';
  position: absolute;
  left: 0;
  color: var(--vp-c-brand-1);
}

.no-results {
  text-align: center;
  padding: 60px 20px;
}

.no-results p {
  margin: 10px 0;
}

.no-results p:first-child {
  font-size: 18px;
  color: var(--vp-c-text-1);
}

.no-results .hint {
  font-size: 14px;
  color: var(--vp-c-text-2);
}

.results-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.result-card {
  padding: 20px;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-border);
  border-radius: 12px;
  transition: all 0.3s;
}

.result-card:hover {
  border-color: var(--vp-c-brand-1);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.result-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.result-id {
  font-weight: 600;
  color: var(--vp-c-brand-1);
  font-size: 14px;
}

.result-date {
  font-size: 13px;
  color: var(--vp-c-text-2);
}

.result-title {
  font-size: 16px;
  margin-bottom: 8px;
  color: var(--vp-c-text-1);
}

.result-title.cn {
  font-weight: 600;
}

.result-title.jp {
  font-family: 'Noto Sans JP', sans-serif;
  font-size: 14px;
  color: var(--vp-c-text-2);
}

.result-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px solid var(--vp-c-border);
}

.meta-item {
  font-size: 13px;
  color: var(--vp-c-text-2);
}

.meta-item strong {
  color: var(--vp-c-text-1);
}

@media (max-width: 768px) {
  .search-container {
    margin: 10px auto 0;
  }

  .search-input {
    font-size: 14px;
    padding: 12px 45px 12px 16px;
  }

  .result-card {
    padding: 16px;
  }

  .result-title {
    font-size: 15px;
  }

  .result-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 6px;
  }

  .result-meta {
    flex-direction: column;
    gap: 8px;
  }
}
</style>
