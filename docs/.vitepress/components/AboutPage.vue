<script setup>
import { ref } from 'vue'

const contributors = ref([
  { name: 'xJasonShane', role: '项目维护者', avatar: 'https://github.com/xJasonShane.png?size=40' },
  { name: '社区贡献者', role: '数据维护', avatar: 'https://github.com/github.png?size=40' }
])

const features = [
  { icon: '📊', title: '数据统计', description: '提供剧集总数、年度分布等详细统计信息，直观展示柯南动画的发展历程' },
  { icon: '📝', title: '剧集列表', description: '完整的剧集列表，支持多种排序方式和分页浏览，方便快速查找特定剧集' },
  { icon: '🔍', title: '搜索功能', description: '强大的搜索功能，支持按剧集号、标题、漫画对应等多维度搜索' },
  { icon: '📱', title: '响应式设计', description: '完美适配桌面、平板和移动设备，随时随地查看剧集信息' },
  { icon: '📅', title: '更新记录', description: '定期更新最新剧集信息，确保数据的及时性和准确性' },
  { icon: '🌍', title: '多语言支持', description: '支持中英文切换，方便不同语言用户使用' }
]

const techStack = [
  { name: 'VitePress', description: '现代化的静态站点生成器', icon: '⚡' },
  { name: 'Vue 3', description: '渐进式 JavaScript 框架', icon: '💚' },
  { name: 'CSS', description: 'Scoped Styles 实现组件样式隔离', icon: '🎨' },
  { name: 'JSON', description: '轻量级数据存储格式', icon: '📄' },
  { name: 'GitHub', description: '代码托管和版本控制', icon: '🐱' },
  { name: 'Cloudflare', description: '全球 CDN 加速', icon: '☁️' }
]
</script>

