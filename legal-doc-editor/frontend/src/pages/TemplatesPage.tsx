import { useNavigate } from 'react-router-dom'
import { ArrowLeft, FileText } from 'lucide-react'

const templates = [
  { id: '1', name: '劳动合同', desc: '标准劳动合同模板', type: '合同类', color: 'from-blue-50 to-indigo-100', iconColor: 'text-blue-400' },
  { id: '2', name: '保密协议', desc: 'NDA保密协议模板', type: '合同类', color: 'from-purple-50 to-pink-100', iconColor: 'text-purple-400' },
  { id: '3', name: '隐私政策', desc: 'GDPR合规版', type: '规范类', color: 'from-green-50 to-emerald-100', iconColor: 'text-green-400' },
  { id: '4', name: '服务条款', desc: 'SaaS平台标准版', type: '规范类', color: 'from-orange-50 to-amber-100', iconColor: 'text-orange-400' },
  { id: '5', name: '知识产权转让', desc: 'IP转让协议模板', type: '合同类', color: 'from-red-50 to-rose-100', iconColor: 'text-red-400' },
  { id: '6', name: '数据安全规范', desc: '企业数据管理标准', type: '规范类', color: 'from-cyan-50 to-sky-100', iconColor: 'text-cyan-400' },
]

export default function TemplatesPage() {
  const navigate = useNavigate()

  return (
    <div className="h-[calc(100vh-56px)] flex">
      {/* 左侧筛选 */}
      <div className="w-64 bg-gray-50 border-r p-4">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>返回</span>
        </button>

        <div className="mb-6">
          <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
            文档类型
          </h3>
          <div className="space-y-2">
            {['全部', '合同类', '规范类', '法律文件', '公司制度'].map((type, index) => (
              <label key={type} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={index === 0}
                  className="rounded text-slate-800 focus:ring-slate-800"
                />
                <span className="text-sm text-gray-600">{type}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
            适用行业
          </h3>
          <div className="space-y-2">
            {['互联网', '金融', '制造业', '医疗'].map((industry) => (
              <label key={industry} className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="rounded text-slate-800 focus:ring-slate-800" />
                <span className="text-sm text-gray-600">{industry}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* 模板列表 */}
      <div className="flex-1 p-6 overflow-y-auto">
        <h1 className="text-lg font-semibold text-gray-800 mb-4">选择模板</h1>
        <p className="text-sm text-gray-500 mb-6">共找到 {templates.length} 个模板</p>

        <div className="grid grid-cols-3 gap-4">
          {templates.map((template) => (
            <div
              key={template.id}
              onClick={() => navigate(`/editor/${template.id}`)}
              className="bg-white border rounded-xl overflow-hidden hover:shadow-lg transition-all cursor-pointer group"
            >
              <div className={`h-32 bg-gradient-to-br ${template.color} flex items-center justify-center`}>
                <FileText className={`w-12 h-12 ${template.iconColor}`} />
              </div>
              
              <div className="p-4">
                <h3 className="font-semibold text-gray-800 mb-1">{template.name}</h3>
                <p className="text-sm text-gray-500 mb-3">{template.desc}</p>
                
                <div className="flex items-center justify-between">
                  <span className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded">
                    {template.type}
                  </span>
                  <button className="text-sm text-slate-600 hover:text-slate-800 opacity-0 group-hover:opacity-100 transition-opacity">
                    预览 →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}