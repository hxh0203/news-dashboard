'use client'

import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  TrendingUp, 
  Newspaper, 
  Globe, 
  Music, 
  Utensils,
  ArrowUp,
  ArrowDown,
  Clock,
  Search,
  RefreshCw
} from 'lucide-react'
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts'

// 模拟数据
const mockHotTopics = [
  { rank: 1, title: '多名配音演员集体维权', hot: '爆', trend: 'up' },
  { rank: 2, title: '跑马拉松护航的民警居然是AI机器人', hot: '新', trend: 'up' },
  { rank: 3, title: '这五个"强国"透露哪些信号', hot: '热', trend: 'neutral' },
  { rank: 4, title: '吉林省委书记：留下烂摊子要追责', hot: '', trend: 'down' },
  { rank: 5, title: '《逐玉》全集泄露损失不可估量', hot: '新', trend: 'up' },
  { rank: 6, title: '网警破获"网络开盒"案', hot: '', trend: 'neutral' },
  { rank: 7, title: '双汇王中王火腿肠被曝吃出两根钢钉', hot: '', trend: 'up' },
  { rank: 8, title: '59岁工人大哥跳舞视频火了', hot: '', trend: 'down' },
]

const mockGlobalNews = [
  { id: 1, title: '俄方：暗杀伊朗领导人产生极严重后果', source: '环球时报', time: '10分钟前' },
  { id: 2, title: '以色列特拉维夫市中心遭伊朗导弹袭击', source: '央视新闻', time: '25分钟前' },
  { id: 3, title: '伊朗媒体：伊官员提出停战六项条件', source: '新华社', time: '1小时前' },
  { id: 4, title: '沙特预警4月油价或飙破180美元', source: '财经网', time: '2小时前' },
  { id: 5, title: '苹果CEO库克直言对中国"等不及"', source: '科技日报', time: '3小时前' },
]

const mockDouyinHot = [
  { id: 1, title: '重温总书记关于治水的重要论述', hot: '125.8万', tag: '热点' },
  { id: 2, title: '探访全国唯一海上有人值守气象站', hot: '89.3万', tag: '上升' },
  { id: 3, title: 'AI演员为啥遭网友抵制', hot: '67.5万', tag: '热议' },
  { id: 4, title: '逐玉梦醒哥这次不用醒了', hot: '113.8万', tag: '剧集' },
  { id: 5, title: '塔猜亚10:7战胜奥沙利文夺冠', hot: '45.2万', tag: '体育' },
  { id: 6, title: '律师："梅姨"最高可判死刑', hot: '78.9万', tag: '社会' },
]

const mockLocalFood = [
  { id: 1, name: '老北京炸酱面', rating: 4.8, distance: '500m', category: '面食', price: '¥28' },
  { id: 2, name: '川味火锅店', rating: 4.6, distance: '800m', category: '火锅', price: '¥128' },
  { id: 3, name: '深夜食堂', rating: 4.7, distance: '300m', category: '烧烤', price: '¥68' },
  { id: 4, name: '咖啡时光', rating: 4.5, distance: '600m', category: '咖啡', price: '¥38' },
  { id: 5, name: '港式茶餐厅', rating: 4.4, distance: '1.2km', category: '粤菜', price: '¥88' },
  { id: 6, name: '兰州拉面', rating: 4.3, distance: '200m', category: '面食', price: '¥18' },
]

const goldPriceData = [
  { time: '09:00', price: 688.5 },
  { time: '10:00', price: 689.2 },
  { time: '11:00', price: 688.8 },
  { time: '12:00', price: 690.5 },
  { time: '13:00', price: 691.2 },
  { time: '14:00', price: 690.8 },
  { time: '15:00', price: 692.5 },
  { time: '16:00', price: 693.0 },
  { time: '17:00', price: 692.8 },
  { time: '18:00', price: 693.5 },
]

