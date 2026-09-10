import { BookOpen } from 'lucide-react';

const SocialIcons = [
  { label: 'Facebook',  svg: 'M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z' },
  { label: 'Twitter/X', svg: 'M4 4l16 16M4 20L20 4' },
  { label: 'Instagram', svg: 'M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37zM17.5 6.5h.01M7.5 2h9A5.5 5.5 0 0 1 22 7.5v9A5.5 5.5 0 0 1 16.5 22h-9A5.5 5.5 0 0 1 2 16.5v-9A5.5 5.5 0 0 1 7.5 2z' },
  { label: 'YouTube',   svg: 'M22.54 6.42A2.78 2.78 0 0 0 20.6 4.46C18.88 4 12 4 12 4S5.12 4 3.4 4.46A2.78 2.78 0 0 0 1.46 6.42 29.94 29.94 0 0 0 1 12a29.94 29.94 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.4 19.54C5.12 20 12 20 12 20s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-1.96A29.94 29.94 0 0 0 23 12a29.94 29.94 0 0 0-.46-5.58zM9.75 15.02V8.98L15.5 12l-5.75 3.02z' },
];

export default function Footer() {
  return (
    <footer className="bg-dark-900 border-t border-white/10 mt-auto">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                <BookOpen size={16} className="text-white" />
              </div>
              <div>
                <span className="font-bold text-white text-sm">K53 DriveMaster</span>
                <span className="block text-[10px] text-primary-400">Academy</span>
              </div>
            </div>
            <p className="text-sm text-gray-500 leading-relaxed">
              South Africa's most professional K53 learner's licence preparation platform.
            </p>
            <div className="flex gap-3 mt-4">
              {SocialIcons.map(({ label, svg }) => (
                <a key={label} href="#" aria-label={label}
                  className="w-8 h-8 rounded-lg bg-white/5 hover:bg-primary-600/30 flex items-center justify-center text-gray-500 hover:text-primary-400 transition-colors">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d={svg} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {[
            {
              title: 'Platform',
              links: ['Features', 'Pricing', 'Mock Exams', 'Live Sessions', 'AI Tutor'],
            },
            {
              title: 'Support',
              links: ['Help Center', 'Contact Us', 'Community Forum', 'Account Issues', 'System Status'],
            },
            {
              title: 'Legal',
              links: ['Privacy Policy (POPIA)', 'Terms of Service', 'Refund Policy', 'Cookie Policy'],
            },
          ].map(col => (
            <div key={col.title}>
              <h4 className="text-sm font-semibold text-white mb-3">{col.title}</h4>
              <ul className="space-y-2">
                {col.links.map(l => (
                  <li key={l}>
                    <a href="#" className="text-sm text-gray-500 hover:text-gray-300 transition-colors">{l}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-sm text-gray-600">© 2026 K53 DriveMaster Academy. All rights reserved.</p>
          <p className="text-sm text-gray-600">Built for South African learner drivers 🇿🇦</p>
        </div>
      </div>
    </footer>
  );
}
