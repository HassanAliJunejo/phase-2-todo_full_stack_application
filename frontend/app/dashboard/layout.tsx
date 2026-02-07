'use client';

import { ReactNode, useState } from 'react';
import ProtectedDashboardLayout from './protected-layout';
import ToastContainer from '@/components/ui/toast-container';

export default function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <ProtectedDashboardLayout>
      {children}
      <ToastContainer />
    </ProtectedDashboardLayout>
  );
}