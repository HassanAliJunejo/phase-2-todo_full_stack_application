import ProtectedDashboardLayout from '../protected-layout';

export default function DashboardExamplesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedDashboardLayout>
      {children}
    </ProtectedDashboardLayout>
  );
}