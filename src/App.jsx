import React, { useState } from 'react';
import Layout from './components/Layout';
import LidarScan from './components/LidarScan';
import {
  FileText, Share2, User, ShieldCheck, Bell,
  ChevronRight, Search, CheckCircle2, Lock,
  Home, Folder, Send, Users, Settings,
  Activity, Pill, Microscope, Syringe, Image as ImageIcon,
  AlertTriangle, FileWarning, Fingerprint, Info
} from 'lucide-react';

const PATIENT_DATA = {
  name: 'Alexander Pierce',
  dob: '1988-05-12',
  bloodType: 'A+',
  donor: 'Yes',
  id: 'FED-992-001-X'
};

const DOC_CATEGORIES = [
  { id: 'ins', title: 'Insurance Card', icon: <ShieldCheck size={20} />, color: 'text-blue-500', updated: '2 days ago' },
  { id: 'lab', title: 'Lab Results', icon: <Microscope size={20} />, color: 'text-purple-500', updated: '1 week ago' },
  { id: 'rx', title: 'Prescriptions', icon: <Pill size={20} />, color: 'text-green-500', updated: '3 hours ago' },
  { id: 'vax', title: 'Vaccination Records', icon: <Syringe size={20} />, color: 'text-orange-500', updated: '1 month ago' },
  { id: 'img', title: 'Imaging (MRI/X-Ray)', icon: <ImageIcon size={20} />, color: 'text-cyan-500', updated: '2 weeks ago' },
  { id: 'surg', title: 'Surgical History', icon: <Activity size={20} />, color: 'text-red-500', updated: '1 year ago' },
];

const PATIENTS = [
  { id: '1', name: 'John Doe', dob: '1975-03-21', status: 'New Records' },
  { id: '2', name: 'Jane Smith', dob: '1992-11-05', status: 'Verified' },
  { id: '3', name: 'Robert Brown', dob: '1964-07-14', status: 'New Records' },
];

// --- HORRID RECORD COMPONENTS ---
const HorridLabReport = () => (
  <div className="space-y-6 animate-in fade-in duration-500">
    <div className="p-4 bg-white border-2 border-unimed-navy rounded-lg shadow-sm space-y-4">
      <div className="flex justify-between items-center border-b border-unimed-border pb-2">
        <h3 className="text-sm font-black uppercase">FHA-LAB-FORM-99-B (SENSITIVE)</h3>
        <span className="text-[9px] font-mono bg-unimed-navy text-white px-2 py-0.5 rounded">CLASS IV ACCESS</span>
      </div>
      <div className="grid grid-cols-3 gap-2 text-[10px] font-mono">
        <div className="p-2 bg-unimed-lightGray rounded">
          <p className="text-unimed-navy/50 uppercase">Analyte</p>
          <p className="font-bold">Lipid Panel</p>
        </div>
        <div className="p-2 bg-unimed-lightGray rounded">
          <p className="text-unimed-navy/50 uppercase">Result</p>
          <p className="font-bold text-red-600">CRITICAL HIGH</p>
        </div>
        <div className="p-2 bg-unimed-lightGray rounded">
          <p className="text-unimed-navy/50 uppercase">Range</p>
          <p className="font-bold">&lt; 200 mg/dL</p>
        </div>
      </div>
      <div className="p-3 bg-red-50 border-l-4 border-red-500 text-[10px] italic text-red-800 flex gap-2">
        <AlertTriangle size={14} className="flex-shrink-0" />
        Citizen biological markers indicate non-compliance with Federal Dietary Mandate 2024-A.
      </div>
      <div className="text-[9px] font-mono text-unimed-navy/60 space-y-1">
        <p>SAMP_ID: 9912-XJ-442</p>
        <p>SAMP_TIME: 2026-01-12 04:21:00 EST</p>
        <p>LAB_SIGHT: Federal Lab 12 (Phoenix Hub)</p>
      </div>
    </div>
    <div className="p-4 bg-white border border-unimed-border rounded-lg text-[10px] space-y-2">
      <p className="font-bold uppercase text-unimed-navy/50 flex items-center gap-1">
        <Info size={12} /> State Oversight Note:
      </p>
      <p className="italic opacity-70">
        "Subject exhibits abnormal cholesterol levels. Suggest immediate mandatory lifestyle audit and possible dietary restriction sanctions."
      </p>
    </div>
  </div>
);

