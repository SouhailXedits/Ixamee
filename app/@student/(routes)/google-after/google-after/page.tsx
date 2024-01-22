import { redirect } from 'next/navigation';

export default async function page() {
  console.log("hello");
  redirect('/home');
}
