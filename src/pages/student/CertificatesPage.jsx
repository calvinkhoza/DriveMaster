import { Award, Download, Share2, Lock, CheckCircle } from 'lucide-react';
import { useApp } from '../../context/AppContext';

const certs = [
  {
    id: 1,
    title: 'Road Signs & Markings',
    issued: '2026-08-20',
    grade: 'Distinction',
    score: 94,
    earned: true,
  },
];

const pending = [
  { title: 'Rules of the Road', progress: 40, required: 100 },
  { title: 'Vehicle Controls & Safety', progress: 10, required: 100 },
  { title: 'K53 Final Completion Certificate', progress: 42, required: 100, isFinal: true },
];

export default function CertificatesPage() {
  const { user } = useApp();

  return (
    <div className="space-y-8 animate-fade-in max-w-3xl">
      <div>
        <h1 className="section-title">My Certificates</h1>
        <p className="section-subtitle">Complete modules and mock exams to earn your certificates</p>
      </div>

      {/* Earned */}
      {certs.map(cert => (
        <div key={cert.id} className="card border-2 border-yellow-500/30 bg-gradient-to-br from-yellow-900/20 to-dark-800">
          <div className="flex items-start justify-between gap-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 bg-yellow-500/20 rounded-2xl flex items-center justify-center">
                <Award size={30} className="text-yellow-400" />
              </div>
              <div>
                <p className="text-xs font-medium text-yellow-400 mb-0.5">Certificate of Completion</p>
                <h3 className="text-lg font-bold text-white">{cert.title}</h3>
              </div>
            </div>
            <span className="badge bg-yellow-500/20 text-yellow-400">Earned</span>
          </div>

          {/* Certificate preview */}
          <div className="bg-gradient-to-br from-yellow-900/30 to-dark-900 border border-yellow-500/20 rounded-2xl p-8 text-center mb-5">
            <div className="w-16 h-16 bg-yellow-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Award size={32} className="text-yellow-400" />
            </div>
            <p className="text-xs text-yellow-400/70 uppercase tracking-widest mb-1">K53 DriveMaster Academy</p>
            <p className="text-sm text-gray-400 mb-2">This is to certify that</p>
            <p className="text-2xl font-black text-white mb-2">{user?.name}</p>
            <p className="text-sm text-gray-400 mb-3">has successfully completed</p>
            <p className="text-lg font-bold text-yellow-300 mb-4">{cert.title}</p>
            <div className="flex items-center justify-center gap-4 text-xs text-gray-500">
              <span>Score: <strong className="text-white">{cert.score}%</strong></span>
              <span>Grade: <strong className="text-yellow-400">{cert.grade}</strong></span>
              <span>Issued: <strong className="text-white">{cert.issued}</strong></span>
            </div>
          </div>

          <div className="flex gap-3">
            <button className="btn-primary flex-1 justify-center gap-2">
              <Download size={15} /> Download PDF
            </button>
            <button className="btn-secondary flex-1 justify-center gap-2">
              <Share2 size={15} /> Share
            </button>
          </div>
        </div>
      ))}

      {/* Pending */}
      <div>
        <h2 className="font-bold text-white mb-4">Certificates in Progress</h2>
        <div className="space-y-4">
          {pending.map(cert => (
            <div key={cert.title} className={`card border ${cert.isFinal ? 'border-primary-500/30 bg-primary-900/10' : 'border-white/10'}`}>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Lock size={20} className="text-gray-500" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <p className="font-semibold text-white">{cert.title}</p>
                    <span className="text-sm font-bold text-gray-400">{cert.progress}%</span>
                  </div>
                  <p className="text-xs text-gray-500 mb-3">
                    Complete {cert.required}% of this module to unlock the certificate
                  </p>
                  <div className="progress-bar">
                    <div
                      className={`progress-fill ${cert.isFinal ? 'bg-primary-500' : 'bg-gray-500'}`}
                      style={{ width: `${cert.progress}%` }}
                    />
                  </div>
                  {cert.progress > 0 && (
                    <p className="text-xs text-gray-500 mt-1.5">
                      <CheckCircle size={11} className="inline mr-1 text-green-400" />
                      {cert.progress}% complete — keep going!
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
