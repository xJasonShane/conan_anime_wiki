<script setup>
import { ref, computed, onMounted } from 'vue'
import { getStatistics } from '../../data/utils'

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

<template>
  <div class="home-container">
    <div class="hero-section">
      <div class="hero-content">
        <h1 class="hero-title">名侦探柯南 Wiki</h1>
        <p class="hero-subtitle">收录所有剧集信息,支持搜索和统计</p>
        <div class="hero-actions">
          <a href="/episodes.md" class="btn btn-primary">浏览剧集</a>
          <a href="/search.md" class="btn btn-secondary">搜索剧集</a>
        </div>
      </div>
    </div>

    <div class="stats-section" v-if="stats && stats.total">
      <h2 class="section-title">数据统计</h2>
      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-icon-wrapper">
            <span class="stat-icon">📺</span>
          </div>
          <div class="stat-content">
            <div class="stat-value">{{ stats.total }}</div>
            <div class="stat-label">总剧集数</div>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-icon-wrapper">
            <span class="stat-icon">📖</span>
          </div>
          <div class="stat-content">
            <div class="stat-value">{{ stats.hasManga }}</div>
            <div class="stat-label">有漫画对应</div>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-icon-wrapper">
            <span class="stat-icon">📝</span>
          </div>
          <div class="stat-content">
            <div class="stat-value">{{ stats.hasNotes }}</div>
            <div class="stat-label">有备注信息</div>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-icon-wrapper">
            <span class="stat-icon">📅</span>
          </div>
          <div class="stat-content">
            <div class="stat-value">{{ Object.keys(stats.years).length }}</div>
            <div class="stat-label">播出年份</div>
          </div>
        </div>
      </div>
    </div>

    <div class="quick-links-section">
      <h2 class="section-title">快速导航</h2>
      <div class="links-grid">
        <a href="/episodes.md" class="link-card">
          <div class="link-icon">📋</div>
          <div class="link-content">
            <div class="link-title">剧集列表</div>
            <div class="link-desc">查看所有剧集的详细信息</div>
          </div>
          <div class="link-arrow">→</div>
        </a>

        <a href="/search.md" class="link-card">
          <div class="link-icon">🔍</div>
          <div class="link-content">
            <div class="link-title">搜索</div>
            <div class="link-desc">快速搜索剧集信息</div>
          </div>
          <div class="link-arrow">→</div>
        </a>

        <a href="/about.md" class="link-card">
          <div class="link-icon">ℹ️</div>
          <div class="link-content">
            <div class="link-title">关于</div>
            <div class="link-desc">了解本站信息</div>
          </div>
          <div class="link-arrow">→</div>
        </a>
      </div>
    </div>

    <div class="year-stats-section" v-if="stats && sortedYears.length > 0">
      <h2 class="section-title">年度统计 (Top 5)</h2>
      <div class="year-list">
        <div class="year-item" v-for="[year, count] in sortedYears" :key="year">
          <div class="year-label">{{ year }}年</div>
          <div class="year-bar-container">
            <div class="year-bar">
              <div class="year-fill" :style="{ width: (count / stats.total * 100) + '%' }"></div>
            </div>
          </div>
          <div class="year-count">{{ count }}集</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.home-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.hero-section {
  text-align: center;
  padding: 80px 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 20px;
  margin-bottom: 60px;
  color: white;
  box-shadow: 0 10px 40px rgba(102, 126, 234, 0.3);
}

.hero-content {
  max-width: 800px;
  margin: 0 auto;
}

.hero-title {
  font-size: 48px;
  font-weight: 800;
  margin-bottom: 16px;
  line-height: 1.2;
  letter-spacing: -0.5px;
}

.hero-subtitle {
  font-size: 20px;
  opacity: 0.95;
  margin-bottom: 32px;
  font-weight: 400;
}

.hero-actions {
  display: flex;
  gap: 16px;
  justify-content: center;
  flex-wrap: wrap;
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 14px 32px;
  font-size: 16px;
  font-weight: 600;
  border-radius: 12px;
  text-decoration: none;
  transition: all 0.3s ease;
  cursor: pointer;
}

.btn-primary {
  background: white;
  color: #667eea;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
}

.btn-secondary {
  background: rgba(255, 255, 255, 0.2);
  color: white;
  backdrop-filter: blur(10px);
  border: 2px solid rgba(255, 255, 255, 0.3);
}