const HorridSurgicalHistory = () => (
  <div className="space-y-6 animate-in fade-in duration-500">
    <div className="p-4 bg-white border-2 border-unimed-navy rounded-lg shadow-sm space-y-4">
      <div className="flex justify-between items-center border-b border-unimed-border pb-2">
        <h3 className="text-sm font-black uppercase">Surgical Log: FED-SURG-01</h3>
        <span className="text-[9px] font-mono bg-red-600 text-white px-2 py-0.5 rounded">SENSITIVE</span>
      </div>
      <div className="space-y-4">
        <div className="p-3 bg-unimed-lightGray rounded-lg border border-unimed-border">
          <div className="flex justify-between items-center mb-2">
            <p className="text-xs font-bold uppercase">Appendectomy</p>
            <p className="text-[10px] font-mono">2012-06-15</p>
          </div>
          <div className="flex items-center gap-2 text-[10px] text-unimed-navy/60 italic">
            <Fingerprint size={12} /> Biometrically Verified Procedure
          </div>
        </div>
        <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-[10px] text-red-800 space-y-2">
          <div className="flex items-center gap-2 font-bold uppercase">
            <FileWarning size={14} /> Complication Report
          </div>
          <p>Procedure delayed 40 mins due to unverified insurance synchronization error. Subject was monitored via State-Link throughout.</p>
        </div>
      </div>
    </div>
    <div className="p-4 bg-white border border-unimed-border rounded-lg text-[10px] space-y-2">
      <p className="font-bold uppercase text-unimed-navy/50">Surgical Compliance Rating: B-</p>
      <div className="w-full h-2 bg-unimed-lightGray rounded-full overflow-hidden">
        <div className="h-full bg-unimed-navy w-3/4"></div>
      </div>
      <p className="italic opacity-60 text-center">"Recovery period exceeded federal guidelines by 2 days. Penalty applied to citizen credit."</p>
    </div>
  </div>
);

