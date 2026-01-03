<script setup>
import { ref, computed, watch } from 'vue'
import { searchEpisodes, sortEpisodes } from '../../data/utils'

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

<template>
  <div class="search-page">
    <div class="page-header">
      <h1 class="page-title">搜索剧集</h1>
      <p class="page-subtitle">快速查找您需要的剧集信息</p>
    </div>

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
          autofocus
        />
        <button v-if="searchQuery" @click="searchQuery = ''" class="clear-btn">
          ✕
        </button>
      </div>

      <div class="search-info" v-if="searchQuery">
        <span v-if="isSearching" class="loading">搜索中...</span>
        <span v-else class="result-count">找到 <strong>{{ sortedResults.length }}</strong> 个结果</span>
      </div>
    </div>

    <div class="results-section" v-if="searchQuery && !isSearching">
      <div v-if="sortedResults.length === 0" class="no-results">
        <div class="no-results-icon">🔍</div>
        <h3>未找到匹配的剧集</h3>
        <p>尝试使用不同的关键词搜索</p>
      </div>

      <div v-else class="results-list">
        <div class="result-card" v-for="episode in sortedResults" :key="episode.id">
          <div class="result-badge">
            <span class="badge-number">{{ episode.id }}</span>
          </div>
          <div class="result-content">
            <div class="result-header">
              <h3 class="result-title cn">{{ episode.cnTitle }}</h3>
              <span class="result-date">{{ episode.airDate }}</span>
            </div>
            <p class="result-title jp">{{ episode.jpTitle }}</p>
            <div class="result-meta">
              <span class="meta-tag" v-if="episode.manga">
                <span class="tag-icon">📖</span>
                {{ episode.manga }}
              </span>
              <span class="meta-tag" v-if="episode.notes">
                <span class="tag-icon">📝</span>
                {{ episode.notes }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="placeholder-section" v-if="!searchQuery">
      <div class="placeholder-content">
        <div class="placeholder-icon">🔍</div>
        <h3>开始搜索</h3>
        <p>输入关键词搜索剧集信息</p>
        
        <div class="search-tips">
          <h4>搜索提示</h4>
          <div class="tips-grid">
            <div class="tip-item">
              <span class="tip-icon">🎯</span>
              <span>支持搜索剧集号、中文标题、日文标题</span>
            </div>
            <div class="tip-item">
              <span class="tip-icon">📖</span>
              <span>支持搜索漫画对应信息</span>
            </div>
            <div class="tip-item">
              <span class="tip-icon">🔤</span>
              <span>搜索不区分大小写</span>
            </div>
            <div class="tip-item">
              <span class="tip-icon">⚡</span>
              <span>实时搜索,无需点击按钮</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.search-page {
  max-width: 1000px;
  margin: 0 auto;
  padding: 40px 20px;
}

.page-header {
  text-align: center;
  margin-bottom: 40px;
}

.page-title {
  font-size: 36px;
  font-weight: 800;
  color: var(--vp-c-text-1);
  margin-bottom: 8px;
}

.page-subtitle {
  font-size: 16px;
  color: var(--vp-c-text-2);
  margin: 0;
}

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

.placeholder-section {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px;
}

.placeholder-content {
  text-align: center;
  max-width: 600px;
}

.placeholder-icon {
  font-size: 80px;
  margin-bottom: 24px;
  opacity: 0.5;
}

.placeholder-content h3 {
  font-size: 28px;
  font-weight: 700;
  color: var(--vp-c-text-1);
  margin-bottom: 12px;
}

.placeholder-content > p {
  font-size: 16px;
  color: var(--vp-c-text-2);
  margin-bottom: 40px;
}

.search-tips {
  text-align: left;
  padding: 28px;
  background: var(--vp-c-bg-soft);
  border: 2px solid var(--vp-c-border);
  border-radius: 16px;
}

.search-tips h4 {
  font-size: 18px;
  font-weight: 700;
  color: var(--vp-c-text-1);
  margin-bottom: 20px;
}

.tips-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 16px;
}

.tip-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  background: var(--vp-c-bg);
  border-radius: 10px;
  font-size: 14px;
  color: var(--vp-c-text-2);
}

.tip-icon {
  font-size: 20px;
  flex-shrink: 0;
}

.no-results {
  text-align: center;
  padding: 80px 20px;
}

.no-results-icon {
  font-size: 80px;
  margin-bottom: 24px;
  opacity: 0.5;
}

.no-results h3 {
  font-size: 24px;
  font-weight: 700;
  color: var(--vp-c-text-1);
  margin-bottom: 12px;
}

.no-results p {
  font-size: 16px;
  color: var(--vp-c-text-2);
  margin: 0;
}

.results-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.result-card {
  display: flex;
  gap: 20px;
  padding: 24px;
  background: var(--vp-c-bg);
  border: 2px solid var(--vp-c-border);
  border-radius: 16px;
  transition: all 0.3s ease;
}

.result-card:hover {
  border-color: #667eea;
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(102, 126, 234, 0.15);
}

.result-badge {
  flex-shrink: 0;
}

.badge-number {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 60px;
  height: 60px;
  padding: 0 16px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 12px;
  font-weight: 700;
  font-size: 20px;
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
}

.result-content {
  flex: 1;
  min-width: 0;
}

.result-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 12px;
  gap: 16px;
}

.result-title {
  font-size: 18px;
  margin: 0;
  line-height: 1.4;
}

.result-title.cn {
  font-weight: 700;
  color: var(--vp-c-text-1);
  flex: 1;
}

.result-title.jp {
  font-family: 'Noto Sans JP', sans-serif;
  font-size: 15px;
  color: var(--vp-c-text-2);
  margin-bottom: 16px;
}

.result-date {
  white-space: nowrap;
  padding: 6px 12px;
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
  font-size: 13px;
  color: var(--vp-c-text-2);
  font-family: monospace;
}

.result-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.meta-tag {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 14px;
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
  font-size: 13px;
  color: var(--vp-c-text-2);
}

.tag-icon {
  font-size: 14px;
}

@media (max-width: 768px) {
  .search-page {
    padding: 32px 16px;
  }

  .page-title {
    font-size: 28px;
  }

  .page-subtitle {
    font-size: 14px;
  }

  .search-box-wrapper {
    padding: 6px 12px;
  }

  .search-icon-wrapper {
    width: 36px;
    height: 36px;
    margin-right: 12px;
  }

  .search-icon {
    font-size: 18px;
  }

  .search-input {
    font-size: 14px;
  }

  .tips-grid {
    grid-template-columns: 1fr;
  }

  .result-card {
    flex-direction: column;
    gap: 16px;
    padding: 20px;
  }

  .result-badge {
    width: 100%;
    display: flex;
    justify-content: center;
  }

  .badge-number {
    min-width: 50px;
    height: 50px;
    font-size: 18px;
  }

  .result-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }

  .result-title {
    font-size: 16px;
  }

  .result-title.jp {
    font-size: 14px;
  }

  .result-meta {
    flex-direction: column;
  }
}

@media (max-width: 480px) {
  .search-page {
    padding: 24px 12px;
  }

  .page-title {
    font-size: 24px;
  }

  .placeholder-icon,
  .no-results-icon {
    font-size: 60px;
  }

  .placeholder-content h3,
  .no-results h3 {
    font-size: 20px;
  }

  .search-tips {
    padding: 20px;
  }

  .search-tips h4 {
    font-size: 16px;
  }

  .tip-item {
    font-size: 13px;
  }
}
</style>
