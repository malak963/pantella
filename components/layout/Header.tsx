/** @format */
import TopBar from "./Topbar";
import Hero from "@/components/home/Hero";
import CategoriesRow from "@/components/home/CategoriesRow";

export default function Header() {
  return (
    <header className=''>
      {/* <TopBar /> */}
      <Hero />
      <CategoriesRow />
      
    </header>
  );
}