<template>
  <div class="about-page">
    <!-- Hero Section -->
    <section class="about-hero">
      <div class="hero-content">
        <h1 class="hero-title">名侦探柯南电视动画Wiki</h1>
        <p class="hero-subtitle">全面的《名侦探柯南》电视动画剧集信息查询平台，为柯迷提供最新、最完整的剧集资料</p>
      </div>
    </section>

    <!-- Features Section -->
    <section class="features-section">
      <div class="section-content">
        <h2 class="section-title">功能特性</h2>
        <div class="features-grid">
          <div class="feature-card" v-for="(feature, index) in features" :key="index">
            <div class="feature-icon">{{ feature.icon }}</div>
            <div class="feature-content">
              <h3 class="feature-title">{{ feature.title }}</h3>
              <p class="feature-description">{{ feature.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Tech Stack Section -->
    <section class="tech-section">
      <div class="section-content">
        <h2 class="section-title">技术栈</h2>
        <div class="tech-grid">
          <div class="tech-card" v-for="(tech, index) in techStack" :key="index">
            <div class="tech-icon">{{ tech.icon }}</div>
            <div class="tech-content">
              <h3 class="tech-name">{{ tech.name }}</h3>
              <p class="tech-description">{{ tech.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Contributors Section -->
    <section class="contributors-section">
      <div class="section-content">
        <h2 class="section-title">项目贡献者</h2>
        <div class="contributors-grid">
          <div class="contributor-card" v-for="(contributor, index) in contributors" :key="index">
            <img :src="contributor.avatar" alt="" class="contributor-avatar">
            <div class="contributor-info">
              <h3 class="contributor-name">{{ contributor.name }}</h3>
              <p class="contributor-role">{{ contributor.role }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Data Source Section -->
    <section class="data-section">
      <div class="section-content">
        <h2 class="section-title">数据来源</h2>
        <p class="section-text">
          本站数据来源于公开资料，包括官方发布的剧集信息、漫画对应关系等。我们致力于提供准确、完整的信息，
          但由于数据量庞大，难免存在疏漏，欢迎社区用户提出指正和补充。
        </p>
      </div>
    </section>

    <!-- Contact Section -->
    <section class="contact-section">
      <div class="section-content">
        <h2 class="section-title">联系方式</h2>
        <p class="section-text">
          如有问题或建议，欢迎通过以下方式联系我们：
        </p>
        <div class="contact-grid">
          <a href="#" class="contact-item">
            <span class="contact-icon">🐛</span>
            <span class="contact-text">提交 Issue</span>
          </a>
          <a href="#" class="contact-item">
            <span class="contact-icon">📧</span>
            <span class="contact-text">发送邮件</span>
          </a>
          <a href="#" class="contact-item">
            <span class="contact-icon">📱</span>
            <span class="contact-text">加入社区</span>
          </a>
          <a href="https://github.com/xJasonShane/conan_anime_wiki" target="_blank" class="contact-item">
            <span class="contact-icon">⭐</span>
            <span class="contact-text">Star 项目</span>
          </a>
        </div>
      </div>
    </section>

    <!-- License Section -->
    <section class="license-section">
      <div class="section-content">
        <h2 class="section-title">许可证</h2>
        <div class="license-card">
          <div class="license-badge">MIT License</div>
          <p class="license-text">
            本项目采用 MIT 许可证，您可以自由地使用、修改和分发本项目的代码，
            无论是用于个人学习还是商业用途。
          </p>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.about-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
  background: var(--vp-c-bg);
}

/* Hero Section */
.about-hero {
  text-align: center;
  padding: 80px 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 20px;
  margin-bottom: 60px;
  color: white;
  box-shadow: 0 10px 40px rgba(102, 126, 234, 0.3);
}

.hero-icon {
  font-size: 80px;
  margin-bottom: 24px;
  animation: bounce 2s infinite;
}

@keyframes bounce {
  0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
  40% { transform: translateY(-20px); }
  60% { transform: translateY(-10px); }
}

.hero-title {
  font-size: 56px;
  font-weight: 800;
  margin-bottom: 16px;
  line-height: 1.2;
  letter-spacing: -0.5px;
}

.hero-subtitle {
  font-size: 20px;
  opacity: 0.95;
  margin: 0;
  font-weight: 400;
}

/* Common Section Styles */
.features-section,
.tech-section,
.contributors-section,
.data-section,
.contact-section,
.license-section {
  margin-bottom: 80px;
}

.section-content {
  max-width: 900px;
  margin: 0 auto;
}

.section-title {
  font-size: 32px;
  font-weight: 800;
  color: var(--vp-c-text-1);
  text-align: center;
  margin-bottom: 24px;
  position: relative;
  padding-bottom: 12px;
}

.section-title::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 80px;
  height: 4px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 2px;
}

.section-text {
  font-size: 16px;
  line-height: 1.8;
  color: var(--vp-c-text-2);
  margin: 0 0 20px 0;
  text-align: center;
}

/* Features Section */
.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 28px;
  margin-top: 40px;
}

.feature-card {
  display: flex;
  gap: 20px;
  padding: 32px;
  background: var(--vp-c-bg-soft);
  border: 2px solid var(--vp-c-border);
  border-radius: 16px;
  transition: all 0.3s ease;
}

.feature-card:hover {
  border-color: #667eea;
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(102, 126, 234, 0.15);
}

.feature-icon {
  font-size: 40px;
  flex-shrink: 0;
  align-self: flex-start;
  margin-top: 4px;
}

.feature-content {
  flex: 1;
}

.feature-title {
  font-size: 20px;
  font-weight: 700;
  color: var(--vp-c-text-1);
  margin-bottom: 12px;
}

.feature-description {
  font-size: 14px;
  line-height: 1.6;
  color: var(--vp-c-text-2);
  margin: 0;
}

/* Tech Stack Section */
.tech-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 24px;
  margin-top: 40px;
}

.tech-card {
  text-align: center;
  padding: 32px 24px;
  background: var(--vp-c-bg-soft);
  border: 2px solid var(--vp-c-border);
  border-radius: 16px;
  transition: all 0.3s ease;
}

.tech-card:hover {
  border-color: #667eea;
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(102, 126, 234, 0.15);
}

.tech-icon {
  font-size: 48px;
  margin-bottom: 16px;
}

.tech-name {
  font-size: 18px;
  font-weight: 700;
  color: var(--vp-c-text-1);
  margin-bottom: 8px;
}

.tech-description {
  font-size: 14px;
  color: var(--vp-c-text-2);
  margin: 0;
  line-height: 1.5;
}

/* Contributors Section */
.contributors-grid {
  display: flex;
  justify-content: center;
  gap: 32px;
  margin-top: 40px;
  flex-wrap: wrap;
}

.contributor-card {
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 24px 32px;
  background: var(--vp-c-bg-soft);
  border: 2px solid var(--vp-c-border);
  border-radius: 16px;
  transition: all 0.3s ease;
}

.contributor-card:hover {
  border-color: #667eea;
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(102, 126, 234, 0.15);
}

.contributor-avatar {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  border: 3px solid #667eea;
  transition: all 0.3s ease;
}

.contributor-card:hover .contributor-avatar {
  transform: scale(1.1);
}

.contributor-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.contributor-name {
  font-size: 18px;
  font-weight: 700;
  color: var(--vp-c-text-1);
  margin: 0;
}

.contributor-role {
  font-size: 14px;
  color: var(--vp-c-text-2);
  margin: 0;
}

/* Contact Section */
.contact-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-top: 40px;
}

