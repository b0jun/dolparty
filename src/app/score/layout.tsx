export default async function Layout(props: { children: React.ReactNode }) {
  return (
    <main className="flex min-h-full flex-col">
      <div className="flex min-w-[1110px] flex-1 bg-backdrop bg-cover bg-center bg-no-repeat">{props.children}</div>
    </main>
  );
}
