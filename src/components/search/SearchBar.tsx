'use client'

import Link from "next/link";

export default function SearchBar() {
  return (
    <div className="flex">
      <div className="flex flex-col border-2">
        <select name="location" id="location">
          <option value="where">Ở đâu?</option>
          <option value="near_where">Gần đâu?</option>
        </select>

        <input type="text" />
      </div>

      <div className="flex flex-col border-2">
        <label htmlFor="member">Bao nhiêu người?</label>
        <input type="text" id="member" />
      </div>

      <div className="border-2">
        <Link href="/search">Tìm kiếm</Link>
      </div>

      <div className="border-2 ml-6">
        <Link href="/post">Đăng tin</Link>
      </div>
    </div>
  )
}