import { useParams } from 'react-router-dom'
import { useState } from 'react'
import { ChevronDown, Share, Download, MoreHorizontal, MessageSquare } from 'lucide-react'

// 模拟大纲数据
const outline = [
  { id: '1', title: '总则', level: 0, number: '1.' },
  { id: '1.1', title: '目的和依据', level: 1, number: '1.1' },
  { id: '1.2', title: '适用范围', level: 1, number: '1.2' },
  { id: '2', title: '定义', level: 0, number: '2.', active: true },
  { id: '2.1', title: '术语解释', level: 1, number: '2.1' },
  { id: '3', title: '权利义务', level: 0, number: '3.' },
]

// 模拟评论数据
const comments = [
  {
    id: '1',
    author: '张律师',
    avatar: 'bg-blue-500',
    time: '10分钟前',
    content: '建议明确区分"注册用户"与"访客"的定义',
  },
  {
    id: '2',
    author: '李法务',
    avatar: 'bg-purple-500',
    time: '1小时前',
    content: '引用民法典第1034条需要更新至最新版本',
  },
]

export default function DocumentEditor() {
  const { id } = useParams()
  const [showComments, setShowComments] = useState(true)

  return (
    <div className="flex flex-col h-[calc(100vh-56px)]">
      {/* 顶部工具栏 */}
      <div className="h-14 bg-white border-b flex items-center justify-between px-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-gray-800">服务条款 v2.0</span>
            <ChevronDown className="w-4 h-4 text-gray-400" />
          </div>
          <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded">已保存</span>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex -space-x-2">
            <div className="w-8 h-8 rounded-full bg-blue-500 border-2 border-white flex items-center justify-center text-white text-xs">张</div>
            <div className="w-8 h-8 rounded-full bg-purple-500 border-2 border-white flex items-center justify-center text-white text-xs">李</div>
          </div>
          
          <button className="p-2 hover:bg-gray-100 rounded-lg">
            <MessageSquare className="w-5 h-5 text-gray-600" />
          </button>
          
          <button className="px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-100 rounded">
            分享
          </button>
          
          <button className="px-3 py-1.5 text-sm bg-slate-800 text-white rounded hover:bg-slate-700">
            导出
          </button>
        </div>
      </div>

      {/* 主编辑区 */}
      <div className="flex flex-1 overflow-hidden">
        {/* 左侧大纲 */}
        <div className="w-64 bg-gray-50 border-r flex flex-col">
          <div className="p-4">
            <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
              文档大纲
            </div>
            <div className="space-y-1">
              {outline.map((item) => (
                <div
                  key={item.id}
                  className={`px-2 py-1.5 rounded text-sm cursor-pointer flex items-center gap-2 ${
                    item.active
                      ? 'bg-slate-200 text-gray-800'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                  style={{ paddingLeft: `${item.level * 16 + 8}px` }}
                >
                  <span className={item.level === 0 ? 'text-slate-600' : 'text-slate-500'}>
                    {item.number}
                  </span>
                  {item.title}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-auto p-4 border-t">
            <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
              引用库
            </div>
            <div className="space-y-1">
              <div className="px-2 py-1.5 rounded text-sm text-gray-600 cursor-pointer hover:bg-gray-100 flex items-center gap-2">
                <span>📚</span> 法规库
              </div>
              <div className="px-2 py-1.5 rounded text-sm text-gray-600 cursor-pointer hover:bg-gray-100 flex items-center gap-2">
                <span>📝</span> 条款模板
              </div>
            </div>
          </div>
        </div>

        {/* 编辑区域 */}
        <div className="flex-1 bg-white overflow-y-auto">
          <div className="max-w-3xl mx-auto py-12 px-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">用户服务条款</h1>

            {/* 第一章 */}
            <div className="mb-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="text-slate-600">第一章</span>
                <span>总则</span>
              </h2>

              <div className="group p-2 -mx-2 rounded hover:bg-gray-50 cursor-text mb-3">
                <div className="flex items-start gap-3">
                  <span className="text-slate-500 font-medium text-sm mt-1">第一条</span>
                  <p className="text-gray-700 leading-relaxed flex-1">
                    为规范平台服务行为，保护用户合法权益，根据《中华人民共和国民法典》《中华人民共和国电子商务法》等相关法律法规，制定本服务条款。
                  </p>
                </div>
              </div>

              <div className="group p-2 -mx-2 rounded hover:bg-gray-50 cursor-text mb-3">
                <div className="flex items-start gap-3">
                  <span className="text-slate-500 font-medium text-sm mt-1">第二条</span>
                  <p className="text-gray-700 leading-relaxed flex-1">
                    本条款适用于平台提供的所有服务。用户在使用服务前应当仔细阅读并同意本条款。如用户不同意本条款任何内容，应立即停止使用服务。
                  </p>
                </div>
              </div>
            </div>

            {/* 第二章 */}
            <div className="mb-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="text-slate-600">第二章</span>
                <span>定义</span>
              </h2>

              <div className="group p-2 -mx-2 rounded cursor-text mb-3 border-l-2 border-yellow-400 bg-yellow-50">
                <div className="flex items-start gap-3">
                  <span className="text-slate-500 font-medium text-sm mt-1">第三条</span>
                  <div className="flex-1">
                    <p className="text-gray-700 leading-relaxed">
                      本条款所称"用户"，是指通过注册或其他方式使用平台服务的自然人、法人或非法人组织。
                    </p>
                    <div className="mt-2 text-xs text-yellow-700 bg-yellow-100 px-2 py-1 rounded inline-flex items-center gap-1">
                      ✏️ 张律师 添加了批注：建议明确区分"注册用户"与"访客"
                    </div>
                  </div>
                </div>
              </div>

              <div className="group p-2 -mx-2 rounded hover:bg-gray-50 cursor-text">
                <div className="flex items-start gap-3">
                  <span className="text-slate-500 font-medium text-sm mt-1">第四条</span>
                  <p className="text-gray-700 leading-relaxed flex-1">
                    本条款所称"服务内容"，是指平台通过互联网向用户提供的
                    <span className="bg-blue-100 text-blue-800 px-1 rounded">信息服务、交易撮合服务及相关技术服务</span>。
                  </p>
                </div>
              </div>
            </div>

            {/* 提示 */}
            <div className="mt-8 text-gray-400 text-sm flex items-center gap-2">
              <span>输入</span>
              <kbd className="px-2 py-0.5 bg-gray-100 rounded text-xs font-mono">/</kbd>
              <span>呼出命令菜单</span>
            </div>
          </div>
        </div>

        {/* 右侧批注面板 */}
        {showComments && (
          <div className="w-72 bg-gray-50 border-l p-4">
            <div className="text-sm font-semibold text-gray-700 mb-4">批注 ({comments.length})</div>
            
            <div className="space-y-3">
              {comments.map((comment) => (
                <div key={comment.id} className="bg-white p-3 rounded-lg shadow-sm border">
                  <div className="flex items-center gap-2 mb-2">
                    <div className={`w-6 h-6 rounded-full ${comment.avatar} flex items-center justify-center text-white text-xs`}>
                      {comment.author[0]}
                    </div>
                    <span className="text-xs text-gray-500">{comment.author} · {comment.time}</span>
                  </div>
                  
                  <p className="text-sm text-gray-700">{comment.content}</p>
                  
                  <div className="mt-2 flex gap-2">
                    <button className="text-xs text-blue-600 hover:underline">回复</button>
                    <button className="text-xs text-gray-400 hover:underline">解决</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}