.btn-secondary:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: translateY(-2px);
}

.stats-section,
.quick-links-section,
.year-stats-section {
  margin-bottom: 60px;
}

.section-title {
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 24px;
  color: var(--vp-c-text-1);
  text-align: center;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 24px;
}

.stat-card {
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 28px;
  background: var(--vp-c-bg-soft);
  border: 2px solid var(--vp-c-border);
  border-radius: 16px;
  transition: all 0.3s ease;
}

.stat-card:hover {
  border-color: #667eea;
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(102, 126, 234, 0.15);
}

.stat-icon-wrapper {
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 12px;
  flex-shrink: 0;
}

.stat-icon {
  font-size: 28px;
  line-height: 1;
}

.stat-content {
  flex: 1;
}

.stat-value {
  font-size: 36px;
  font-weight: 800;
  color: #667eea;
  line-height: 1;
  margin-bottom: 6px;
}

.stat-label {
  font-size: 14px;
  color: var(--vp-c-text-2);
  font-weight: 500;
}

.links-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 20px;
}

.link-card {
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 28px;
  background: var(--vp-c-bg);
  border: 2px solid var(--vp-c-border);
  border-radius: 16px;
  text-decoration: none;
  transition: all 0.3s ease;
}

.link-card:hover {
  border-color: #667eea;
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(102, 126, 234, 0.15);
}

.link-icon {
  font-size: 40px;
  line-height: 1;
  flex-shrink: 0;
}

.link-content {
  flex: 1;
}

.link-title {
  font-size: 20px;
  font-weight: 700;
  color: var(--vp-c-text-1);
  margin-bottom: 6px;
}

.link-desc {
  font-size: 14px;
  color: var(--vp-c-text-2);
  line-height: 1.5;
}

.link-arrow {
  font-size: 28px;
  color: #667eea;
  font-weight: bold;
  flex-shrink: 0;
  transition: transform 0.3s ease;
}

.link-card:hover .link-arrow {
  transform: translateX(4px);
}

.year-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.year-item {
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 20px 24px;
  background: var(--vp-c-bg-soft);
  border: 2px solid var(--vp-c-border);
  border-radius: 12px;
  transition: all 0.3s ease;
}

.year-item:hover {
  border-color: #667eea;
  transform: translateX(4px);
}

.year-label {
  width: 100px;
  font-weight: 700;
  color: var(--vp-c-text-1);
  font-size: 16px;
  flex-shrink: 0;
}

.year-bar-container {
  flex: 1;
  min-width: 0;
}

.year-bar {
  height: 12px;
  background: var(--vp-c-border);
  border-radius: 6px;
  overflow: hidden;
}

.year-fill {
  height: 100%;
  background: linear-gradient(90deg, #667eea, #764ba2);
  border-radius: 6px;
  transition: width 0.6s ease;
}

.year-count {
  width: 80px;
  text-align: right;
  font-weight: 700;
  color: #667eea;
  font-size: 16px;
  flex-shrink: 0;
}

@media (max-width: 768px) {
  .home-container {
    padding: 0 16px;
  }

  .hero-section {
    padding: 60px 20px;
    margin-bottom: 40px;
  }

  .hero-title {
    font-size: 32px;
  }

  .hero-subtitle {
    font-size: 16px;
  }

  .hero-actions {
    flex-direction: column;
    width: 100%;
  }

  .btn {
    width: 100%;
  }

  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
  }

  .stat-card {
    padding: 20px;
  }

  .stat-icon-wrapper {
    width: 50px;
    height: 50px;
  }

  .stat-icon {
    font-size: 24px;
  }

  .stat-value {
    font-size: 28px;
  }

  .links-grid {
    grid-template-columns: 1fr;
  }

  .link-card {
    padding: 20px;
  }

  .link-icon {
    font-size: 32px;
  }

  .link-title {
    font-size: 18px;
  }

  .year-item {
    flex-wrap: wrap;
    padding: 16px;
  }

  .year-label {
    width: 70px;
    font-size: 14px;
  }

  .year-count {
    width: 60px;
    font-size: 14px;
  }

  .section-title {
    font-size: 24px;
  }
}

@media (max-width: 480px) {
  .stats-grid {
    grid-template-columns: 1fr;
  }
}
</style>
