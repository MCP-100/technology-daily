import { useState, useEffect, useRef } from 'react';
import { marked } from 'marked';
import fs from 'fs/promises';
import path from 'path';
import { CalendarIcon, ShareIcon, BookmarkIcon, CameraIcon } from '@heroicons/react/24/outline';
import * as htmlToImage from 'html-to-image';

interface Article {
  title: string;
  date: string;
  content: string;
}

interface HomeProps {
  articles: Article[];
}

export default function Home({ articles }: HomeProps) {
  const [selectedArticle, setSelectedArticle] = useState<Article>(articles[0]);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const articleRef = useRef<HTMLDivElement>(null);

  // 配置 marked 选项以优化中文排版
  marked.setOptions({
    breaks: true,
    gfm: true,
  });

  const exportToImage = async () => {
    if (!articleRef.current) {
      console.error('articleRef is null');
      return;
    }
    
    try {
      setIsExporting(true);
      
      // 调试信息
      console.log('Element dimensions:', {
        width: articleRef.current.offsetWidth,
        height: articleRef.current.offsetHeight,
        clientWidth: articleRef.current.clientWidth,
        clientHeight: articleRef.current.clientHeight
      });
      console.log('Element content:', articleRef.current.innerHTML);
      
      // 确保元素可见
      const exportContainer = articleRef.current;
      exportContainer.style.display = 'block';
      exportContainer.style.visibility = 'visible';
      
      // 尝试使用 toBlob 方法
      const blob = await htmlToImage.toBlob(articleRef.current, {
        quality: 1.0,
        pixelRatio: 2,
      });
      
      if (blob) {
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.download = `${selectedArticle.title}.png`;
        link.href = url;
        link.click();
        URL.revokeObjectURL(url);
      }
    } catch (error) {
      console.error('导出图片失败:', error);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8 justify-center items-start">
          {/* Left Sidebar - Article List */}
          <div className={`w-full md:w-80 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-lg p-6 sticky top-4`}>
            <div className="flex items-center justify-between mb-6">
              <h2 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>最新文章</h2>
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className={`p-2 rounded-full ${isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'}`}
              >
                {isDarkMode ? '🌞' : '🌙'}
              </button>
            </div>
            <div className="space-y-3">
              {articles.map((article) => (
                <button
                  key={article.title}
                  onClick={() => setSelectedArticle(article)}
                  className={`w-full text-left p-4 rounded-xl transition-all duration-200 ${
                    selectedArticle.title === article.title
                      ? isDarkMode 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-blue-50 text-blue-700 shadow-sm'
                      : isDarkMode
                        ? 'hover:bg-gray-700 text-gray-300'
                        : 'hover:bg-gray-50 text-gray-700'
                  }`}
                >
                  <div className="font-medium line-clamp-2">{article.title}</div>
                  <div className="flex items-center mt-2 text-sm text-gray-500">
                    <CalendarIcon className="w-4 h-4 mr-1" />
                    <span>{article.date}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Right Content */}
          <div className="flex-shrink-0 w-full md:w-[640px]">
            <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-lg overflow-hidden`}>
              {/* Article Header */}
              <div className={`sticky top-0 z-10 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-100'} p-6`}>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <div className={`w-10 h-10 rounded-full ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'} flex items-center justify-center`}>
                      📱
                    </div>
                    <div className="ml-3">
                      <div className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>科技早报</div>
                      <div className="text-sm text-gray-500">{selectedArticle.date}</div>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button 
                      onClick={exportToImage}
                      disabled={isExporting}
                      className={`p-2 rounded-full ${
                        isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                      } ${isExporting ? 'opacity-50 cursor-not-allowed' : ''}`}
                      title="导出为图片"
                    >
                      <CameraIcon className={`w-5 h-5 ${isExporting ? 'text-blue-500' : 'text-gray-500'}`} />
                      {isExporting && (
                        <span className="absolute top-0 right-0 w-2 h-2 bg-blue-500 rounded-full animate-ping"></span>
                      )}
                    </button>
                    <button className={`p-2 rounded-full ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}>
                      <ShareIcon className="w-5 h-5 text-gray-500" />
                    </button>
                    <button className={`p-2 rounded-full ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}>
                      <BookmarkIcon className="w-5 h-5 text-gray-500" />
                    </button>
                  </div>
                </div>
                <h1 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  {selectedArticle.title}
                </h1>
              </div>

              {/* Article Content for Display */}
              <article
                className={`p-6 prose ${isDarkMode ? 'prose-invert' : 'prose-slate'} max-w-none
                  prose-headings:font-bold prose-headings:tracking-tight
                  prose-h1:text-2xl prose-h1:mb-4
                  prose-h2:text-xl prose-h2:mb-3
                  prose-h3:text-lg prose-h3:mb-2
                  prose-p:text-base prose-p:leading-relaxed prose-p:my-3
                  prose-ul:my-3 prose-ul:list-disc prose-ul:pl-4
                  prose-ol:my-3 prose-ol:list-decimal prose-ol:pl-4
                  prose-li:my-1
                  prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline
                  prose-strong:font-semibold
                  prose-blockquote:border-l-4 prose-blockquote:border-gray-300 prose-blockquote:pl-4 prose-blockquote:italic
                  prose-code:px-1 prose-code:rounded ${isDarkMode ? 'prose-code:bg-gray-700' : 'prose-code:bg-gray-100'}
                  prose-pre:rounded-lg ${isDarkMode ? 'prose-pre:bg-gray-700' : 'prose-pre:bg-gray-100'}`}
                dangerouslySetInnerHTML={{
                  __html: marked(selectedArticle.content),
                }}
              />

              {/* Hidden Article Content for Export */}
              <div style={{ position: 'absolute', left: '-9999px', top: 0 }}>
                <div 
                  ref={articleRef}
                  className={`w-[375px] ${isDarkMode ? 'bg-gray-800' : 'bg-white'} p-4`}
                  style={{
                    minHeight: '100px',
                    maxHeight: '4096px',
                    // 确保内容可见且有确定的尺寸
                    position: 'relative',
                    overflow: 'visible',
                  }}
                >
                  {/* Export Header */}
                  <div className="flex items-center mb-4">
                    <div className={`w-8 h-8 rounded-full ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'} flex items-center justify-center text-sm`}>
                      📱
                    </div>
                    <div className="ml-2">
                      <div className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>科技早报</div>
                      <div className="text-xs text-gray-500">{selectedArticle.date}</div>
                    </div>
                  </div>
                  
                  {/* Export Title */}
                  <h1 className={`text-xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    {selectedArticle.title}
                  </h1>
                  
                  {/* Export Content */}
                  <div
                    className={`prose prose-sm ${isDarkMode ? 'prose-invert' : 'prose-slate'} max-w-none
                      prose-headings:font-bold prose-headings:tracking-tight
                      prose-h1:text-lg prose-h1:mb-3
                      prose-h2:text-base prose-h2:mb-2
                      prose-h3:text-sm prose-h3:mb-2
                      prose-p:text-sm prose-p:leading-relaxed prose-p:my-2
                      prose-ul:my-2 prose-ul:list-disc prose-ul:pl-4
                      prose-ol:my-2 prose-ol:list-decimal prose-ol:pl-4
                      prose-li:my-1 prose-li:text-sm
                      prose-a:text-blue-600 prose-a:no-underline
                      prose-strong:font-semibold
                      prose-blockquote:border-l-4 prose-blockquote:border-gray-300 prose-blockquote:pl-4 prose-blockquote:italic
                      prose-code:px-1 prose-code:rounded ${isDarkMode ? 'prose-code:bg-gray-700' : 'prose-code:bg-gray-100'}
                      prose-pre:rounded-lg ${isDarkMode ? 'prose-pre:bg-gray-700' : 'prose-pre:bg-gray-100'}`}
                    dangerouslySetInnerHTML={{
                      __html: marked(selectedArticle.content),
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const dataDirectory = path.join(process.cwd(), 'data');
  const files = await fs.readdir(dataDirectory);
  
  const articles = await Promise.all(
    files
      .filter((file) => file.endsWith('.md'))
      .map(async (file) => {
        const filePath = path.join(dataDirectory, file);
        const content = await fs.readFile(filePath, 'utf8');
        const stats = await fs.stat(filePath);
        
        return {
          title: file.replace('.md', ''),
          date: stats.mtime.toLocaleDateString(),
          content,
        };
      })
  );

  // Sort articles by date in descending order
  articles.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return {
    props: {
      articles,
    },
  };
} 