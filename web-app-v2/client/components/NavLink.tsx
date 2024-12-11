"use client"

import Link from 'next/link'

function NavLink({ href, name }: { href: string; name: string }) {
  return (
    <Link href={href} className="text-sm font-medium text-white/80 hover:text-white transition-colors">
      {name}
    </Link>
  )
}

export default NavLink

