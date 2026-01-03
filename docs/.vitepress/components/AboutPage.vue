<script setup>
</script>

<template>
  <div class="about-page">
    <div class="page-header">
      <h1 class="page-title">关于本站</h1>
      <p class="page-subtitle">了解名侦探柯南 Wiki 的更多信息</p>
    </div>

    <div class="content-sections">
      <div class="section-card">
        <div class="card-icon">📖</div>
        <h2 class="card-title">项目简介</h2>
        <p class="card-content">
          名侦探柯南 Wiki 是一个专注于《名侦探柯南》电视动画作品的资料库网站,收录了所有剧集的详细信息,包括中文标题、日文标题、首播时间、对应漫画等内容。
        </p>
      </div>

      <div class="section-card">
        <div class="card-icon">✨</div>
        <h2 class="card-title">功能特性</h2>
        <div class="feature-list">
          <div class="feature-item">
            <span class="feature-icon">📊</span>
            <div class="feature-text">
              <strong>数据统计</strong>
              <p>提供剧集总数、年度分布等统计信息</p>
            </div>
          </div>
          <div class="feature-item">
            <span class="feature-icon">📝</span>
            <div class="feature-text">
              <strong>剧集列表</strong>
              <p>完整的剧集列表,支持排序和分页</p>
            </div>
          </div>
          <div class="feature-item">
            <span class="feature-icon">🔍</span>
            <div class="feature-text">
              <strong>搜索功能</strong>
              <p>快速搜索剧集号、标题等信息</p>
            </div>
          </div>
          <div class="feature-item">
            <span class="feature-icon">📱</span>
            <div class="feature-text">
              <strong>响应式设计</strong>
              <p>完美适配桌面和移动设备</p>
            </div>
          </div>
        </div>
      </div>

      <div class="section-card">
        <div class="card-icon">🛠️</div>
        <h2 class="card-title">技术栈</h2>
        <div class="tech-grid">
          <div class="tech-item">
            <div class="tech-icon">⚡</div>
            <div class="tech-info">
              <strong>VitePress</strong>
              <p>静态站点生成器</p>
            </div>
          </div>
          <div class="tech-item">
            <div class="tech-icon">💚</div>
            <div class="tech-info">
              <strong>Vue 3</strong>
              <p>渐进式 JavaScript 框架</p>
            </div>
          </div>
          <div class="tech-item">
            <div class="tech-icon">🎨</div>
            <div class="tech-info">
              <strong>CSS</strong>
              <p>Scoped Styles</p>
            </div>
          </div>
          <div class="tech-item">
            <div class="tech-icon">📄</div>
            <div class="tech-info">
              <strong>JSON</strong>
              <p>数据存储格式</p>
            </div>
          </div>
        </div>
      </div>

      <div class="section-card">
        <div class="card-icon">📚</div>
        <h2 class="card-title">数据来源</h2>
        <p class="card-content">
          本站数据来源于公开资料,仅供学习和参考使用。所有剧集信息均来自官方发布的内容,我们致力于提供准确、完整的信息。
        </p>
      </div>

      <div class="section-card">
        <div class="card-icon">📧</div>
        <h2 class="card-title">联系方式</h2>
        <p class="card-content">
          如有问题或建议,欢迎通过以下方式联系我们:
        </p>
        <div class="contact-list">
          <a href="#" class="contact-item">
            <span class="contact-icon">🐛</span>
            <span>提交 Issue</span>
          </a>
          <a href="#" class="contact-item">
            <span class="contact-icon">✉️</span>
            <span>发送邮件</span>
          </a>
        </div>
      </div>

      <div class="section-card">
        <div class="card-icon">📜</div>
        <h2 class="card-title">许可证</h2>
        <p class="card-content">
          本项目采用 MIT 许可证,您可以自由地使用、修改和分发本项目的代码。
        </p>
        <div class="license-badge">MIT License</div>
      </div>
    </div>

    <div class="footer-note">
      <p>最后更新: 2024年</p>
    </div>
  </div>
</template>

<style scoped>
.about-page {
  max-width: 1000px;
  margin: 0 auto;
  padding: 40px 20px;
}

.page-header {
  text-align: center;
  margin-bottom: 60px;
}

