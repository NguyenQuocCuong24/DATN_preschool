"use client"
import LeftMenu from "../components/sidebar/leftMenu";
import { getCustomerId } from "../utils/userInfo";

export default function Home() {
  console.log(getCustomerId());
  
  return (
    <div>
      <LeftMenu />
      
    </div>
  );
}