export default function Home() {
  const [currentTime, setCurrentTime] = useState('')
  const [goldPrice, setGoldPrice] = useState(693.5)
  const [goldChange, setGoldChange] = useState(+2.8)

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      setCurrentTime(now.toLocaleString('zh-CN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        weekday: 'long',
        hour: '2-digit',
        minute: '2-digit'
      }))
    }
    updateTime()
    const timer = setInterval(updateTime, 60000)
    return () => clearInterval(timer)
  }, [])

  const getHotColor = (hot: string) => {
    if (hot === '爆') return 'bg-red-500'
    if (hot === '新') return 'bg-orange-500'
    if (hot === '热') return 'bg-yellow-500'
    return 'bg-gray-400'
  }

  const getTrendIcon = (trend: string) => {
    if (trend === 'up') return <ArrowUp className="w-3 h-3 text-red-500" />
    if (trend === 'down') return <ArrowDown className="w-3 h-3 text-green-500" />
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <Search className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  热点速查
                </h1>
                <p className="text-xs text-slate-500">你的资讯小助手</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-sm text-slate-600 hidden md:flex items-center">
                <Clock className="w-4 h-4 mr-2" />
                {currentTime}
              </div>
              <button className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                <RefreshCw className="w-5 h-5 text-slate-600" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Gold Price Section */}
        <Card className="mb-8 overflow-hidden border-0 shadow-lg bg-gradient-to-r from-amber-50 to-yellow-50">
          <CardContent className="p-0">
            <div className="flex flex-col lg:flex-row">
              <div className="flex-1 p-6 lg:p-8">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-2xl flex items-center justify-center shadow-lg">
                      <TrendingUp className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-slate-800">黄金价格</h3>
                      <p className="text-sm text-slate-500">人民币/克</p>
                    </div>
                  </div>
                  <Badge className={`${goldChange >= 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'} border-0`}>
                    {goldChange >= 0 ? '+' : ''}{goldChange}%
                  </Badge>
                </div>
                
                <div className="mb-6">
                  <div className="text-4xl font-bold text-slate-800 mb-1">
                    ¥{goldPrice.toFixed(2)}
                  </div>
                  <div className="flex items-center text-sm text-green-600">
                    <ArrowUp className="w-4 h-4 mr-1" />
                    <span>较昨日上涨 ¥2.35</span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center p-3 bg-white/50 rounded-xl">
                    <div className="text-xs text-slate-500 mb-1">今开</div>
                    <div className="font-semibold text-slate-700">¥688.50</div>
                  </div>
                  <div className="text-center p-3 bg-white/50 rounded-xl">
                    <div className="text-xs text-slate-500 mb-1">最高</div>
                    <div className="font-semibold text-slate-700">¥693.50</div>
                  </div>
                  <div className="text-center p-3 bg-white/50 rounded-xl">
                    <div className="text-xs text-slate-500 mb-1">最低</div>
                    <div className="font-semibold text-slate-700">¥688.50</div>
                  </div>
                </div>
              </div>
              
              <div className="flex-1 min-h-[300px] p-6 lg:p-8">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={goldPriceData}>
                    <defs>
                      <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
                    <XAxis 
                      dataKey="time" 
                      stroke="#94a3b8" 
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                    />
                    <YAxis 
                      stroke="#94a3b8" 
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                      domain={['dataMin - 1', 'dataMax + 1']}
                    />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'white', 
                        border: '1px solid #e5e7eb',
                        borderRadius: '12px',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                      }}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="price" 
                      stroke="#f59e0b" 
                      strokeWidth={3}
                      fillOpacity={1} 
                      fill="url(#colorPrice)" 
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Daily Hot Topics */}
          <Card className="border-0 shadow-lg">
            <CardHeader className="pb-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-orange-500 rounded-xl flex items-center justify-center">
                  <Newspaper className="w-5 h-5 text-white" />
                </div>
                <div>
                  <CardTitle className="text-lg">每日要闻</CardTitle>
                  <p className="text-sm text-slate-500">百度热搜 · 实时更新</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {mockHotTopics.map((topic, index) => (
                  <div 
                    key={topic.rank}
                    className="flex items-center space-x-3 p-3 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer group"
                  >
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm ${
                      index < 3 
                        ? 'bg-gradient-to-br from-red-500 to-orange-500 text-white' 
                        : 'bg-slate-100 text-slate-600'
                    }`}>
                      {topic.rank}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-medium text-slate-800 group-hover:text-blue-600 transition-colors truncate">
                          {topic.title}
                        </span>
                        {topic.hot && (
                          <Badge className={`${getHotColor(topic.hot)} text-white border-0 text-xs px-1.5 py-0`}>
                            {topic.hot}
                          </Badge>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      {getTrendIcon(topic.trend)}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Global News */}
          <Card className="border-0 shadow-lg">
            <CardHeader className="pb-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                  <Globe className="w-5 h-5 text-white" />
                </div>
                <div>
                  <CardTitle className="text-lg">全球新闻</CardTitle>
                  <p className="text-sm text-slate-500">国际资讯 · 一手掌握</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockGlobalNews.map((news) => (
                  <div 
                    key={news.id}
                    className="p-4 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer group border border-slate-100"
                  >
                    <h4 className="text-sm font-medium text-slate-800 group-hover:text-blue-600 transition-colors mb-2 leading-relaxed">
                      {news.title}
                    </h4>
                    <div className="flex items-center justify-between text-xs text-slate-500">
                      <Badge className="bg-slate-100 text-slate-600 border-0">
                        {news.source}
                      </Badge>
                      <span className="flex items-center">
                        <Clock className="w-3 h-3 mr-1" />
                        {news.time}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Douyin Hot */}
          <Card className="border-0 shadow-lg">
            <CardHeader className="pb-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-rose-500 rounded-xl flex items-center justify-center">
                  <Music className="w-5 h-5 text-white" />
                </div>
                <div>
                  <CardTitle className="text-lg">抖音热点</CardTitle>
                  <p className="text-sm text-slate-500">热门话题 · 潮流追踪</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {mockDouyinHot.map((item) => (
                  <div 
                    key={item.id}
                    className="flex items-center space-x-4 p-3 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer group"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="text-sm font-medium text-slate-800 group-hover:text-pink-600 transition-colors truncate">
                          {item.title}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge className="bg-pink-100 text-pink-700 border-0">
                          {item.tag}
                        </Badge>
                        <span className="text-xs text-slate-500">
                          {item.hot} 人在看
                        </span>
                      </div>
                    </div>
                    <ArrowUp className="w-4 h-4 text-pink-500" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Local Food */}
          <Card className="border-0 shadow-lg">
            <CardHeader className="pb-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                  <Utensils className="w-5 h-5 text-white" />
                </div>
                <div>
                  <CardTitle className="text-lg">本地美食</CardTitle>
                  <p className="text-sm text-slate-500">附近美味 · 即刻发现</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {mockLocalFood.map((food) => (
                  <div 
                    key={food.id}
                    className="p-4 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer group border border-slate-100"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="text-sm font-semibold text-slate-800 group-hover:text-green-600 transition-colors">
                        {food.name}
                      </h4>
                      <Badge className="bg-amber-100 text-amber-700 border-0">
                        ⭐ {food.rating}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between text-xs text-slate-500">
                      <div className="flex items-center space-x-2">
                        <Badge className="bg-slate-100 text-slate-600 border-0">
                          {food.category}
                        </Badge>
                        <span>{food.distance}</span>
                      </div>
                      <span className="font-semibold text-green-600">{food.price}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Footer */}
        <div className="mt-12 text-center text-sm text-slate-400">
          <p>🐵 热点速查 · 小猴子为你服务</p>
          <p className="mt-1">数据仅供参考 · 更新时间: {currentTime}</p>
        </div>
      </main>
    </div>
  )
}
