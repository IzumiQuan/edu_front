<script setup>
import { ref, onMounted } from 'vue';
import { Clock, User, ArrowRight } from '@element-plus/icons-vue';

// 模拟课程数据
const courseImageUrl = ref('@/assets/course-cover.png');
const courseTitle = ref('');
const courseTags = ref([]);
const courseHours = ref(0);
const studentCount = ref(0);
const coursePrice = ref('');
const courseDescription = ref('');

// 模拟从API获取数据
const fetchCourseData = async () => {
  try {
    // 实际应用中应替换为真实API调用
    const mockData = {
      title: '课程名称',
      tags: ['课程标签1', '课程标签2', '课程标签3'],
      hours: 20,
      studentCount: 270,
      price: '¥4.99',
      description: '<div class="rich-text"><h3>课程简介</h3><p>这是一个详细的课程描述，包含课程目标、适合人群和学习内容等信息。</p><ul><li>学习目标1</li><li>学习目标2</li><li>学习目标3</li></ul></div>'
    };

    courseTitle.value = mockData.title;
    courseTags.value = mockData.tags;
    courseHours.value = mockData.hours;
    studentCount.value = mockData.studentCount;
    coursePrice.value = mockData.price;
    courseDescription.value = mockData.description;
  } catch (error) {
    console.error('获取课程数据失败:', error);
  }
};

// 生命周期钩子
onMounted(() => {
  fetchCourseData();
});

// 开始学习方法
const startLearning = () => {
  // 实际应用中应添加登录检查和路由跳转逻辑
  console.log('开始学习课程');
};
</script>

<template>
  <div class="course-details-course-description">
    <!-- 课程信息区域 -->
    <div class="course-info">
      <div class="course-image">
        <img :src="courseImageUrl" alt="课程封面" class="course-image-placeholder" />
      </div>
      <div class="course-meta">
        <div class="course-title">
          <h1>{{ courseTitle }}</h1>
        </div>
        <div class="course-tags">
          <span v-for="tag in courseTags" :key="tag" class="tag">#{{ tag }}</span>
        </div>
        <div class="course-stats">
          <span class="stat-item"><el-icon><Clock /></el-icon>{{ courseHours }}学时</span>
          <span class="stat-item"><el-icon><User /></el-icon>{{ studentCount }}人加入学习</span>
        </div>
        <div class="course-price">
          <span class="price">{{ coursePrice }}</span>
        </div>
        <div class="course-actions">
          <el-button type="primary" size="large" @click="startLearning">
            <el-icon><ArrowRight /></el-icon>开始学习
          </el-button>
        </div>
      </div>
    </div>
    <!-- 课程简介区域 -->
    <div class="course-description">
      <div class="description-content" v-html="courseDescription"></div>
    </div>
  </div>
</template>

<style scoped>
.course-details-course-description {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.course-info {
  display: flex;
  gap: 20px;
  margin-bottom: 30px;
}

.course-image {
  flex: 1;
  background-color: #f5f5f5;
  border-radius: 8px;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
}

.course-image-placeholder {
  max-width: 100%;
  height: auto;
  object-fit: cover;
}

.course-meta {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.course-title h1 {
  font-size: 24px;
  color: #333;
  margin: 0;
}

.course-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.tag {
  background-color: #e8f3ff;
  color: #409eff;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 14px;
}

.course-stats {
  display: flex;
  gap: 20px;
  color: #666;
  font-size: 16px;
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 5px;
}

.course-price {
  margin-top: 10px;
}

.price {
  font-size: 28px;
  font-weight: bold;
  color: #f56c6c;
}

.course-actions {
  margin-top: 20px;
}

.course-description {
  background-color: #fff;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.08);
}

.description-content {
  line-height: 1.8;
  color: #333;
}

.description-content h3 {
  font-size: 20px;
  margin-bottom: 15px;
}

.description-content p {
  margin-bottom: 15px;
}

.description-content ul {
  padding-left: 20px;
  margin-bottom: 15px;
}

.description-content li {
  margin-bottom: 8px;
}
</style>