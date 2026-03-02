import { Link, useNavigate } from 'react-router-dom'
import { FileText, Plus, Bell, Search } from 'lucide-react'

export default function Navbar() {
  const navigate = useNavigate()

  return (
    <nav className="h-14 bg-white border-b flex items-center justify-between px-6">
      <div className="flex items-center gap-6">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-slate-800 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">法</span>
          </div>
          <span className="font-semibold text-gray-800">法律文书编辑器</span>
        </Link>
        
        <div className="relative">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="搜索文档..."
            className="pl-10 pr-4 py-2 bg-gray-100 rounded-lg text-sm w-64 focus:outline-none focus:ring-2 focus:ring-slate-300"
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={() => navigate('/templates')}
          className="flex items-center gap-2 px-4 py-2 bg-slate-800 text-white rounded-lg hover:bg-slate-700 text-sm font-medium"
        >
          <Plus className="w-4 h-4" />
          新建文档
        </button>
        
        <button className="p-2 hover:bg-gray-100 rounded-lg">
          <Bell className="w-5 h-5 text-gray-600" />
        </button>
        
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-purple-500" />
      </div>
    </nav>
  )
}