const App = () => {
  const [view, setView] = useState('login'); // login, patient_dash, patient_share, provider_list, provider_profile, doc_view, patient_providers, patient_settings
  const [isAuth, setIsAuth] = useState(false);
  const [activeDocId, setActiveDocId] = useState(null);
  const [selectedProvider, setSelectedProvider] = useState(null);

  if (view === 'login') {
    return (
      <div className="min-h-screen bg-unimed-navy flex flex-col items-center justify-between p-6 text-white">
        <div className="w-full flex flex-col items-center gap-2 pt-12">
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-unimed-navy font-bold text-xl mb-2">
            <div className="w-12 h-12 border-2 border-unimed-navy rounded-full flex items-center justify-center font-black text-xs text-center leading-tight">
              US FED<br/>HEALTH
            </div>
          </div>
          <h1 className="text-2xl font-bold tracking-tight">UniMed</h1>
          <div className="text-[10px] uppercase tracking-widest text-unimed-cyan opacity-80">Federal Secure Connection</div>
        </div>

        <LidarScan onComplete={() => { setIsAuth(true); setView('patient_dash'); }} />

        <div className="w-full space-y-4 mb-8 text-center">
          <button className="w-full py-3 bg-white/10 hover:bg-white/20 rounded-full text-sm font-medium transition-colors border border-white/10">
            Use PIN Instead
          </button>
          <div className="flex items-center justify-center gap-2 text-[10px] text-unimed-cyan/50 uppercase tracking-widest">
            <Lock size={10} /> End-to-End Encrypted
          </div>
        </div>
      </div>
    );
  }

  // --- PATIENT DASHBOARD ---
  if (view === 'patient_dash') {
    return (
      <Layout title="UniMed Home" darkHeader>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-unimed-border overflow-hidden border-2 border-white shadow-sm">
                <img src="https://i.pravatar.cc/150?u=alex" alt="Avatar" />
              </div>
              <div>
                <p className="text-sm font-bold text-white">Hello, {PATIENT_DATA.name}</p>
                <p className="text-[10px] text-unimed-cyan font-medium uppercase">Secure Citizen Account</p>
              </div>
            </div>
            <div className="relative">
              <Bell size={20} className="text-white opacity-80" />
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-unimed-cyan rounded-full"></div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-unimed-navy to-blue-900 p-5 rounded-2xl text-white shadow-xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:opacity-40 transition-opacity">
              <ShieldCheck size={80} />
            </div>
            <div className="relative z-10 space-y-4">
              <div className="flex justify-between items-start">
                <span className="text-[10px] font-bold uppercase tracking-widest opacity-70">Federal Health ID</span>
                <span className="text-[10px] font-mono opacity-80">{PATIENT_DATA.id}</span>
              </div>
              <div className="flex gap-4 items-center">
                <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm border border-white/20">
                  <User size={24} />
                </div>
                <div>
                  <p className="text-lg font-bold">{PATIENT_DATA.name}</p>
                  <p className="text-xs opacity-70">DOB: {PATIENT_DATA.dob}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/10">
                <div>
                  <p className="text-[9px] uppercase opacity-60 font-bold">Blood Type</p>
                  <p className="text-sm font-bold">{PATIENT_DATA.bloodType}</p>
                </div>
                <div>
                  <p className="text-[9px] uppercase opacity-60 font-bold">Organ Donor</p>
                  <p className="text-sm font-bold">{PATIENT_DATA.donor}</p>
                </div>
              </div>
              <div className="pt-2 flex justify-end">
                <div className="bg-white p-1 rounded-sm w-24 h-8 flex items-center justify-center">
                  <div className="w-full h-full bg-black flex items-center justify-center text-[8px] text-white font-mono">|| ||| || |||| || |</div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="text-sm font-bold text-unimed-navy uppercase tracking-wider flex items-center gap-2">
              <Folder size={16} /> Your Documents
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {DOC_CATEGORIES.map(doc => (
                <div
                  key={doc.id}
                  onClick={() => { setActiveDocId(doc.id); setView('doc_view'); }}
                  className="bg-white p-4 rounded-xl border border-unimed-border shadow-sm hover:border-unimed-cyan transition-colors cursor-pointer group"
                >
                  <div className={`mb-3 p-2 rounded-lg w-fit ${doc.color.replace('text', 'bg').replace('500', '100')} ${doc.color}`}>
                    {doc.icon}
                  </div>
                  <p className="text-xs font-bold text-unimed-navy leading-tight mb-1">{doc.title}</p>
                  <p className="text-[9px] text-unimed-navy/40 font-medium opacity-60">Updated {doc.updated}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <nav className="fixed bottom-0 left-0 right-0 mx-auto max-w-md bg-white border-t border-unimed-border flex justify-around p-3 shadow-[0_-2px_10px_rgba(0,0,0,0.05)]">
          <div className="flex flex-col items-center gap-1 text-unimed-cyan">
            <Home size={20} />
            <span className="text-[10px] font-bold">Home</span>
          </div>
          <div onClick={() => setView('patient_dash')} className="flex flex-col items-center gap-1 text-unimed-navy/40 hover:text-unimed-navy cursor-pointer">
            <Folder size={20} />
            <span className="text-[10px] font-bold">Docs</span>
          </div>
          <div onClick={() => setView('patient_share')} className="flex flex-col items-center gap-1 text-unimed-navy/40 hover:text-unimed-navy cursor-pointer">
            <Send size={20} />
            <span className="text-[10px] font-bold">Share</span>
          </div>
          <div onClick={() => setView('patient_providers')} className="flex flex-col items-center gap-1 text-unimed-navy/40 hover:text-unimed-navy cursor-pointer">
            <Users size={20} />
            <span className="text-[10px] font-bold">Providers</span>
          </div>
          <div onClick={() => setView('patient_settings')} className="flex flex-col items-center gap-1 text-unimed-navy/40 hover:text-unimed-navy cursor-pointer">
            <Settings size={20} />
            <span className="text-[10px] font-bold">Settings</span>
          </div>
        </nav>
      </Layout>
    );
  }

  // --- DOCUMENT DETAIL VIEW ---
  if (view === 'doc_view') {
    const doc = DOC_CATEGORIES.find(d => d.id === activeDocId);
    return (
      <Layout title={doc?.title || 'Document'} darkHeader>
        <div className="space-y-6">
          <div className="bg-white p-4 rounded-xl border border-unimed-border shadow-sm overflow-hidden">
            {doc?.id === 'lab' ? <HorridLabReport /> : doc?.id === 'surg' ? <HorridSurgicalHistory /> : (
              <div className="h-64 flex flex-col items-center justify-center gap-4 text-unimed-navy/40 italic text-xs p-4 text-center">
                <Lock size={32} className="opacity-20" />
                <p>CONTENT ENCRYPTED BY FEDERAL SECURITY PROTOCOL 88-C</p>
                <p className="text-[10px] opacity-60">Visual rendering requires Level 4 Clearance</p>
              </div>
            )}
          </div>
          <button
            onClick={() => setView('patient_dash')}
            className="w-full py-4 bg-unimed-navy text-white rounded-2xl font-bold text-sm shadow-lg hover:bg-blue-900 transition-colors flex items-center justify-center gap-2"
          >
            <ChevronRight size={16} className="rotate-180" /> Return to Vault
          </button>
        </div>
      </Layout>
    );
  }

  // --- PATIENT SHARE SCREEN ---
  if (view === 'patient_share') {
    return (
      <Layout title="Send Records" darkHeader>
        <div className="space-y-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-unimed-navy/40" size={18} />
            <input
              className="w-full p-3 pl-10 rounded-xl border border-unimed-border bg-white text-sm focus:outline-none focus:border-unimed-cyan transition-colors"
              placeholder="Search by hospital, clinic, or NPI..."
            />
          </div>

          <div className="space-y-3">
            <p className="text-[10px] font-bold uppercase tracking-widest text-unimed-navy/50">Nearby Verified Providers</p>
            {[
              { name: 'Mayo Clinic', location: 'Phoenix, AZ', verified: true },
              { name: 'VA Medical Center', location: 'Phoenix, AZ', verified: true },
              { name: 'Desert Valley Health', location: 'Scottsdale, AZ', verified: false },
            ].map((provider, idx) => (
              <div
                key={idx}
                onClick={() => setSelectedProvider(provider)}
                className={`p-4 rounded-xl border transition-all cursor-pointer flex justify-between items-center ${selectedProvider?.name === provider.name ? 'bg-unimed-cyan/10 border-unimed-cyan' : 'bg-white border-unimed-border'}`}
              >
                <div>
                  <p className="text-sm font-bold">{provider.name}</p>
                  <p className="text-[10px] text-unimed-navy/50">{provider.location}</p>
                </div>
                {provider.verified && (
                  <div className="flex items-center gap-1 bg-unimed-success/10 text-unimed-success px-2 py-1 rounded-full text-[9px] font-bold">
                    <CheckCircle2 size={10} /> Federal Network
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="space-y-3">
            <p className="text-[10px] font-bold uppercase tracking-widest text-unimed-navy/50">Documents to Share</p>
            <div className="grid grid-cols-1 gap-2">
              {DOC_CATEGORIES.map(doc => (
                <label key={doc.id} className="flex items-center justify-between p-3 bg-white border border-unimed-border rounded-xl text-xs font-medium cursor-pointer hover:bg-unimed-lightGray transition-colors">
                  <span className="flex items-center gap-3">{doc.icon} {doc.title}</span>
                  <input type="checkbox" className="w-4 h-4 rounded border-unimed-border text-unimed-cyan focus:ring-unimed-cyan" />
                </label>
              ))}
            </div>
          </div>

          <div className="pt-4">
            <button
              className="w-full py-4 bg-unimed-navy text-white rounded-2xl font-bold text-sm shadow-lg hover:bg-blue-900 transition-colors flex items-center justify-center gap-2"
              onClick={() => {
                alert('Securely Transmitting to ' + (selectedProvider?.name || 'Provider') + '...');
                setView('patient_dash');
              }}
            >
              <Lock size={16} /> Send Securely
            </button>
            <p className="text-center text-[10px] text-unimed-navy/40 mt-3 italic">
              End-to-end encrypted • HIPAA compliant
            </p>
          </div>
        </div>

        <div className="fixed bottom-4 left-0 right-0 mx-auto max-w-md px-6">
          <button
            onClick={() => setView('provider_list')}
            className="w-full py-2 text-center text-[10px] font-bold text-unimed-navy/30 uppercase tracking-widest hover:text-unimed-navy transition-colors"
          >
            Switch to Provider Mode (Demo)
          </button>
        </div>
      </Layout>
    );
  }

  // --- PROVIDER LIST ---
  if (view === 'provider_list') {
    return (
      <Layout title="Patient Directory" darkHeader>
        <div className="space-y-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-unimed-navy/40" size={18} />
            <input
              className="w-full p-3 pl-10 rounded-xl border border-unimed-border bg-white text-sm"
              placeholder="Search citizens by name or NPI..."
            />
          </div>

          <div className="space-y-3">
            {PATIENTS.map(patient => (
              <div
                key={patient.id}
                onClick={() => setView('provider_profile')}
                className="p-4 bg-white border border-unimed-border rounded-xl flex items-center justify-between cursor-pointer hover:border-unimed-cyan transition-all"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-unimed-lightGray border border-unimed-border overflow-hidden">
                    <img src={`https://i.pravatar.cc/150?u=${patient.id}`} alt="Patient" />
                  </div>
                  <div>
                    <p className="text-sm font-bold">{patient.name}</p>
                    <p className="text-[10px] text-unimed-navy/50">DOB: {patient.dob}</p>
                  </div>
                </div>
                {patient.status === 'New Records' && (
                  <div className="bg-unimed-cyan text-unimed-navy text-[9px] font-black px-2 py-1 rounded-full uppercase">
                    New Records
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <nav className="fixed bottom-0 left-0 right-0 mx-auto max-w-md bg-white border-t border-unimed-border flex justify-around p-3">
          <div className="flex flex-col items-center gap-1 text-unimed-cyan">
            <Users size={20} />
            <span className="text-[10px] font-bold">Patients</span>
          </div>
          <div className="flex flex-col items-center gap-1 text-unimed-navy/40">
            <div className="w-5 h-5 bg-unimed-navy/20 rounded-full" />
            <span className="text-[10px] font-bold">Messages</span>
          </div>
          <div className="flex flex-col items-center gap-1 text-unimed-navy/40">
            <div className="w-5 h-5 bg-unimed-navy/20 rounded-full" />
            <span className="text-[10px] font-bold">Schedule</span>
          </div>
          <div className="flex flex-col items-center gap-1 text-unimed-navy/40">
            <Settings size={20} />
            <span className="text-[10px] font-bold">Settings</span>
          </div>
        </nav>

        <div className="fixed bottom-20 left-0 right-0 mx-auto max-w-md px-6">
          <button
            onClick={() => setView('patient_dash')}
            className="w-full py-2 text-center text-[10px] font-bold text-unimed-navy/30 uppercase tracking-widest hover:text-unimed-navy transition-colors"
          >
            Switch to Patient Mode (Demo)
          </button>
        </div>
      </Layout>
    );
  }

  // --- PROVIDER PROFILE ---
  if (view === 'provider_profile') {
    return (
      <Layout title="Citizen Profile" darkHeader>
        <div className="space-y-6">
          <div className="bg-unimed-navy p-4 rounded-2xl text-white shadow-lg">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-white overflow-hidden">
                <img src="https://i.pravatar.cc/150?u=alex" alt="Avatar" />
              </div>
              <div>
                <p className="text-sm font-bold">{PATIENT_DATA.name}</p>
                <p className="text-[10px] opacity-70">ID: {PATIENT_DATA.id}</p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="bg-white/10 p-2 rounded-lg">
                <p className="text-[8px] opacity-60 uppercase font-bold">Blood</p>
                <p className="text-xs font-bold">{PATIENT_DATA.bloodType}</p>
              </div>
              <div className="bg-white/10 p-2 rounded-lg">
                <p className="text-[8px] opacity-60 uppercase font-bold">Donor</p>
                <p className="text-xs font-bold">{PATIENT_DATA.donor}</p>
              </div>
              <div className="bg-white/10 p-2 rounded-lg">
                <p className="text-[8px] opacity-60 uppercase font-bold">Status</p>
                <p className="text-xs font-bold text-unimed-cyan">Verified</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-white p-4 rounded-xl border border-unimed-border shadow-sm">
              <h4 className="text-xs font-bold uppercase text-unimed-navy/50 mb-3 flex items-center gap-2">
                <Lock size={14} /> Shared Medical Records
              </h4>
              <div className="space-y-2">
                {DOC_CATEGORIES.slice(0, 4).map(doc => (
                  <div key={doc.id} className="flex items-center justify-between p-2 hover:bg-unimed-lightGray rounded-lg transition-colors group cursor-pointer">
                    <div className="flex items-center gap-3">
                      <div className={`p-1.5 rounded bg-unimed-lightGray ${doc.color}`}>
                        {doc.icon}
                      </div>
                      <span className="text-xs font-medium">{doc.title}</span>
                    </div>
                    <CheckCircle2 size={14} className="text-unimed-success" />
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white p-4 rounded-xl border border-unimed-border shadow-sm">
              <h4 className="text-xs font-bold uppercase text-unimed-navy/50 mb-3">Clinical Observations</h4>
              <textarea
                className="w-full p-3 bg-unimed-lightGray border border-unimed-border rounded-lg text-xs font-mono h-24 focus:outline-none focus:border-unimed-cyan"
                placeholder="Add provider notes here..."
              />
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => setView('provider_list')}
              className="flex-1 py-3 bg-white border border-unimed-border rounded-xl text-xs font-bold text-unimed-navy hover:bg-unimed-lightGray transition-colors"
            >
              Request Info
            </button>
            <button
              className="flex-1 py-3 bg-unimed-navy text-white rounded-xl text-xs font-bold shadow-lg hover:bg-blue-900 transition-colors"
            >
              Approve & Share
            </button>
          </div>
        </div>

        <nav className="fixed bottom-0 left-0 right-0 mx-auto max-w-md bg-white border-t border-unimed-border flex justify-around p-3">
          <div onClick={() => setView('provider_list')} className="flex flex-col items-center gap-1 text-unimed-navy/40 cursor-pointer hover:text-unimed-navy">
            <Users size={20} />
            <span className="text-[10px] font-bold">Patients</span>
          </div>
          <div className="flex flex-col items-center gap-1 text-unimed-navy/40">
            <div className="w-5 h-5 bg-unimed-navy/20 rounded-full" />
            <span className="text-[10px] font-bold">Messages</span>
          </div>
          <div className="flex flex-col items-center gap-1 text-unimed-navy/40">
            <div className="w-5 h-5 bg-unimed-navy/20 rounded-full" />
            <span className="text-[10px] font-bold">Schedule</span>
          </div>
          <div className="flex flex-col items-center gap-1 text-unimed-navy/40">
            <Settings size={20} />
            <span className="text-[10px] font-bold">Settings</span>
          </div>
        </nav>
      </Layout>
    );
  }

  // --- PATIENT PROVIDERS ---
  if (view === 'patient_providers') {
    return (
      <Layout title="My Providers" darkHeader>
        <div className="space-y-4">
          <p className="text-[10px] font-bold uppercase tracking-widest text-unimed-navy/50">Authorized State Network</p>
          {[
            { name: 'Mayo Clinic', location: 'Phoenix, AZ', verified: true },
            { name: 'VA Medical Center', location: 'Phoenix, AZ', verified: true },
            { name: 'St. Jude Children\'s', location: 'Memphis, TN', verified: true },
          ].map((provider, idx) => (
            <div key={idx} className="p-4 bg-white border border-unimed-border rounded-xl flex justify-between items-center">
              <div>
                <p className="text-sm font-bold">{provider.name}</p>
                <p className="text-[10px] text-unimed-navy/50">{provider.location}</p>
              </div>
              <div className="flex items-center gap-1 bg-unimed-success/10 text-unimed-success px-2 py-1 rounded-full text-[9px] font-bold">
                <CheckCircle2 size={10} /> Federal
              </div>
            </div>
          ))}
        </div>
        <nav className="fixed bottom-0 left-0 right-0 mx-auto max-w-md bg-white border-t border-unimed-border flex justify-around p-3">
          <div onClick={() => setView('patient_dash')} className="flex flex-col items-center gap-1 text-unimed-navy/40 cursor-pointer hover:text-unimed-navy">
            <Home size={20} />
            <span className="text-[10px] font-bold">Home</span>
          </div>
          <div className="flex flex-col items-center gap-1 text-unimed-cyan">
            <Users size={20} />
            <span className="text-[10px] font-bold">Providers</span>
          </div>
          <div className="flex flex-col items-center gap-1 text-unimed-navy/40">
            <Settings size={20} />
            <span className="text-[10px] font-bold">Settings</span>
          </div>
        </nav>
      </Layout>
    );
  }

  // --- PATIENT SETTINGS ---
  if (view === 'patient_settings') {
    return (
      <Layout title="Citizen Settings" darkHeader>
        <div className="space-y-3">
          <div className="p-4 bg-white border border-unimed-border rounded-xl space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-xs font-medium">Biometric Sync</span>
              <div className="w-10 h-5 bg-unimed-cyan rounded-full relative">
                <div className="absolute right-1 top-1 w-3 h-3 bg-white rounded-full"></div>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs font-medium">State-Link Notifications</span>
              <div className="w-10 h-5 bg-unimed-cyan rounded-full relative">
                <div className="absolute right-1 top-1 w-3 h-3 bg-white rounded-full"></div>
              </div>
            </div>
            <div className="flex justify-between items-center opacity-50 cursor-not-allowed">
              <span className="text-xs font-medium">Opt-out of Monitoring</span>
              <div className="w-10 h-5 bg-unimed-border rounded-full relative">
                <div className="absolute left-1 top-1 w-3 h-3 bg-white rounded-full"></div>
              </div>
            </div>
          </div>
          <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-[10px] text-red-800 italic">
            Note: Opting out of state monitoring is currently prohibited under the Health Sovereignty Act.
          </div>
        </div>
        <nav className="fixed bottom-0 left-0 right-0 mx-auto max-w-md bg-white border-t border-unimed-border flex justify-around p-3">
          <div onClick={() => setView('patient_dash')} className="flex flex-col items-center gap-1 text-unimed-navy/40 cursor-pointer hover:text-unimed-navy">
            <Home size={20} />
            <span className="text-[10px] font-bold">Home</span>
          </div>
          <div className="flex flex-col items-center gap-1 text-unimed-cyan">
            <Settings size={20} />
            <span className="text-[10px] font-bold">Settings</span>
          </div>
        </nav>
      </Layout>
    );
  }
};

export default App;
