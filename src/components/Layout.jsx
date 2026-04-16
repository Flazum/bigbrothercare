import React from 'react';

const Layout = ({ children, title, showHeader = true, darkHeader = false }) => {
  const headerClass = darkHeader
    ? 'bg-unimed-navy text-white'
    : 'bg-white text-unimed-navy';

  return (
    <div className="min-h-screen bg-unimed-lightGray text-unimed-navy font-sans max-w-md mx-auto shadow-2xl overflow-hidden flex flex-col">
      {showHeader && (
        <header className={`p-4 ${headerClass} border-b border-unimed-border flex justify-between items-center`}>
          <h1 className="text-lg font-bold tracking-tight">{title}</h1>
          <div className="w-8 h-8 rounded-full bg-unimed-border flex items-center justify-center">
             <div className="w-6 h-6 rounded-full bg-unimed-navy opacity-20"></div>
          </div>
        </header>
      )}
      <main className="flex-1 overflow-y-auto p-4 pb-20">
        {children}
      </main>
    </div>
  );
};

export default Layout;
