import { Link, useNavigate } from 'react-router-dom'
import { FileText, Folder, MoreVertical, Plus } from 'lucide-react'

const recentDocs = [
  { id: '1', title: '劳动合同模板', status: '编辑中', updatedAt: '昨天 14:30', color: 'bg-blue-100 text-blue-600' },
  { id: '2', title: '隐私政策', status: '已发布', updatedAt: '3天前', color: 'bg-purple-100 text-purple-600' },
  { id: '3', title: '服务条款', status: '审核中', updatedAt: '上周', color: 'bg-green-100 text-green-600' },
]

const myDocs = [
  { id: '1', title: '劳动合同模板.docx', type: 'file', status: '编辑中', date: '2小时前' },
  { id: '2', title: '数据安全规范.pdf', type: 'pdf', status: '已发布', date: '昨天' },
  { id: '3', title: '合规文档', type: 'folder', count: '3个文件', date: '上周' },
]

export default function HomePage() {
  const navigate = useNavigate()

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* 最近编辑 */}
      <section className="mb-8">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">最近编辑</h2>
        <div className="flex gap-4">
          {recentDocs.map((doc) => (
            <div
              key={doc.id}
              onClick={() => navigate(`/editor/${doc.id}`)}
              className="w-48 p-4 bg-white border rounded-xl hover:shadow-md transition-shadow cursor-pointer"
            >
              <div className={`w-10 h-10 ${doc.color} rounded-lg flex items-center justify-center mb-3`}>
                <FileText className="w-5 h-5" />
              </div>
              <h3 className="font-medium text-gray-800 mb-1">{doc.title}</h3>
              <p className="text-xs text-gray-400">{doc.updatedAt} · {doc.status}</p>
            </div>
          ))}
          
          <div
            onClick={() => navigate('/templates')}
            className="w-48 p-4 border-2 border-dashed border-gray-200 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:border-slate-400 hover:bg-gray-50 transition-colors"
          >
            <Plus className="w-8 h-8 text-gray-300 mb-2" />
            <span className="text-sm text-gray-500">新建文档</span>
          </div>
        </div>
      </section>

      {/* 我的文档 */}
      <section className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-800">我的文档</h2>
          <button className="text-sm text-slate-600 hover:text-slate-800">查看全部</button>
        </div>
        
        <div className="bg-white border rounded-xl overflow-hidden">
          {myDocs.map((doc, index) => (
            <div
              key={doc.id}
              onClick={() => doc.type !== 'folder' && navigate(`/editor/${doc.id}`)}
              className={`flex items-center px-4 py-3 hover:bg-gray-50 cursor-pointer ${
                index !== myDocs.length - 1 ? 'border-b' : ''
              }`}
            >
              {doc.type === 'folder' ? (
                <Folder className="w-5 h-5 text-gray-400 mr-3" />
              ) : doc.type === 'pdf' ? (
                <FileText className="w-5 h-5 text-green-500 mr-3" />
              ) : (
                <FileText className="w-5 h-5 text-blue-500 mr-3" />
              )}
              
              <span className="flex-1 font-medium text-gray-800">{doc.title}</span>
              
              {doc.status && (
                <span className={`px-2 py-1 text-xs rounded mr-4 ${
                  doc.status === '编辑中'
                    ? 'bg-yellow-100 text-yellow-700'
                    : 'bg-green-100 text-green-700'
                }`}>
                  {doc.status}
                </span>
              )}
              {doc.count && (
                <span className="text-sm text-gray-400 mr-4">{doc.count}</span>
              )}
              <span className="text-sm text-gray-400 w-24">{doc.date}</span>
              
              <button className="p-1 hover:bg-gray-200 rounded">
                <MoreVertical className="w-4 h-4 text-gray-400" />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* 团队空间 */}
      <section>
        <h2 className="text-lg font-semibold text-gray-800 mb-4">团队空间</h2>
        <div className="flex gap-3">
          {['法务部', '合规部', '标准委员会'].map((team, index) => (
            <button
              key={team}
              className={`px-4 py-2 rounded-lg text-sm font-medium ${
                index === 0
                  ? 'bg-slate-800 text-white'
                  : 'bg-white border text-gray-600 hover:bg-gray-50'
              }`}
            >
              {team}
            </button>
          ))}
        </div>
      </section>
    </div>
  )
}