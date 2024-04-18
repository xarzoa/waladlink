import GlassTheme from "@/components/custom/themes/glass";

export default async function UserPage({ params }) {
  async function fetchData(){
    const res = await fetch(`http://localhost:3000/${params.user}/get`)
    const data = await res.json()
    return data.data
  }
  const user = await fetchData()
  return (
    <main>
      <GlassTheme user={user}/>
    </main>
  );
}