.page-title {
  font-size: 36px;
  font-weight: 800;
  color: var(--vp-c-text-1);
  margin-bottom: 12px;
}

.page-subtitle {
  font-size: 16px;
  color: var(--vp-c-text-2);
  margin: 0;
}

.content-sections {
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.section-card {
  background: var(--vp-c-bg);
  border: 2px solid var(--vp-c-border);
  border-radius: 20px;
  padding: 40px;
  transition: all 0.3s ease;
}

.section-card:hover {
  border-color: #667eea;
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(102, 126, 234, 0.15);
}

.card-icon {
  font-size: 48px;
  margin-bottom: 20px;
  line-height: 1;
}

.card-title {
  font-size: 24px;
  font-weight: 700;
  color: var(--vp-c-text-1);
  margin-bottom: 16px;
}

.card-content {
  font-size: 16px;
  line-height: 1.8;
  color: var(--vp-c-text-2);
  margin: 0;
}

.feature-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
  margin-top: 24px;
}

.feature-item {
  display: flex;
  gap: 16px;
  padding: 20px;
  background: var(--vp-c-bg-soft);
  border-radius: 12px;
  transition: all 0.3s ease;
}

.feature-item:hover {
  background: var(--vp-c-border);
  transform: translateX(4px);
}

.feature-icon {
  font-size: 28px;
  flex-shrink: 0;
}

.feature-text {
  flex: 1;
}

.feature-text strong {
  display: block;
  font-size: 16px;
  font-weight: 700;
  color: var(--vp-c-text-1);
  margin-bottom: 4px;
}

.feature-text p {
  font-size: 14px;
  color: var(--vp-c-text-2);
  margin: 0;
  line-height: 1.6;
}

.tech-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-top: 24px;
}

.tech-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  padding: 24px;
  background: var(--vp-c-bg-soft);
  border-radius: 12px;
  transition: all 0.3s ease;
}

.tech-item:hover {
  background: var(--vp-c-border);
  transform: translateY(-4px);
}

.tech-icon {
  font-size: 32px;
}

.tech-info {
  text-align: center;
}

.tech-info strong {
  display: block;
  font-size: 16px;
  font-weight: 700;
  color: var(--vp-c-text-1);
  margin-bottom: 4px;
}

.tech-info p {
  font-size: 14px;
  color: var(--vp-c-text-2);
  margin: 0;
}

.contact-list {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin-top: 24px;
}

.contact-item {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 14px 24px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 12px;
  text-decoration: none;
  font-weight: 600;
  font-size: 15px;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
}

.contact-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
}

.contact-icon {
  font-size: 18px;
}

.license-badge {
  display: inline-block;
  margin-top: 20px;
  padding: 10px 24px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 8px;
  font-weight: 700;
  font-size: 14px;
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
}

.footer-note {
  text-align: center;
  margin-top: 60px;
  padding-top: 40px;
  border-top: 2px solid var(--vp-c-border);
}

.footer-note p {
  font-size: 14px;
  color: var(--vp-c-text-2);
  margin: 0;
}

@media (max-width: 768px) {
  .about-page {
    padding: 32px 16px;
  }

  .page-header {
    margin-bottom: 40px;
  }

  .page-title {
    font-size: 28px;
  }

  .page-subtitle {
    font-size: 14px;
  }

  .section-card {
    padding: 28px;
  }

  .card-icon {
    font-size: 40px;
  }

  .card-title {
    font-size: 20px;
  }

  .card-content {
    font-size: 15px;
  }

  .feature-list {
    grid-template-columns: 1fr;
    gap: 16px;
  }

  .feature-item {
    padding: 16px;
  }

  .tech-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
  }

  .tech-item {
    padding: 20px;
  }

  .contact-list {
    flex-direction: column;
  }

  .contact-item {
    width: 100%;
    justify-content: center;
  }
}

@media (max-width: 480px) {
  .about-page {
    padding: 24px 12px;
  }

  .page-title {
    font-size: 24px;
  }

  .section-card {
    padding: 24px;
  }

  .tech-grid {
    grid-template-columns: 1fr;
  }

  .footer-note {
    margin-top: 40px;
    padding-top: 32px;
  }
}
</style>
