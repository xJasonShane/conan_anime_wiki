<script setup>
import { ref, computed, onMounted } from 'vue'
import { getStatistics } from './data/utils'

const stats = ref(null)

onMounted(() => {
  stats.value = getStatistics()
})

const sortedYears = computed(() => {
  if (!stats.value) return []
  return Object.entries(stats.value.years)
    .sort(([a], [b]) => b - a)
    .slice(0, 5)
})
</script>

# 名侦探柯南 Wiki

<div class="hero">
  <h1 class="hero-title">名侦探柯南电视动画作品资料库</h1>
  <p class="hero-subtitle">收录所有剧集信息,支持搜索和统计</p>
</div>

<div class="stats-grid" v-if="stats">
  <div class="stat-card">
    <div class="stat-icon">�</div>
    <div class="stat-content">
      <div class="stat-value">{{ stats.total }}</div>
      <div class="stat-label">总剧集数</div>
    </div>
  </div>

  <div class="stat-card">
    <div class="stat-icon">📖</div>
    <div class="stat-content">
      <div class="stat-value">{{ stats.hasManga }}</div>
      <div class="stat-label">有漫画对应</div>
    </div>
  </div>

  <div class="stat-card">
    <div class="stat-icon">📝</div>
    <div class="stat-content">
      <div class="stat-value">{{ stats.hasNotes }}</div>
      <div class="stat-label">有备注信息</div>
    </div>
  </div>

  <div class="stat-card">
    <div class="stat-icon">📅</div>
    <div class="stat-content">
      <div class="stat-value">{{ Object.keys(stats.years).length }}</div>
      <div class="stat-label">播出年份</div>
    </div>
  </div>
</div>

<div class="quick-links">
  <h2 class="section-title">快速导航</h2>
  <div class="links-grid">
    <a href="/episodes" class="link-card">
      <div class="link-icon">�</div>
      <div class="link-content">
        <div class="link-title">剧集列表</div>
        <div class="link-desc">查看所有剧集的详细信息</div>
      </div>
      <div class="link-arrow">→</div>
    </a>

    <a href="/search" class="link-card">
      <div class="link-icon">🔍</div>
      <div class="link-content">
        <div class="link-title">搜索</div>
        <div class="link-desc">快速搜索剧集信息</div>
      </div>
      <div class="link-arrow">→</div>
    </a>

    <a href="/about" class="link-card">
      <div class="link-icon">ℹ️</div>
      <div class="link-content">
        <div class="link-title">关于</div>
        <div class="link-desc">了解本站信息</div>
      </div>
      <div class="link-arrow">→</div>
    </a>
  </div>
</div>

<div class="year-stats" v-if="stats && sortedYears.length > 0">
  <h2 class="section-title">年度统计 (Top 5)</h2>
  <div class="year-list">
    <div class="year-item" v-for="[year, count] in sortedYears" :key="year">
      <div class="year-label">{{ year }}年</div>
      <div class="year-bar">
        <div class="year-fill" :style="{ width: (count / stats.total * 100) + '%' }"></div>
      </div>
      <div class="year-count">{{ count }}集</div>
    </div>
  </div>
</div>

<style scoped>
.hero {
  text-align: center;
  padding: 60px 20px;
  background: linear-gradient(135deg, var(--vp-c-brand-1) 0%, var(--vp-c-brand-2) 100%);
  border-radius: 16px;
  margin-bottom: 40px;
  color: white;
}

.hero-title {
  font-size: 32px;
  font-weight: 700;
  margin-bottom: 12px;
  line-height: 1.4;
}

.hero-subtitle {
  font-size: 18px;
  opacity: 0.9;
  margin: 0;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 40px;
}

.stat-card {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 24px;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-border);
  border-radius: 12px;
  transition: all 0.3s;
}

.stat-card:hover {
  border-color: var(--vp-c-brand-1);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.stat-icon {
  font-size: 40px;
  line-height: 1;
}

.stat-content {
  flex: 1;
}

.stat-value {
  font-size: 32px;
  font-weight: 700;
  color: var(--vp-c-brand-1);
  line-height: 1;
  margin-bottom: 4px;
}

.stat-label {
  font-size: 14px;
  color: var(--vp-c-text-2);
}

.section-title {
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 20px;
  color: var(--vp-c-text-1);
}

.quick-links {
  margin-bottom: 40px;
}

.links-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 16px;
}

.link-card {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 24px;
  background: var(--vp-c-bg);
  border: 2px solid var(--vp-c-border);
  border-radius: 12px;
  text-decoration: none;
  transition: all 0.3s;
}

.link-card:hover {
  border-color: var(--vp-c-brand-1);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.link-icon {
  font-size: 32px;
  line-height: 1;
}

.link-content {
  flex: 1;
}

.link-title {
  font-size: 18px;
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin-bottom: 4px;
}

.link-desc {
  font-size: 14px;
  color: var(--vp-c-text-2);
}

.link-arrow {
  font-size: 24px;
  color: var(--vp-c-brand-1);
  font-weight: bold;
}

.year-stats {
  margin-bottom: 40px;
}

.year-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.year-item {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 12px 16px;
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
}

.year-label {
  width: 80px;
  font-weight: 600;
  color: var(--vp-c-text-1);
  font-size: 14px;
}

.year-bar {
  flex: 1;
  height: 8px;
  background: var(--vp-c-border);
  border-radius: 4px;
  overflow: hidden;
}

.year-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--vp-c-brand-1), var(--vp-c-brand-2));
  border-radius: 4px;
  transition: width 0.5s ease;
}

.year-count {
  width: 60px;
  text-align: right;
  font-weight: 600;
  color: var(--vp-c-brand-1);
  font-size: 14px;
}

@media (max-width: 768px) {
  .hero {
    padding: 40px 20px;
  }

  .hero-title {
    font-size: 24px;
  }

  .hero-subtitle {
    font-size: 16px;
  }

  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
  }

  .stat-card {
    padding: 16px;
  }

  .stat-icon {
    font-size: 32px;
  }

  .stat-value {
    font-size: 24px;
  }

  .link-card {
    padding: 16px;
  }

  .link-icon {
    font-size: 28px;
  }

  .link-title {
    font-size: 16px;
  }

  .year-item {
    flex-wrap: wrap;
  }

  .year-label {
    width: 60px;
  }

  .year-count {
    width: 50px;
  }
}
</style>
