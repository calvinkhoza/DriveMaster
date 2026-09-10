import { useState } from 'react';
import { MessageCircle, ThumbsUp, Bookmark, Search, Plus, Tag } from 'lucide-react';

const posts = [
  {
    id: 1,
    author: 'Keabetswe T.',
    avatar: 'K',
    color: 'from-orange-500 to-red-500',
    time: '2h ago',
    title: 'Confused about flashing amber traffic lights — help!',
    body: 'The notes say treat it as a warning but my friend says slow down. Which is the official K53 answer?',
    tag: 'Rules of the Road',
    likes: 12,
    replies: 5,
    solved: true,
  },
  {
    id: 2,
    author: 'Sipho M.',
    avatar: 'S',
    color: 'from-blue-500 to-cyan-500',
    time: '5h ago',
    title: 'Best order to study the modules?',
    body: 'Starting from scratch — should I begin with Road Signs or Rules of the Road? What worked for you?',
    tag: 'Study Tips',
    likes: 24,
    replies: 11,
    solved: false,
  },
  {
    id: 3,
    author: 'Zanele D.',
    avatar: 'Z',
    color: 'from-green-500 to-teal-500',
    time: '1d ago',
    title: 'Passed my K53 today! Tips that helped me.',
    body: 'After 3 weeks on the Pro plan I finally passed with 88%! Biggest tip: do at least 5 mock exams before your test day.',
    tag: 'Success Story',
    likes: 87,
    replies: 32,
    solved: false,
  },
  {
    id: 4,
    author: 'Ntokozo S.',
    avatar: 'N',
    color: 'from-purple-500 to-pink-500',
    time: '2d ago',
    title: 'What does the white diamond on the road mean?',
    body: 'Saw this road marking on the highway and can\'t find it in my notes. Anyone know?',
    tag: 'Road Signs',
    likes: 8,
    replies: 3,
    solved: true,
  },
];

const tagColors = {
  'Rules of the Road': 'bg-blue-500/20 text-blue-300',
  'Study Tips':        'bg-green-500/20 text-green-300',
  'Success Story':     'bg-yellow-500/20 text-yellow-300',
  'Road Signs':        'bg-purple-500/20 text-purple-300',
};

export default function CommunityPage() {
  const [search, setSearch] = useState('');
  const [liked, setLiked]   = useState(new Set());

  const filtered = posts.filter(p =>
    p.title.toLowerCase().includes(search.toLowerCase()) ||
    p.body.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-fade-in max-w-3xl">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="section-title">Study Room</h1>
          <p className="section-subtitle">Ask questions, share tips, and support your fellow learners</p>
        </div>
        <button className="btn-primary text-sm py-2 px-4 flex-shrink-0">
          <Plus size={15} /> New Post
        </button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500" />
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search discussions…" className="input pl-10" />
      </div>

      {/* Posts */}
      <div className="space-y-4">
        {filtered.map(post => (
          <div key={post.id} className="card hover:border-white/20 transition-colors cursor-pointer">
            <div className="flex items-start gap-3">
              <div className={`w-9 h-9 rounded-full bg-gradient-to-br ${post.color} flex items-center justify-center text-sm font-bold text-white flex-shrink-0`}>
                {post.avatar}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <span className="text-sm font-medium text-white">{post.author}</span>
                  <span className="text-xs text-gray-500">·</span>
                  <span className="text-xs text-gray-500">{post.time}</span>
                  <span className={`badge text-[10px] ${tagColors[post.tag] || 'bg-white/10 text-gray-400'}`}>
                    <Tag size={9} /> {post.tag}
                  </span>
                  {post.solved && (
                    <span className="badge bg-green-500/20 text-green-400 text-[10px]">✓ Solved</span>
                  )}
                </div>
                <h3 className="text-sm font-semibold text-white mb-1">{post.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed line-clamp-2">{post.body}</p>
                <div className="flex items-center gap-4 mt-3">
                  <button
                    onClick={() => setLiked(prev => {
                      const next = new Set(prev);
                      next.has(post.id) ? next.delete(post.id) : next.add(post.id);
                      return next;
                    })}
                    className={`flex items-center gap-1.5 text-xs transition-colors ${liked.has(post.id) ? 'text-primary-400' : 'text-gray-500 hover:text-gray-300'}`}
                  >
                    <ThumbsUp size={13} /> {post.likes + (liked.has(post.id) ? 1 : 0)}
                  </button>
                  <button className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-gray-300 transition-colors">
                    <MessageCircle size={13} /> {post.replies} replies
                  </button>
                  <button className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-gray-300 transition-colors">
                    <Bookmark size={13} /> Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
