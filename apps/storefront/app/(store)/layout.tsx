export const dynamic = "force-dynamic";
export const revalidate = false;

export default function StoreLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
