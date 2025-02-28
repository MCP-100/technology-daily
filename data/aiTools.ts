export interface Tool {
  id: number;
  title: string;
  description: string;
  highlights: string[];
  features: string[];
}

export const aiTools: Tool[] = [
  {
    id: 1,
    title: "Inspire/Music: 阿里开源的音乐生成系统",
    description: "阿里开源的音乐生成系统，可以根据文本提示生成音乐。",
    highlights: [
      "支持中英文提示词",
      "可生成多种风格音乐",
      "开源免费使用"
    ],
    features: [
      "基于深度学习的音乐生成",
      "支持多种音乐风格",
      "提供API接口"
    ]
  },
  {
    id: 2,
    title: "FireRobot/Ask: 人性化的智能问答机器人",
    description: "一个智能问答机器人系统，具有自然的对话能力。",
    highlights: [
      "自然的对话交互",
      "多领域知识支持",
      "可定制化训练"
    ],
    features: [
      "深度学习模型",
      "知识图谱支持",
      "多语言支持"
    ]
  },
  {
    id: 3,
    title: "Onlook: 为设计师打造的AI创作工具",
    description: "专门面向设计师的AI辅助创作工具，提供多种设计功能。",
    highlights: [
      "智能设计建议",
      "自动布局优化",
      "素材智能生成"
    ],
    features: [
      "设计模板库",
      "智能配色方案",
      "一键生成多尺寸"
    ]
  },
  {
    id: 4,
    title: "Gen AI Toolbox for Databases: Google Cloud的数据库管理",
    description: "Google Cloud推出的数据库AI管理工具集。",
    highlights: [
      "自动优化查询",
      "智能数据分析",
      "安全性检测"
    ],
    features: [
      "性能监控",
      "自动扩展",
      "数据迁移支持"
    ]
  },
  {
    id: 5,
    title: "PDF-to-Podcast: 实现语音内容转换",
    description: "将PDF文档转换为播客内容的AI工具。",
    highlights: [
      "自然语音合成",
      "多语言支持",
      "批量处理能力"
    ],
    features: [
      "文本预处理",
      "语音定制",
      "格式转换"
    ]
  }
]; 