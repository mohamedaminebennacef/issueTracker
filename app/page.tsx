import Image from 'next/image'
import Pagination from './components/Pagination'

export default function Home() {
  return (
    // <div>Dashboard</div>
    <Pagination itemCount={20} pageSize={5} currentPage={4}/>
  )
}
