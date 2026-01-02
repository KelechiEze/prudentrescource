import { redirect } from 'next/navigation';

export default function AdminPage() {
  // Redirect to professionals page as default
  redirect('/admin/professionals');
}