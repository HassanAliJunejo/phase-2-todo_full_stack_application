'use client';

import { ReactNode, useState } from 'react';
import ProtectedDashboardLayout from './protected-layout';

export default function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="font-display bg-gradient-to-br from-slate-900 to-slate-800 min-h-screen">
      <ProtectedDashboardLayout>{children}</ProtectedDashboardLayout>
    </div>
  );
}