.contact-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  padding: 28px 24px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  text-decoration: none;
  border-radius: 16px;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
}

.contact-item:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(102, 126, 234, 0.4);
}

.contact-icon {
  font-size: 32px;
}

.contact-text {
  font-size: 16px;
  font-weight: 600;
}

/* License Section */
.license-card {
  text-align: center;
  padding: 40px;
  background: var(--vp-c-bg-soft);
  border: 2px solid var(--vp-c-border);
  border-radius: 16px;
  margin-top: 40px;
}

.license-badge {
  display: inline-block;
  padding: 12px 28px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 24px;
  font-weight: 700;
  font-size: 16px;
  margin-bottom: 24px;
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
}

.license-text {
  font-size: 15px;
  line-height: 1.6;
  color: var(--vp-c-text-2);
  margin: 0;
}

/* Responsive Design */
@media (max-width: 1024px) {
  .about-page {
    padding: 32px 16px;
  }

  .hero-title {
    font-size: 44px;
  }

  .features-grid {
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 24px;
  }

  .tech-grid {
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 20px;
  }
}

@media (max-width: 768px) {
  .about-page {
    padding: 24px 12px;
  }

  .about-hero {
    padding: 60px 20px;
    margin-bottom: 50px;
  }

  .hero-icon {
    font-size: 60px;
  }

  .hero-title {
    font-size: 38px;
  }

  .hero-subtitle {
    font-size: 18px;
  }

  .section-title {
    font-size: 28px;
  }

  .features-section,
  .tech-section,
  .contributors-section,
  .data-section,
  .contact-section,
  .license-section {
    margin-bottom: 60px;
  }

  .features-grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }

  .feature-card {
    padding: 24px;
  }

  .tech-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
  }

  .tech-card {
    padding: 24px 16px;
  }

  .contributors-grid {
    flex-direction: column;
    align-items: center;
    gap: 16px;
  }

  .contributor-card {
    width: 100%;
    max-width: 400px;
    justify-content: center;
  }

  .contact-grid {
    grid-template-columns: 1fr;
    gap: 16px;
  }

  .license-card {
    padding: 32px 24px;
  }
}

@media (max-width: 480px) {
  .hero-title {
    font-size: 32px;
  }

  .section-title {
    font-size: 24px;
  }

  .feature-card {
    flex-direction: column;
    text-align: center;
  }

  .feature-icon {
    align-self: center;
  }

  .tech-grid {
    grid-template-columns: 1fr;
  }

  .contributor-card {
    flex-direction: column;
    text-align: center;
    gap: 16px;
  }
}
</style>
