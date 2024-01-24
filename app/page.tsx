import Pagination from "./components/Pagination";

export default function Home() {
  return (
    <div>
      <Pagination itemCount={21} pageSize={10} currentPage={2} />
    </div>
  )
}
